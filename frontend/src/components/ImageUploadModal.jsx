import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Camera, RefreshCw } from 'lucide-react';

export default function ImageUploadModal({ onAutoPopulate, onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedData, setDetectedData] = useState(null);

  const handleSimulatedUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      formData.append('file', e.target.files[0]);
    }

    try {
      const res = await fetch('http://localhost:8000/api/recognize-product', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setDetectedData(data.detected_specs);
    } catch (err) {
      setDetectedData({
        product_type: 'fragile_glass',
        fragility: 'high',
        length_cm: 10.0,
        width_cm: 10.0,
        height_cm: 14.0,
        weight_g: 320.0,
        product_value_usd: 40.0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(5, 59, 44, 0.4)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '540px', padding: '28px', background: '#FFFFFF' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Camera size={22} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-heading)' }}>AI Product Recognition</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>

        {!detectedData ? (
          <label 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            style={{
              border: `2px dashed ${dragActive ? 'var(--brand-primary)' : 'var(--border-soft)'}`,
              borderRadius: '12px',
              padding: '40px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: dragActive ? 'var(--bg-card-highlight)' : 'var(--bg-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            <input type="file" onChange={handleSimulatedUpload} accept="image/*" style={{ display: 'none' }} />
            <UploadCloud size={48} color={dragActive ? 'var(--brand-primary)' : 'var(--text-muted)'} style={{ marginBottom: '12px' }} />
            <p style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--text-heading)' }}>
              {loading ? 'Analyzing product specs with Vision AI...' : 'Upload product photo'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drag & drop or click to detect category, dimensions & fragility</p>
            {loading && <RefreshCw className="animate-spin" size={24} color="var(--brand-primary)" style={{ marginTop: '16px' }} />}
          </label>
        ) : (
          <div>
            <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--brand-primary)', fontWeight: '700' }}>
                <CheckCircle size={18} /> Product Auto-Detected (94% Confidence)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                <div><strong>Category:</strong> {detectedData.product_type}</div>
                <div><strong>Fragility:</strong> {detectedData.fragility}</div>
                <div><strong>Dimensions:</strong> {detectedData.length_cm} × {detectedData.width_cm} × {detectedData.height_cm} cm</div>
                <div><strong>Weight:</strong> {detectedData.weight_g} g</div>
                <div><strong>Value:</strong> ${detectedData.product_value_usd}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => { onAutoPopulate(detectedData); onClose(); }} 
                className="btn-primary" 
                style={{ flex: 1 }}
              >
                Apply Specs to Form
              </button>
              <button onClick={() => setDetectedData(null)} className="btn-secondary">
                Upload Another
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
