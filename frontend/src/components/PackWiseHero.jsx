import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Play, Check } from 'lucide-react';

export default function PackWiseHero({ onStartOptimize, onOpenCopilot }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let animId;
    let rendererInstance;

    const initThreeBox = (THREE) => {
      const container = containerRef.current;
      if (!container) return;
      
      // Clear previous canvas if any
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const width = container.clientWidth || 600;
      const height = container.clientHeight || 600;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
      camera.position.set(0, 1.8, 5.0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererInstance = renderer;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // 2. Lighting
      const ambientLight = new THREE.AmbientLight(0xfffaea, 1.3);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.4);
      keyLight.position.set(5, 9, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe8f5e5, 0.9);
      fillLight.position.set(-5, 3, 4);
      scene.add(fillLight);

      const rimGreen = new THREE.PointLight(0x064e3b, 1.8, 8);
      rimGreen.position.set(-3.5, -0.5, -2);
      scene.add(rimGreen);

      const rimGold = new THREE.PointLight(0xd89b24, 1.2, 7);
      rimGold.position.set(3, -1, -2);
      scene.add(rimGold);

      // 3. High-Definition Kraft Cardboard Texture
      function generateRichKraftTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#C89B6D';
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
        for (let y = 0; y < 1024; y += 8) {
          ctx.fillRect(0, y, 1024, 3);
        }

        for (let i = 0; i < 9000; i++) {
          ctx.fillStyle = Math.random() > 0.45 ? 'rgba(60, 35, 15, 0.05)' : 'rgba(255, 250, 235, 0.08)';
          const rw = Math.random() * 5 + 1;
          const rh = Math.random() * 2 + 1;
          ctx.fillRect(Math.random() * 1024, Math.random() * 1024, rw, rh);
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 8;
        ctx.fillRect(80, 580, 360, 240);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#053B2C';
        let bx = 110;
        while (bx < 410) {
          const bw = Math.random() > 0.4 ? 4 : 2;
          ctx.fillRect(bx, 610, bw, 85);
          bx += bw + Math.random() * 6 + 2;
        }

        ctx.fillStyle = '#064E3B';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('PW-AI-994-FSC', 110, 730);
        ctx.fillStyle = '#64756D';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('OPTIMIZED BIO-CORRUGATED', 110, 760);
        ctx.fillStyle = '#166534';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('PARCEL INTEGRITY: 99.8%', 110, 785);

        ctx.strokeStyle = '#064E3B';
        ctx.lineWidth = 5;
        ctx.strokeRect(620, 600, 290, 190);
        ctx.fillStyle = '#064E3B';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('PACKWISE', 645, 660);
        ctx.fillStyle = '#166534';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('100% CIRCULAR CORRUGATED', 645, 705);
        ctx.fillStyle = '#D89B24';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('★ FSC CERTIFIED ★', 645, 745);

        const tex = new THREE.CanvasTexture(canvas);
        tex.anisotropy = 8;
        return tex;
      }

      const kraftTexture = generateRichKraftTexture();
      const kraftMaterial = new THREE.MeshStandardMaterial({
        map: kraftTexture,
        roughness: 0.88,
        metalness: 0.04
      });

      const kraftInterior = new THREE.MeshStandardMaterial({
        color: 0x9f7448,
        roughness: 0.94,
        metalness: 0.0
      });

      const flapEdgeLineMaterial = new THREE.LineBasicMaterial({
        color: 0x3b2314,
        linewidth: 2
      });

      function addDarkFlapEdges(flapMesh, geom) {
        const edgesGeom = new THREE.EdgesGeometry(geom, 15);
        const lineSegments = new THREE.LineSegments(edgesGeom, flapEdgeLineMaterial);
        flapMesh.add(lineSegments);
      }

      // 4. Box Group Assembly
      const boxGroup = new THREE.Group();
      scene.add(boxGroup);

      const bW = 2.65;
      const bH = 1.85;
      const bD = 2.10;
      const thick = 0.045;

      const bottomMesh = new THREE.Mesh(new THREE.BoxGeometry(bW, thick, bD), kraftInterior);
      bottomMesh.position.y = -bH / 2;
      bottomMesh.receiveShadow = true;
      boxGroup.add(bottomMesh);

      const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(bW, bH, thick), kraftMaterial);
      frontMesh.position.set(0, 0, bD / 2);
      frontMesh.castShadow = true;
      frontMesh.receiveShadow = true;
      boxGroup.add(frontMesh);

      const backMesh = new THREE.Mesh(new THREE.BoxGeometry(bW, bH, thick), kraftMaterial);
      backMesh.position.set(0, 0, -bD / 2);
      backMesh.castShadow = true;
      backMesh.receiveShadow = true;
      boxGroup.add(backMesh);

      const leftMesh = new THREE.Mesh(new THREE.BoxGeometry(thick, bH, bD), kraftMaterial);
      leftMesh.position.set(-bW / 2, 0, 0);
      leftMesh.castShadow = true;
      leftMesh.receiveShadow = true;
      boxGroup.add(leftMesh);

      const rightMesh = new THREE.Mesh(new THREE.BoxGeometry(thick, bH, bD), kraftMaterial);
      rightMesh.position.set(bW / 2, 0, 0);
      rightMesh.castShadow = true;
      rightMesh.receiveShadow = true;
      boxGroup.add(rightMesh);

      // 4 Articulated Top Flaps
      const flapFrontGeom = new THREE.BoxGeometry(bW, thick, bD / 2);
      const flapFrontPivot = new THREE.Group();
      flapFrontPivot.position.set(0, bH / 2, bD / 2);
      const flapFront = new THREE.Mesh(flapFrontGeom, kraftMaterial);
      flapFront.position.set(0, 0, -bD / 4);
      addDarkFlapEdges(flapFront, flapFrontGeom);
      flapFrontPivot.add(flapFront);
      boxGroup.add(flapFrontPivot);

      const flapBackGeom = new THREE.BoxGeometry(bW, thick, bD / 2);
      const flapBackPivot = new THREE.Group();
      flapBackPivot.position.set(0, bH / 2, -bD / 2);
      const flapBack = new THREE.Mesh(flapBackGeom, kraftMaterial);
      flapBack.position.set(0, 0, bD / 4);
      addDarkFlapEdges(flapBack, flapBackGeom);
      flapBackPivot.add(flapBack);
      boxGroup.add(flapBackPivot);

      const flapLeftGeom = new THREE.BoxGeometry(bW / 2, thick, bD);
      const flapLeftPivot = new THREE.Group();
      flapLeftPivot.position.set(-bW / 2, bH / 2, 0);
      const flapLeft = new THREE.Mesh(flapLeftGeom, kraftMaterial);
      flapLeft.position.set(bW / 4, 0, 0);
      addDarkFlapEdges(flapLeft, flapLeftGeom);
      flapLeftPivot.add(flapLeft);
      boxGroup.add(flapLeftPivot);

      const flapRightGeom = new THREE.BoxGeometry(bW / 2, thick, bD);
      const flapRightPivot = new THREE.Group();
      flapRightPivot.position.set(bW / 2, bH / 2, 0);
      const flapRight = new THREE.Mesh(flapRightGeom, kraftMaterial);
      flapRight.position.set(-bW / 4, 0, 0);
      addDarkFlapEdges(flapRight, flapRightGeom);
      flapRightPivot.add(flapRight);
      boxGroup.add(flapRightPivot);

      // 5. Rising Holographic AI Core
      const holoGroup = new THREE.Group();
      holoGroup.position.set(0, 0.4, 0);
      boxGroup.add(holoGroup);

      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x064E3B,
        emissive: 0x166534,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.9
      });
      const coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 1), coreMat);
      holoGroup.add(coreMesh);

      const goldCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xD89B24, transparent: true, opacity: 0.85 })
      );
      holoGroup.add(goldCore);

      const ringMat = new THREE.MeshBasicMaterial({ color: 0x064E3B, transparent: true, opacity: 0.75 });
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.02, 16, 64), ringMat);
      ring1.rotation.x = Math.PI / 3;
      holoGroup.add(ring1);

      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x166534, transparent: true, opacity: 0.65 });
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.02, 16, 64), ringMat2);
      ring2.rotation.y = Math.PI / 4;
      holoGroup.add(ring2);

      const pCount = 180;
      const pGeo = new THREE.BufferGeometry();
      const pCoords = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pCoords[i] = (Math.random() - 0.5) * 3.4;
        pCoords[i + 1] = Math.random() * 2.8 - 0.6;
        pCoords[i + 2] = (Math.random() - 0.5) * 3.4;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x064E3B,
        size: 0.05,
        transparent: true,
        opacity: 0.8
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // Soft ground shadow
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const sctx = shadowCanvas.getContext('2d');
      const grad = sctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(5, 59, 44, 0.35)');
      grad.addColorStop(0.5, 'rgba(5, 59, 44, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 256, 256);
      const shadowTex = new THREE.CanvasTexture(shadowCanvas);
      const groundShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(5.0, 4.4),
        new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.65 })
      );
      groundShadow.rotation.x = -Math.PI / 2;
      groundShadow.position.y = -1.35;
      scene.add(groundShadow);

      boxGroup.rotation.x = 0.32;
      boxGroup.rotation.y = -0.52;

      let mouseX = 0;
      let mouseY = 0;
      let targetRotX = 0.32;
      let targetRotY = -0.52;
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;

      const onMouseDown = (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const onMouseMove = (e) => {
        if (isDragging) {
          const deltaX = e.clientX - prevMouseX;
          const deltaY = e.clientY - prevMouseY;
          targetRotY += deltaX * 0.01;
          targetRotX += deltaY * 0.01;
          prevMouseX = e.clientX;
          prevMouseY = e.clientY;
        } else {
          const rect = container.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          mouseX = (e.clientX - cx) / (rect.width / 2);
          mouseY = (e.clientY - cy) / (rect.height / 2);
        }
      };

      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      let clock = new THREE.Clock();
      let openProgress = 0;

      const renderLoop = () => {
        animId = requestAnimationFrame(renderLoop);
        const elapsed = clock.getElapsedTime();

        if (elapsed > 0.6 && openProgress < 1.0) {
          openProgress += 0.019;
          if (openProgress > 1.0) openProgress = 1.0;
        }

        const ease = 1 - Math.pow(1 - openProgress, 3);
        const flapAngle = ease * (Math.PI * 0.66);

        flapFrontPivot.rotation.x = flapAngle;
        flapBackPivot.rotation.x = -flapAngle;
        flapLeftPivot.rotation.z = flapAngle;
        flapRightPivot.rotation.z = -flapAngle;

        holoGroup.position.y = 0.25 + ease * 0.75 + Math.sin(elapsed * 2.2) * 0.06;
        coreMesh.rotation.y = elapsed * 0.85;
        coreMesh.rotation.x = elapsed * 0.45;
        ring1.rotation.z = elapsed * 0.95;
        ring2.rotation.x = elapsed * -0.7;

        boxGroup.position.y = Math.sin(elapsed * 1.4) * 0.07;

        if (!isDragging) {
          targetRotY = -0.52 + (mouseX * 0.3);
          targetRotX = 0.32 + (mouseY * 0.18);
        }
        boxGroup.rotation.y += (targetRotY - boxGroup.rotation.y) * 0.06;
        boxGroup.rotation.x += (targetRotX - boxGroup.rotation.x) * 0.06;

        particles.rotation.y = elapsed * 0.12;

        renderer.render(scene, camera);
      };

      renderLoop();
    };

    // Load Three.js dynamically if window.THREE not present
    if (window.THREE) {
      initThreeBox(window.THREE);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        if (window.THREE) initThreeBox(window.THREE);
      };
      document.body.appendChild(script);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '32px' }}>
      
      {/* 2. Hero Section Layout */}
      <main className="relative z-10 flex-grow flex items-center py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Column: Copy, CTAs, Highlights & Live Ticker */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left space-y-5 lg:pr-2">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand-border shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-wide text-brand-primary flex items-center gap-1.5">
                  🌿 AI-Powered Packaging Intelligence
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl xl:text-[46px] font-extrabold text-brand-heading font-display tracking-tight leading-[1.12]">
                Don’t Choose the Greenest Package. Choose the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-[#15803d]">
                  Smartest One.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-body-dark font-normal leading-relaxed max-w-xl">
                PackWise uses AI and multi-objective optimization to find the best packaging solution by balancing cost, carbon footprint, product protection, circularity, and real-world sustainability.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  onClick={onStartOptimize}
                  className="relative group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-[0_10px_25px_rgba(6,78,59,0.3)] hover:shadow-[0_14px_30px_rgba(6,78,59,0.4)] hover:bg-[#043d2e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-display cursor-pointer"
                >
                  <span>Optimize My Packaging</span>
                  <ArrowRight className="w-4 h-4 font-bold transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={onOpenCopilot}
                  className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-warm-cream hover:bg-brand-light border border-brand-border hover:border-brand-primary text-brand-heading font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-light border border-brand-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 text-brand-primary fill-brand-primary" />
                  </div>
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Feature Badges with Emerald Checkmarks */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full border-t border-brand-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-brand-light border border-brand-border flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-primary font-bold" />
                  </div>
                  <span className="text-xs font-semibold text-body-dark tracking-tight">AI-Powered Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-brand-light border border-brand-border flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-primary font-bold" />
                  </div>
                  <span className="text-xs font-semibold text-body-dark tracking-tight">Damage-Aware Carbon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-brand-light border border-brand-border flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-primary font-bold" />
                  </div>
                  <span className="text-xs font-semibold text-body-dark tracking-tight">Region-Aware Recyclability</span>
                </div>
              </div>

              {/* Live Metrics Ticker Bar */}
              <div className="w-full mt-1 p-3.5 rounded-xl bg-warm-cream border border-brand-border flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-bold text-sm font-display">1.4M+</span>
                  <span className="text-body-muted text-[11px]">Boxes Optimized</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-brand-border"></div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-secondary font-bold text-sm font-display">32.8k</span>
                  <span className="text-body-muted text-[11px]">Tons CO₂ Prevented</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-brand-border"></div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-bold text-sm font-display">99.8%</span>
                  <span className="text-body-muted text-[11px]">Arrival Integrity</span>
                </div>
              </div>

            </div>

            {/* Right Column: Prominent, Significantly Larger 3D Canvas + Floating White Metric Cards */}
            <div className="lg:col-span-7 xl:col-span-7 relative w-full h-[480px] sm:h-[540px] lg:h-[580px] flex items-center justify-center">
              
              {/* Ambient glow strictly beneath 3D Box for dramatic elevation */}
              <div className="absolute w-[400px] h-[300px] rounded-full bg-gradient-to-tr from-[#CFE3C7]/70 to-[#EAF5E5]/90 blur-3xl pointer-events-none"></div>

              {/* Prominent Product Name Badge directly floating above 3D Box area */}
              <div className="absolute top-0 sm:top-1 z-30 flex flex-col items-center pointer-events-auto">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-warm-cream/95 border border-brand-border shadow-md backdrop-blur transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                  </span>
                  <span className="font-display font-bold text-xs tracking-wide text-brand-heading uppercase">
                    PackWise Eco-Cell™ 3D
                  </span>
                  <span className="w-1 h-3 border-r border-brand-border"></span>
                  <span className="font-mono text-[10px] font-bold text-brand-secondary tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary"></span>
                    Active Simulation
                  </span>
                </div>
                <span className="text-[11px] font-mono text-body-muted tracking-tight mt-1 font-medium drop-shadow-sm">
                  Autonomous Packaging Engine • v4.8 Real-time LCA
                </span>
              </div>

              {/* Three.js Canvas Container (Enlarged viewport) */}
              <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef}>
                {/* 3D Canvas initialized by Three.js */}
              </div>

              {/* Subtle 3D Control Hint Overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 border border-brand-border text-xs font-mono text-body-muted pointer-events-none flex items-center gap-2 shadow-md backdrop-blur z-20">
                <span className="text-brand-primary">📦</span>
                <span>Drag to rotate • Carton opens dynamically</span>
              </div>

              {/* FLOATING WHITE METRIC CARDS */}
              {/* Top Left: CO2 Reduction */}
              <div className="absolute top-10 left-0 sm:left-2 z-20 white-card white-card-interactive p-3.5 rounded-2xl max-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-heading flex items-center gap-1.5 font-display">
                    <span className="text-base">🌍</span> 32% Lower CO₂
                  </span>
                  <span className="text-[10px] font-mono font-bold text-brand-primary bg-brand-light border border-brand-border px-1.5 py-0.5 rounded">-4.8kg</span>
                </div>
                <div className="w-full bg-[#E5ECE3] rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full w-[68%]"></div>
                </div>
                <span className="text-[10px] text-body-muted mt-1.5 block leading-tight font-medium">Supply chain LCA benchmarked</span>
              </div>

              {/* Top Right: Material Waste */}
              <div className="absolute top-10 right-0 sm:right-2 z-20 white-card white-card-interactive p-3.5 rounded-2xl max-w-[205px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-brand-heading flex items-center gap-1.5 font-display">
                    <span className="text-base">📦</span> 28% Less Waste
                  </span>
                </div>
                <p className="text-xs text-body-dark font-semibold">Corrugated Flute & Cushion</p>
                <p className="text-[10px] text-brand-secondary font-mono font-bold mt-1">Optimized Void Space: 4.1%</p>
              </div>

              {/* Bottom Left: Protection Score */}
              <div className="absolute bottom-14 left-0 sm:left-4 z-20 white-card white-card-interactive p-3.5 rounded-2xl max-w-[200px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-brand-heading flex items-center gap-1.5 font-display">
                    <span className="text-base">🛡️</span> 94% Protection
                  </span>
                  <span className="text-brand-secondary text-xs">✓ Verified</span>
                </div>
                <div className="flex items-center gap-1.5 my-1.5">
                  <span className="h-2 w-6 rounded-full bg-brand-primary"></span>
                  <span className="h-2 w-6 rounded-full bg-brand-primary"></span>
                  <span className="h-2 w-6 rounded-full bg-brand-primary"></span>
                  <span className="h-2 w-6 rounded-full bg-brand-border"></span>
                </div>
                <span className="text-[10px] text-body-muted block font-medium">Multi-axial drop & shock verified</span>
              </div>

              {/* Bottom Right: Circularity Score */}
              <div className="absolute bottom-12 right-0 sm:right-4 z-20 white-card white-card-interactive p-3.5 rounded-2xl max-w-[210px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-brand-light border border-brand-border flex items-center justify-center text-brand-primary text-xs font-bold">
                    ♻️
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-heading leading-tight font-display">High Circularity</p>
                    <p className="text-[10px] font-mono font-bold text-brand-secondary">99.4% Recycled Kraft</p>
                  </div>
                </div>
                <span className="text-[10px] text-body-muted block border-t border-brand-border pt-1 font-medium">
                  Water-based ink • Curbside pulpable
                </span>
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* 3. Bottom Animation Section - Bullet-Train Eco Semi-Trailer Transit */}
      <section className="relative w-full z-20 border-t border-brand-border bg-warm-cream/95 backdrop-blur-md overflow-hidden py-3 rounded-2xl shadow-inner mt-4">
        <div className="relative w-full h-18 overflow-hidden flex items-center">
          {/* Highway Road Grid Lines */}
          <div className="absolute inset-x-0 bottom-3 h-[3px] bg-gradient-to-r from-transparent via-brand-border to-transparent"></div>
          <div className="absolute inset-x-0 bottom-3 h-px border-b border-dashed border-brand-secondary/40"></div>

          {/* Moving Elongated Eco Semi-Trailer Truck */}
          <div className="absolute left-0 bottom-3 animate-drive-semi flex items-end pointer-events-none select-none">
            <div className="relative flex items-end">
              
              {/* Lush, natural fluttering leaf wake trailing behind the trailer */}
              <div className="absolute -left-20 bottom-2 w-32 h-18 pointer-events-none overflow-visible">
                <svg className="swirl-leaf-1 absolute left-14 top-5 w-5 h-5 text-brand-primary drop-shadow-[0_2px_4px_rgba(6,78,59,0.25)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                  <path d="M8 20c3.5-3.5 6-7 9-12" fill="none" stroke="#FFF9E6" strokeWidth="0.75"></path>
                </svg>
                <svg className="swirl-leaf-2 absolute left-10 top-1 w-4.5 h-4.5 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.2 9.5L10 19c-3-1-5.1-3.7-5.1-7 0-4 3.2-7.2 7.1-7.2 3.3 0 6.2 2.2 7.1 5.3l2.2-.6C20.1 5.1 16.4 2 12 2z"></path>
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                </svg>
                <svg className="swirl-leaf-3 absolute left-6 top-6 w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                </svg>
                <svg className="swirl-leaf-4 absolute left-12 -top-2 w-3.5 h-3.5 text-[#34d399]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3C10 3 4 9 4 15c0 3.3 2.7 6 6 6 6 0 12-6 12-17 0-.3-.3-.7-.7-.7l-.3.7z"></path>
                </svg>
                <svg className="swirl-leaf-5 absolute left-2 top-3 w-4.5 h-4.5 text-brand-heading" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                  <path d="M8 20c3.5-3.5 6-7 9-12" fill="none" stroke="#EAF5E5" strokeWidth="0.6"></path>
                </svg>
                <svg className="swirl-leaf-6 absolute -left-4 top-2 w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                </svg>
                <div className="swirl-leaf-2 absolute left-8 top-7 w-2 h-2 rounded-full bg-[#34d399]/80 shadow-[0_0_6px_#10b981]"></div>
                <div className="swirl-leaf-4 absolute left-3 top-1 w-1.5 h-1.5 rounded-full bg-brand-secondary/80 shadow-[0_0_5px_#166534]"></div>
              </div>

              {/* Modern Bullet-Train Curvy Semi-Trailer */}
              <svg className="w-[335px] h-[68px] drop-shadow-[0_8px_16px_rgba(6,78,59,0.14)]" fill="none" viewBox="0 0 355 70" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#FFFFFF" height="42" rx="5" stroke="#CFE3C7" strokeWidth="1.5" width="220" x="8" y="10"></rect>
                <line stroke="#EAF5E5" strokeWidth="1" x1="18" x2="18" y1="10" y2="52"></line>
                <line stroke="#EAF5E5" strokeWidth="1" x1="80" x2="80" y1="10" y2="52"></line>
                <line stroke="#EAF5E5" strokeWidth="1" x1="140" x2="140" y1="10" y2="52"></line>
                <line stroke="#EAF5E5" strokeWidth="1" x1="200" x2="200" y1="10" y2="52"></line>
                
                <rect fill="#EAF5E5" height="24" rx="4" stroke="#CFE3C7" strokeWidth="1" width="180" x="22" y="18"></rect>
                <path d="M34 26 C38 23 44 24 45 28 C45 32 39 35 34 35 C34 32 33 28 34 26 Z" fill="#166534"></path>
                <text fill="#053B2C" fontFamily="'Outfit', sans-serif" fontSize="11" fontWeight="bold" letterSpacing="0.08em" x="49" y="34">PACKWISE</text>
                <text fill="#166534" fontFamily="monospace" fontSize="8.5" fontWeight="bold" letterSpacing="0.1em" x="122" y="34">ECO-FREIGHT</text>
                <rect fill="#064E3B" height="14" rx="2" width="14" x="182" y="23"></rect>
                <path d="M185 30 L188 33 L193 27" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                
                <path d="M12 48 H216 V53 H12 Z" fill="#EAF5E5" stroke="#CFE3C7" strokeWidth="0.8"></path>
                <rect fill="#064E3B" height="2.5" rx="1.2" width="36" x="100" y="49.5"></rect>
                <circle cx="94" cy="50.8" fill="#166534" r="1.5"></circle>
                
                <rect fill="#053B2C" height="8" rx="1" width="12" x="226" y="40"></rect>
                <line stroke="#D89B24" strokeWidth="1.5" x1="227" x2="236" y1="44" y2="44"></line>
                
                <path d="M234 45 H252 V53 H234 Z" fill="#053B2C"></path>
                <path d="M234 14 C256 12 284 14 306 23 C326 31 345 42 349 48 C352 52 348 55 340 55 H234 Z" fill="#064E3B" stroke="#053B2C" strokeWidth="1.5"></path>
                <path d="M234 14 C254 13 280 15 302 23 C276 18 250 17 234 18 Z" fill="#166534" opacity="0.85"></path>
                
                <path d="M276 22 C295 24 316 32 334 43 C335 45 333 46 327 46 H276 C273 38 273 28 276 22 Z" fill="url(#windshieldGrad)" stroke="#CFE3C7" strokeWidth="1"></path>
                <path d="M284 25 C298 28 312 34 322 41" stroke="#FFFFFF" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="1.2"></path>
                <path d="M250 25 H270 C269 34 269 41 270 45 H250 C248 38 248 31 250 25 Z" fill="#EAF5E5" fillOpacity="0.9" stroke="#CFE3C7" strokeWidth="0.8"></path>
                <path d="M246 36 C248 36 248 42 246 44" stroke="#053B2C" strokeLinecap="round" strokeWidth="1.5"></path>
                
                <path d="M336 50 C349 50 351 53 346 56 H316 C322 53 328 50 336 50 Z" fill="#053B2C"></path>
                <path d="M334 47 C342 49 347 51 344 53 C338 52 334 50 334 47 Z" fill="#D89B24"></path>
                <polygon fill="url(#headlightBeam)" opacity="0.45" points="345,50 376,43 380,62 345,55"></polygon>
                
                <g>
                  <circle cx="38" cy="54" fill="#053B2C" r="9.5"></circle>
                  <circle cx="38" cy="54" fill="#CFE3C7" r="5.5"></circle>
                  <circle cx="38" cy="54" fill="#064E3B" r="2.5"></circle>
                  <circle cx="62" cy="54" fill="#053B2C" r="9.5"></circle>
                  <circle cx="62" cy="54" fill="#CFE3C7" r="5.5"></circle>
                  <circle cx="62" cy="54" fill="#064E3B" r="2.5"></circle>
                  <circle cx="86" cy="54" fill="#053B2C" r="9.5"></circle>
                  <circle cx="86" cy="54" fill="#CFE3C7" r="5.5"></circle>
                  <circle cx="86" cy="54" fill="#064E3B" r="2.5"></circle>
                </g>
                <g>
                  <circle cx="254" cy="54" fill="#053B2C" r="9.5"></circle>
                  <circle cx="254" cy="54" fill="#CFE3C7" r="5.5"></circle>
                  <circle cx="254" cy="54" fill="#064E3B" r="2.5"></circle>
                  <circle cx="310" cy="54" fill="#053B2C" r="9.5"></circle>
                  <circle cx="310" cy="54" fill="#CFE3C7" r="5.5"></circle>
                  <circle cx="310" cy="54" fill="#064E3B" r="2.5"></circle>
                </g>
                <defs>
                  <linearGradient id="windshieldGrad" x1="276" x2="334" y1="22" y2="46" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#EAF5E5"></stop>
                    <stop offset="70%" stopColor="#CFE3C7"></stop>
                    <stop offset="100%" stopColor="#A9CDA0"></stop>
                  </linearGradient>
                  <linearGradient id="headlightBeam" x1="344" x2="378" y1="51" y2="51" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#D89B24" stopOpacity="0.85"></stop>
                    <stop offset="100%" stopColor="#D89B24" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>

            </div>
          </div>
        </div>

        {/* Fleet Status Caption */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-body-muted gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
            <span className="text-brand-heading font-bold">Zero-Emission Closed-Loop Semi Freight Network</span>
            <span className="text-brand-border">•</span>
            <span>Long-Haul Connected Fleet Active</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-brand-primary flex items-center gap-1">
              <span>🌿</span> 0g Net CO₂/ton-km
            </span>
            <span className="text-body-muted">Dynamic Aerodynamic Routing Active</span>
          </div>
        </div>

      </section>

    </div>
  );
}
