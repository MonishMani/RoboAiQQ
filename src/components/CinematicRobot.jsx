import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    useGLTF,
    OrbitControls,
    Environment,
    Html,
    useProgress,
    PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * PRODUCTION-READY REACT THREE.JS COMPONENT
 * Features: Multi-GLB animation control, cross-fading, preloading, and performance optimization.
 * Path Compatibility: Vercel CDN compatible paths.
 */

const MODELS_PATH = "/assets/models/";
const BASE_MODEL = "roboaiq-model.glb";
const ANIMATIONS = [
    "Front Flip.glb",
    "Waving.glb",
    "Standing 2H Magic Attack 01.glb",
    "Stop Walking.glb",
];

// Preload assets for zero-lag starts
const preloadAll = () => {
    useGLTF.preload(`${MODELS_PATH}${BASE_MODEL}`);
    ANIMATIONS.forEach((file) => useGLTF.preload(`${MODELS_PATH}${file}`));
};
preloadAll();

/**
 * Loading Spinner Component
 */
const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="w-16 h-16 border-4 border-t-cyan-400 border-white/5 rounded-full animate-spin mb-4" />
                <p className="text-white font-mono text-sm tracking-widest uppercase">
                    Initializing Hub {Math.round(progress)}%
                </p>
            </div>
        </Html>
    );
};

/**
 * Core Robot Logic
 */
const Robot = ({ started }) => {
    const group = useRef();
    const { nodes, materials } = useGLTF(`${MODELS_PATH}${BASE_MODEL}`);

    // Load animations as separate GLTFs
    const anim1 = useGLTF(`${MODELS_PATH}${ANIMATIONS[0]}`);
    const anim2 = useGLTF(`${MODELS_PATH}${ANIMATIONS[1]}`);
    const anim3 = useGLTF(`${MODELS_PATH}${ANIMATIONS[2]}`);
    const anim4 = useGLTF(`${MODELS_PATH}${ANIMATIONS[3]}`);

    const [mixer] = useState(() => new THREE.AnimationMixer(null));
    const actions = useRef({});
    const lastAction = useRef(null);

    useEffect(() => {
        if (!group.current) return;

        // Set the mixer target to our model's root
        mixer._root = group.current;

        // Helper to map and retarget animations
        const setupAction = (glb, name) => {
            if (glb.animations.length) {
                const clip = glb.animations[0];
                const action = mixer.clipAction(clip, group.current);
                action.name = name;
                actions.current[name] = action;
            }
        };

        setupAction(anim1, "front_flip");
        setupAction(anim2, "waving");
        setupAction(anim3, "attack");
        setupAction(anim4, "stop_walking");

        return () => mixer.stopAllAction();
    }, [mixer, anim1, anim2, anim3, anim4]);

    // Transition Logic
    const fadeToAction = (name, duration = 0.5) => {
        const nextAction = actions.current[name];
        if (!nextAction) return;

        if (lastAction.current && lastAction.current !== nextAction) {
            lastAction.current.fadeOut(duration);
        }

        nextAction
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(duration)
            .play();

        lastAction.current = nextAction;
    };

    // Animation Sequence State Machine
    useEffect(() => {
        if (!started) return;

        let timeout;
        let sequenceIndex = 0;

        // SEQUENCE: Front Flip -> Waving (Intro)
        // Then Loop: Attack -> Stop Walking -> Waving (4s each)
        const introSequence = [
            { name: "front_flip", duration: 3000 }, // Approximate length
            { name: "waving", duration: 4000 },
        ];

        const loopSequence = [
            { name: "attack", duration: 4000 },
            { name: "stop_walking", duration: 4000 },
            { name: "waving", duration: 4000 },
        ];

        const runIntro = (idx) => {
            if (idx < introSequence.length) {
                const step = introSequence[idx];
                fadeToAction(step.name);
                timeout = setTimeout(() => runIntro(idx + 1), step.duration);
            } else {
                runLoop(0);
            }
        };

        const runLoop = (idx) => {
            const step = loopSequence[idx % loopSequence.length];
            fadeToAction(step.name);
            timeout = setTimeout(() => runLoop(idx + 1), step.duration);
        };

        runIntro(0);

        return () => clearTimeout(timeout);
    }, [started]);

    useFrame((state, delta) => {
        mixer.update(delta);

        if (group.current) {
            // Subtle hovering effect
            group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05 - 1.2;
        }
    });

    return (
        <group ref={group} dispose={null}>
            <primitive object={nodes.Scene} />
        </group>
    );
};

/**
 * Scene Controls & Composition
 */
const SceneContent = ({ started }) => {
    const { camera } = useThree();

    useEffect(() => {
        // Lock camera target to chest area
        camera.lookAt(0, 0.5, 0);
    }, [camera]);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} fov={45} />
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                target={[0, 0.5, 0]}
            />

            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={1} groundColor="black" color="cyan" />
            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
            <pointLight position={[-5, 2, -5]} intensity={1} color="blue" />

            <Suspense fallback={<Loader />}>
                <Robot started={started} />
            </Suspense>

            <Environment preset="city" />
        </>
    );
};

export default function CinematicRobot() {
    const [started, setStarted] = useState(false);

    return (
        <div className="relative w-full h-[600px] md:h-screen bg-transparent">
            {/* Cinematic Start Overlay */}
            {!started && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-700">
                    <button
                        onClick={() => setStarted(true)}
                        className="group relative px-8 py-4 bg-transparent text-white font-bold tracking-widest uppercase overflow-hidden border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-colors"
                    >
                        <span className="relative z-20">Initialize Protocol</span>
                        <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all duration-500" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    </button>
                </div>
            )}

            <Canvas shadows dpr={[1, 2]}>
                <SceneContent started={started} />
            </Canvas>

            {/* Aesthetic UI Elements */}
            <div className="absolute bottom-10 left-10 pointer-events-none">
                <div className="p-4 border-l-2 border-cyan-500 bg-black/40 backdrop-blur-md">
                    <p className="text-[10px] text-cyan-400 font-mono tracking-tighter uppercase mb-1">System Status</p>
                    <p className="text-white font-mono text-xs">MODEL: ROBO-AIQ V2.0.4</p>
                    <p className="text-white/60 font-mono text-[9px] mt-1">CORE SYNC: ACTIVE</p>
                </div>
            </div>
        </div>
    );
}
