import React, { useState, useEffect } from 'react';
import { Sliders, Rocket, Gem, Leaf, Scale, Check, Info } from 'lucide-react';

export const BRAND_PRESETS = {
  startup: {
    id: 'startup',
    name: 'Startup Brand',
    description: 'Prioritizes unit cost economy and product protection for lean operations.',
    icon: Rocket,
    weights: { cost: 40, protection: 25, sustainability: 20, branding: 15, circularity: 0 }
  },
  luxury: {
    id: 'luxury',
    name: 'Luxury Brand',
    description: 'Emphasizes unboxing experience, premium branding aesthetics, and structural protection.',
    icon: Gem,
    weights: { branding: 35, protection: 25, sustainability: 25, cost: 15, circularity: 0 }
  },
  ecofirst: {
    id: 'ecofirst',
    name: 'Eco-First Brand',
    description: 'Maximizes carbon reduction, material circularity, and environmental stewardship.',
    icon: Leaf,
    weights: { sustainability: 45, circularity: 20, protection: 20, cost: 10, branding: 5 }
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced Brand',
    description: 'Optimal multi-objective trade-off across all 5 dimensions (Recommended).',
    icon: Scale,
    weights: { sustainability: 30, protection: 25, cost: 20, branding: 15, circularity: 10 }
  }
};

