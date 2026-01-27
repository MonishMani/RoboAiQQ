import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * IMPORTANT: Mixamo Animation File Requirements
 * 
 * When downloading from Mixamo, you must choose "With Skin" to include the mesh.
 * "Without Skin" only includes skeleton and animation - no visible model!
 * 
 * Current approach: Use Front Flip.glb as the primary model (it should have both mesh + animation)
 * Then swap to other models for different animations.
 */

// Model paths
const MODEL_PATHS = {
    frontFlip: '/assets/models/Front Flip.glb',
    waving: '/assets/models/Waving.glb',
    magicAttack: '/assets/models/Standing 2H Magic Attack 01.glb',
    stopWalking: '/assets/models/Stop Walking.glb',
};

// Preload
Object.values(MODEL_PATHS).forEach(path => useGLTF.preload(path));

/**
 * Single Model With Animation
 * Shows one model at a time with its embedded animation
 */
function ModelWithAnimation({ path, visible, onAnimationEnd, loopAnimation = false }) {
    const groupRef = useRef();
    const mixerRef = useRef();
    const gltf = useGLTF(path);

    // Clone scene to avoid mutation issues
    const scene = useMemo(() => {
        const clone = gltf.scene.clone(true);

        // Fix materials and enable shadows
        clone.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                if (node.material) {
                    node.material = node.material.clone();
                }
            }
        });

        return clone;
    }, [gltf.scene]);

    // Scale and center
    useEffect(() => {
        if (!scene) return;

        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // Scale to 2.5 units height for better visibility
        const scale = 2.5 / Math.max(size.x, size.y, size.z);
        scene.scale.setScalar(scale);
        scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    }, [scene]);

    // Setup and play animation
    useEffect(() => {
        if (!visible || !scene) return;

        const mixer = new THREE.AnimationMixer(scene);
        mixerRef.current = mixer;

        if (gltf.animations.length > 0) {
            const clip = gltf.animations[0];
            const action = mixer.clipAction(clip);

            action.setLoop(loopAnimation ? THREE.LoopRepeat : THREE.LoopOnce);
            action.clampWhenFinished = !loopAnimation;
            action.play();

            // Handle animation completion for non-looping animations
            if (!loopAnimation && onAnimationEnd) {
                const handleFinished = () => {
                    onAnimationEnd();
                };
                mixer.addEventListener('finished', handleFinished);
                return () => {
                    mixer.removeEventListener('finished', handleFinished);
                    mixer.stopAllAction();
                };
            }
        }

        return () => {
            if (mixerRef.current) {
                mixerRef.current.stopAllAction();
            }
        };
    }, [visible, scene, gltf.animations, loopAnimation, onAnimationEnd]);

    // Update animation
    useFrame((_, delta) => {
        if (visible && mixerRef.current) {
            mixerRef.current.update(delta);
        }
    });

    if (!visible) return null;

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}

/**
 * Robot Scene - Manages animation sequence
 */
