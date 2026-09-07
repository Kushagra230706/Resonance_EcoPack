import React from 'react';
import { Leaf, Cpu, Sparkles, ShieldCheck, QrCode } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenCopilot }) {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '16px 32px', marginBottom: '24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--brand-primary)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(6, 78, 59, 0.2)' }}>
            <Leaf size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                Resonance <span style={{ color: 'var(--brand-primary)' }}>EcoPack</span>
              </h1>
              <span className="badge-green">Decision Intelligence</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-Objective Packaging Optimization & Carbon-Cost Balancing</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-main)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-soft)' }}>
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
            style={{ borderColor: 'var(--brand-primary)', background: 'var(--bg-card-highlight)', color: 'var(--brand-primary)' }}
          >
            <Sparkles size={16} /> Packaging Copilot
          </button>
        </div>

      </div>
    </header>
  );
}