export default function ScoringModelCustomizer({ weights, onChange, onRecalculateLive }) {
  const [preset, setPreset] = useState('balanced');
  const [customWeights, setCustomWeights] = useState({
    sustainability: Math.round((weights?.sustainability || 0.30) * 100),
    protection: Math.round((weights?.protection || 0.25) * 100),
    cost: Math.round((weights?.cost || 0.20) * 100),
    branding: Math.round((weights?.branding || 0.15) * 100),
    circularity: Math.round((weights?.circularity || 0.10) * 100)
  });

  const [showSliders, setShowSliders] = useState(false);

  // Sync internal state when external weights prop changes
  useEffect(() => {
    if (weights) {
      setCustomWeights({
        sustainability: Math.round((weights.sustainability || 0.30) * 100),
        protection: Math.round((weights.protection || 0.25) * 100),
        cost: Math.round((weights.cost || 0.20) * 100),
        branding: Math.round((weights.branding || 0.15) * 100),
        circularity: Math.round((weights.circularity || 0.10) * 100)
      });
    }
  }, [weights]);

  const handleApplyPreset = (presetKey) => {
    setPreset(presetKey);
    const pWeights = BRAND_PRESETS[presetKey].weights;
    setCustomWeights(pWeights);
    
    // Normalize to decimals (0.0 - 1.0)
    const normalized = {
      sustainability: pWeights.sustainability / 100,
      protection: pWeights.protection / 100,
      cost: pWeights.cost / 100,
      branding: pWeights.branding / 100,
      circularity: pWeights.circularity / 100
    };
    
    onChange(normalized);
    if (onRecalculateLive) onRecalculateLive(normalized);
  };

  const handleSliderChange = (dimension, val) => {
    setPreset('custom');
    const updated = { ...customWeights, [dimension]: val };
    setCustomWeights(updated);

    const total = (updated.sustainability + updated.protection + updated.cost + updated.branding + updated.circularity) || 1;
    const normalized = {
      sustainability: roundDec(updated.sustainability / total),
      protection: roundDec(updated.protection / total),
      cost: roundDec(updated.cost / total),
      branding: roundDec(updated.branding / total),
      circularity: roundDec(updated.circularity / total)
    };

    onChange(normalized);
    if (onRecalculateLive) onRecalculateLive(normalized);
  };

  const roundDec = (val) => Math.round(val * 100) / 100;

  const totalSum = customWeights.sustainability + customWeights.protection + customWeights.cost + customWeights.branding + customWeights.circularity;

  // Normalized percentages for display equation
  const normP = {
    s: roundDec((customWeights.sustainability / (totalSum || 1))),
    pr: roundDec((customWeights.protection / (totalSum || 1))),
    c: roundDec((customWeights.cost / (totalSum || 1))),
    b: roundDec((customWeights.branding / (totalSum || 1))),
    circ: roundDec((customWeights.circularity / (totalSum || 1)))
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px', border: '1px solid var(--border-soft)', marginBottom: '20px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="var(--brand-primary)" />
          <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
            🎯 Multi-Objective Scoring Model & Brand Priorities
          </h4>
        </div>
        <button 
          onClick={() => setShowSliders(!showSliders)}
          className="btn-secondary"
          style={{ padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          {showSliders ? 'Hide Sliders' : '⚙️ Custom Sliders'}
        </button>
      </div>

      {/* Preset Cards Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '16px' }}>
        {Object.keys(BRAND_PRESETS).map((key) => {
          const item = BRAND_PRESETS[key];
          const Icon = item.icon;
          const isSelected = preset === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleApplyPreset(key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-soft)'}`,
                background: isSelected ? 'var(--bg-card-highlight, #ECFDF5)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                <Icon size={18} color={isSelected ? 'var(--brand-primary)' : 'var(--text-heading)'} />
                {isSelected && <Check size={14} color="var(--brand-primary)" />}
              </div>
              <strong style={{ fontSize: '0.85rem', color: isSelected ? 'var(--brand-primary)' : 'var(--text-heading)' }}>
                {item.name}
              </strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.2' }}>
                {item.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Sliders Panel */}
      {showSliders && (
        <div style={{ background: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: '10px', marginBottom: '14px', border: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)' }}>Custom Dimension Priorities</span>
            <span style={{ fontSize: '0.72rem', color: totalSum === 100 ? 'var(--brand-primary)' : '#F59E0B', fontWeight: '700' }}>
              Total Weight: {totalSum}% {totalSum !== 100 && '(Auto-Normalized)'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                <span>🌱 Sustainability</span>
                <strong>{customWeights.sustainability}%</strong>
              </div>
              <input type="range" min="0" max="100" value={customWeights.sustainability} onChange={e => handleSliderChange('sustainability', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#10B981' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                <span>🛡️ Protection</span>
                <strong>{customWeights.protection}%</strong>
              </div>
              <input type="range" min="0" max="100" value={customWeights.protection} onChange={e => handleSliderChange('protection', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#3B82F6' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                <span>💰 Cost Economy</span>
                <strong>{customWeights.cost}%</strong>
              </div>
              <input type="range" min="0" max="100" value={customWeights.cost} onChange={e => handleSliderChange('cost', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#8B5CF6' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                <span>✨ Branding</span>
                <strong>{customWeights.branding}%</strong>
              </div>
              <input type="range" min="0" max="100" value={customWeights.branding} onChange={e => handleSliderChange('branding', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#EC4899' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                <span>🔄 Circularity</span>
                <strong>{customWeights.circularity}%</strong>
              </div>
              <input type="range" min="0" max="100" value={customWeights.circularity} onChange={e => handleSliderChange('circularity', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#06B6D4' }} />
            </div>
          </div>
        </div>
      )}

      {/* Live Equation Formula Box */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border-soft)', 
        padding: '10px 14px', 
        borderRadius: '8px', 
        fontSize: '0.75rem', 
        color: 'var(--text-heading)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Info size={14} color="var(--brand-primary)" />
          <span><strong>Active Mathematical Scoring Formula:</strong></span>
        </div>
        <code style={{ background: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-soft)', fontWeight: '700', color: '#0F172A', fontSize: '0.75rem' }}>
          Final Score = {normP.s}(Sustainability) + {normP.pr}(Protection) + {normP.c}(Cost) + {normP.b}(Branding) + {normP.circ}(Circularity)
        </code>
      </div>

    </div>
  );
}
