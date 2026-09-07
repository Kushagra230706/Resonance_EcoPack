import React, { useState } from 'react';
import { Box, Layers, Eye, Download } from 'lucide-react';

export default function ThreeDBoxPreview({ dieline, optionName }) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'dieline'
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);

  if (!dieline) return null;

  const { outer_length_cm, outer_width_cm, outer_height_cm, cushion_thickness_cm, flap_margin_cm, sheet_width_cm, sheet_length_cm } = dieline;

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      
      {/* Header & View Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={22} color="var(--brand-primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-heading)' }}>
            Packaging 3D Mockup & CAD Dieline Blueprint
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-soft)' }}>
          <button 
            onClick={() => setViewMode('3d')} 
            className={viewMode === '3d' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            <Eye size={12} /> 3D Box Preview
          </button>
          <button 
            onClick={() => setViewMode('dieline')} 
            className={viewMode === 'dieline' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            <Layers size={12} /> 2D Flat Dieline
          </button>
        </div>
      </div>

      {viewMode === '3d' ? (
        /* 3D Box Interactive Canvas Container */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '20px', alignItems: 'center' }}>
          
          <div 
            onMouseMove={(e) => {
              if (e.buttons === 1) {
                setRotY(prev => prev + e.movementX * 0.5);
                setRotX(prev => prev - e.movementY * 0.5);
              }
            }}
            style={{ 
              height: '260px', 
              background: 'var(--bg-secondary)', 
              borderRadius: '12px', 
              border: '1px solid var(--border-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '800px',
              cursor: 'grab',
              userSelect: 'none',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', position: 'absolute', top: '10px', left: '12px' }}>
              Drag with mouse to rotate 3D box angle
            </div>

            {/* CSS 3D Box Render */}
            <div style={{
              width: `${Math.min(140, outer_length_cm * 8)}px`,
              height: `${Math.min(100, outer_height_cm * 8)}px`,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: 'transform 0.05s ease-out'
            }}>
              {/* Front Face */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 78, 59, 0.85)', border: '2px solid #CFE3C7', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.75rem', transform: `translateZ(${Math.min(60, outer_width_cm * 4)}px)` }}>
                FRONT
              </div>
              {/* Back Face */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5, 59, 44, 0.85)', border: '2px solid #CFE3C7', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.75rem', transform: `rotateY(180deg) translateZ(${Math.min(60, outer_width_cm * 4)}px)` }}>
                ECOPACK
              </div>
              {/* Top Face */}
              <div style={{ position: 'absolute', width: '100%', height: `${Math.min(120, outer_width_cm * 8)}px`, background: 'rgba(22, 101, 52, 0.85)', border: '2px solid #CFE3C7', color: '#FFF', top: 0, transformOrigin: 'top', transform: `rotateX(-90deg)` }}>
                <div style={{ padding: '6px', fontSize: '0.65rem', color: '#CFE3C7' }}>TOP LID: {outer_length_cm} × {outer_width_cm} cm</div>
              </div>
              {/* Right Face */}
              <div style={{ position: 'absolute', width: `${Math.min(120, outer_width_cm * 8)}px`, height: '100%', background: 'rgba(6, 78, 59, 0.95)', border: '2px solid #CFE3C7', color: '#FFF', right: 0, transformOrigin: 'right', transform: `rotateY(90deg)` }}>
              </div>
            </div>

          </div>

          {/* Dimension Specs */}
          <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '16px', borderRadius: '10px', fontSize: '0.85rem' }}>
            <div style={{ fontWeight: '700', color: 'var(--brand-primary)', marginBottom: '8px' }}>CAD Dimensions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-body)' }}>
              <div><strong>Outer L × W × H:</strong> {outer_length_cm} × {outer_width_cm} × {outer_height_cm} cm</div>
              <div><strong>Cushion Thickness:</strong> {cushion_thickness_cm} cm</div>
              <div><strong>Flap Margin:</strong> {flap_margin_cm} cm</div>
              <div><strong>Flat Sheet Size:</strong> {sheet_width_cm} × {sheet_length_cm} cm</div>
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
            <text x="310" y="105" fontSize="12" fill="#064E3B" fontWeight="bold">PANEL B (SIDE)</text>
            <text x="415" y="105" fontSize="12" fill="#064E3B" fontWeight="bold">PANEL C (BACK)</text>
          </svg>
        </div>
      )}

    </div>
  );
}
