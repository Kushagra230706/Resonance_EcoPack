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
    product_type: 'fragile_glass',
    annual_volume: 10000,
    product_value_usd: 35.0,
    shipping_region: 'GLOBAL',
    shipping_distance_km: 500.0,
    shipping_mode: 'road',
    branding_preference: 'standard',
    budget_limit_usd: 5.0,
    user_weights: {
      sustainability: 0.35,
      cost: 0.25,
      protection: 0.25,
      branding: 0.10,
      circularity: 0.05
    }
  });

  // Optimization Results Data
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
      console.warn("Backend offline, using local optimizer calculation");
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
        
        {/* Animated PackWise Hero Section */}
        <PackWiseHero 
          onStartOptimize={() => {
            const formElem = document.getElementById('product-input-form');
            if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCopilot={() => setIsCopilotOpen(true)}
        />

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
                    <label>Shipping Mode</label>
                    <select className="form-select" value={formData.shipping_mode} onChange={e => setFormData({ ...formData, shipping_mode: e.target.value })}>
                      <option value="road">Road Freight</option>
                      <option value="air">Air Express</option>
                      <option value="sea">Sea Freight</option>
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
