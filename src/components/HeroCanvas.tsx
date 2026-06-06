"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070707, 0.08);

    // --- Camera Setup ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0f1123, 0.8);
    scene.add(ambientLight);

    const goldSpotlight = new THREE.SpotLight(0xc5a880, 8, 15, Math.PI / 6, 0.5, 1);
    goldSpotlight.position.set(0, 5, 2);
    goldSpotlight.castShadow = true;
    scene.add(goldSpotlight);

    const blueSpotlight = new THREE.SpotLight(0x3a4f8c, 6, 20, Math.PI / 4, 0.8, 1);
    blueSpotlight.position.set(-4, 6, -3);
    scene.add(blueSpotlight);

    // --- Stadium Field Ground ---
    const groundGeo = new THREE.RingGeometry(0.1, 15, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c130d,
      roughness: 0.9,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Add field marking lines
    const lineGeo = new THREE.RingGeometry(4.5, 4.52, 64);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.15, transparent: true, side: THREE.DoubleSide });
    const fieldLine = new THREE.Mesh(lineGeo, lineMat);
    fieldLine.rotation.x = -Math.PI / 2;
    fieldLine.position.y = -1.49;
    scene.add(fieldLine);

    // --- Volumetric Floodlights (Cylinder cones simulating beams) ---
    const createLightBeam = (color: number, opacity: number) => {
      const beamGeo = new THREE.CylinderGeometry(0.02, 1.8, 8, 32, 1, true);
      beamGeo.translate(0, -4, 0); // Position pivot at the source of the spotlight
      const beamMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      return new THREE.Mesh(beamGeo, beamMat);
    };

    const beam1 = createLightBeam(0xc5a880, 0.18);
    beam1.position.set(5, 5, -4);
    beam1.rotation.set(0.6, 0, -0.4);
    scene.add(beam1);

    const beam2 = createLightBeam(0x3a4f8c, 0.12);
    beam2.position.set(-6, 5, -5);
    beam2.rotation.set(0.5, 0, 0.5);
    scene.add(beam2);

    // --- Premium Golden Cricket Ball ---
    const ballGroup = new THREE.Group();
    ballGroup.position.set(0.8, 0.3, 1.8);
    scene.add(ballGroup);

    // Sphere core
    const ballSphereGeo = new THREE.SphereGeometry(0.7, 64, 64);
    const ballSphereMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // gold
      roughness: 0.18,
      metalness: 0.9,
      bumpScale: 0.02
    });
    const ballCore = new THREE.Mesh(ballSphereGeo, ballSphereMat);
    ballCore.castShadow = true;
    ballCore.receiveShadow = true;
    ballGroup.add(ballCore);

    // Cricket Ball Seam (Torus representing the stitched seam)
    const seamGeo = new THREE.TorusGeometry(0.71, 0.025, 16, 100);
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0x8c6d3e, // darker bronze/gold for seam contrast
      roughness: 0.4,
      metalness: 0.7
    });
    const seam = new THREE.Mesh(seamGeo, seamMat);
    seam.rotation.y = Math.PI / 2; // Position around the middle vertically
    ballGroup.add(seam);

    // Stitching detail (using smaller spheres along the seam)
    const stitchCount = 40;
    const stitchGroup = new THREE.Group();
    const stitchGeo = new THREE.BoxGeometry(0.015, 0.03, 0.015);
    const stitchMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true });

    for (let i = 0; i < stitchCount; i++) {
      const angle = (i / stitchCount) * Math.PI * 2;
      const stitch = new THREE.Mesh(stitchGeo, stitchMat);
      
      // Position stitches along the seam ring
      stitch.position.set(
        0,
        Math.cos(angle) * 0.71,
        Math.sin(angle) * 0.71
      );
      stitch.rotation.x = angle;
      stitchGroup.add(stitch);
    }
    stitchGroup.rotation.y = Math.PI / 2;
    ballGroup.add(stitchGroup);

    // --- Floating Glowing Particles (Atmospheric Dust) ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a box around the center
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6 + 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleSpeeds[i] = 0.003 + Math.random() * 0.005;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Custom Canvas Texture for circular soft particle points
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(244, 234, 212, 1)");
      grad.addColorStop(1, "rgba(244, 234, 212, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse & Interactive Movement Parallax ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX - windowHalfX) / windowHalfX;
      mouse.targetY = (event.clientY - windowHalfY) / windowHalfY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse movements
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax camera movement
      camera.position.x = mouse.x * 1.5;
      camera.position.y = 1.5 - mouse.y * 0.8;
      camera.lookAt(0, 0.5, 0);

      // Rotate cricket ball group
      ballGroup.rotation.y = elapsedTime * 0.2 + mouse.x * 0.5;
      ballGroup.rotation.x = elapsedTime * 0.08 + mouse.y * 0.3;
      
      // Floating vertical bobbing for the ball
      ballGroup.position.y = 0.3 + Math.sin(elapsedTime * 1.2) * 0.08;

      // Sweep floodlights slowly
      beam1.rotation.z = -0.4 + Math.sin(elapsedTime * 0.5) * 0.1;
      beam2.rotation.z = 0.5 + Math.cos(elapsedTime * 0.4) * 0.08;

      // Animate atmospheric particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Rise particles upwards slowly
        positions[i * 3 + 1] += particleSpeeds[i];
        
        // Horizontal drift
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.001;

        // Reset particle if it drifts too high
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -2;
          positions[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // --- Window Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      groundGeo.dispose();
      groundMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      beam1.geometry.dispose();
      (beam1.material as THREE.Material).dispose();
      beam2.geometry.dispose();
      (beam2.material as THREE.Material).dispose();
      ballSphereGeo.dispose();
      ballSphereMat.dispose();
      seamGeo.dispose();
      seamMat.dispose();
      stitchGeo.dispose();
      stitchMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-[#070707]"
    />
  );
}
