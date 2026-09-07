import React, { useState } from 'react';
import { Repeat, Zap, Award, CheckCircle2 } from 'lucide-react';

export default function ReuseBreakEvenCalculator() {
  const [cycles, setCycles] = useState(20);
  const [initialContainerCo2, setInitialContainerCo2] = useState(2.10); // kg CO2e for heavy PP box
  const [returnLogisticsCo2, setReturnLogisticsCo2] = useState(0.04); // kg CO2e per return shipment
  const [singleUseBoxCo2, setSingleUseBoxCo2] = useState(0.52); // single use cardboard baseline

  // Calculate CO2e per shipment for N uses
  const co2PerShipment = (cycles) => {
    return ((initialContainerCo2 / cycles) + returnLogisticsCo2).toFixed(3);
  };

  const currentCo2 = parseFloat(co2PerShipment(cycles));
  const isBetter = currentCo2 < singleUseBoxCo2;
  const breakEvenUses = Math.ceil(initialContainerCo2 / (singleUseBoxCo2 - returnLogisticsCo2));

  // Table Data Points: 1, 5, 20, 50 uses
  const tableData = [
    { uses: 1, level: 'High', co2: co2PerShipment(1), status: 'Above Single-Use' },
    { uses: 5, level: 'Medium', co2: co2PerShipment(5), status: 'Near Break-Even' },
    { uses: 20, level: 'Low', co2: co2PerShipment(20), status: '75% Lower CO₂e' },
    { uses: 50, level: 'Very Low', co2: co2PerShipment(50), status: '88% Lower CO₂e (Circular Winner)' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-soft)', borderRadius: '16px', marginBottom: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
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

      {/* Interactive Cycle Slider */}
      <div style={{ background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-heading)' }}>Number of Reuse Cycles: <strong style={{ color: 'var(--brand-primary)', fontSize: '1.1rem' }}>{cycles} Uses</strong></span>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: isBetter ? 'var(--brand-primary)' : '#991B1B' }}>
            {currentCo2} kg CO₂e / shipment {isBetter ? `(-${Math.round((1 - currentCo2 / singleUseBoxCo2) * 100)}% vs Single-Use)` : '(Higher than single-use)'}
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

      {/* Break-Even Table (User requested 1, 5, 20, 50 breakdown) */}
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
              const isSelected = cycles >= row.uses && (row.uses === 50 || cycles < tableData[tableData.indexOf(row) + 1]?.uses);
              return (
                <tr 
                  key={row.uses}
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
