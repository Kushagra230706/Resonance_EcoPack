import React from 'react';
import { Leaf, Cpu, Sparkles, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onLogoClick, onOpenCopilot }) {
  return (
    <header style={{
      background: 'rgba(4, 18, 14, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
      padding: '14px 32px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* PackWise Brand Logo */}
        <div 
          onClick={() => onLogoClick ? onLogoClick() : setActiveTab('optimizer')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}>
            <Leaf size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>
              PackWise
            </h1>
            <span style={{ fontSize: '0.65rem', color: '#34d399', fontWeight: '700', letterSpacing: '0.5px' }}>
              SUSTAINABLE PACKAGING AI
            </span>
          </div>
        </div>

        {/* Center Links */}
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.88rem', color: '#a7f3d0', fontWeight: '500', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('optimizer')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'optimizer' ? '#34d399' : '#a7f3d0', fontWeight: activeTab === 'optimizer' ? '700' : '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Cpu size={15} /> Optimizer
          </button>
          <button 
            onClick={() => setActiveTab('case_studies')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'case_studies' ? '#34d399' : '#a7f3d0', fontWeight: activeTab === 'case_studies' ? '700' : '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={15} /> Case Studies
          </button>
          <button 
            onClick={() => setActiveTab('roadmap')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'roadmap' ? '#34d399' : '#a7f3d0', fontWeight: activeTab === 'roadmap' ? '700' : '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Leaf size={15} /> Roadmap
          </button>
          <button 
            onClick={() => setActiveTab('brand_style')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'brand_style' ? '#34d399' : '#a7f3d0', fontWeight: activeTab === 'brand_style' ? '700' : '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={15} /> Brand Style
          </button>
          <button 
            onClick={() => setActiveTab('claims')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'claims' ? '#34d399' : '#a7f3d0', fontWeight: activeTab === 'claims' ? '700' : '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={15} /> Green Claims
          </button>
          <button 
            onClick={() => setActiveTab('disposal')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'disposal' ? '#34d399' : '#a7f3d0', fontWeight: activeTab === 'disposal' ? '700' : '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <QrCode size={15} /> QR Disposal
          </button>
        </div>

        {/* Right CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onOpenCopilot} 
            style={{ background: 'none', border: 'none', color: '#6ee7b7', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={15} color="#34d399" /> AI Copilot
          </button>
          
          <button 
            onClick={() => setActiveTab('optimizer')}
            className="btn-primary" 
            style={{
              padding: '8px 20px',
              fontSize: '0.85rem',
              borderRadius: '9999px',
              background: '#34d399',
              color: '#04120e',
              fontWeight: '700',
              boxShadow: '0 0 15px rgba(52, 211, 153, 0.4)'
            }}
          >
            Try PackWise <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </header>
  );
}
