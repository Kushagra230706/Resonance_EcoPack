import React, { useState, useEffect, useRef } from 'react';
import { Box, Layers, Eye, Download, QrCode, Sparkles, RefreshCw, RotateCcw, ShieldCheck, Sliders } from 'lucide-react';

export default function ThreeDBoxPreview({ dieline, optionName }) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'dieline'
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);
  const [zoom, setZoom] = useState(1.0);
  const [isOpenLid, setIsOpenLid] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [boxMaterial, setBoxMaterial] = useState('kraft'); // 'kraft', 'recycled', 'white', 'mycelium'

  const animRef = useRef(null);

  useEffect(() => {
    if (isAutoRotate) {
      const animate = () => {
        setRotY(prev => (prev + 0.5) % 360);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAutoRotate]);

  if (!dieline) return null;

  const { outer_length_cm, outer_width_cm, outer_height_cm, cushion_thickness_cm } = dieline;

  const lengthCm = parseFloat(outer_length_cm) || 15.0;
  const widthCm = parseFloat(outer_width_cm) || 11.0;
  const heightCm = parseFloat(outer_height_cm) || 9.0;

  // Larger Box Dimensions for Prominent Centered Display
  const scale = 14.0;
  const boxW = Math.min(320, Math.max(220, lengthCm * scale));
  const boxH = Math.min(220, Math.max(140, heightCm * scale));
  const boxD = Math.min(260, Math.max(160, widthCm * scale));

  const resetView = () => {
    setRotX(-20);
    setRotY(35);
    setZoom(1.0);
    setIsAutoRotate(false);
    setIsOpenLid(false);
  };

  // 100% Opaque Material Palettes
  const MATERIAL_THEMES = {
    kraft: {
      name: "Natural Kraft Cardboard",
      bgFace: "#C68B59",
      border: "#7C4A21",
      text: "#241208",
      lidBg: "#D49864",
      texture: "repeating-linear-gradient(45deg, #BE8351 0px, #BE8351 2px, #C68B59 2px, #C68B59 4px)"
    },
    recycled: {
      name: "80% Recycled Corrugated",
      bgFace: "#7A8972",
      border: "#3B4733",
      text: "#121A0E",
      lidBg: "#87967F",
      texture: "repeating-linear-gradient(90deg, #718069 0px, #718069 3px, #7A8972 3px, #7A8972 6px)"
    },
    white: {
      name: "White Coated Eco-Board",
      bgFace: "#ECEFF1",
      border: "#90A4AE",
      text: "#0F172A",
      lidBg: "#F5F7F8",
      texture: "none"
    },
    mycelium: {
      name: "Mushroom Mycelium Bio-Foam",
      bgFace: "#E3DCCB",
      border: "#998E77",
      text: "#332A1C",
      lidBg: "#EBE5D7",
      texture: "radial-gradient(circle, #D4CBB8 1px, transparent 1px)"
    }
  };

  const theme = MATERIAL_THEMES[boxMaterial] || MATERIAL_THEMES.kraft;

  return (
    <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-soft)', marginBottom: '24px', background: 'var(--bg-card)' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--brand-light)', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box size={22} color="var(--brand-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
              📦 Interactive 3D Package Preview & CAD Blueprint
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Drag to orbit 3D box | Open lid to view inner cushioning | 100% Opaque rendering.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
          <button 
            onClick={() => setViewMode('3d')} 
            className={viewMode === '3d' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: '8px', fontWeight: '700' }}
          >
            <Eye size={14} /> 3D Package View
          </button>
          <button 
            onClick={() => setViewMode('dieline')} 
            className={viewMode === 'dieline' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: '8px', fontWeight: '700' }}
          >
            <Layers size={14} /> 2D CAD Dieline
          </button>
        </div>
      </div>

      {viewMode === '3d' ? (
        /* 3D Box Main Stage Layout */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 3D Interactive Canvas Stage - Centered Large Container */}
          <div style={{ position: 'relative', width: '100%' }}>
            
            {/* Top Control Bar Overlay */}
            <div style={{ 
              position: 'absolute', 
              top: '14px', 
              left: '14px', 
              right: '14px', 
              zIndex: 30, 
              display: 'flex', 
              justify: 'space-between', 
              alignItems: 'center', 
              gap: '8px', 
              pointerEvents: 'none' 
            }}>
              <div style={{ pointerEvents: 'auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', border: '1px solid var(--border-soft)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                🖐️ Drag mouse to orbit | Scroll to zoom
              </div>

              <div style={{ pointerEvents: 'auto', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsOpenLid(!isOpenLid)}
                  style={{
                    background: isOpenLid ? 'var(--brand-primary)' : '#FFFFFF',
                    color: isOpenLid ? '#FFFFFF' : 'var(--text-heading)',
                    border: '1px solid var(--border-soft)',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Box size={14} /> {isOpenLid ? '📦 Close Box Lid' : '📂 Open Box Lid'}
                </button>

                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  style={{
                    background: isAutoRotate ? 'var(--brand-primary)' : '#FFFFFF',
                    color: isAutoRotate ? '#FFFFFF' : 'var(--text-heading)',
                    border: '1px solid var(--border-soft)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <RefreshCw size={13} className={isAutoRotate ? "animate-spin" : ""} /> {isAutoRotate ? 'Spinning' : 'Auto-Spin'}
                </button>

                <button
                  onClick={resetView}
                  title="Reset View Angle"
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-soft)',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Interactive Stage - Strictly Centered Perspective */}
            <div 
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                const startX = e.clientX;
                const startY = e.clientY;
                const origX = rotX;
                const origY = rotY;

                const onMouseMove = (moveEvent) => {
                  const dx = moveEvent.clientX - startX;
                  const dy = moveEvent.clientY - startY;
                  setRotY(origY + dx * 0.6);
                  setRotX(Math.max(-85, Math.min(85, origX - dy * 0.6)));
                };

                const onMouseUp = () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  window.removeEventListener('mouseup', onMouseUp);
                };

                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
              }}
              onWheel={(e) => {
                e.preventDefault();
                setZoom(prev => Math.max(0.6, Math.min(1.8, prev - e.deltaY * 0.0015)));
              }}
              style={{ 
                height: '460px', 
                width: '100%',
                background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #F1F5F9 100%)', 
                borderRadius: '16px', 
                border: '1px solid var(--border-soft)',
                perspective: '1200px',
                perspectiveOrigin: '50% 50%',
                cursor: 'grab',
                userSelect: 'none',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Floating PACKWISE Capsule Badge Above Box */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 30,
                pointerEvents: 'none'
              }}>
                <div style={{
                  background: '#FFFDF5',
                  border: '2px solid #C4E2C7',
                  borderRadius: '9999px',
                  padding: '10px 38px',
                  boxShadow: '0 10px 28px -4px rgba(6, 78, 59, 0.14)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)'
                }}>
                  <span style={{
                    fontSize: '1.75rem',
                    fontWeight: '900',
                    color: '#053B2C',
                    letterSpacing: '4.5px',
                    fontFamily: 'Outfit, sans-serif',
                    textTransform: 'uppercase',
                    lineHeight: '1'
                  }}>
                    PACKWISE
                  </span>
                </div>
              </div>
              {/* Ground Shadow Base Projection (Centered) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${boxW * 1.3}px`,
                height: `${boxD * 1.3}px`,
                margin: `-${(boxD * 1.3) / 2}px 0 0 -${(boxW * 1.3) / 2}px`,
                background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0) 70%)',
                transform: `rotateX(90deg) translateZ(-${boxH / 2 + 45}px)`,
                borderRadius: '50%',
                filter: 'blur(12px)',
                pointerEvents: 'none'
              }}></div>

              {/* 3D Box Mesh Container (Absolute 50% / 50% Center Alignment) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${boxW}px`,
                height: `${boxH}px`,
                margin: `-${boxH / 2}px 0 0 -${boxW / 2}px`,
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 50% 0px',
                transform: `scale3d(${zoom}, ${zoom}, ${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                transition: isAutoRotate ? 'none' : 'transform 0.08s ease-out'
              }}>

                {/* 1. FRONT FACE (Clean Opaque Design) */}
                <div style={{
                  position: 'absolute',
                  width: `${boxW}px`,
                  height: `${boxH}px`,
                  backgroundColor: theme.bgFace,
                  backgroundImage: theme.texture,
                  border: `3px solid ${theme.border}`,
                  color: theme.text,
                  transform: `translateZ(${boxD / 2}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: 1,
                  boxSizing: 'border-box',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: 'inset 0 0 16px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: '900', textTransform: 'uppercase', color: '#064E3B', background: '#D1FAE5', padding: '3px 8px', borderRadius: '5px' }}>
                      🌿 PACKWISE
                    </div>
                    <span style={{ fontSize: '0.68rem', background: '#0F172A', color: '#FFFFFF', padding: '3px 8px', borderRadius: '5px', fontWeight: '800' }}>
                      ISTA 3A
                    </span>
                  </div>

                  <div style={{ textAlign: 'center', margin: 'auto 0' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: theme.text, letterSpacing: '0.06em' }}>
                      PACKWISE AI
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.85, marginTop: '2px' }}>
                      SUSTAINABLE DESIGN
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem', fontWeight: '800' }}>
                    <span>{lengthCm} × {widthCm} × {heightCm} cm</span>
                    <span style={{ color: '#064E3B' }}>Recyclable ♻️</span>
                  </div>
                </div>

                {/* 2. BACK FACE */}
                <div style={{
                  position: 'absolute',
                  width: `${boxW}px`,
                  height: `${boxH}px`,
                  backgroundColor: theme.bgFace,
                  backgroundImage: theme.texture,
                  border: `3px solid ${theme.border}`,
                  color: theme.text,
                  transform: `rotateY(180deg) translateZ(${boxD / 2}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: 1,
                  boxSizing: 'border-box',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'center',
                  alignItems: 'center',
                  boxShadow: 'inset 0 0 16px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '900', textAlign: 'center', color: theme.text }}>
                    PACKWISE AI PACKAGING
                  </div>
                  <div style={{ fontSize: '0.7rem', marginTop: '6px', opacity: 0.85, fontWeight: '700' }}>
                    100% Recyclable Packaging
                  </div>
                </div>

                {/* 3. LEFT FACE */}
                <div style={{
                  position: 'absolute',
                  width: `${boxD}px`,
                  height: `${boxH}px`,
                  backgroundColor: theme.bgFace,
                  backgroundImage: theme.texture,
                  border: `3px solid ${theme.border}`,
                  color: theme.text,
                  left: `${(boxW - boxD) / 2}px`,
                  transform: `rotateY(-90deg) translateZ(${boxW / 2}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: 1,
                  boxSizing: 'border-box',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: 'inset 0 0 16px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '900', color: theme.text, letterSpacing: '0.04em' }}>
                    ⚠️ FRAGILE
                  </div>
                  <div style={{ fontSize: '0.68rem', fontWeight: '800', opacity: 0.85 }}>
                    HANDLE WITH CARE
                  </div>
                </div>

                {/* 4. RIGHT FACE (with Smart QR Label) */}
                <div style={{
                  position: 'absolute',
                  width: `${boxD}px`,
                  height: `${boxH}px`,
                  backgroundColor: theme.bgFace,
                  backgroundImage: theme.texture,
                  border: `3px solid ${theme.border}`,
                  color: theme.text,
                  left: `${(boxW - boxD) / 2}px`,
                  transform: `rotateY(90deg) translateZ(${boxW / 2}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: 1,
                  boxSizing: 'border-box',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '6px',
                  boxShadow: 'inset 0 0 16px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <QrCode size={36} color="#0F172A" />
                    <span style={{ fontSize: '0.55rem', fontWeight: '900', color: '#0F172A', marginTop: '3px' }}>SCAN DISPOSAL</span>
                  </div>
                </div>

                {/* 5. BOTTOM FACE */}
                <div style={{
                  position: 'absolute',
                  width: `${boxW}px`,
                  height: `${boxD}px`,
                  backgroundColor: theme.bgFace,
                  backgroundImage: theme.texture,
                  border: `3px solid ${theme.border}`,
                  top: `${(boxH - boxD) / 2}px`,
                  transform: `rotateX(-90deg) translateZ(${boxH / 2}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: 1,
                  boxSizing: 'border-box',
                  boxShadow: 'inset 0 0 18px rgba(0,0,0,0.2)'
                }}></div>

                {/* 6. TOP LID FACE (Hinged at Back Edge) */}
                <div style={{
                  position: 'absolute',
                  width: `${boxW}px`,
                  height: `${boxD}px`,
                  backgroundColor: theme.lidBg,
                  backgroundImage: theme.texture,
                  border: `3px solid ${theme.border}`,
                  color: theme.text,
                  top: `${(boxH - boxD) / 2}px`,
                  transformOrigin: 'top center',
                  transform: `rotateX(90deg) translateZ(${boxH / 2}px) ${isOpenLid ? 'rotateX(-110deg)' : 'rotateX(0deg)'}`,
                  transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  backfaceVisibility: 'hidden',
                  opacity: 1,
                  boxSizing: 'border-box',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.18)'
                }}>
                  {/* Sealing Tape Line when Closed */}
                  {!isOpenLid && (
                    <div style={{ position: 'absolute', width: '100%', height: '18px', background: '#D89B24', border: '1.5px dashed #78350F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: '900', color: '#451A03' }}>
                      WATER-ACTIVATED RECYCLABLE TAPE
                    </div>
                  )}

                  <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#064E3B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Sparkles size={16} /> PACKWISE ECO-DESIGN
                  </div>
                </div>

                {/* INNER NESTED CUSHION INSERT (Visible when Lid is Open) */}
                {isOpenLid && (
                  <div style={{
                    position: 'absolute',
                    width: `${boxW - 24}px`,
                    height: `${boxD - 24}px`,
                    left: '12px',
                    top: `${(boxH - boxD) / 2 + 12}px`,
                    background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
                    border: '2.5px solid #A7F3D0',
                    borderRadius: '10px',
                    transform: `translateZ(${boxH / 2 - 25}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: '900',
                    boxShadow: '0 6px 18px rgba(16, 185, 129, 0.45)',
                    boxSizing: 'border-box',
                    padding: '12px',
                    textAlign: 'center'
                  }}>
                    <div>
                      🌱 Molded Pulp Insert ({cushion_thickness_cm} cm)
                      <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#D1FAE5', marginTop: '4px' }}>
                        Product Form-Fit Core Nested Inside
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Material Texture Selector Bar */}
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border-soft)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={15} /> Material Finish Texture:
              </span>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(MATERIAL_THEMES).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setBoxMaterial(key)}
                    style={{
                      background: boxMaterial === key ? 'var(--brand-primary)' : '#FFFFFF',
                      color: boxMaterial === key ? '#FFFFFF' : 'var(--text-heading)',
                      border: boxMaterial === key ? '1px solid var(--brand-primary)' : '1px solid var(--border-soft)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow: boxMaterial === key ? '0 2px 8px rgba(6, 78, 59, 0.2)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 3D Package Architecture Callout Specs Bar */}
          <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '20px', borderRadius: '14px', fontSize: '0.85rem' }}>
            
            <div style={{ fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '14px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--brand-primary)" /> 3D Package Architecture & Specs
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', color: 'var(--text-body)' }}>
              
              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>OUTER BOX DIMENSIONS</div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>{lengthCm} × {widthCm} × {heightCm} cm</strong>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>CUSHIONING LAYER</div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--brand-primary)' }}>{cushion_thickness_cm} cm Molded Paper Pulp</strong>
                <div style={{ fontSize: '0.7rem', color: 'var(--green-secondary)', marginTop: '2px' }}>100% Recycled & Home Compostable</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>OPTIMIZED VOID SPACE</div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>4.1% Volume Gap (Minimized)</strong>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Saves freight volume & shipping CO₂e</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>ECO BRANDING & PRINTING</div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>Soy-Based Vegetable Inks</strong>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Deinkable & recyclable surface print</div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* 2D Flat Dieline Blueprint Viewer */
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-soft)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Green line = Outer cut line | Dashed line = Fold crease | Red = Glue flap</span>
            <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
              <Download size={12} /> Export DXF / SVG Dieline
            </button>
          </div>

          <svg width="100%" height="220" viewBox="0 0 600 200" style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid var(--border-soft)' }}>
            {/* Outer Cutting Edge */}
            <rect x="50" y="30" width="500" height="140" fill="none" stroke="#064E3B" strokeWidth="2" />
            {/* Main Fold Crease Lines */}
            <line x1="160" y1="30" x2="160" y2="170" stroke="#166534" strokeWidth="1.5" strokeDasharray="5,5" />
            <line x1="270" y1="30" x2="270" y2="170" stroke="#166534" strokeWidth="1.5" strokeDasharray="5,5" />
            <line x1="380" y1="30" x2="380" y2="170" stroke="#166534" strokeWidth="1.5" strokeDasharray="5,5" />
            <line x1="490" y1="30" x2="490" y2="170" stroke="#166534" strokeWidth="1.5" strokeDasharray="5,5" />
            {/* Glue Flap Area */}
            <rect x="50" y="30" width="30" height="140" fill="rgba(216, 155, 36, 0.15)" stroke="#D89B24" strokeWidth="1" strokeDasharray="3,3" />
            {/* Text Annotations */}
            <text x="60" y="105" fontSize="10" fill="#92400E" fontWeight="bold">GLUE</text>
            <text x="195" y="105" fontSize="12" fill="#064E3B" fontWeight="bold">PANEL A (FRONT)</text>
            <text x="310" y="105" fontSize="12" fill="#064E3B" fontWeight="bold">PANEL B (SIDE + QR)</text>
            <text x="415" y="105" fontSize="12" fill="#064E3B" fontWeight="bold">PANEL C (BACK)</text>
          </svg>
        </div>
      )}

    </div>
  );
}
