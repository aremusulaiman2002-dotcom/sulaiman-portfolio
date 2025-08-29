'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Interactive3DScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometries
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 32),
      new THREE.TorusGeometry(1, 0.4, 16, 100)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: '#0ea5e9', emissive: '#083344' }),
      new THREE.MeshPhongMaterial({ color: '#8b5cf6', emissive: '#4c1d95' }),
      new THREE.MeshPhongMaterial({ color: '#ec4899', emissive: '#9d174d' }),
      new THREE.MeshPhongMaterial({ color: '#10b981', emissive: '#065f46' })
    ];

    const meshes: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, index) => {
      const material = materials[index % materials.length];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 100, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        
        // Float animation
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        
        // Mouse interaction
        mesh.position.x += (mouse.x * 2 - mesh.position.x) * 0.02;
        mesh.position.y += (mouse.y * 2 - mesh.position.y) * 0.02;
      });

      // Make camera look around
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />;
};

export default Interactive3DScene;