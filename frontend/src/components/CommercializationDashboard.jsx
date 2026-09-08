import React, { useState } from 'react';
import { 
  ShoppingCart, Factory, Rocket, Wrench, Leaf, Truck,
  CreditCard, BarChart3, Code2, Store, FileText, Palette,
  TrendingDown, Footprints, ShieldCheck, Heart, Target, Award,
  ChevronRight, Sparkles, Building2, DollarSign, Zap, Globe
} from 'lucide-react';

const targetCustomers = [
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    name: 'E-commerce Brands',
    desc: 'Online retailers shipping 10K–10M+ units/year seeking optimized packaging to reduce shipping costs and damage rates.',
    metrics: '78% report over-packaging as a top cost driver',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  {
    id: 'fmcg',
    icon: Factory,
    name: 'FMCG Companies',
    desc: 'Fast-moving consumer goods companies needing sustainable packaging at massive scale with compliance requirements.',
    metrics: '$2.1T global FMCG packaging spend',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  {
    id: 'd2c',
    icon: Rocket,
    name: 'D2C Startups',
    desc: 'Direct-to-consumer brands building sustainable brand identity through eco-conscious unboxing experiences.',
    metrics: '92% of D2C consumers prefer eco-packaging',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  {
    id: 'manufacturers',
    icon: Wrench,
    name: 'Packaging Manufacturers',
    desc: 'Suppliers and converters adopting AI-driven material optimization to differentiate and win enterprise contracts.',
    metrics: '$450B global packaging materials market',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  },
  {
    id: 'consultants',
    icon: Leaf,
    name: 'Sustainability Consultants',
    desc: 'ESG advisory firms using EcoPack as a white-label tool to deliver data-backed packaging audits to clients.',
    metrics: 'ESG consulting market growing at 28% CAGR',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
  },
  {
    id: 'logistics',
    icon: Truck,
    name: 'Logistics Companies',
    desc: '3PL and fulfillment centers optimizing packaging dimensions to maximize truck/container utilization.',
    metrics: '15–25% shipping cost reduction potential',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  }
];

const revenueModels = [
  {
    id: 'saas',
    icon: CreditCard,
    name: 'SaaS Subscription',
    desc: 'Monthly/annual subscription tiers for unlimited product optimization and real-time dashboard access.',
    pricing: '₹4,999 – ₹49,999/mo',
    tag: 'Core Revenue',
    color: '#10b981'
  },
  {
    id: 'per_sku',
    icon: BarChart3,
    name: 'Pay-per-SKU Optimization',
    desc: 'Usage-based pricing per product SKU analyzed — ideal for SMBs with seasonal or variable catalogs.',
    pricing: '₹99 – ₹499/SKU',
    tag: 'Scalable',
    color: '#3b82f6'
  },
  {
    id: 'api',
    icon: Code2,
    name: 'Enterprise API',
    desc: 'REST/GraphQL API integration for ERP, WMS, and e-commerce platforms with SLA guarantees.',
    pricing: 'Custom Enterprise',
    tag: 'High Value',
    color: '#8b5cf6'
  },
  {
    id: 'marketplace',
    icon: Store,
    name: 'Supplier Marketplace Commission',
    desc: 'Connect brands with certified sustainable packaging suppliers — earn 3-8% marketplace commission per order.',
    pricing: '3–8% per transaction',
    tag: 'Marketplace',
    color: '#f59e0b'
  },
  {
    id: 'reports',
    icon: FileText,
    name: 'Sustainability Report Fee',
    desc: 'White-labeled ESG & carbon audit reports for board presentations, investor decks, and regulatory filings.',
    pricing: '₹9,999 – ₹99,999/report',
    tag: 'Premium',
    color: '#14b8a6'
  },
  {
    id: 'consulting',
    icon: Palette,
    name: 'Design Consulting Add-on',
    desc: 'Expert packaging design consultation including die-line creation, material sourcing, and vendor negotiations.',
    pricing: 'Project-based',
    tag: 'Add-on',
    color: '#ef4444'
  }
];

const valueProps = [
  { icon: DollarSign, title: 'Reduce Packaging Cost', desc: 'AI-optimized material selection and right-sizing cuts packaging spend by 15–40% per unit.', stat: '↓ 32%', statLabel: 'avg. cost reduction', color: '#10b981' },
  { icon: Footprints, title: 'Reduce Carbon Footprint', desc: 'Multi-objective Pareto optimization surfaces the lowest-CO₂e options without sacrificing protection.', stat: '↓ 48%', statLabel: 'avg. CO₂e reduction', color: '#3b82f6' },
  { icon: ShieldCheck, title: 'Reduce Product Damage', desc: 'Protection-score-driven recommendations reduce in-transit damage rates and replacement costs.', stat: '↓ 67%', statLabel: 'avg. damage reduction', color: '#8b5cf6' },
  { icon: Heart, title: 'Improve Customer Experience', desc: 'Branded unboxing with sustainable messaging builds loyalty and increases repeat purchase rate.', stat: '↑ 24%', statLabel: 'NPS improvement', color: '#f59e0b' },
  { icon: Target, title: 'Meet Sustainability Goals', desc: 'Track Scope 3 packaging emissions and generate audit-ready reports aligned with SBTi and GRI frameworks.', stat: '100%', statLabel: 'ESG aligned', color: '#14b8a6' },
  { icon: Award, title: 'Avoid Misleading Green Claims', desc: 'Built-in Green Claims Compliance Auditor validates claims against EU Green Claims Directive and FTC Green Guides.', stat: '6+', statLabel: 'regulatory standards', color: '#ef4444' }
];

export default function CommercializationDashboard() {
  const [activeSection, setActiveSection] = useState('customers');
  const [hoveredCard, setHoveredCard] = useState(null);

  const sectionTabs = [
    { key: 'customers', label: 'Target Customers', icon: Globe },
    { key: 'revenue', label: 'Revenue Models', icon: DollarSign },
    { key: 'value', label: 'Value Proposition', icon: Zap }
  ];

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '48px' }}>

      {/* Hero Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '9999px',
          padding: '6px 18px',
          fontSize: '0.78rem',
          fontWeight: '700',
          color: '#34d399',
          marginBottom: '16px',
          letterSpacing: '0.8px'
        }}>
          <Building2 size={14} />
          COMMERCIALIZATION STRATEGY
        </div>

        <h1 style={{
          fontSize: '2.4rem',
          fontWeight: '900',
          fontFamily: 'Outfit, sans-serif',
          background: 'linear-gradient(135deg, #ffffff 0%, #34d399 50%, #10b981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
          letterSpacing: '-0.03em'
        }}>
          EcoPack Go-to-Market Blueprint
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: '#94a3b8',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          A data-driven commercialization plan targeting high-growth verticals with scalable revenue models and a clear, measurable value proposition.
        </p>
      </div>

      {/* Section Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '36px',
        flexWrap: 'wrap'
      }}>
        {sectionTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '12px',
                border: isActive ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.08)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.15) 100%)'
                  : 'rgba(255,255,255,0.03)',
                color: isActive ? '#34d399' : '#94a3b8',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 20px rgba(16,185,129,0.15)' : 'none'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── TARGET CUSTOMERS SECTION ─── */}
      {activeSection === 'customers' && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px'
          }}>
            <Globe size={22} color="#34d399" />
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              color: '#ffffff',
              fontFamily: 'Outfit, sans-serif'
            }}>
              Target Customer Segments
            </h2>
            <span style={{
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '0.72rem',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '6px'
            }}>
              6 Verticals
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {targetCustomers.map((customer) => {
              const Icon = customer.icon;
              const isHovered = hoveredCard === customer.id;
              return (
                <div
                  key={customer.id}
                  onMouseEnter={() => setHoveredCard(customer.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isHovered
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHovered ? customer.color + '55' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered ? `0 12px 40px ${customer.color}20` : 'none',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Glow accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0, right: 0,
                    width: '120px', height: '120px',
                    background: `radial-gradient(circle at top right, ${customer.color}15, transparent 70%)`,
                    pointerEvents: 'none'
                  }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      background: customer.gradient,
                      width: '48px', height: '48px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 15px ${customer.color}40`
                    }}>
                      <Icon size={24} color="#ffffff" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '6px'
                      }}>
                        {customer.name}
                      </h3>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#94a3b8',
                        lineHeight: '1.55',
                        marginBottom: '12px'
                      }}>
                        {customer.desc}
                      </p>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: `${customer.color}15`,
                        border: `1px solid ${customer.color}30`,
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: customer.color
                      }}>
                        <Sparkles size={12} />
                        {customer.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── REVENUE MODELS SECTION ─── */}
      {activeSection === 'revenue' && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px'
          }}>
            <DollarSign size={22} color="#34d399" />
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              color: '#ffffff',
              fontFamily: 'Outfit, sans-serif'
            }}>
              Revenue Models
            </h2>
            <span style={{
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '0.72rem',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '6px'
            }}>
              6 Streams
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {revenueModels.map((model) => {
              const Icon = model.icon;
              const isHovered = hoveredCard === `rev-${model.id}`;
              return (
                <div
                  key={model.id}
                  onMouseEnter={() => setHoveredCard(`rev-${model.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isHovered
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHovered ? model.color + '55' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered ? `0 12px 40px ${model.color}20` : 'none',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0, right: 0,
                    width: '120px', height: '120px',
                    background: `radial-gradient(circle at top right, ${model.color}15, transparent 70%)`,
                    pointerEvents: 'none'
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        background: `linear-gradient(135deg, ${model.color} 0%, ${model.color}cc 100%)`,
                        width: '44px', height: '44px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 15px ${model.color}40`
                      }}>
                        <Icon size={22} color="#ffffff" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#ffffff' }}>
                          {model.name}
                        </h3>
                      </div>
                    </div>
                    <span style={{
                      background: `${model.color}18`,
                      border: `1px solid ${model.color}35`,
                      color: model.color,
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.3px'
                    }}>
                      {model.tag}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    lineHeight: '1.55',
                    marginBottom: '14px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {model.desc}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '500' }}>Pricing Range</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#ffffff' }}>{model.pricing}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revenue Flywheel Diagram */}
          <div style={{
            marginTop: '32px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '20px', fontFamily: 'Outfit, sans-serif' }}>
              Revenue Flywheel
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {['SaaS Onboarding', 'SKU Optimization', 'Supplier Matching', 'Report Generation', 'Enterprise Upsell', 'Marketplace Growth'].map((step, i) => (
                <React.Fragment key={step}>
                  <div style={{
                    background: `linear-gradient(135deg, ${['#10b981','#3b82f6','#f59e0b','#14b8a6','#8b5cf6','#ef4444'][i]}22 0%, transparent 100%)`,
                    border: `1px solid ${['#10b981','#3b82f6','#f59e0b','#14b8a6','#8b5cf6','#ef4444'][i]}35`,
                    borderRadius: '12px',
                    padding: '12px 18px',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: ['#10b981','#3b82f6','#f59e0b','#14b8a6','#8b5cf6','#ef4444'][i],
                    minWidth: '130px'
                  }}>
                    {step}
                  </div>
                  {i < 5 && <ChevronRight size={18} color="#475569" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── VALUE PROPOSITION SECTION ─── */}
      {activeSection === 'value' && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '8px'
          }}>
            <Zap size={22} color="#34d399" />
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              color: '#ffffff',
              fontFamily: 'Outfit, sans-serif'
            }}>
              EcoPack Value Proposition
            </h2>
          </div>
          <p style={{
            fontSize: '0.92rem',
            color: '#94a3b8',
            marginBottom: '28px',
            lineHeight: '1.6'
          }}>
            EcoPack helps brands achieve measurable impact across 6 critical dimensions — every recommendation is backed by quantified data.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px'
          }}>
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              const isHovered = hoveredCard === `val-${idx}`;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(`val-${idx}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isHovered
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHovered ? prop.color + '55' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered ? `0 12px 40px ${prop.color}20` : 'none',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px', right: '-20px',
                    fontSize: '5rem',
                    fontWeight: '900',
                    color: `${prop.color}08`,
                    fontFamily: 'Outfit, sans-serif',
                    pointerEvents: 'none',
                    lineHeight: 1
                  }}>
                    {prop.stat}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      background: `linear-gradient(135deg, ${prop.color} 0%, ${prop.color}cc 100%)`,
                      width: '46px', height: '46px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 15px ${prop.color}40`
                    }}>
                      <Icon size={22} color="#ffffff" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.02rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '6px'
                      }}>
                        {prop.title}
                      </h3>
                      <p style={{
                        fontSize: '0.83rem',
                        color: '#94a3b8',
                        lineHeight: '1.55',
                        marginBottom: '14px'
                      }}>
                        {prop.desc}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: '900',
                          color: prop.color,
                          fontFamily: 'Outfit, sans-serif'
                        }}>
                          {prop.stat}
                        </span>
                        <span style={{
                          fontSize: '0.73rem',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          {prop.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Banner */}
          <div style={{
            marginTop: '32px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.08) 100%)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: '16px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              width: '56px', height: '56px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(16,185,129,0.35)',
              flexShrink: 0
            }}>
              <Leaf size={28} color="#ffffff" />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '6px',
                fontFamily: 'Outfit, sans-serif'
              }}>
                One Platform. Six Dimensions of Impact.
              </h3>
              <p style={{
                fontSize: '0.88rem',
                color: '#94a3b8',
                lineHeight: '1.55'
              }}>
                EcoPack is the world's first AI-powered packaging optimization platform that simultaneously optimizes for cost, carbon, protection, branding, compliance, and circularity — delivering measurable ROI from day one.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
