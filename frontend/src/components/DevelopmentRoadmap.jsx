import React from 'react';
import { Map, CheckCircle2, Clock, Globe, ShieldCheck, Sparkles, Layers, Box, Cpu } from 'lucide-react';

export default function DevelopmentRoadmap() {
  const phases = [
    {
      phase: 'Phase 1: Strong MVP',
      subtitle: 'Core Foundation & Optimization Infrastructure',
      status: 'PRODUCTION READY',
      statusColor: 'badge-green',
      icon: <Cpu size={22} color="var(--brand-primary)" />,
      items: [
        { name: 'Product Input Form', status: 'Implemented', desc: 'Dimensions, weight, fragility & budget specifications.' },
        { name: 'Material Database', status: 'Implemented', desc: 'Curated ISO 14040 verified lifecycle emission database.' },
        { name: 'Packaging Alternative Generator', status: 'Implemented', desc: 'Multi-archetype design option generator.' },
        { name: 'Carbon Calculator', status: 'Implemented', desc: 'Scope 3 lifecycle CO₂e emission model.' },
        { name: 'Cost Calculator', status: 'Implemented', desc: 'Material, manufacturing, assembly & damage loss cost model.' },
        { name: 'Protection Score Engine', status: 'Implemented', desc: 'ISTA 3A transit & ASTM drop testing physics simulation.' },
        { name: 'Comparison Dashboard', status: 'Implemented', desc: 'Multi-dimensional radar charts & bar graphs.' },
        { name: 'Recommendation Engine', status: 'Implemented', desc: 'Live AI Gemini 3.6 Flash Pareto trade-off recommender.' },
        { name: 'PDF Export & RFQ Hub', status: 'Implemented', desc: 'Executive report generator & supplier quoting.' }
      ]
    },
    {
      phase: 'Phase 2: Contest-Level Features',
      subtitle: 'Advanced Decision-Intelligence & Interactive AI Features',
      status: 'LIVE & ACTIVE',
      statusColor: 'badge-green',
      icon: <Sparkles size={22} color="var(--brand-primary)" />,
      items: [
        { name: 'Pareto Frontier Visualization', status: 'Implemented', desc: 'Multi-objective trade-off scatter plot & winner highlight.' },
        { name: '3D Packaging Mockup', status: 'Implemented', desc: 'Interactive 360° Three.js box model & dieline viewer.' },
        { name: 'Region-Aware Recyclability', status: 'Implemented', desc: 'Regional curbside recovery infrastructure weighting.' },
        { name: 'QR Disposal Guide', status: 'Implemented', desc: 'On-pack customer disposal & recycling QR generator.' },
        { name: 'Green Claims Checker', status: 'Implemented', desc: 'FTC Green Guides & EU Directive anti-greenwashing audit.' },
        { name: 'Case Study Dashboard', status: 'Implemented', desc: 'Interactive Fragile, Fashion, and Food before vs after tables.' }
      ]
    },
    {
      phase: 'Phase 3: Global-Level Features',
      subtitle: 'Enterprise Scale, Integrations & Circular Ecosystem',
      status: 'ENTERPRISE READY',
      statusColor: 'badge-green',
      icon: <Globe size={22} color="var(--brand-primary)" />,
      items: [
        { name: 'Supplier Quote Integration', status: 'Implemented', desc: 'Direct supplier RFQ submission & catalog connector.' },
        { name: 'Reuse / Refill Break-Even Model', status: 'Implemented', desc: 'Circular economy payback cycle & capex break-even calculator.' },
        { name: 'Dieline Generation', status: 'Implemented', desc: 'Flat 2D vector folding sheet dimensions & flap specifications.' },
        { name: 'Pallet & Container Optimization', status: 'Implemented', desc: 'Shipping volume utilization & pallet stacking efficiency.' },
        { name: 'API for Brands', status: 'Implemented', desc: 'FastAPI REST endpoints for automated brand integration.' },
        { name: 'Integration with Shopify / WooCommerce', status: 'Implemented', desc: 'E-commerce store checkout packaging optimization plugin.' },
        { name: 'Enterprise Reporting for Sustainability Teams', status: 'Implemented', desc: 'Scope 3 ESG reporting & annual carbon reduction summaries.' }
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', paddingBottom: '50px' }}>
      
      {/* Top Header */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Map size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-heading)' }}>PackWise Product & Feature Roadmap</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete 3-Phase Development Roadmap across Strong MVP, Contest Features, and Global Enterprise Capabilities.</p>
          </div>
        </div>
      </div>

      {/* 3 Roadmap Phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {phases.map((phase, pIdx) => (
          <div key={pIdx} className="glass-panel" style={{ padding: '24px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--border-soft)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {phase.icon}
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-heading)' }}>{phase.phase}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{phase.subtitle}</p>
                </div>
              </div>
              <span className={phase.statusColor} style={{ fontSize: '0.78rem', fontWeight: '700' }}>
                {phase.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              {phase.items.map((item, iIdx) => (
                <div key={iIdx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} color="var(--brand-primary)" />
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-heading)' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--brand-primary)', fontWeight: '700', background: 'var(--bg-card-highlight)', padding: '2px 8px', borderRadius: '4px' }}>
                      {item.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '24px' }}>{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
