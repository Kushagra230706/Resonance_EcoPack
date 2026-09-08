import React, { useState } from 'react';
import { Palette, Feather, MessageSquare, Check, Sparkles, Copy } from 'lucide-react';

export default function BrandStyleGenerator() {
  const [brandName, setBrandName] = useState('EcoLumina');
  const [productType, setProductType] = useState('Fragile Glass Candle');
  const [sustainabilityFocus, setSustainabilityFocus] = useState('100% Plastic-Free & Curbside Recyclable');
  const [visualDirection, setVisualDirection] = useState('Minimalist & Premium');
  
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const [styleGuide, setStyleGuide] = useState({
    brand_name: "EcoLumina",
    packaging_copy: {
      tagline: "Thoughtfully Crafted. Sustainably Delivered.",
      exterior_quote: "Pure elements, zero single-use plastic.",
      inner_flap_message: "Welcome to EcoLumina. Unbox conscious elegance.",
      product_description_copy: "Hand-poured artisan candles encased in 100% curbside recyclable molded pulp cushion."
    },
    sustainability_message: "This packaging saves an estimated 31% CO₂e and replaces plastic bubble wrap with 100% renewable FSC-certified paper fibers.",
    color_palette: [
      { name: "Kraft Ochre", hex: "#D7C4A5", role: "Base Material" },
      { name: "Forest Emerald", hex: "#1B4332", role: "Primary Typography" },
      { name: "Warm Muted Gold", hex: "#D4AF37", role: "Accent Foil/Print" },
      { name: "Charcoal Ink", hex: "#212529", role: "Typography & Micro-copy" }
    ],
    visual_direction_details: {
      style_heading: "Minimalist & Premium",
      typography: "Modern Geometric Sans-Serif (Outfit / Inter) with high hierarchy contrast",
      finish_texture: "Soft-touch debossed raw paperboard with soy-based botanical inks",
      unboxing_experience: "Seamless lid lift revealing a precision-molded paper cushion insert"
    }
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/generate-brand-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: brandName,
          product_type: productType,
          sustainability_focus: sustainabilityFocus,
          visual_direction: visualDirection
        })
      });
      if (res.ok) {
        const data = await res.json();
        setStyleGuide(data);
      }
    } catch (err) {
      console.error("Brand style generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Top Header Card */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Palette size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-heading)' }}>AI Brand Style & Copy Generator</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Generate cohesive packaging copy, verified sustainability messaging, color palettes, and visual directions.</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              className="form-input"
              placeholder="e.g. EcoLumina"
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Product Type</label>
            <input
              type="text"
              value={productType}
              onChange={e => setProductType(e.target.value)}
              className="form-input"
              placeholder="e.g. Fragile Glass Candle"
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Sustainability Focus</label>
            <input
              type="text"
              value={sustainabilityFocus}
              onChange={e => setSustainabilityFocus(e.target.value)}
              className="form-input"
              placeholder="e.g. 100% Plastic-Free"
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Visual Direction</label>
            <select
              value={visualDirection}
              onChange={e => setVisualDirection(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
            >
              <option value="Minimalist & Premium">Minimalist & Premium</option>
              <option value="Eco-Rustic & Earthy">Eco-Rustic & Earthy</option>
              <option value="Modern Luxury Gold">Modern Luxury Gold</option>
              <option value="Vibrant Clean Botanical">Vibrant Clean Botanical</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Sparkles size={18} /> {loading ? 'Generating Brand Style Assets...' : 'Generate Brand Style Guide'}
            </button>
          </div>
        </form>
      </div>

      {/* Style Guide Results Output */}
      {styleGuide && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 1. Packaging Copy Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <MessageSquare size={22} color="var(--brand-primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)' }}>Packaging Copy & Copywriting</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase' }}>Main Tagline</span>
                  <button onClick={() => handleCopy(styleGuide.packaging_copy.tagline, 'tagline')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {copiedKey === 'tagline' ? <Check size={14} color="var(--brand-primary)" /> : <Copy size={14} />}
                  </button>
                </div>
                <p style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-heading)' }}>"{styleGuide.packaging_copy.tagline}"</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase' }}>Exterior Box Quote</span>
                  <button onClick={() => handleCopy(styleGuide.packaging_copy.exterior_quote, 'ext_quote')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {copiedKey === 'ext_quote' ? <Check size={14} color="var(--brand-primary)" /> : <Copy size={14} />}
                  </button>
                </div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-body)' }}>"{styleGuide.packaging_copy.exterior_quote}"</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase' }}>Inner Flap Message</span>
                  <button onClick={() => handleCopy(styleGuide.packaging_copy.inner_flap_message, 'inner_flap')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {copiedKey === 'inner_flap' ? <Check size={14} color="var(--brand-primary)" /> : <Copy size={14} />}
                  </button>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>"{styleGuide.packaging_copy.inner_flap_message}"</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase' }}>Product Unboxing Copy</span>
                  <button onClick={() => handleCopy(styleGuide.packaging_copy.product_description_copy, 'pdesc')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {copiedKey === 'pdesc' ? <Check size={14} color="var(--brand-primary)" /> : <Copy size={14} />}
                  </button>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>{styleGuide.packaging_copy.product_description_copy}</p>
              </div>

            </div>
          </div>

          {/* 2. Sustainability Message Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--brand-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Feather size={22} color="var(--brand-primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)' }}>Verified Sustainability Statement</h3>
              </div>
              <button onClick={() => handleCopy(styleGuide.sustainability_message, 'sust_msg')} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {copiedKey === 'sust_msg' ? <Check size={14} color="var(--brand-primary)" /> : <Copy size={14} />} Copy Statement
              </button>
            </div>
            <div style={{ background: 'var(--bg-card-highlight)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-soft)', fontSize: '0.95rem', color: 'var(--brand-primary)', fontWeight: '600', lineHeight: '1.5' }}>
              🌱 "{styleGuide.sustainability_message}"
            </div>
          </div>

          {/* 3. Color Palette Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Palette size={22} color="var(--brand-primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)' }}>Brand Color Palette</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {styleGuide.color_palette?.map((c, idx) => (
                <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ height: '70px', background: c.hex, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }} />
                  <div style={{ padding: '12px' }}>
                    <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-heading)' }}>{c.name}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{c.hex}</span>
                      <button onClick={() => handleCopy(c.hex, `hex_${idx}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        {copiedKey === `hex_${idx}` ? <Check size={12} color="var(--brand-primary)" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.7rem', padding: '2px 6px', background: 'var(--bg-card-highlight)', borderRadius: '4px', color: 'var(--brand-primary)', fontWeight: '600' }}>
                      {c.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Visual Direction Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '16px' }}>
              ✨ Visual Direction Guidelines ({styleGuide.visual_direction_details?.style_heading || visualDirection})
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>Typography System</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.4' }}>{styleGuide.visual_direction_details?.typography}</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>Finish & Material Texture</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.4' }}>{styleGuide.visual_direction_details?.finish_texture}</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-soft)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>Unboxing Experience</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.4' }}>{styleGuide.visual_direction_details?.unboxing_experience}</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
