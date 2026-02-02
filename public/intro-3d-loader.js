/**
 * RoboAiQ Intro 3D Loader
 * Optimized deferred loading system for GLB models
 * Supports device detection, fallbacks, and performance modes
 */

// ============================================
// DEVICE DETECTION & TIER CLASSIFICATION
// ============================================

function detectDeviceTier() {
    const params = new URLSearchParams(window.location.search);

    // Debug override
    if (params.get('lite3d') === 'true') {
        console.log('[3D Loader] Forced low-end mode via URL parameter');
        return 'low';
    }

    // Hardware detection
    const cores = navigator.hardwareConcurrency || 2;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = connection?.effectiveType || '4g';
    const isMobile = window.innerWidth < 768;
    const isOldAndroid = /Android [1-6]/.test(navigator.userAgent);
    const isLowRAM = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;

    // Low-end criteria
    const isLowEnd =
        cores <= 4 ||
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        effectiveType === '3g' ||
        isOldAndroid ||
        isLowRAM;

    if (isLowEnd) {
        console.log('[3D Loader] Low-end device detected:', { cores, effectiveType, isMobile });
        return 'low';
    }

    // Mid-tier criteria
    const isMidTier = cores <= 6 || isMobile;

    if (isMidTier) {
        console.log('[3D Loader] Mid-tier device detected:', { cores, effectiveType, isMobile });
        return 'mid';
    }

    console.log('[3D Loader] High-end device detected:', { cores, effectiveType });
    return 'high';
}

// ============================================
// DEBUG SYSTEM
// ============================================

class DebugOverlay {
    constructor() {
        const params = new URLSearchParams(window.location.search);
        this.enabled = params.get('3dDebug') === 'true';
        this.startTime = performance.now();
        this.stats = {
            tier: '',
            loadTime: 0,
            glbSize: 0,
            fps: 0
        };

        if (this.enabled) {
            this.createOverlay();
        }
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'debug-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: #0f0;
            font-family: monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 99999;
            min-width: 200px;
        `;
        overlay.innerHTML = `
            <div><strong>🔧 3D Debug Mode</strong></div>
            <div>Device: <span id="debug-tier">--</span></div>
            <div>Load Time: <span id="debug-load">--</span>ms</div>
            <div>FPS: <span id="debug-fps">--</span></div>
            <div>GLB Size: <span id="debug-size">--</span>KB</div>
            <div>Renderer: <span id="debug-renderer">--</span></div>
        `;
        document.body.appendChild(overlay);
        this.overlay = overlay;

        // Start FPS counter
        this.startFPSCounter();
    }

    update(key, value) {
        if (!this.enabled) return;
        this.stats[key] = value;
        const el = document.getElementById(`debug-${key}`);
        if (el) el.textContent = value;
    }

    startFPSCounter() {
        let lastTime = performance.now();
        let frames = 0;

        const countFPS = () => {
            frames++;
            const now = performance.now();
            if (now >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (now - lastTime));
                this.update('fps', fps);
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(countFPS);
        };

        requestAnimationFrame(countFPS);
    }
}

// ============================================
// PLACEHOLDER SYSTEM
// ============================================

function createPlaceholder(container) {
    // No placeholder - return null for clean intro without robot image
    return null;
}

// ============================================
// LOADING PROGRESS UI
// ============================================

function createLoadingUI(container) {
    const loader = document.createElement('div');
    loader.id = 'model-loader';
    loader.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
        z-index: 10;
    `;

    loader.innerHTML = `
        <div style="
            background: rgba(212, 175, 55, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 20px;
            padding: 10px 15px;
            text-align: center;
        ">
            <div class="progress-text" style="
                color: #D4AF37;
                font-size: 11px;
                margin-bottom: 5px;
                font-family: 'Poppins', sans-serif;
            ">Loading 3D Model...</div>
            <div style="
                background: rgba(0,0,0,0.3);
                height: 4px;
                border-radius: 2px;
                overflow: hidden;
            ">
                <div class="progress-bar-fill" style="
                    background: linear-gradient(90deg, #DAA520, #FFD700);
                    height: 100%;
                    width: 0%;
                    transition: width 0.3s ease;
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                "></div>
            </div>
        </div>
    `;

    container.appendChild(loader);
    return loader;
}

function updateLoadProgress(loader, progress) {
    const bar = loader.querySelector('.progress-bar-fill');
    const text = loader.querySelector('.progress-text');

    bar.style.width = `${progress * 100}%`;
    text.textContent = `Loading 3D... ${Math.round(progress * 100)}%`;

    if (progress >= 1) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 300);
    }
}

// ============================================
// DYNAMIC THREE.JS IMPORT
// ============================================

