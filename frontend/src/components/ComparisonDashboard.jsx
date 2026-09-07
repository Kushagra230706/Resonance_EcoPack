import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function ComparisonDashboard({ data }) {
  if (!data || !data.alternatives) return null;

  const alternatives = data.alternatives;
  const recommended = data.recommended;

  // Data for Chart 1: Cost vs Carbon
  const scatterCostCarbon = alternatives.map(a => ({
    name: a.name,
    x: a.unit_cost_usd,
    y: a.co2e_kg,
    z: a.overall_score,
    isRecommended: a.id === recommended.id
  }));

  // Data for Chart 2: Protection vs Sustainability
  const scatterProtectionSust = alternatives.map(a => ({
    name: a.name,
    x: a.protection_score,
    y: a.recyclability_score,
    z: a.overall_score,
    isRecommended: a.id === recommended.id
  }));

  // Data for Radar Chart (Multi-objective profile)
  const baseline = data.baseline || alternatives[alternatives.length - 1];
  const radarData = [
    { metric: 'Sustainability', Winner: (100 - recommended.co2e_kg * 30), Baseline: (100 - baseline.co2e_kg * 30) },
    { metric: 'Cost Economy', Winner: (100 - recommended.unit_cost_usd * 15), Baseline: (100 - baseline.unit_cost_usd * 15) },
    { metric: 'Protection', Winner: recommended.protection_score, Baseline: baseline.protection_score },
    { metric: 'Branding', Winner: recommended.branding_score, Baseline: baseline.branding_score },
    { metric: 'Circularity', Winner: recommended.recyclability_score, Baseline: baseline.recyclability_score },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 3 Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        
        {/* Chart 1: Cost vs Carbon Scatter Plot */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-heading)' }}>1. Cost vs Carbon Pareto Frontier</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Bottom-Left represents optimal Pareto trade-off</p>
          
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
                <XAxis type="number" dataKey="x" name="Unit Cost" unit="$" stroke="var(--text-muted)" fontSize={11} label={{ value: 'Unit Cost ($)', position: 'bottom', fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis type="number" dataKey="y" name="Carbon Footprint" unit="kg" stroke="var(--text-muted)" fontSize={11} label={{ value: 'CO2e (kg)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#FFFFFF', border: '1px solid var(--border-soft)', borderRadius: '8px', color: 'var(--text-heading)', fontSize: '12px' }} />
                <Scatter name="Packaging Alternatives" data={scatterCostCarbon} fill="#064E3B" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Protection vs Sustainability Scatter Plot */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-heading)' }}>2. Protection vs Sustainability Curve</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Top-Right represents max protection & circularity</p>
          
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
                <XAxis type="number" dataKey="x" name="Protection Score" stroke="var(--text-muted)" fontSize={11} label={{ value: 'Protection (0-100)', position: 'bottom', fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis type="number" dataKey="y" name="Recyclability %" stroke="var(--text-muted)" fontSize={11} label={{ value: 'Recyclability %', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#FFFFFF', border: '1px solid var(--border-soft)', borderRadius: '8px', color: 'var(--text-heading)', fontSize: '12px' }} />
                <Scatter name="Protection & Recyclability" data={scatterProtectionSust} fill="#166534" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Radar Trade-off Profile */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-heading)' }}>3. Multi-Dimensional Radar Profile</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Recommended Winner (Green) vs Baseline (Amber)</p>
          
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="var(--border-soft)" />
                <PolarAngleAxis dataKey="metric" stroke="var(--text-heading)" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--border-soft)" fontSize={9} />
                <Radar name="Recommended Winner" dataKey="Winner" stroke="#064E3B" fill="#064E3B" fillOpacity={0.4} />
                <Radar name="Conventional Baseline" dataKey="Baseline" stroke="#D89B24" fill="#D89B24" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 8 Alternatives Matrix Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-heading)' }}>8 Packaging Alternatives Evaluation Matrix</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-soft)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px' }}>Packaging Option</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Unit Cost</th>
                <th style={{ padding: '10px' }}>CO₂e / Unit</th>
                <th style={{ padding: '10px' }}>Protection</th>
                <th style={{ padding: '10px' }}>Recyclability</th>
                <th style={{ padding: '10px' }}>Damage Risk</th>
                <th style={{ padding: '10px' }}>Overall Score</th>
              </tr>
            </thead>
            <tbody>
              {alternatives.map(a => (
                <tr 
                  key={a.id} 
                  style={{ 
                    borderBottom: '1px solid var(--border-soft)',
                    background: a.id === recommended.id ? 'var(--bg-card-highlight)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '12px 10px', fontWeight: '600', color: 'var(--text-heading)' }}>
                    {a.name} {a.id === recommended.id && <span className="badge-green" style={{ marginLeft: '6px' }}>Winner</span>}
                  </td>
                  <td style={{ padding: '12px 10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.category}</td>
                  <td style={{ padding: '12px 10px' }}>${a.unit_cost_usd}</td>
                  <td style={{ padding: '12px 10px' }}>{a.co2e_kg} kg</td>
                  <td style={{ padding: '12px 10px' }}>{a.protection_score}/100</td>
                  <td style={{ padding: '12px 10px' }}>{a.recyclability_score}%</td>
                  <td style={{ padding: '12px 10px', color: a.damage_probability_pct > 10 ? '#ef4444' : 'var(--green-secondary)' }}>{a.damage_probability_pct}%</td>
                  <td style={{ padding: '12px 10px', fontWeight: '800', color: a.id === recommended.id ? 'var(--brand-primary)' : 'var(--text-heading)' }}>
                    {a.overall_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
