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

      const width = container.clientWidth || 500;
      const height = container.clientHeight || 420;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 1.6, 4.8);

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

      const bW = 2.4;
      const bH = 1.65;
      const bD = 1.9;
      const thick = 0.04;

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
      holoGroup.position.set(0, 0.35, 0);
      boxGroup.add(holoGroup);

      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x064E3B,
        emissive: 0x166534,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.9
      });
      const coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), coreMat);
      holoGroup.add(coreMesh);

      const goldCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xD89B24, transparent: true, opacity: 0.85 })
      );
      holoGroup.add(goldCore);

      const ringMat = new THREE.MeshBasicMaterial({ color: 0x064E3B, transparent: true, opacity: 0.75 });
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.02, 16, 64), ringMat);
      ring1.rotation.x = Math.PI / 3;
      holoGroup.add(ring1);

      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x166534, transparent: true, opacity: 0.65 });
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.02, 16, 64), ringMat2);
      ring2.rotation.y = Math.PI / 4;
      holoGroup.add(ring2);

      const pCount = 150;
      const pGeo = new THREE.BufferGeometry();
      const pCoords = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pCoords[i] = (Math.random() - 0.5) * 3.0;
        pCoords[i + 1] = Math.random() * 2.4 - 0.5;
        pCoords[i + 2] = (Math.random() - 0.5) * 3.0;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x064E3B,
        size: 0.045,
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
        new THREE.PlaneGeometry(4.5, 3.8),
        new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.65 })
      );
      groundShadow.rotation.x = -Math.PI / 2;
      groundShadow.position.y = -1.2;
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

        holoGroup.position.y = 0.2 + ease * 0.65 + Math.sin(elapsed * 2.2) * 0.05;
        coreMesh.rotation.y = elapsed * 0.85;
        coreMesh.rotation.x = elapsed * 0.45;
        ring1.rotation.z = elapsed * 0.95;
        ring2.rotation.x = elapsed * -0.7;

        boxGroup.position.y = Math.sin(elapsed * 1.4) * 0.06;

        if (!isDragging) {
          targetRotY = -0.52 + (mouseX * 0.25);
          targetRotX = 0.32 + (mouseY * 0.15);
        }
        boxGroup.rotation.y += (targetRotY - boxGroup.rotation.y) * 0.06;
        boxGroup.rotation.x += (targetRotX - boxGroup.rotation.x) * 0.06;

        particles.rotation.y = elapsed * 0.12;

        renderer.render(scene, camera);
      };

      renderLoop();
    };

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
    <div style={{
      position: 'relative',
      width: '100%',
      maxHeight: '750px',
      overflow: 'hidden',
      borderRadius: '24px',
      border: '1px solid #CFE3C7',
      background: 'radial-gradient(ellipse at 70% 35%, #FFFDF4 0%, #FFF9E6 100%)',
      padding: '24px 24px 16px 24px',
      marginBottom: '28px',
      boxShadow: '0 16px 40px -12px rgba(6, 78, 59, 0.08)'
    }}>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 tech-grid-light pointer-events-none opacity-60"></div>
      <div className="absolute inset-0 glow-warm pointer-events-none"></div>

      {/* Main 2-Column Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT COLUMN: Copy, CTAs, Highlights & Ticker */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-4">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light border border-brand-border shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wide text-brand-primary">
              🌿 AI-Powered Packaging Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold text-brand-heading font-display tracking-tight leading-[1.12]">
            Don’t Choose the Greenest Package. Choose the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-[#15803d]">
              Smartest One.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm text-body-dark font-normal leading-relaxed max-w-xl">
            PackWise uses AI and multi-objective optimization to find the best packaging solution by balancing cost, carbon footprint, product protection, circularity, and real-world sustainability.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
            <button
              onClick={onStartOptimize}
              className="relative group flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-[0_10px_25px_rgba(6,78,59,0.3)] hover:shadow-[0_14px_30px_rgba(6,78,59,0.4)] hover:bg-[#043d2e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-display cursor-pointer"
            >
              <span>Optimize My Packaging</span>
              <ArrowRight className="w-4 h-4 font-bold transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onOpenCopilot}
              className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-cream hover:bg-brand-light border border-brand-border hover:border-brand-primary text-brand-heading font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-brand-light border border-brand-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-2.5 h-2.5 text-brand-primary fill-brand-primary" />
              </div>
              <span>See How It Works</span>
            </button>
          </div>

          {/* Feature Badges */}
          <div className="pt-3 grid grid-cols-3 gap-2 w-full border-t border-brand-border text-[11px] font-semibold text-body-dark">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-brand-light border border-brand-border flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-brand-primary font-bold" />
              </div>
              <span>AI Optimization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-brand-light border border-brand-border flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-brand-primary font-bold" />
              </div>
              <span>Damage Carbon</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-brand-light border border-brand-border flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-brand-primary font-bold" />
              </div>
              <span>Recyclability</span>
            </div>
          </div>

          {/* Live Metrics Ticker Bar */}
          <div className="w-full mt-1 p-3 rounded-xl bg-warm-cream border border-brand-border flex items-center justify-between font-mono text-xs shadow-sm">
            <div>
              <span className="text-brand-primary font-bold font-display text-sm">1.4M+</span>
              <span className="text-body-muted text-[10px] ml-1">Optimized</span>
            </div>
            <div className="w-px h-3.5 bg-brand-border"></div>
            <div>
              <span className="text-brand-secondary font-bold font-display text-sm">32.8k</span>
              <span className="text-body-muted text-[10px] ml-1">Tons CO₂</span>
            </div>
            <div className="w-px h-3.5 bg-brand-border"></div>
            <div>
              <span className="text-brand-primary font-bold font-display text-sm">99.8%</span>
              <span className="text-body-muted text-[10px] ml-1">Integrity</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Compact 3D Canvas Viewport + Overlay Cards */}
        <div className="lg:col-span-6 relative w-full h-[400px] flex items-center justify-center overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute w-[300px] h-[220px] rounded-full bg-gradient-to-tr from-[#CFE3C7]/60 to-[#EAF5E5]/80 blur-2xl pointer-events-none"></div>

          {/* Product Badge */}
          <div className="absolute top-1 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-warm-cream/95 border border-brand-border shadow-sm backdrop-blur text-[10px] font-mono text-brand-heading font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></span>
            <span>PackWise Eco-Cell™ 3D • Active Simulation</span>
          </div>

          {/* Three.js Canvas Container (Bounded Height) */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} style={{ width: '100%', height: '400px' }}>
            {/* Canvas injected here */}
          </div>

          {/* Subtle Hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 border border-brand-border text-[10px] font-mono text-body-muted pointer-events-none flex items-center gap-1.5 shadow-sm backdrop-blur z-20">
            <span>📦 Drag to rotate</span>
          </div>

          {/* FLOATING WHITE METRIC CARDS (Overlay Positions) */}
          <div className="absolute top-6 left-1 z-20 white-card white-card-interactive p-2.5 rounded-xl max-w-[170px] shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-brand-heading font-display">🌍 32% Lower CO₂</span>
              <span className="text-[9px] font-mono font-bold text-brand-primary bg-brand-light border border-brand-border px-1 rounded">-4.8kg</span>
            </div>
            <div className="w-full bg-[#E5ECE3] rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary h-1.5 rounded-full w-[68%]"></div>
            </div>
          </div>

          <div className="absolute top-6 right-1 z-20 white-card white-card-interactive p-2.5 rounded-xl max-w-[170px] shadow-sm">
            <span className="text-[11px] font-bold text-brand-heading block font-display">📦 28% Less Waste</span>
            <span className="text-[9px] text-brand-secondary font-mono font-bold">Void Space: 4.1%</span>
          </div>

          <div className="absolute bottom-10 left-1 z-20 white-card white-card-interactive p-2.5 rounded-xl max-w-[170px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-brand-heading font-display">🛡️ 94% Protection</span>
              <span className="text-brand-secondary text-[10px]">✓</span>
            </div>
            <span className="text-[9px] text-body-muted block font-medium">ISTA 3A / ASTM Drop</span>
          </div>

          <div className="absolute bottom-10 right-1 z-20 white-card white-card-interactive p-2.5 rounded-xl max-w-[170px] shadow-sm">
            <span className="text-[11px] font-bold text-brand-heading block font-display">♻️ High Circularity</span>
            <span className="text-[9px] font-mono font-bold text-brand-secondary">99.4% Recycled Kraft</span>
          </div>

        </div>

      </div>

      {/* BOTTOM TRANSIT SECTION - Bounded Moving Semi-Trailer */}
      <div className="relative w-full z-20 border-t border-brand-border bg-warm-cream/95 overflow-hidden py-2 rounded-xl shadow-inner mt-2">
        
        {/* Highway Road Grid Line */}
        <div className="relative w-full h-10 overflow-hidden flex items-center">
          <div className="absolute inset-x-0 bottom-2 h-[2px] bg-gradient-to-r from-transparent via-brand-border to-transparent"></div>
          <div className="absolute inset-x-0 bottom-2 h-px border-b border-dashed border-brand-secondary/40"></div>

          {/* Moving Semi Truck with Leaf Wake */}
          <div className="absolute left-0 bottom-1 animate-drive-semi flex items-end pointer-events-none select-none">
            <div className="relative flex items-end">
              
              {/* Fluttering leaf wake trailing behind truck */}
              <div className="absolute -left-16 bottom-1 w-28 h-12 pointer-events-none overflow-visible">
                <svg className="swirl-leaf-1 absolute left-12 top-3 w-4 h-4 text-brand-primary drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                </svg>
                <svg className="swirl-leaf-2 absolute left-8 top-0 w-3.5 h-3.5 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.2 9.5L10 19c-3-1-5.1-3.7-5.1-7 0-4 3.2-7.2 7.1-7.2 3.3 0 6.2 2.2 7.1 5.3l2.2-.6C20.1 5.1 16.4 2 12 2z"></path>
                </svg>
                <svg className="swirl-leaf-3 absolute left-4 top-4 w-3.5 h-3.5 text-[#10b981]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5z"></path>
                </svg>
                <svg className="swirl-leaf-4 absolute left-10 -top-2 w-3 h-3 text-[#34d399]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3C10 3 4 9 4 15c0 3.3 2.7 6 6 6 6 0 12-6 12-17 0-.3-.3-.7-.7-.7l-.3.7z"></path>
                </svg>
              </div>

              {/* Streamlined Bullet-Train Semi-Trailer */}
              <svg className="w-[280px] h-[52px] drop-shadow-sm" fill="none" viewBox="0 0 355 70" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#FFFFFF" height="42" rx="5" stroke="#CFE3C7" strokeWidth="1.5" width="220" x="8" y="10"></rect>
                <line stroke="#EAF5E5" strokeWidth="1" x1="18" x2="18" y1="10" y2="52"></line>
                <line stroke="#EAF5E5" strokeWidth="1" x1="80" x2="80" y1="10" y2="52"></line>
                <line stroke="#EAF5E5" strokeWidth="1" x1="140" x2="140" y1="10" y2="52"></line>
                <line stroke="#EAF5E5" strokeWidth="1" x1="200" x2="200" y1="10" y2="52"></line>
                
                <rect fill="#EAF5E5" height="24" rx="4" stroke="#CFE3C7" strokeWidth="1" width="180" x="22" y="18"></rect>
                <path d="M34 26 C38 23 44 24 45 28 C45 32 39 35 34 35 C34 32 33 28 34 26 Z" fill="#166534"></path>
                <text fill="#053B2C" fontFamily="'Outfit', sans-serif" fontSize="11" fontWeight="bold" letterSpacing="0.08em" x="49" y="34">PACKWISE</text>
                <text fill="#166534" fontFamily="monospace" fontSize="8.5" fontWeight="bold" letterSpacing="0.1em" x="122" y="34">FSC-MIX-FSC ✓</text>
                <rect fill="#064E3B" height="14" rx="2" width="14" x="182" y="23"></rect>
                <path d="M185 30 L188 33 L193 27" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                
                <path d="M12 48 H216 V53 H12 Z" fill="#EAF5E5" stroke="#CFE3C7" strokeWidth="0.8"></path>
                
                <rect fill="#053B2C" height="8" rx="1" width="12" x="226" y="40"></rect>
                <path d="M234 45 H252 V53 H234 Z" fill="#053B2C"></path>
                <path d="M234 14 C256 12 284 14 306 23 C326 31 345 42 349 48 C352 52 348 55 340 55 H234 Z" fill="#064E3B" stroke="#053B2C" strokeWidth="1.5"></path>
                <path d="M234 14 C254 13 280 15 302 23 C276 18 250 17 234 18 Z" fill="#166534" opacity="0.85"></path>
                
                <path d="M276 22 C295 24 316 32 334 43 C335 45 333 46 327 46 H276 C273 38 273 28 276 22 Z" fill="#EAF5E5" stroke="#CFE3C7" strokeWidth="1"></path>
                <path d="M336 50 C349 50 351 53 346 56 H316 C322 53 328 50 336 50 Z" fill="#053B2C"></path>
                <path d="M334 47 C342 49 347 51 344 53 C338 52 334 50 334 47 Z" fill="#D89B24"></path>
                
                <g>
                  <circle cx="38" cy="54" fill="#053B2C" r="8"></circle>
                  <circle cx="62" cy="54" fill="#053B2C" r="8"></circle>
                  <circle cx="86" cy="54" fill="#053B2C" r="8"></circle>
                </g>
                <g>
                  <circle cx="254" cy="54" fill="#053B2C" r="8"></circle>
                  <circle cx="310" cy="54" fill="#053B2C" r="8"></circle>
                </g>
              </svg>

            </div>
          </div>
        </div>

        {/* Fleet Status Caption */}
        <div className="max-w-7xl mx-auto px-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-body-muted gap-2 pt-1 border-t border-brand-border/40">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
            <span className="text-brand-heading font-bold">Zero-Emission Closed-Loop Semi Freight Network</span>
            <span className="text-brand-border">•</span>
            <span>Long-Haul Connected Fleet Active</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <span className="text-brand-primary flex items-center gap-1">
              🌿 0g Net CO₂/ton-km
            </span>
            <span className="text-body-muted">Dynamic Aerodynamic Routing Active</span>
          </div>
        </div>

      </div>

    </div>
  );
}
