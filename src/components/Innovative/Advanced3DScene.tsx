'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Float, Text } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

// Simple Loading Component
function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
      <p className="mt-4 text-cyan-400">Loading 3D scene...</p>
    </div>
  );
}

// Custom Environment without HDR
function CustomEnvironment() {
  const { scene } = useThree();
  
  // Set a simple background color instead of HDR
  scene.background = new THREE.Color(0x000011);
  
  return null;
}

// Floating Models Component
function FloatingModels() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Floating Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#083344"
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting Cubes */}
      {[-Math.PI / 4, 0, Math.PI / 4].map((angle, index) => (
        <Float key={index} speed={index + 2} rotationIntensity={1} floatIntensity={1}>
          <Box args={[0.4, 0.4, 0.4]} position={[Math.cos(angle) * 3, Math.sin(angle) * 2, Math.sin(angle) * 2]}>
            <meshStandardMaterial
              color={['#8b5cf6', '#ec4899', '#10b981'][index]}
              emissive={['#4c1d95', '#9d174d', '#065f46'][index]}
              roughness={0.3}
              metalness={0.7}
            />
          </Box>
        </Float>
      ))}

      {/* Floating Torus */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[-2, 1, -1]}>
          <torusGeometry args={[1.2, 0.2, 16, 100]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#92400e"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Text Component
function ThreeDText() {
  return (
    <Text
      position={[0, -3, 0]}
      fontSize={0.8}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      Sulaiman Aremu
      <meshStandardMaterial
        color="#ffffff"
        emissive="#0ea5e9"
        emissiveIntensity={0.5}
      />
    </Text>
  );
}

// Main Scene Component
function Scene() {
  const { camera, scene } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    camera.position.z = 10 + Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Custom environment without HDR */}
      <CustomEnvironment />
      
      {/* Enhanced Lighting to compensate for no environment map */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0ea5e9" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <hemisphereLight
        intensity={0.3}
        color="#0ea5e9"
        groundColor="#083344"
      />
      
      {/* Models */}
      <FloatingModels />
      <ThreeDText />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Component
export default function Advanced3DScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}