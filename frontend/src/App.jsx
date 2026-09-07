import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PackWiseHero from './components/PackWiseHero';
import ImageUploadModal from './components/ImageUploadModal';
import CopilotChat from './components/CopilotChat';
import DecisionCard from './components/DecisionCard';
import ComparisonDashboard from './components/ComparisonDashboard';
import ThreeDBoxPreview from './components/ThreeDBoxPreview';
import ExportModal from './components/ExportModal';
import ClaimsChecker from './components/ClaimsChecker';
import QRDisposalGuide from './components/QRDisposalGuide';
import { Camera, Sliders, RefreshCw, Layers, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Complete Form State
  const [formData, setFormData] = useState({
    length_cm: 12.0,
    width_cm: 8.0,
    height_cm: 6.0,
    weight_g: 250.0,
    fragility: 'high',
    moisture_sensitivity: 'medium',
    temperature_sensitivity: 'standard',
    product_type: 'fragile_glass',
    annual_volume: 10000,
    product_value_usd: 35.0,
    shipping_region: 'GLOBAL',
    shipping_distance_km: 500.0,
    shipping_mode: 'road',
    branding_preference: 'standard',
    budget_limit_usd: 5.0,
    sustainability_goal: 'balanced',
    user_weights: {
      sustainability: 0.35,
      cost: 0.25,
      protection: 0.25,
      branding: 0.10,
      circularity: 0.05
    }
  });

  const [results, setResults] = useState(null);
  const [showHero, setShowHero] = useState(true);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setShowHero(false); // Hide hero section when changing sections from navbar
  };

  const handleLogoClick = () => {
    setActiveTab('optimizer');
    setShowHero(true); // Show hero section on home/logo click
  };

  const runOptimization = async (customData = formData) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customData)
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        return;
      }
    } catch (err) {
      console.warn("Backend offline or unreachable, generating client-side fallback optimization results");
    }

    // Client-side fallback if backend API is not responding
    const fallbackResults = {
      product_summary: {
        category: customData.product_type || "fragile_glass",
        dimensions: `${customData.length_cm} x ${customData.width_cm} x ${customData.height_cm} cm`,
        volume_cm3: customData.length_cm * customData.width_cm * customData.height_cm,
        weight_g: customData.weight_g,
        fragility: customData.fragility,
        annual_volume: customData.annual_volume
      },
      recommended: {
        id: "opt_molded_paper",
        name: "Molded Paper Pulp + Recycled Carton",
        unit_cost_usd: 0.85,
        carbon_co2e_kg: 0.18,
        protection_score: 94,
        sustainability_score: 92,
        circularity_score: 96,
        branding_score: 82,
        damage_risk_pct: 1.2,
        net_score: 91.4,
        rationale: "Highest overall score balancing 94% protection for fragile items with 96% circularity.",
        dieline: {
          style: "RSC_Standard_Box",
          length: customData.length_cm,
          width: customData.width_cm,
          height: customData.height_cm,
          material: "Molded Paper Pulp",
          crease_lines: 8,
          cut_lines: 4
        }
      },
      alternatives: [
        { id: "opt_molded_paper", name: "Molded Paper Pulp + Recycled Carton", unit_cost_usd: 0.85, carbon_co2e_kg: 0.18, protection_score: 94, sustainability_score: 92, circularity_score: 96, branding_score: 82, damage_risk_pct: 1.2, net_score: 91.4 },
        { id: "opt_corrugated", name: "Double-Wall Corrugated Carton", unit_cost_usd: 0.65, carbon_co2e_kg: 0.24, protection_score: 96, sustainability_score: 85, circularity_score: 90, branding_score: 88, damage_risk_pct: 0.9, net_score: 88.7 },
        { id: "opt_paper_mailer", name: "Padded Honeycomb Paper Mailer", unit_cost_usd: 0.42, carbon_co2e_kg: 0.11, protection_score: 72, sustainability_score: 95, circularity_score: 98, branding_score: 70, damage_risk_pct: 4.8, net_score: 81.2 },
        { id: "opt_mono_pouch", name: "Mono-Material Recyclable Pouch", unit_cost_usd: 0.35, carbon_co2e_kg: 0.09, protection_score: 65, sustainability_score: 80, circularity_score: 85, branding_score: 75, damage_risk_pct: 6.2, net_score: 76.5 }
      ],
      tradeoffs: [
        { metric: "Cost vs Protection", title: "Cost vs Protection Trade-off", description: "Lowering packaging cost below $0.50 increases return damage rates by 4.2%." },
        { metric: "Carbon vs Cost", title: "Carbon Emissions vs Unit Cost", description: "Molded pulp saves 0.06kg CO2 per package at only $0.20 higher unit cost." },
        { metric: "Circularity vs Protection", title: "Circularity vs Physical Protection", description: "Recycled paper inserts match plastic bubble wrap protection without land-fill impact." }
      ]
    };
    setResults(fallbackResults);
    setLoading(false);
  };

  useEffect(() => {
    runOptimization();
  }, []);

  const handleApplySpecs = (specs) => {
    const updated = {
      ...formData,
      product_type: specs.product_type || formData.product_type,
      fragility: specs.fragility || formData.fragility,
      length_cm: specs.length_cm || formData.length_cm,
      width_cm: specs.width_cm || formData.width_cm,
      height_cm: specs.height_cm || formData.height_cm,
      weight_g: specs.weight_g || formData.weight_g,
      product_value_usd: specs.product_value_usd || formData.product_value_usd
    };
    setFormData(updated);
    runOptimization(updated);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        onLogoClick={handleLogoClick}
        onOpenCopilot={() => setIsCopilotOpen(true)} 
      />

      {/* Main Content Area */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Animated PackWise Hero Section - Only shown on initial landing or logo click */}
        {showHero && (
          <PackWiseHero 
            onStartOptimize={() => {
              const formElem = document.getElementById('product-input-form');
              if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenCopilot={() => setIsCopilotOpen(true)}
          />
        )}

        {activeTab === 'optimizer' && (
          <div id="product-input-form" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
            
            {/* Left Form Controls Panel */}
            <div className="glass-panel" style={{ padding: '20px', height: 'fit-content' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)' }}>
                  <Sliders size={18} color="var(--brand-primary)" /> Product Input Form
                </h2>
                <button 
                  onClick={() => setIsVisionOpen(true)} 
                  className="btn-secondary" 
                  style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                >
                  <Camera size={14} /> Vision AI
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); runOptimization(); }}>
                
                <div className="form-group">
                  <label>Product Category</label>
                  <select className="form-select" value={formData.product_type} onChange={e => setFormData({ ...formData, product_type: e.target.value })}>
                    <option value="fragile_glass">Fragile Glass / Cosmetics</option>
                    <option value="electronics">Consumer Electronics</option>
                    <option value="apparel">Apparel & Textiles</option>
                    <option value="food">FMCG & Dry Food</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Product Fragility Level</label>
                  <select className="form-select" value={formData.fragility} onChange={e => setFormData({ ...formData, fragility: e.target.value })}>
                    <option value="low">Low (Non-breakable)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Glass / Ceramics)</option>
                    <option value="very_high">Very High (Precision Optics)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>L (cm)</label>
                    <input type="number" className="form-input" value={formData.length_cm} onChange={e => setFormData({ ...formData, length_cm: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label>W (cm)</label>
                    <input type="number" className="form-input" value={formData.width_cm} onChange={e => setFormData({ ...formData, width_cm: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label>H (cm)</label>
                    <input type="number" className="form-input" value={formData.height_cm} onChange={e => setFormData({ ...formData, height_cm: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Weight (g)</label>
                    <input type="number" className="form-input" value={formData.weight_g} onChange={e => setFormData({ ...formData, weight_g: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label>Value ($)</label>
                    <input type="number" className="form-input" value={formData.product_value_usd} onChange={e => setFormData({ ...formData, product_value_usd: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Moisture Sensitivity</label>
                    <select className="form-select" value={formData.moisture_sensitivity} onChange={e => setFormData({ ...formData, moisture_sensitivity: e.target.value })}>
                      <option value="low">Low (Dry product)</option>
                      <option value="medium">Medium (Standard)</option>
                      <option value="high">High (Hydrophobic barrier needed)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Temp Sensitivity</label>
                    <select className="form-select" value={formData.temperature_sensitivity} onChange={e => setFormData({ ...formData, temperature_sensitivity: e.target.value })}>
                      <option value="standard">Standard Ambient</option>
                      <option value="temperature_controlled">Controlled Insulated</option>
                      <option value="refrigerated">Refrigerated Cold-chain</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Sustainability Priority Goal</label>
                  <select className="form-select" value={formData.sustainability_goal} onChange={e => setFormData({ ...formData, sustainability_goal: e.target.value })}>
                    <option value="balanced">Balanced Trade-off (Recommended)</option>
                    <option value="lowest_carbon">Lowest Carbon Emissions (Min CO₂e)</option>
                    <option value="lowest_plastic">Zero Single-Use Plastic</option>
                    <option value="recyclable">100% Curbside Recyclable</option>
                    <option value="compostable">Home / Industrial Compostable</option>
                    <option value="reusable">Reusable Returnable Shipper</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Shipping Mode</label>
                    <select className="form-select" value={formData.shipping_mode} onChange={e => setFormData({ ...formData, shipping_mode: e.target.value })}>
                      <option value="road">Road Courier Freight</option>
                      <option value="air">Air Express Cargo</option>
                      <option value="sea">Ocean Sea Freight</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget ($/unit)</label>
                    <input type="number" className="form-input" value={formData.budget_limit_usd} onChange={e => setFormData({ ...formData, budget_limit_usd: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Branding Style</label>
                    <select className="form-select" value={formData.branding_preference} onChange={e => setFormData({ ...formData, branding_preference: e.target.value })}>
                      <option value="basic">Minimal Basic</option>
                      <option value="standard">Standard Printed</option>
                      <option value="premium">Premium Luxury</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Shipping Region</label>
                    <select className="form-select" value={formData.shipping_region} onChange={e => setFormData({ ...formData, shipping_region: e.target.value })}>
                      <option value="GLOBAL">Global Average</option>
                      <option value="EU">European Union</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="SEA">Southeast Asia</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Annual Order Quantity</label>
                  <input type="number" className="form-input" value={formData.annual_volume} onChange={e => setFormData({ ...formData, annual_volume: parseInt(e.target.value) || 0 })} />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
                  {loading ? <RefreshCw className="animate-spin" size={16} /> : <Layers size={16} />} Recalculate Trade-offs
                </button>

              </form>

            </div>

            {/* Right Main Dashboard Panel */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button 
                  onClick={() => setIsExportOpen(true)} 
                  className="btn-primary" 
                  style={{ background: 'var(--green-secondary)' }}
                >
                  <FileText size={16} /> Open Export & RFQ Hub
                </button>
              </div>

              <DecisionCard data={results} />
              
              {results && results.recommended && (
                <ThreeDBoxPreview 
                  dieline={results.recommended.dieline} 
                  optionName={results.recommended.name} 
                />
              )}

              <ComparisonDashboard data={results} />
            </div>

          </div>
        )}

        {activeTab === 'claims' && <ClaimsChecker />}
        {activeTab === 'disposal' && <QRDisposalGuide />}

      </main>

      {/* Modals & Drawers */}
      {isVisionOpen && (
        <ImageUploadModal 
          onClose={() => setIsVisionOpen(false)} 
          onAutoPopulate={handleApplySpecs} 
        />
      )}

      {isExportOpen && (
        <ExportModal 
          data={results} 
          onClose={() => setIsExportOpen(false)} 
        />
      )}

      <CopilotChat 
        isOpen={isCopilotOpen} 
        onClose={() => setIsCopilotOpen(false)} 
        onApplyExtractedSpecs={handleApplySpecs} 
      />

    </div>
  );
}
