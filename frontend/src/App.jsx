import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageUploadModal from './components/ImageUploadModal';
import CopilotChat from './components/CopilotChat';
import DecisionCard from './components/DecisionCard';
import ComparisonDashboard from './components/ComparisonDashboard';
import ClaimsChecker from './components/ClaimsChecker';
import QRDisposalGuide from './components/QRDisposalGuide';
import { Camera, Sliders, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    length_cm: 12.0,
    width_cm: 8.0,
    height_cm: 6.0,
    weight_g: 250.0,
    fragility: 'high',
    product_type: 'fragile_glass',
    annual_volume: 10000,
    product_value_usd: 35.0,
    shipping_region: 'GLOBAL',
    shipping_distance_km: 500.0,
    user_weights: {
      sustainability: 0.35,
      cost: 0.25,
      protection: 0.25,
      branding: 0.10,
      circularity: 0.05
    }
  });

  // Optimization Result Data
  const [results, setResults] = useState(null);

  const runOptimization = async (customData = formData) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customData)
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      // Offline fallback mock optimization generator
      const mockBaseline = {
        id: 'opt_standard_plastic',
        name: 'Standard Cardboard + Plastic Bubble Wrap',
        unit_cost_usd: 2.45,
        co2e_kg: 0.485,
        protection_score: 78.0,
        branding_score: 60,
        recyclability_score: 45.0,
        damage_probability_pct: 4.8,
        overall_score: 62.5,
        outer_material: 'Virgin Corrugated Board',
        inner_material: 'LDPE Plastic Bubble Wrap'
      };

      const mockWinner = {
        id: 'opt_molded_pulp_carton',
        name: 'Compact Carton + Molded Pulp Shock Insert',
        unit_cost_usd: 1.85,
        co2e_kg: 0.312,
        protection_score: 92.0,
        branding_score: 88,
        recyclability_score: 95.0,
        damage_probability_pct: 1.2,
        overall_score: 89.4,
        outer_material: 'Recycled Cardboard (80% PCR)',
        inner_material: 'Molded Paper Pulp Insert'
      };

      const mockAlternatives = [
        mockWinner,
        {
          id: 'opt_mycelium_foam',
          name: 'Bio-Carton + Mushroom Mycelium Cushioning',
          unit_cost_usd: 2.95,
          co2e_kg: 0.180,
          protection_score: 94.0,
          branding_score: 92,
          recyclability_score: 98.0,
          damage_probability_pct: 0.8,
          overall_score: 84.1,
          outer_material: 'Recycled Cardboard (80% PCR)',
          inner_material: 'Mushroom Mycelium Foam'
        },
        {
          id: 'opt_recycled_honeycomb',
          name: '80% Recycled Carton + Kraft Honeycomb Wrap',
          unit_cost_usd: 1.65,
          co2e_kg: 0.345,
          protection_score: 84.0,
          branding_score: 82,
          recyclability_score: 92.0,
          damage_probability_pct: 2.1,
          overall_score: 81.0,
          outer_material: 'Recycled Cardboard (80% PCR)',
          inner_material: 'Kraft Paper Honeycomb'
        },
        mockBaseline
      ];

      setResults({
        recommended: mockWinner,
        baseline: mockBaseline,
        alternatives: mockAlternatives,
        annual_impact: {
          co2_saved_kg: Math.round((mockBaseline.co2e_kg - mockWinner.co2e_kg) * customData.annual_volume),
          cost_saved_usd: Math.round((mockBaseline.unit_cost_usd - mockWinner.unit_cost_usd) * customData.annual_volume),
          co2_reduction_pct: 35.6,
          annual_volume: customData.annual_volume
        },
        why_this_won: `EcoPack recommends '${mockWinner.name}' because it achieves a leading overall score of ${mockWinner.overall_score}/100. It reduces estimated CO₂e by 35.6% (${mockWinner.co2e_kg} kg vs ${mockBaseline.co2e_kg} kg baseline) while elevating product protection to 92/100 to prevent costly damage returns.`
      });
    } finally {
      setLoading(false);
    }
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
        setActiveTab={setActiveTab} 
        onOpenCopilot={() => setIsCopilotOpen(true)} 
      />

      {/* Main Content Area */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {activeTab === 'optimizer' && (
          <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
            
            {/* Left Control Panel Form */}
            <div className="glass-panel" style={{ padding: '20px', height: 'fit-content' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sliders size={18} color="#10b981" /> Product Input
                </h2>
                <button 
                  onClick={() => setIsVisionOpen(true)} 
                  className="btn-secondary" 
                  style={{ padding: '6px 10px', fontSize: '0.75rem', borderColor: 'rgba(16,185,129,0.4)', color: '#34d399' }}
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

                <div className="form-group">
                  <label>Annual Shipment Volume</label>
                  <input type="number" className="form-input" value={formData.annual_volume} onChange={e => setFormData({ ...formData, annual_volume: parseInt(e.target.value) || 0 })} />
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

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
                  {loading ? <RefreshCw className="animate-spin" size={16} /> : <Layers size={16} />} Recalculate Trade-offs
                </button>

              </form>

            </div>

            {/* Right Dashboard Area */}
            <div>
              <DecisionCard data={results} />
              <ComparisonDashboard data={results} />
            </div>

          </div>
        )}

        {activeTab === 'claims' && <ClaimsChecker />}
        {activeTab === 'disposal' && <QRDisposalGuide />}

      </main>

      {/* Modals & Slideouts */}
      {isVisionOpen && (
        <ImageUploadModal 
          onClose={() => setIsVisionOpen(false)} 
          onAutoPopulate={handleApplySpecs} 
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
