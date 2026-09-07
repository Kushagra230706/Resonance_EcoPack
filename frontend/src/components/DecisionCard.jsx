import React from 'react';
import { Award, ShieldCheck, DollarSign, Leaf, AlertTriangle, TrendingDown } from 'lucide-react';

export default function DecisionCard({ data }) {
  if (!data || !data.recommended) return null;

  const { recommended, baseline, annual_impact, why_this_won } = data;

  return (
    <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(16, 185, 129, 0.4)', background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(18, 26, 43, 0.9) 100%)', marginBottom: '24px' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-green"><Award size={14} /> Pareto Recommended Winner</span>
            <span className="badge-amber">Overall Score: {recommended.overall_score}/100</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{recommended.name}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Outer: <strong>{recommended.outer_material}</strong> | Inner Cushion: <strong>{recommended.inner_material}</strong>
          </p>
        </div>

        {/* Annual Savings Pill */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px 20px', borderRadius: '14px', textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: '700' }}>Estimated Annual Impact</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            <TrendingDown size={18} /> -{annual_impact.co2_saved_kg.toLocaleString()} kg CO₂e
          </div>
          <div style={{ fontSize: '0.9rem', color: '#6ee7b7', fontWeight: '600' }}>
            ${annual_impact.cost_saved_usd.toLocaleString()} Annual Cost Savings
          </div>
        </div>
      </div>

      {/* Explanation Box */}
      <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '4px solid #10b981', padding: '14px 18px', borderRadius: '0 8px 8px 0', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>
        <strong>Why this option won:</strong> {why_this_won}
      </div>

      {/* 4 KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
            <DollarSign size={14} color="#f59e0b" /> Unit Cost
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>${recommended.unit_cost_usd}</div>
          <div style={{ fontSize: '0.7rem', color: '#34d399' }}>vs ${baseline.unit_cost_usd} baseline</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
            <Leaf size={14} color="#10b981" /> Carbon Footprint
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{recommended.co2e_kg} <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>kg CO₂e</span></div>
          <div style={{ fontSize: '0.7rem', color: '#34d399' }}>-{annual_impact.co2_reduction_pct}% CO₂e reduction</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
            <ShieldCheck size={14} color="#06b6d4" /> Protection Score
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{recommended.protection_score}<span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>/100</span></div>
          <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{recommended.damage_probability_pct}% damage risk</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
            <AlertTriangle size={14} color="#8b5cf6" /> Regional Recyclability
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{recommended.recyclability_score}%</div>
          <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Curbside compliant</div>
        </div>

      </div>

    </div>
  );
}
