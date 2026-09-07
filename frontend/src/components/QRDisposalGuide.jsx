import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Recycle, Download, Smartphone, Check, AlertCircle } from 'lucide-react';

export default function QRDisposalGuide() {
  const [material, setMaterial] = useState('Recycled Corrugated Box + Molded Pulp');
  const [region, setRegion] = useState('GLOBAL');
  const [brandName, setBrandName] = useState('Resonance EcoPack');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const disposalUrl = `https://ecopack.app/dispose?brand=${encodeURIComponent(brandName)}&mat=${encodeURIComponent(material)}&region=${region}`;

  const regionGuide = {
    GLOBAL: "Universal Curbside Standard — Separate paperboard box from inner cushioning.",
    EU: "EPP Directive Compliant — 95% curbside recovery. No plastic tape peeling required for water-soluble starch adhesive.",
    US: "How2Recycle Certified — Check local municipal paper collection facilities.",
    IN: "CPCB Extended Producer Responsibility (EPR) — 100% biodegradable pulp insert.",
    SEA: "ASEAN Green Logistics — Paper stream recovery active in major metro centers.",
    ME: "GCC Sustainability Standard — Paperboard recyclable; bioplastics landfill-bound."
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      
      <div className="glass-panel" style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', marginBottom: '24px' }}>
        
        {/* Form Inputs & Settings */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <QrCode size={26} color="var(--brand-primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-heading)' }}>QR-Based Consumer Disposal Guide</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Prints directly on packaging. When consumers scan with their smartphone camera, it delivers exact local recycling instructions, tape/label rules, and your brand's sustainability story.
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
              <option value="GLOBAL">Global Average (Universal Standard)</option>
              <option value="EU">European Union (EPP Directives & Curbside)</option>
              <option value="US">United States (How2Recycle Curbside)</option>
              <option value="IN">India (CPCB EPR Waste Rules)</option>
              <option value="SEA">Southeast Asia (ASEAN Municipal Standards)</option>
              <option value="ME">Middle East (GCC Recycling Guidelines)</option>
            </select>
          </div>

          {/* Regional Recycling Guidance Banner */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', padding: '12px 14px', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--brand-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} color="var(--brand-primary)" />
            <span><strong>{region} Regional Standard:</strong> {regionGuide[region]}</span>
          </div>

          {/* Encoded Component-by-Component Instructions */}
          <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '800', fontSize: '0.85rem', color: 'var(--brand-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Recycle size={16} /> Consumer Scanning Instructions (On Box):
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-body)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={14} color="var(--green-secondary)" style={{ marginTop: '2px' }} />
                <div><strong>Outer Corrugated Box:</strong> 100% Curbside Recyclable. Flatten box & place in paper bin.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={14} color="var(--green-secondary)" style={{ marginTop: '2px' }} />
                <div><strong>Molded Pulp Insert:</strong> Home compostable within 45 days or paper curbside bin.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={14} color="var(--green-secondary)" style={{ marginTop: '2px' }} />
                <div><strong>Sealing Tape:</strong> Water-soluble starch adhesive — <strong>no need to peel off</strong> tape before recycling.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={14} color="var(--green-secondary)" style={{ marginTop: '2px' }} />
                <div><strong>Shipping Labels:</strong> Peel off synthetic plastic thermal labels if recycling in paper stream.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Generated QR Code & Live Smartphone Simulation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '14px', padding: '24px' }}>
          
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 14px rgba(6, 78, 59, 0.1)', marginBottom: '16px', border: '1px solid var(--border-soft)' }}>
            <QRCodeSVG value={disposalUrl} size={180} level="H" fgColor="#064E3B" />
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '16px' }}>
            Scan with smartphone camera to view local disposal guide
          </div>

          <button 
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="btn-secondary" 
            style={{ width: '100%', padding: '8px 12px', fontSize: '0.8rem', marginBottom: '8px' }}
          >
            <Smartphone size={14} /> {showMobilePreview ? 'Hide Mobile Screen' : 'Simulate Smartphone Scan'}
          </button>

          <button className="btn-primary" style={{ width: '100%', padding: '8px 12px', fontSize: '0.8rem' }}>
            <Download size={14} /> Download Printable Vector SVG
          </button>
        </div>

      </div>

      {/* Simulated Smartphone Screen Modal Preview */}
      {showMobilePreview && (
        <div className="glass-panel" style={{ padding: '24px', border: '2px solid var(--brand-primary)', borderRadius: '16px', maxWidth: '420px', margin: '0 auto', background: '#FFFFFF' }}>
          <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-soft)', paddingBottom: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📲 Smartphone Scanner View ({region})</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--brand-primary)' }}>{brandName} Disposal Portal</h3>
          </div>

          <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-body)' }}>
            <div style={{ background: 'var(--bg-card-highlight)', padding: '10px 14px', borderRadius: '8px', marginBottom: '12px', fontWeight: '600' }}>
              🌱 Thank you for choosing sustainable packaging! Here is how to recycle your box in <strong>{region}</strong>:
            </div>
            
            <ol style={{ paddingLeft: '20px', fontSize: '0.8rem', lineHeight: '1.6' }}>
              <li><strong>Box:</strong> Flatten & place in paper bin.</li>
              <li><strong>Pulp Insert:</strong> Place in paper bin or garden soil (home composts in 45 days).</li>
              <li><strong>Tape:</strong> Leave paper tape attached (100% water-soluble).</li>
            </ol>

            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px stroke var(--border-soft)', fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              <strong>Brand Story:</strong> {brandName} is committed to 100% circular closed-loop packaging.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
