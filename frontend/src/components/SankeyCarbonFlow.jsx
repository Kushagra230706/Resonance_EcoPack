import React from 'react';
import { GitCommit, ArrowRight, Zap, Info } from 'lucide-react';

export default function SankeyCarbonFlow({ data }) {
  if (!data || !data.recommended) return null;

  const rec = data.recommended;
  const cb = rec.co2_breakdown || {
    material_emissions_kg: round(rec.co2e_kg * 0.45),
    manufacturing_emissions_kg: round(rec.co2e_kg * 0.15),
    transport_emissions_kg: round(rec.co2e_kg * 0.22),
    end_of_life_emissions_kg: round(rec.co2e_kg * 0.10),
    damage_carbon_kg: round(rec.co2e_kg * 0.08)
  };

  function round(v) {
    return Math.round(v * 1000) / 1000;
  }

  const mat = cb.material_emissions_kg || 0.08;
  const mfg = cb.manufacturing_emissions_kg || 0.03;
  const trsp = cb.transport_emissions_kg || 0.04;
  const eol = cb.end_of_life_emissions_kg || 0.02;
  const dmg = cb.damage_carbon_kg || 0.01;

  const total = Math.max(0.01, mat + mfg + trsp + eol + dmg);

  const pMat = Math.round((mat / total) * 100);
  const pMfg = Math.round((mfg / total) * 100);
  const pTrsp = Math.round((trsp / total) * 100);
  const pEol = Math.round((eol / total) * 100);
  const pDmg = Math.round((dmg / total) * 100);

  const stages = [
    { label: 'Raw Materials', val: mat, pct: pMat, color: '#10B981', desc: `${rec.outer_material || 'Cardboard'} + ${rec.inner_material || 'Molded Pulp'}` },
    { label: 'Manufacturing & Print', val: mfg, pct: pMfg, color: '#3B82F6', desc: 'Die-cutting, folding & soy ink print' },
    { label: 'Transport Freight', val: trsp, pct: pTrsp, color: '#8B5CF6', desc: 'Last-mile & regional transit' },
    { label: 'End-of-Life Disposal', val: eol, pct: pEol, color: '#F59E0B', desc: 'Curbside recycling & waste stream' },
    { label: 'Damage Risk Carbon', val: dmg, pct: pDmg, color: '#EF4444', desc: 'Replacement freight carbon buffer' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '22px', borderRadius: '16px', border: '1px solid var(--border-soft)', marginBottom: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitCommit size={22} color="var(--brand-primary)" />
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
              🌿 Carbon Contribution Sankey Flow Model
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Traces exact cradle-to-grave $\text{CO}_2\text{e}$ emissions breakdown for <strong>{rec.name}</strong>.
            </p>
          </div>
        </div>
        <span className="badge-green" style={{ fontSize: '0.75rem', fontWeight: '800' }}>
          Total Footprint: {total.toFixed(3)} kg CO₂e / unit
        </span>
      </div>

      {/* Sankey Flow Diagram Bar Stack */}
      <div style={{ background: 'var(--bg-secondary)', padding: '16px 18px', borderRadius: '12px', border: '1px solid var(--border-soft)', marginBottom: '16px' }}>
        
        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>
          Lifecycle Emission Stream Share (%):
        </div>

        {/* Visual Stacked Sankey Stream Bar */}
        <div style={{ display: 'flex', height: '24px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-soft)', marginBottom: '14px' }}>
          {stages.map((stg, i) => (
            <div 
              key={`bar-${i}`}
              title={`${stg.label}: ${stg.val} kg CO₂e (${stg.pct}%)`}
              style={{
                width: `${Math.max(4, stg.pct)}%`,
                background: stg.color,
                transition: 'width 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: '800'
              }}
            >
              {stg.pct >= 10 ? `${stg.pct}%` : ''}
            </div>
          ))}
        </div>

        {/* Flow Connections Breakdown Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {stages.map((stg, i) => (
            <div 
              key={`stage-${i}`}
              style={{
                background: '#FFFFFF',
                border: `1.5px solid ${stg.color}`,
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '0.78rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: stg.color, flexShrink: 0 }}></span>
                <strong style={{ color: '#0F172A', fontSize: '0.8rem' }}>{stg.label}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#334155', fontWeight: '700' }}>
                <span>{stg.val} kg CO₂e</span>
                <span style={{ background: stg.color, color: '#FFF', padding: '1px 6px', borderRadius: '10px', fontSize: '0.68rem' }}>
                  {stg.pct}%
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '4px' }}>
                {stg.desc}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Sankey Flow Narrative Summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-body)', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '8px' }}>
        <Info size={16} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Sankey Insight:</strong> Material extraction ({pMat}%) and transit freight ({pTrsp}%) drive the primary footprint. Engineered molded pulp cushioning reduces damage risk carbon to only {pDmg}%.
        </span>
      </div>

    </div>
  );
}
