import React, { useState } from 'react';
import { Briefcase, ArrowRight, ShieldCheck, TrendingDown, Sparkles, Check, DollarSign, Leaf, Layers } from 'lucide-react';

export default function CaseStudiesDashboard({ onApplyCaseStudy }) {
  const [activeCase, setActiveCase] = useState('fragile');

  const caseStudies = {
    fragile: {
      id: 'fragile',
      title: 'Case Study 1: Fragile Glass / Candle / Electronics',
      subtitle: 'Fragile Candle & Glassware Packaging Optimization',
      examples: 'Glass bottle, artisan candle, electronics accessory',
      current_packaging: 'Single-use plastic bubble wrap + virgin cardboard box',
      ecopack_recommendation: 'Monomaterial Recycled Corrugated Box + Molded Paper Pulp Cushion',
      highlights: [
        { label: 'CO₂e Reduction', value: '-28.0%', subtext: '100g → 72g / unit' },
        { label: 'Cost Savings', value: '-13.6%', subtext: '₹22 → ₹19 / unit' },
        { label: 'Protection Rating', value: '85/100', subtext: 'Improved from 78/100' }
      ],
      table: [
        { metric: 'CO₂e / unit', current: '100 g', ecopack: '72 g', status: '28% Reduction' },
        { metric: 'Cost / unit', current: '₹22', ecopack: '₹19', status: '13.6% Cheaper' },
        { metric: 'Protection score', current: '78 / 100', ecopack: '85 / 100', status: '+7 Points Higher' },
        { metric: 'Void space', current: '42%', ecopack: '18%', status: '-24% Less Air' },
        { metric: 'Recyclability', current: 'Medium (Plastic+Paper)', ecopack: 'High (100% Curbside Paper)', status: 'Fully Circular' }
      ],
      specs: {
        product_type: 'fragile_glass',
        fragility: 'high',
        length_cm: 10.0,
        width_cm: 10.0,
        height_cm: 12.0,
        weight_g: 400.0,
        product_value_usd: 25.0,
        budget_limit_usd: 0.42,
        sustainability_goal: 'lowest_plastic'
      }
    },
    fashion: {
      id: 'fashion',
      title: 'Case Study 2: Fashion / E-commerce Product',
      subtitle: 'Apparel & Garment Shipping Mailer Optimization',
      examples: 'T-shirt, shoes, cosmetics pouch, apparel',
      current_packaging: 'Polyethylene (LDPE) single-use plastic mailer bag',
      ecopack_recommendation: 'Honeycomb Padded Kraft Paper Mailer + Soy Ink Branding',
      highlights: [
        { label: 'Void Space Cut', value: '-60.0%', subtext: '40% → 16% volume' },
        { label: 'Plastic Reduction', value: '100%', subtext: 'Zero single-use plastic' },
        { label: 'Shipping Cost', value: '-18.5%', subtext: 'Dimensional weight savings' }
      ],
      table: [
        { metric: 'CO₂e / unit', current: '140 g', ecopack: '68 g', status: '51.4% Reduction' },
        { metric: 'Cost / unit', current: '₹18', ecopack: '₹14', status: '₹4 Savings / Unit' },
        { metric: 'Protection score', current: '72 / 100', ecopack: '84 / 100', status: '+12 Points Higher' },
        { metric: 'Void space', current: '40%', ecopack: '16%', status: '60% Air Cut' },
        { metric: 'Recyclability', current: 'Low (Landfill Plastic)', ecopack: 'High (100% Curbside Paper)', status: 'Zero Plastic' }
      ],
      specs: {
        product_type: 'apparel',
        fragility: 'low',
        length_cm: 32.0,
        width_cm: 24.0,
        height_cm: 3.0,
        weight_g: 220.0,
        product_value_usd: 20.0,
        budget_limit_usd: 0.30,
        sustainability_goal: 'lowest_plastic'
      }
    },
    food: {
      id: 'food',
      title: 'Case Study 3: Food or FMCG Product',
      subtitle: 'Snack Box & Food Container Sustainability Upgrade',
      examples: 'Snack box, takeaway container, dry food pouch',
      current_packaging: 'Multi-layer plastic-laminated aluminium foil pouch',
      ecopack_recommendation: 'Bio-Lined FSC Starch-Coated Paper Container',
      highlights: [
        { label: 'Food Safety', value: 'FDA Compliant', subtext: 'Direct contact approved' },
        { label: 'Moisture Barrier', value: '2.1 g/m²/day', subtext: 'Bio-wax coating' },
        { label: 'Compostability', value: 'EN 13432', subtext: '100% Bio-degradable' }
      ],
      table: [
        { metric: 'CO₂e / unit', current: '95 g', ecopack: '62 g', status: '34.7% Carbon Cut' },
        { metric: 'Cost / unit', current: '₹16', ecopack: '₹15', status: '₹1 Savings / Unit' },
        { metric: 'Protection score', current: '80 / 100', ecopack: '88 / 100', status: '+8 Points Higher' },
        { metric: 'Void space', current: '35%', ecopack: '12%', status: '-23% Space Saved' },
        { metric: 'Recyclability', current: 'Low (Non-recyclable Foil)', ecopack: 'High (Compostable Paper)', status: 'Biological Recovery' }
      ],
      specs: {
        product_type: 'food',
        fragility: 'medium',
        length_cm: 15.0,
        width_cm: 12.0,
        height_cm: 8.0,
        weight_g: 300.0,
        product_value_usd: 12.0,
        budget_limit_usd: 0.25,
        sustainability_goal: 'compostable'
      }
    }
  };

  const currentData = caseStudies[activeCase];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', paddingBottom: '50px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-heading)' }}>Real-World EcoPack Case Studies</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Before vs. After quantitative performance metrics across Fragile Goods, Fashion, and Food/FMCG packaging.</p>
          </div>
        </div>

        {/* Case Study Selector Tabs */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCase('fragile')}
            className={activeCase === 'fragile' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: '700' }}
          >
            🕯️ Fragile Glass & Candle
          </button>
          <button
            onClick={() => setActiveCase('fashion')}
            className={activeCase === 'fashion' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: '700' }}
          >
            👕 Fashion & E-commerce
          </button>
          <button
            onClick={() => setActiveCase('food')}
            className={activeCase === 'food' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: '700' }}
          >
            🍱 Food & FMCG Products
          </button>
        </div>
      </div>

      {/* Selected Case Study Active Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Top Summary Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{currentData.title}</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-heading)', marginTop: '4px' }}>{currentData.subtitle}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}><strong>Examples:</strong> {currentData.examples}</p>
            </div>
            
            {onApplyCaseStudy && (
              <button
                onClick={() => onApplyCaseStudy(currentData.specs)}
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: '0.85rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Sparkles size={16} /> Apply This Case Study to Optimizer
              </button>
            )}
          </div>

          {/* Current vs EcoPack Comparison Header Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9F1239', textTransform: 'uppercase' }}>❌ Current Packaging Baseline</span>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#881337', marginTop: '6px' }}>{currentData.current_packaging}</p>
            </div>
            <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase' }}>✅ EcoPack AI Optimized Design</span>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--brand-primary)', marginTop: '6px' }}>{currentData.ecopack_recommendation}</p>
            </div>
          </div>

          {/* Key Metric Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {currentData.highlights.map((h, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-soft)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>{h.label}</span>
                <p style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--brand-primary)', marginTop: '4px' }}>{h.value}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.subtext}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BEFORE VS AFTER QUANTITATIVE METRIC TABLE */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '16px' }}>
            📊 Before vs. After Quantitative Performance Table
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-soft)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-heading)' }}>Metric</th>
                  <th style={{ padding: '12px 16px', fontWeight: '700', color: '#9F1239' }}>Current Packaging</th>
                  <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--brand-primary)' }}>EcoPack Recommendation</th>
                  <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-heading)' }}>Performance Gain</th>
                </tr>
              </thead>
              <tbody>
                {currentData.table.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-soft)', background: idx % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-heading)' }}>{row.metric}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-body)', fontWeight: '600' }}>{row.current}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--brand-primary)', fontWeight: '700' }}>{row.ecopack}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge-green" style={{ fontSize: '0.75rem' }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
