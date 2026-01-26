import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, Center } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function Robot({ scene }) {
  const group = useRef();

  // Cursor-follow rotation (returns to center when idle)
  useFrame((state) => {
    if (!group.current) return;

    const targetX = (state.mouse.y * Math.PI) / 12;
    const targetY = (state.mouse.x * Math.PI) / 8;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.1);

    // Smooth return to front-facing when idle
    if (Math.abs(state.mouse.x) < 0.05 && Math.abs(state.mouse.y) < 0.05) {
      group.current.rotation.x *= 0.95;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.05);
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={3.5}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export default function Hero3DModel() {
  const { scene } = useGLTF("/assets/Model/Roboaiq_model.glb");
  const canvasRef = useRef();
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        setCanvasSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      ref={canvasRef}
      className="hero-canvas"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        shadows
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight 
          position={[8, 6, 5]} 
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 3, 2]} intensity={1.2} color="#87CEEB" />
        <Environment preset="city" intensity={0.8} />

        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
          <Center>
            <Robot scene={scene} />
          </Center>
        </Float>
      </Canvas>
    </motion.div>
  );
}

useGLTF.preload("/assets/Model/Roboaiq_model.glb");