async function loadThreeJsDynamically() {
    console.log('[3D Loader] Dynamically importing Three.js...');
    const startTime = performance.now();

    try {
        // Import Three.js core
        const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js');

        // Import GLTFLoader
        const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/GLTFLoader.js');

        // Import DRACOLoader for compressed models
        const { DRACOLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/DRACOLoader.js');

        const loadTime = Math.round(performance.now() - startTime);
        console.log(`[3D Loader] Three.js loaded in ${loadTime}ms`);

        return { THREE, GLTFLoader, DRACOLoader };
    } catch (error) {
        console.error('[3D Loader] Failed to load Three.js:', error);
        return null;
    }
}

// ============================================
// 3D MODEL LOADING
// ============================================

async function load3DModel(tier, modules, container, debug) {
    const { THREE, GLTFLoader, DRACOLoader } = modules;

    // Select model based on tier
    const modelPath = tier === 'high'
        ? '/assets/models/roboaiq-model.glb'
        : '/assets/models/roboaiq-model-optimized.glb';

    console.log(`[3D Loader] Loading model for ${tier} tier:`, modelPath);

    // Setup DRACO loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

    // Setup GLTF loader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Create loading UI
    const loadingUI = createLoadingUI(container);

    return new Promise((resolve, reject) => {
        loader.load(
            modelPath,
            (gltf) => {
                console.log('[3D Loader] Model loaded successfully');
                updateLoadProgress(loadingUI, 1);
                resolve(gltf);
            },
            (xhr) => {
                const progress = xhr.loaded / xhr.total;
                updateLoadProgress(loadingUI, progress);

                if (debug.enabled && xhr.total) {
                    debug.update('size', Math.round(xhr.total / 1024));
                }
            },
            (error) => {
                console.error('[3D Loader] Failed to load model:', error);
                loadingUI.remove();
                reject(error);
            }
        );
    });
}

// ============================================
// 3D SCENE SETUP
// ============================================

function setup3DScene(tier, modules, container, gltf, debug) {
    const { THREE } = modules;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'model-canvas';
    canvas.style.cssText = `
        width: 100%;
        height: 100%;
        opacity: 0;
        display: block;
    `;
    container.appendChild(canvas);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: tier !== 'low',
        alpha: true,
        powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: false
    });

    const pixelRatio = tier === 'high' ? Math.min(window.devicePixelRatio, 2) : 1.5;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = tier === 'high';
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    if (debug.enabled) {
        debug.update('renderer', `${tier} / ${pixelRatio.toFixed(1)}x`);
    }

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1, 4);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(8, 6, 5);
    if (tier === 'high') {
        directionalLight.castShadow = true;
    }
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.2);
    pointLight.position.set(-5, 3, 2);
    scene.add(pointLight);

    // Add model to scene
    const model = gltf.scene;
    model.scale.set(2.5, 2.5, 2.5);
    scene.add(model);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = mouseX * Math.PI;
        targetRotationX = (mouseY * Math.PI) / 8;
    });

    // Animation loop
    const clock = new THREE.Clock();
    const fpsLimit = tier === 'low' ? 30 : 60;
    const frameInterval = 1000 / fpsLimit;
    let lastFrameTime = 0;

    function animate(currentTime) {
        requestAnimationFrame(animate);

        // FPS limiting for mobile
        const deltaTime = currentTime - lastFrameTime;
        if (deltaTime < frameInterval) return;
        lastFrameTime = currentTime - (deltaTime % frameInterval);

        // Smooth rotation
        model.rotation.y += (targetRotationY - model.rotation.y) * 0.1;
        model.rotation.x += (targetRotationX - model.rotation.x) * 0.1;

        // Floating animation
        const floatY = Math.sin(clock.getElapsedTime()) * 0.1;
        model.position.y = floatY;

        renderer.render(scene, camera);
    }

    animate(0);

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    return { renderer, scene, camera, canvas };
}

// ============================================
// TRANSITION EFFECTS
// ============================================

function transitionTo3D(canvas, poster) {
    console.log('[3D Loader] Starting transition to 3D...');

    // Gold shimmer sweep
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255, 215, 0, 0.3) 50%,
            transparent 100%
        );
        z-index: 9998;
        pointer-events: none;
        animation: shimmerSweep 1.5s ease-in-out;
    `;

    // Add shimmer animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmerSweep {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(shimmer);

    // Crossfade
    setTimeout(() => {
        canvas.style.transition = 'opacity 1s ease-in-out';
        canvas.style.opacity = '1';

        if (poster) {
            poster.style.opacity = '0';
        }
    }, 500);

    // Cleanup
    setTimeout(() => {
        if (poster) poster.remove();
        shimmer.remove();
        style.remove();
    }, 2000);
}

// ============================================
// MAIN INITIALIZATION
// ============================================

async function init3DIntro() {
    console.log('[3D Loader] Initializing...');

    // Debug system
    const debug = new DebugOverlay();
    const startTime = performance.now();

    // Detect device tier
    const tier = detectDeviceTier();
    debug.update('tier', tier);

    // Get container
    const container = document.getElementById('model-container');
    if (!container) {
        console.error('[3D Loader] Container not found');
        return;
    }

    // Disabled: No placeholder or 3D in intro
    console.log('[3D Loader] Intro mode: No 3D or placeholder');
    return;

    // Create placeholder
    const poster = createPlaceholder(container);

    // Low-end: Show only placeholder
    if (tier === 'low') {
        console.log('[3D Loader] Low-end mode: Using static poster only');
        return;
    }

    try {
        // Load Three.js
        const modules = await loadThreeJsDynamically();
        if (!modules) {
            console.error('[3D Loader] Failed to load Three.js modules');
            return;
        }

        // Load 3D model
        const gltf = await load3DModel(tier, modules, container, debug);

        // Setup scene
        const { canvas } = setup3DScene(tier, modules, container, gltf, debug);

        // Transition
        transitionTo3D(canvas, poster);

        // Update debug
        const totalTime = Math.round(performance.now() - startTime);
        debug.update('load', totalTime);

        console.log(`[3D Loader] Complete! Total time: ${totalTime}ms`);

    } catch (error) {
        console.error('[3D Loader] Initialization failed:', error);
        // Keep placeholder on error
    }
}

// ============================================
// EXPORT
// ============================================

export { init3DIntro };
