'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Float, Text } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Simple Loading Component
function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
      <p className="mt-4 text-cyan-400">Initializing 3D Portfolio...</p>
    </div>
  );
}

// Floating Code Symbols
function FloatingCodeSymbols() {
  const symbolsRef = useRef<THREE.Group>(null);
  const symbols = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.3 + 0.1
    }));
  }, []);

  useFrame((state) => {
    if (symbolsRef.current) {
      symbolsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      symbolsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      });
    }
  });

  return (
    <group ref={symbolsRef}>
      {symbols.map((symbol, i) => (
        <mesh
          key={i}
          position={symbol.position as [number, number, number]}
          rotation={symbol.rotation as [number, number, number]}
          scale={symbol.scale}
        >
          <boxGeometry args={[0.5, 0.5, 0.1]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Binary Rain Effect - Simplified version without Line component
function BinaryRain() {
  const rainCount = 30;
  
  const rainDrops = useMemo(() => {
    return Array.from({ length: rainCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        10 + Math.random() * 5,
        (Math.random() - 0.5) * 10
      ],
      speed: Math.random() * 2 + 1,
      length: Math.random() * 0.5 + 0.2
    }));
  }, []);

  const dropsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    dropsRef.current.forEach((drop, i) => {
      if (drop) {
        drop.position.y -= rainDrops[i].speed * 0.02;
        if (drop.position.y < -10) {
          drop.position.y = 10 + Math.random() * 5;
        }
      }
    });
  });

  return (
    <group>
      {rainDrops.map((drop, i) => (
        <mesh
          key={i}
          ref={el => dropsRef.current[i] = el!}
          position={drop.position as [number, number, number]}
        >
          <cylinderGeometry args={[0.01, 0.01, drop.length, 4]} />
          <meshBasicMaterial
            color={Math.random() > 0.5 ? '#22d3ee' : '#3b82f6'}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// Central Tech Sphere with Circuit Pattern
function TechSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Tech Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#155e75"
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Orbiting Tech Rings */}
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2, 0, ring * 1.2]}>
          <torusGeometry args={[2 + ring * 0.8, 0.02, 8, 100]} />
          <meshBasicMaterial
            color={ring === 0 ? '#22d3ee' : ring === 1 ? '#3b82f6' : '#8b5cf6'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Floating Code Cubes */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        return (
          <Float key={i} speed={i % 2 === 0 ? 2 : 3} rotationIntensity={1} floatIntensity={1}>
            <Box
              args={[0.3, 0.3, 0.3]}
              position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 0.5, Math.sin(angle) * radius]}
            >
              <meshStandardMaterial
                color={i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6'}
                emissive={i % 3 === 0 ? '#155e75' : i % 3 === 1 ? '#1e40af' : '#5b21b6'}
                roughness={0.3}
                metalness={0.8}
              />
            </Box>
          </Float>
        );
      })}
    </group>
  );
}

// Developer Name Text with Glow
function DeveloperText() {
  return (
    <group>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.4}
        color="#22d3ee"
        anchorX="center"
        anchorY="middle"
      >
        SULAIMAN AREMU
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0ea5e9"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </Text>
      
      {/* Title Text */}
      <Text
        position={[0, -3.2, 0]}
        fontSize={0.2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Full-Stack Developer & Designer
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1e40af"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Text>
    </group>
  );
}

// Particle Network - Fixed version
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 25;
      
      // Cyan to purple gradient
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.1; colors[i + 1] = 0.8; colors[i + 2] = 0.9; // Cyan
      } else if (colorChoice < 0.66) {
        colors[i] = 0.2; colors[i + 1] = 0.5; colors[i + 2] = 1.0; // Blue
      } else {
        colors[i] = 0.5; colors[i + 1] = 0.3; colors[i + 2] = 0.9; // Purple
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    return { geometry, material };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}

// Digital Wave Effect
function DigitalWave() {
  const waveRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      waveRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={waveRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <ringGeometry args={[4, 4.5, 64]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}

// Main Scene Component
function Scene() {
  const { camera, scene } = useThree();
  
  // Set background to match Hero
  scene.background = new THREE.Color(0x0f172a); // slate-900
  
  useFrame((state) => {
    // Gentle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 1;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.5;
    camera.position.z = 8 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} color="#0ea5e9" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#3b82f6"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#22d3ee" />
      <hemisphereLight
        intensity={0.2}
        color="#0ea5e9"
        groundColor="#1e293b"
      />

      {/* All Scene Elements */}
      <ParticleNetwork />
      <BinaryRain />
      <FloatingCodeSymbols />
      <DigitalWave />
      <TechSphere />
      <DeveloperText />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// Main Component
export default function Advanced3DScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      {/* Hero Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse"></div>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
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