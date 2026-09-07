import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Recycle, Download, Share2 } from 'lucide-react';

export default function QRDisposalGuide() {
  const [material, setMaterial] = useState('Recycled Corrugated Box + Molded Pulp');
  const [region, setRegion] = useState('GLOBAL');
  const [brandName, setBrandName] = useState('Resonance EcoPack');

  const disposalUrl = `https://ecopack.app/dispose?brand=${encodeURIComponent(brandName)}&mat=${encodeURIComponent(material)}&region=${region}`;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      
      <div className="glass-panel" style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
        
        {/* Form Inputs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <QrCode size={26} color="#10b981" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Consumer QR Disposal Generator</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '20px' }}>
            Print this QR code on your product box to guide consumers on how to recycle/compost each packaging component based on their region.
          </p>

          <div className="form-group">
            <label>Brand Name</label>
            <input type="text" className="form-input" value={brandName} onChange={e => setBrandName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Packaging Combination</label>
            <input type="text" className="form-input" value={material} onChange={e => setMaterial(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Target Consumer Region</label>
            <select className="form-select" value={region} onChange={e => setRegion(e.target.value)}>
              <option value="GLOBAL">Global (Universal Standard)</option>
              <option value="EU">European Union (EPP Directives)</option>
              <option value="US">United States (Curbside Guidelines)</option>
              <option value="IN">India (CPCB Rules)</option>
            </select>
          </div>

          {/* Consumer Guidance Summary */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '14px', borderRadius: '10px', marginTop: '20px' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#34d399', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Recycle size={16} /> Encoded Consumer Instructions:
            </div>
            <ul style={{ fontSize: '0.8rem', color: '#d1d5db', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Outer Box:</strong> 100% Recyclable. Flatten box & place in paper recycling bin.</li>
              <li><strong>Molded Pulp Insert:</strong> Home compostable in 45 days or paper bin.</li>
              <li><strong>Paper Tape:</strong> No need to peel off; 100% water-soluble adhesive.</li>
            </ul>
          </div>
        </div>

        {/* Generated QR Code Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '24px' }}>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', marginBottom: '16px' }}>
            <QRCodeSVG value={disposalUrl} size={180} level="H" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginBottom: '16px' }}>
            Scan with smartphone camera to view local disposal guide
          </div>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button className="btn-primary" style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }}>
              <Download size={14} /> Download SVG
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
