import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Box, Eye, Layers, Trophy, BookOpen, Waypoints as PortalIcon } from 'lucide-react';
import { sound } from '../utils/audio';
import '../styles/world.css';

const DISTRICTS = [
  { id: 'hero', name: 'SPAWN', icon: Compass, pos: [0, 2, 0], lookAt: [0, 0, 0] },
  { id: 'engineering', name: 'SOFTWARE DISTRICT', icon: Layers, pos: [-12, 4, -4], lookAt: [-12, 1, -4] },
  { id: 'ailab', name: 'AI LAB', icon: Eye, pos: [12, 4, -6], lookAt: [12, 1, -6] },
  { id: 'projects', name: 'PROJECT MINE', icon: Box, pos: [-8, 3, 10], lookAt: [-8, 0, 10] },
  { id: 'quests', name: 'QUEST TOWER', icon: Trophy, pos: [8, 5, 8], lookAt: [8, 2, 8] },
  { id: 'education', name: 'KNOWLEDGE ARCHIVE', icon: BookOpen, pos: [0, 4, -14], lookAt: [0, 1, -14] },
  { id: 'contact', name: 'CONTACT PORTAL', icon: PortalIcon, pos: [0, 3, 14], lookAt: [0, 1, 14] }
];

export default function WorldScene({ onSelectDistrict, dayCycle = 'night' }) {
  const mountRef = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState('hero');

  // Three.js internal references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const dirLightRef = useRef(null);
  const ambLightRef = useRef(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 10, 24));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030605, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 12, 26);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0e2a1b, 1.2);
    scene.add(ambientLight);
    ambLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0x00ff66, 2.0);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Materials
    const darkVoxelMat = new THREE.MeshStandardMaterial({
      color: 0x08130e,
      roughness: 0.8,
      metalness: 0.2
    });

    const cyberGreenMat = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      emissive: 0x00aa44,
      emissiveIntensity: 0.8,
      roughness: 0.3
    });

    const cyberCyanMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0099bb,
      emissiveIntensity: 0.7,
      roughness: 0.3
    });

    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x110e19,
      roughness: 0.5,
      metalness: 0.5
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffb703,
      emissive: 0xaa7700,
      emissiveIntensity: 0.5,
      roughness: 0.3
    });

    // 1. FLOATING CYBER TERRAIN (Layered Voxel Island)
    const islandGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // Central ground grid
    for (let x = -16; x <= 16; x += 2) {
      for (let z = -16; z <= 16; z += 2) {
        // Create irregular floating island perimeter
        const dist = Math.sqrt(x * x + z * z);
        if (dist > 18) continue;

        const h = Math.max(1, Math.floor(4 - dist * 0.15));
        for (let y = 0; y < h; y++) {
          const isTop = y === h - 1;
          const isEdge = dist > 14 || (x % 4 === 0 && z % 4 === 0);
          
          let mat = darkVoxelMat;
          if (isTop && isEdge) {
            mat = Math.random() > 0.4 ? cyberGreenMat : cyberCyanMat;
          }

          const block = new THREE.Mesh(boxGeo, mat);
          block.position.set(x, y - 3, z);
          block.scale.set(1.9, 0.95, 1.9);
          block.receiveShadow = true;
          islandGroup.add(block);
        }
      }
    }
    scene.add(islandGroup);

    // 2. DISTRICT LANDMARKS

    // [A] SPAWN BEACON (0, 0, 0)
    const spawnGroup = new THREE.Group();
    spawnGroup.position.set(0, 0, 0);
    // Base obsidian tier
    const beaconBase = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 4), obsidianMat);
    spawnGroup.add(beaconBase);
    // Glass cylinder
    const beaconGlass = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2.5, 2),
      new THREE.MeshStandardMaterial({ color: 0x00ff66, transparent: true, opacity: 0.5 })
    );
    beaconGlass.position.y = 1.5;
    spawnGroup.add(beaconGlass);
    // Core Nether Star
    const beaconCore = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), cyberCyanMat);
    beaconCore.position.y = 1.5;
    spawnGroup.add(beaconCore);
    // Glowing light beam shooting up
    const beamGeo = new THREE.CylinderGeometry(0.3, 0.3, 20, 8);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.4 });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 11;
    spawnGroup.add(beam);
    scene.add(spawnGroup);

    // [B] SOFTWARE DISTRICT (-12, 0, -4)
    const softGroup = new THREE.Group();
    softGroup.position.set(-12, 0, -4);
    for (let b = 0; b < 4; b++) {
      const bh = 4 + b * 2;
      const building = new THREE.Mesh(new THREE.BoxGeometry(2, bh, 2), darkVoxelMat);
      building.position.set((b % 2) * 2.5 - 1.5, bh / 2, Math.floor(b / 2) * 2.5 - 1.5);
      building.castShadow = true;
      softGroup.add(building);
      // Cyber window stripe
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.3, 2.05), cyberCyanMat);
      stripe.position.set(building.position.x, bh * 0.7, building.position.z);
      softGroup.add(stripe);
    }
    scene.add(softGroup);

    // [C] AI LAB (12, 0, -6)
    const aiGroup = new THREE.Group();
    aiGroup.position.set(12, 0, -6);
    const aiCoreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 0), cyberGreenMat);
    aiCoreMesh.position.y = 3;
    aiGroup.add(aiCoreMesh);
    // Orbiting data nodes
    const orbitNodes = [];
    for (let o = 0; o < 4; o++) {
      const node = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), cyberCyanMat);
      aiGroup.add(node);
      orbitNodes.push(node);
    }
    scene.add(aiGroup);

    // [D] PROJECT MINE (-8, 0, 10)
    const mineGroup = new THREE.Group();
    mineGroup.position.set(-8, 0, 10);
    for (let m = 0; m < 5; m++) {
      const ore = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), m % 2 === 0 ? cyberGreenMat : cyberCyanMat);
      ore.position.set((m - 2) * 1.4, Math.sin(m) * 1 + 1.5, (m % 2) * 1.5);
      mineGroup.add(ore);
    }
    scene.add(mineGroup);

    // [E] QUEST TOWER (8, 0, 8)
    const questGroup = new THREE.Group();
    questGroup.position.set(8, 0, 8);
    for (let q = 0; q < 5; q++) {
      const w = 4 - q * 0.7;
      const tier = new THREE.Mesh(new THREE.BoxGeometry(w, 1.2, w), obsidianMat);
      tier.position.y = q * 1.2 + 0.6;
      questGroup.add(tier);
    }
    const questTrophy = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), goldMat);
    questTrophy.position.y = 6.6;
    questGroup.add(questTrophy);
    scene.add(questGroup);

    // [F] KNOWLEDGE ARCHIVE (0, 0, -14)
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, 0, -14);
    const tomeAltar = new THREE.Mesh(new THREE.BoxGeometry(3, 1.5, 3), obsidianMat);
    tomeAltar.position.y = 0.75;
    bookGroup.add(tomeAltar);
    // Floating enchanted book mesh
    const bookMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 1.3), cyberCyanMat);
    bookMesh.position.y = 2.4;
    bookMesh.rotation.x = 0.4;
    bookGroup.add(bookMesh);
    scene.add(bookGroup);

    // [G] CONTACT PORTAL (0, 0, 14)
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, 14);
    // Frame
    const pLeft = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), obsidianMat);
    pLeft.position.set(-2, 2.5, 0);
    const pRight = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), obsidianMat);
    pRight.position.set(2, 2.5, 0);
    const pTop = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 1), obsidianMat);
    pTop.position.set(0, 5, 0);
    const pBottom = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 1), obsidianMat);
    pBottom.position.set(0, 0.5, 0);
    portalGroup.add(pLeft, pRight, pTop, pBottom);
    // Portal swirling pane
    const portalPane = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4),
      new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      })
    );
    portalPane.position.set(0, 2.75, 0);
    portalGroup.add(portalPane);
    scene.add(portalGroup);

    // Ambient floating particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = Math.random() * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 36;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.18,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let angleAzimuth = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      angleAzimuth += deltaX * 0.005;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Keyboard navigation (WASD / Arrows)
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(key)) {
        targetCamPos.current.z -= 1;
      } else if (['s', 'arrowdown'].includes(key)) {
        targetCamPos.current.z += 1;
      } else if (['a', 'arrowleft'].includes(key)) {
        targetCamPos.current.x -= 1;
      } else if (['d', 'arrowright'].includes(key)) {
        targetCamPos.current.x += 1;
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Beacon rotation
      beaconCore.rotation.y = elapsed * 1.5;
      beaconCore.rotation.x = elapsed * 0.8;

      // AI lab rotation
      aiCoreMesh.rotation.y = elapsed * 1.2;
      aiCoreMesh.rotation.z = elapsed * 0.6;
      orbitNodes.forEach((node, i) => {
        const theta = elapsed * 1.5 + (i * Math.PI) / 2;
        node.position.set(Math.cos(theta) * 2.8, 3 + Math.sin(theta * 2) * 0.4, Math.sin(theta) * 2.8);
      });

      // Tome float
      bookMesh.position.y = 2.4 + Math.sin(elapsed * 2) * 0.15;
      bookMesh.rotation.y = elapsed * 0.5;

      // Particles gentle drift
      particles.rotation.y = elapsed * 0.03;

      // Smooth camera motion
      camera.position.lerp(targetCamPos.current, 0.05);
      currentLookAt.current.lerp(targetLookAt.current, 0.05);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update lighting on dayCycle change
  useEffect(() => {
    if (!dirLightRef.current || !ambLightRef.current || !sceneRef.current) return;
    if (dayCycle === 'day') {
      dirLightRef.current.color.setHex(0xe0f2fe);
      dirLightRef.current.intensity = 2.4;
      ambLightRef.current.color.setHex(0x1e293b);
      ambLightRef.current.intensity = 1.4;
      sceneRef.current.fog.color.setHex(0x0a141d);
    } else if (dayCycle === 'sunset') {
      dirLightRef.current.color.setHex(0xf59e0b);
      dirLightRef.current.intensity = 2.2;
      ambLightRef.current.color.setHex(0x451a03);
      ambLightRef.current.intensity = 1.2;
      sceneRef.current.fog.color.setHex(0x190e08);
    } else {
      // Night Matrix mode
      dirLightRef.current.color.setHex(0x00ff66);
      dirLightRef.current.intensity = 1.8;
      ambLightRef.current.color.setHex(0x051a0d);
      ambLightRef.current.intensity = 1.0;
      sceneRef.current.fog.color.setHex(0x030605);
    }
  }, [dayCycle]);

  // Navigate to District
  const handleSelectDistrict = (district) => {
    sound.playClick();
    setSelectedDistrict(district.id);

    // Compute cinematic camera perspective for this landmark
    targetCamPos.current.set(
      district.pos[0] + (district.pos[0] > 0 ? -4 : 4),
      district.pos[1] + 6,
      district.pos[2] + 8
    );
    targetLookAt.current.set(district.lookAt[0], district.lookAt[1], district.lookAt[2]);

    if (onSelectDistrict) {
      onSelectDistrict(district.id);
    }
  };

  return (
    <div className="world-viewport-container" aria-label="Interactive 3D Voxel World Viewport">
      <div ref={mountRef} className="world-canvas" />

      {/* Top Overlay HUD */}
      <div className="world-hud-overlay">
        <div className="world-title-badge">
          <span>§ VOXEL WORLD ACTIVE</span>
          <span style={{ color: 'var(--text-muted)' }}>//</span>
          <span style={{ color: 'var(--matrix-green)' }}>FPS: 60 STABLE</span>
        </div>

        <div className="world-controls-hint">
          <span>Drag mouse to orbit</span>
          <span className="world-key-tag">W</span>
          <span className="world-key-tag">A</span>
          <span className="world-key-tag">S</span>
          <span className="world-key-tag">D</span>
        </div>
      </div>

      {/* District Quick-Fly Selector Bar */}
      <div className="world-district-bar" role="navigation" aria-label="World Districts Navigation">
        {DISTRICTS.map((d) => {
          const Icon = d.icon;
          return (
            <button
              key={d.id}
              type="button"
              className={`world-district-btn ${selectedDistrict === d.id ? 'active' : ''}`}
              onClick={() => handleSelectDistrict(d)}
              data-cursor="pointer"
            >
              <Icon size={14} />
              <span>{d.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
