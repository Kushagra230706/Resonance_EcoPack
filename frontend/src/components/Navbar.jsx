import React from 'react';
import { Leaf, Cpu, Sparkles, ShieldCheck, QrCode } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenCopilot }) {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '16px 32px', marginBottom: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}>
            <Leaf size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', background: 'linear-gradient(90deg, #ffffff 0%, #9ca3af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Resonance <span style={{ color: '#10b981', WebkitTextFillColor: '#10b981' }}>EcoPack</span>
              </h1>
              <span className="badge-green">Decision Intelligence</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-Objective Packaging Optimization & Carbon-Cost Balancing</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setActiveTab('optimizer')}
            className={activeTab === 'optimizer' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Cpu size={16} /> Packaging Optimizer
          </button>
          <button 
            onClick={() => setActiveTab('claims')}
            className={activeTab === 'claims' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <ShieldCheck size={16} /> Green Claims Checker
          </button>
          <button 
            onClick={() => setActiveTab('disposal')}
            className={activeTab === 'disposal' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <QrCode size={16} /> QR Disposal Guide
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onOpenCopilot} 
            className="btn-secondary" 
            style={{ borderColor: 'rgba(139, 92, 246, 0.4)', background: 'rgba(139, 92, 246, 0.1)', color: '#c084fc' }}
          >
            <Sparkles size={16} /> Packaging Copilot
          </button>
        </div>

      </div>
    </header>
  );
}
