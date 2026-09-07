import React, { useState, useEffect } from 'react';
import { Repeat, Zap, Award, CheckCircle2, Sparkles } from 'lucide-react';

export default function ReuseBreakEvenCalculator({ data }) {
  const alternatives = data?.alternatives || [];
  const recommended = data?.recommended || alternatives[0];
  const baseline = data?.baseline || alternatives.find(a => a.is_baseline) || alternatives[alternatives.length - 1];

  // Pick default reusable option or recommended winner
  const reusableOpt = alternatives.find(a => a.id === 'opt_reusable_shipper' || a.pareto_archetype === 'circular_reusable' || a.pareto_archetype === 'Reusable') || recommended;

  const [selectedOptionId, setSelectedOptionId] = useState(reusableOpt?.id || null);
  const [cycles, setCycles] = useState(20);

  // Sync state when new Pareto evaluation data arrives
  useEffect(() => {
    if (reusableOpt?.id) {
      setSelectedOptionId(reusableOpt.id);
      if (reusableOpt.reuse_cycles) {
        setCycles(reusableOpt.reuse_cycles);
      }
    }
  }, [data]);

  const activeOption = alternatives.find(a => a.id === selectedOptionId) || reusableOpt || {
    name: 'Heavy-Duty Reusable PP Shipper Box',
    co2e_kg: 2.10
  };

  const activeBaseline = baseline || {
    name: 'Standard Corrugated Box',
    co2e_kg: 0.52
  };

  // Dynamic values extracted from selected Pareto Option & Baseline
  const initialContainerCo2 = activeOption?.co2e_kg || activeOption?.carbon_co2e_kg || 2.10;
  const returnLogisticsCo2 = 0.04; // kg CO2e per return shipment
  const singleUseBoxCo2 = activeBaseline?.co2e_kg || activeBaseline?.carbon_co2e_kg || 0.52;

  // Calculate CO2e per shipment for N uses
  const co2PerShipment = (nUses) => {
    return ((initialContainerCo2 / nUses) + returnLogisticsCo2).toFixed(3);
  };

  const currentCo2 = parseFloat(co2PerShipment(cycles));
  const isBetter = currentCo2 < singleUseBoxCo2;
  const denominator = singleUseBoxCo2 - returnLogisticsCo2;
  const breakEvenUses = denominator > 0 ? Math.ceil(initialContainerCo2 / denominator) : 1;

  const savingsPct = Math.round((1 - currentCo2 / singleUseBoxCo2) * 100);

  // Dynamic Table Data Points: 1, 5, 20, 50 uses
  const tableData = [
    { uses: 1, level: 'High', co2: co2PerShipment(1), status: 'Above Single-Use' },
    { uses: Math.max(2, Math.min(10, breakEvenUses)), level: 'Medium', co2: co2PerShipment(Math.max(2, Math.min(10, breakEvenUses))), status: 'Near Break-Even' },
    { uses: 20, level: 'Low', co2: co2PerShipment(20), status: `${Math.round((1 - parseFloat(co2PerShipment(20)) / singleUseBoxCo2) * 100)}% Lower CO₂e` },
    { uses: 50, level: 'Very Low', co2: co2PerShipment(50), status: `${Math.round((1 - parseFloat(co2PerShipment(50)) / singleUseBoxCo2) * 100)}% Lower CO₂e (Circular Winner)` }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-soft)', borderRadius: '16px', marginBottom: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Repeat size={24} color="var(--brand-primary)" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)' }}>🔄 Circular Reuse/Refill Break-Even Calculator</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculates exact shipment cycles where reusable shippers outperform single-use packaging.</p>
          </div>
        </div>
        <span className="badge-green" style={{ fontSize: '0.75rem' }}>
          <Award size={14} /> Break-Even: {breakEvenUses} Uses
        </span>
      </div>

      {/* Live Pareto Data Connection Banner & Option Selector */}
      {data && alternatives.length > 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'space-between', 
          flexWrap: 'wrap',
          gap: '10px', 
          background: 'var(--bg-card-highlight, #ECFDF5)', 
          border: '1px solid #10B981', 
          padding: '10px 14px', 
          borderRadius: '10px', 
          marginBottom: '18px',
          fontSize: '0.8rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: '#10B981', color: '#fff', fontSize: '0.68rem', fontWeight: '800', padding: '3px 8px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> LIVE PARETO CONNECTED
            </span>
            <span style={{ color: 'var(--text-heading)', fontWeight: '600' }}>
              Analyzing: <strong style={{ color: 'var(--brand-primary)' }}>{activeOption.name}</strong> vs Baseline <strong style={{ color: '#EF4444' }}>({activeBaseline.name})</strong>
            </span>
          </div>

          {/* Selector pills for all Pareto options */}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {alternatives.map((a, idx) => {
              const isSelected = a.id === activeOption.id;
              const isWinner = a.id === recommended?.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedOptionId(a.id)}
                  style={{
                    background: isSelected ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-heading)',
                    border: `1px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-soft)'}`,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Opt {idx + 1} {isWinner ? '★' : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Cycle Slider */}
      <div style={{ background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-heading)' }}>
            Number of Reuse Cycles: <strong style={{ color: 'var(--brand-primary)', fontSize: '1.1rem' }}>{cycles} Uses</strong>
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: isBetter ? 'var(--brand-primary)' : '#991B1B' }}>
            {currentCo2} kg CO₂e / shipment {isBetter ? `(-${savingsPct}% vs Single-Use)` : '(Higher than single-use baseline)'}
          </span>
        </div>
        
        <input 
          type="range" 
          min="1" 
          max="50" 
          value={cycles} 
          onChange={e => setCycles(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>1 Use (Single-Use Level)</span>
          <span>Break-Even Threshold (~{breakEvenUses} Uses)</span>
          <span>50 Uses (Max Circularity)</span>
        </div>
      </div>

      {/* Break-Even Table Breakdown */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-soft)', color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}>
              <th style={{ padding: '10px 12px' }}>Uses / Lifetime Cycles</th>
              <th style={{ padding: '10px 12px' }}>Carbon Intensity Level</th>
              <th style={{ padding: '10px 12px' }}>CO₂e per Shipment</th>
              <th style={{ padding: '10px 12px' }}>Circularity Verdict</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => {
              const isSelected = cycles >= row.uses && (row.uses === 50 || cycles < (tableData[tableData.indexOf(row) + 1]?.uses || 999));
              return (
                <tr 
                  key={`row-${row.uses}`}
                  style={{
                    borderBottom: '1px solid var(--border-soft)',
                    background: isSelected ? 'var(--bg-card-highlight)' : 'transparent',
                    fontWeight: isSelected ? '700' : 'normal'
                  }}
                >
                  <td style={{ padding: '12px', color: 'var(--text-heading)' }}>
                    <strong>{row.uses} {row.uses === 1 ? 'use' : 'uses'}</strong>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '3px 8px', 
                      borderRadius: '6px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      background: row.level === 'High' ? '#FEE2E2' : row.level === 'Medium' ? '#FEF3C7' : '#D1FAE5',
                      color: row.level === 'High' ? '#991B1B' : row.level === 'Medium' ? '#92400E' : '#065F46'
                    }}>
                      {row.level}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '800', color: 'var(--text-heading)' }}>
                    {row.co2} kg CO₂e
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.8rem', color: row.uses >= breakEvenUses ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                    {row.uses >= breakEvenUses && <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                    {row.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