function RobotScene({ started }) {
    // Animation sequence phases
    const PHASES = ['FLIP', 'WAVE_INTRO', 'MAGIC', 'STOP', 'WAVE_LOOP'];
    const [currentPhase, setCurrentPhase] = useState(0);
    const timerRef = useRef(null);

    // Camera controls
    const { camera } = useThree();
    const controlsRef = useRef();
    const defaultPos = useRef(new THREE.Vector3(0, 1.5, 5));
    const defaultTarget = useRef(new THREE.Vector3(0, 1.2, 0));
    const isReturning = useRef(false);
    const returnTimer = useRef(null);

    // Advance to next phase
    const nextPhase = () => {
        setCurrentPhase(prev => {
            const next = prev + 1;
            // After intro (phase 0-1), start loop (phases 2-4)
            if (next >= PHASES.length) return 2; // Loop back to MAGIC
            return next;
        });
    };

    // For looping animations, use timer-based transitions (4 seconds each)
    useEffect(() => {
        if (!started) return;

        const phase = PHASES[currentPhase];

        // Loop phases use timer
        if (phase === 'MAGIC' || phase === 'STOP' || phase === 'WAVE_LOOP') {
            timerRef.current = setTimeout(() => {
                nextPhase();
            }, 4000);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentPhase, started]);

    // Handle camera interaction
    const onControlsChange = () => {
        isReturning.current = false;
        if (returnTimer.current) clearTimeout(returnTimer.current);

        returnTimer.current = setTimeout(() => {
            isReturning.current = true;
        }, 1500);
    };

    // Auto-return camera
    useFrame((_, delta) => {
        if (isReturning.current && controlsRef.current) {
            camera.position.lerp(defaultPos.current, delta * 2);
            controlsRef.current.target.lerp(defaultTarget.current, delta * 2);

            if (camera.position.distanceTo(defaultPos.current) < 0.1) {
                isReturning.current = false;
            }
        }
    });

    const phase = PHASES[currentPhase];

    if (!started) return null;

    return (
        <group>
            {/* Phase 0: Front Flip (intro) */}
            <ModelWithAnimation
                path={MODEL_PATHS.frontFlip}
                visible={phase === 'FLIP'}
                onAnimationEnd={nextPhase}
                loopAnimation={false}
            />

            {/* Phase 1: Waving (intro - plays once) */}
            <ModelWithAnimation
                path={MODEL_PATHS.waving}
                visible={phase === 'WAVE_INTRO'}
                onAnimationEnd={nextPhase}
                loopAnimation={false}
            />

            {/* Phase 2: Magic Attack (loop) */}
            <ModelWithAnimation
                path={MODEL_PATHS.magicAttack}
                visible={phase === 'MAGIC'}
                loopAnimation={true}
            />

            {/* Phase 3: Stop Walking (loop) */}
            <ModelWithAnimation
                path={MODEL_PATHS.stopWalking}
                visible={phase === 'STOP'}
                loopAnimation={true}
            />

            {/* Phase 4: Waving (loop) */}
            <ModelWithAnimation
                path={MODEL_PATHS.waving}
                visible={phase === 'WAVE_LOOP'}
                loopAnimation={true}
            />

            {/* Lighting */}
            <hemisphereLight args={[0xffffff, 0x444444, 0.6]} position={[0, 10, 0]} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color={0x6688ff} />
            <ambientLight intensity={0.4} />

            {/* Controls */}
            <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={10}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                target={defaultTarget.current}
                onChange={onControlsChange}
            />
        </group>
    );
}

/**
 * Loading UI
 */
function Loader() {
    return (
        <Html center>
            <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{
                    width: 50, height: 50, margin: '0 auto 10px',
                    border: '3px solid rgba(255,255,255,0.2)',
                    borderTopColor: '#4a9eff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }} />
                <p>Loading Robot...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </Html>
    );
}

/**
 * Main Robot Component
 */
export default function Robot({ style, className }) {
    const [started, setStarted] = useState(false);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', ...style }} className={className}>
            {/* Start Button */}
            {!started && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 10,
                    background: 'rgba(0,0,0,0.3)',
                }}>
                    <button
                        onClick={() => setStarted(true)}
                        style={{
                            padding: '16px 32px', fontSize: 18, fontWeight: 'bold',
                            color: 'white', border: 'none', borderRadius: 30, cursor: 'pointer',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            boxShadow: '0 8px 25px rgba(102,126,234,0.4)',
                            transition: 'transform 0.2s',
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        🤖 Start Experience
                    </button>
                </div>
            )}

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 1.5, 5], fov: 50 }}
                shadows
                style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' }}
                onCreated={({ gl }) => {
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                }}
            >
                <Suspense fallback={<Loader />}>
                    <PerspectiveCamera makeDefault position={[0, 1.5, 5]} />
                    <RobotScene started={started} />
                </Suspense>
            </Canvas>

            {/* Instructions */}
            {started && (
                <p style={{
                    position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)',
                    margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 13,
                }}>
                    Drag to rotate • Scroll to zoom
                </p>
            )}
        </div>
    );
}
