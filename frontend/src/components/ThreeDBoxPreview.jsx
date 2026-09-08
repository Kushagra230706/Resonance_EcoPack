import React, { useState } from 'react';
import { Box, Layers, Eye, Download, QrCode, Tag, ShieldAlert, Sparkles } from 'lucide-react';

export default function ThreeDBoxPreview({ dieline, optionName }) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'dieline'
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);
  const [showInternalLayers, setShowInternalLayers] = useState(true);

  if (!dieline) return null;

  const { outer_length_cm, outer_width_cm, outer_height_cm, cushion_thickness_cm, flap_margin_cm, sheet_width_cm, sheet_length_cm } = dieline;

  return (
    <div className="glass-panel" style={{ padding: '22px', borderRadius: '16px', border: '1px solid var(--border-soft)', marginBottom: '24px' }}>
      
      {/* Header & View Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={22} color="var(--brand-primary)" />
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
              📦 3D Package Architecture & CAD Dieline Blueprint
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Visualizes product core, molded cushioning, void space, soy ink branding & QR disposal label.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-soft)' }}>
          <button 
            onClick={() => setViewMode('3d')} 
            className={viewMode === '3d' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            <Eye size={12} /> 3D Package Layers
          </button>
          <button 
            onClick={() => setViewMode('dieline')} 
            className={viewMode === 'dieline' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            <Layers size={12} /> 2D CAD Dieline
          </button>
        </div>
      </div>

      {viewMode === '3d' ? (
        /* 3D Box Interactive Canvas Container */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '20px', alignItems: 'center' }}>
          
          <div 
            onMouseMove={(e) => {
              if (e.buttons === 1) {
                setRotY(prev => prev + e.movementX * 0.5);
                setRotX(prev => prev - e.movementY * 0.5);
              }
            }}
            style={{ 
              height: '280px', 
              background: 'radial-gradient(ellipse at center, var(--bg-card) 0%, var(--bg-secondary) 100%)', 
              borderRadius: '14px', 
              border: '1px solid var(--border-soft)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              perspective: '800px',
              cursor: 'grab',
              userSelect: 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', position: 'absolute', top: '10px', left: '12px' }}>
              🖐️ Drag mouse to rotate 3D package angle
            </div>

            {/* Toggle internal X-Ray layer view */}
            <button
              onClick={() => setShowInternalLayers(!showInternalLayers)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '12px',
                fontSize: '0.7rem',
                fontWeight: '700',
                background: showInternalLayers ? 'var(--brand-primary)' : 'var(--bg-card)',
                color: showInternalLayers ? '#FFF' : 'var(--text-heading)',
                border: '1px solid var(--border-soft)',
                padding: '3px 8px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {showInternalLayers ? '🔍 X-Ray Product Mode: ON' : '📦 Closed Box Mode'}
            </button>

            {/* CSS 3D Box Render */}
            <div style={{
              width: `${Math.min(150, outer_length_cm * 8)}px`,
              height: `${Math.min(110, outer_height_cm * 8)}px`,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: 'transform 0.05s ease-out'
            }}>
              
              {/* Internal Product Core Mesh (Shown in X-Ray mode) */}
              {showInternalLayers && (
                <div style={{
                  position: 'absolute',
                  width: '60%',
                  height: '60%',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  border: '2px solid #60A5FA',
                  borderRadius: '6px',
                  top: '20%',
                  left: '20%',
                  transform: 'translateZ(0px)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  color: '#FFF',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  boxShadow: '0 0 14px rgba(59, 130, 246, 0.5)',
                  zIndex: 2
                }}>
                  PRODUCT CORE
                </div>
              )}

              {/* Internal Molded Cushioning Shell */}
              {showInternalLayers && (
                <div style={{
                  position: 'absolute',
                  width: '82%',
                  height: '82%',
                  background: 'rgba(16, 185, 129, 0.25)',
                  border: '2px stroke #10B981',
                  borderRadius: '8px',
                  top: '9%',
                  left: '9%',
                  transform: 'translateZ(10px)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justify: 'flex-end',
                  padding: '4px',
                  color: '#065F46',
                  fontSize: '0.6rem',
                  fontWeight: '800',
                  zIndex: 1
                }}>
                  CUSHION
                </div>
              )}

              {/* Front Face with QR Code Label */}
              <div style={{ position: 'absolute', inset: 0, background: showInternalLayers ? 'rgba(6, 78, 59, 0.45)' : 'rgba(6, 78, 59, 0.9)', border: '2px solid #CFE3C7', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateZ(${Math.min(60, outer_width_cm * 4)}px)` }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800' }}>FRONT PANEL</span>
                <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>4.1% Void Space</span>
              </div>

              {/* Top Face with Soy Ink Branding Logo */}
              <div style={{ position: 'absolute', width: '100%', height: `${Math.min(120, outer_width_cm * 8)}px`, background: showInternalLayers ? 'rgba(22, 101, 52, 0.5)' : 'rgba(22, 101, 52, 0.95)', border: '2px solid #CFE3C7', color: '#FFF', top: 0, transformOrigin: 'top', transform: `rotateX(-90deg)` }}>
                <div style={{ padding: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Sparkles size={10} /> RESONANCE SOY-INK BRANDING
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#A7F3D0' }}>Lid: {outer_length_cm} × {outer_width_cm} cm</div>
                </div>
              </div>

              {/* Right Face with QR Code Disposal Label Placement */}
              <div style={{ position: 'absolute', width: `${Math.min(120, outer_width_cm * 8)}px`, height: '100%', background: showInternalLayers ? 'rgba(6, 78, 59, 0.55)' : 'rgba(6, 78, 59, 0.95)', border: '2px solid #CFE3C7', color: '#FFF', right: 0, transformOrigin: 'right', transform: `rotateY(90deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <QrCode size={20} color="#D1FAE5" />
                <span style={{ fontSize: '0.58rem', fontWeight: '800', color: '#D1FAE5' }}>SMART DISPOSAL QR</span>
              </div>

            </div>

          </div>

          {/* 5 Architecture Layer Callout Specs */}
          <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '14px', borderRadius: '12px', fontSize: '0.78rem' }}>
            <div style={{ fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '8px', fontSize: '0.85rem' }}>
              📐 3D Package Architecture
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-body)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }}></span>
                <span><strong>1. Product Inside:</strong> Fits inner core ({outer_length_cm - 2.4} × {outer_width_cm - 2.4} cm)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }}></span>
                <span><strong>2. Cushioning Layer:</strong> {cushion_thickness_cm} cm Molded Pulp</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }}></span>
                <span><strong>3. Void Space:</strong> Minimized 4.1% Volume Gap</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EC4899', flexShrink: 0 }}></span>
                <span><strong>4. Soy Ink Print:</strong> Top Lid Surface ({outer_length_cm} × {outer_width_cm} cm)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06B6D4', flexShrink: 0 }}></span>
                <span><strong>5. QR Label Position:</strong> Right Side Panel</span>
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
