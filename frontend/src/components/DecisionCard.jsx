import React from 'react';
import { Award, ShieldCheck, DollarSign, Leaf, AlertTriangle, TrendingDown } from 'lucide-react';

export default function DecisionCard({ data }) {
  if (!data || !data.recommended) return null;

  const { recommended, baseline, annual_impact, why_this_won } = data;

  return (
    <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-soft)', background: 'linear-gradient(180deg, var(--bg-card-highlight) 0%, var(--bg-card) 100%)', marginBottom: '24px' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-green"><Award size={14} /> Pareto Recommended Winner</span>
            <span className="badge-amber">Overall Score: {recommended.overall_score}/100</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-heading)' }}>{recommended.name}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Outer: <strong>{recommended.outer_material}</strong> | Inner Cushion: <strong>{recommended.inner_material}</strong>
          </p>
        </div>

        {/* Annual Savings Pill */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', padding: '12px 20px', borderRadius: '14px', textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Estimated Annual Impact</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            <TrendingDown size={18} /> -{annual_impact.co2_saved_kg.toLocaleString()} kg CO₂e
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--green-secondary)', fontWeight: '600' }}>
            ${annual_impact.cost_saved_usd.toLocaleString()} Annual Cost Savings
          </div>
        </div>
      </div>

      {/* Explanation Box */}
      <div style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--brand-primary)', padding: '14px 18px', borderRadius: '0 8px 8px 0', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', color: 'var(--text-body)' }}>
        <strong>Why this option won:</strong> {why_this_won}
      </div>

      {/* 4 KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        
        <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <DollarSign size={14} color="var(--warning-color)" /> Unit Cost
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-heading)' }}>${recommended.unit_cost_usd}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--green-secondary)' }}>vs ${baseline.unit_cost_usd} baseline</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Leaf size={14} color="var(--brand-primary)" /> Carbon Footprint
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-heading)' }}>{recommended.co2e_kg} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>kg CO₂e</span></div>
          <div style={{ fontSize: '0.7rem', color: 'var(--green-secondary)' }}>-{annual_impact.co2_reduction_pct}% CO₂e reduction</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <ShieldCheck size={14} color="var(--brand-primary)" /> Protection Score
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-heading)' }}>{recommended.protection_score}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span></div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{recommended.damage_probability_pct}% damage risk</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <AlertTriangle size={14} color="var(--green-secondary)" /> Regional Recyclability
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-heading)' }}>{recommended.recyclability_score}%</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Curbside compliant</div>
        </div>

      </div>

    </div>
  );
}
