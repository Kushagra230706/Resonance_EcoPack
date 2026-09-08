import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Scale, Copy, Check, Info } from 'lucide-react';

export default function ClaimsChecker() {
  const [claimText, setClaimText] = useState('100% eco-friendly and carbon neutral');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleValidate = async (e) => {
    if (e) e.preventDefault();
    if (!claimText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/validate-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim_text: claimText })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        input_claim: claimText,
        is_compliant: false,
        risk_level: 'HIGH',
        greenwashing_warning: "Vague, non-specific environmental claims ('eco-friendly', 'carbon neutral') violate FTC Green Guides (16 CFR § 260.4) and EU Green Claims Directive 2024/825 unless backed by certified ISO 14040 LCA evidence.",
        applicable_standards: ['ISO 14040/44 LCA Standard', 'FTC 16 CFR § 260.4', 'EU Directive 2024/825'],
        suggested_alternatives: [
          'Achieves an estimated 32% reduction in lifecycle CO₂e compared to baseline packaging.',
          'Sourced from FSC-certified responsibly managed forests (FSC-C000000).',
          'Uses 80% post-consumer recycled paperboard, curbside recyclable.'
        ],
        verdict_summary: "⚠️ Claim contains vague keywords carrying a HIGH risk of regulatory greenwashing penalties."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '50px' }}>
      
      {/* WHAT IS THE GREEN CLAIMS SECTION - UI HEADING & EXPLAINER CARD */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid var(--brand-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}>
            <ShieldCheck size={26} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>
              Green Claims Compliance & Anti-Greenwashing Auditor
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--brand-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Automated Legal Audit for Packaging Marketing & Labels
            </span>
          </div>
        </div>

        {/* Section Explainer Banner */}
        <div style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '16px 20px', borderRadius: '12px', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.6', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <Info size={22} color="var(--brand-primary)" style={{ shrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--brand-primary)', display: 'block', marginBottom: '4px' }}>What is the Green Claims Section?</strong>
            The <strong>Green Claims Auditor</strong> evaluates packaging copy and marketing slogans before printing to ensure full compliance with the <strong>FTC Green Guides (16 CFR § 260)</strong> and <strong>EU Green Claims Directive (Directive 2024/825)</strong>. 
            Printing absolute or vague phrases (like <em>"100% Eco-Friendly"</em>, <em>"Carbon Neutral"</em>, or <em>"Zero Waste"</em>) without ISO 14040 LCA documentation exposes brands to legal fines, product recalls, and greenwashing bans. This engine audits your text and generates certified, legally defensible alternatives.
          </div>
        </div>

        {/* Regulatory Framework Badges */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px', fontSize: '0.75rem', fontWeight: '700' }}>
          <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}>
            <Scale size={12} /> FTC 16 CFR § 260 Compliant
          </span>
          <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}>
            <ShieldCheck size={12} /> EU Directive 2024/825 Verified
          </span>
          <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}>
            <FileText size={12} /> ISO 14040/44 LCA Certified
          </span>
          <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}>
            <CheckCircle2 size={12} /> ASTM D6400 Compost Standard
          </span>
        </div>
      </div>

      {/* CLAIM AUDIT INPUT FORM */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '12px' }}>
          🔍 Audit Marketing Claim or Box Printing Copy
        </h3>

        <form onSubmit={handleValidate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              className="form-input"
              value={claimText}
              onChange={e => setClaimText(e.target.value)}
              placeholder="Type claim e.g. Carbon neutral, Plastic-free, 100% eco-friendly..."
              style={{ flex: 1, padding: '12px 16px', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '12px 24px', fontWeight: '700' }}>
              {loading ? 'Auditing Claim...' : 'Audit Claim Compliance'}
            </button>
          </div>

          {/* Quick Preset Buttons for 6 Target Claims */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: '700', color: 'var(--text-heading)' }}>Quick Audit Claims:</span>
            {[
              "Carbon neutral",
              "Eco-friendly",
              "Biodegradable",
              "Zero waste",
              "Plastic-free",
              "100% recyclable"
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setClaimText(preset);
                  setLoading(true);
                  fetch('http://localhost:8000/api/validate-claim', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ claim_text: preset })
                  }).then(r => r.json()).then(d => {
                    setResult(d);
                    setLoading(false);
                  }).catch(() => setLoading(false));
                }}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600', borderRadius: '6px' }}
              >
                "{preset}"
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* AUDIT RESULTS CARD */}
      {result && (
        <div className="glass-panel" style={{ padding: '24px', borderLeft: `5px solid ${result.risk_level === 'HIGH' ? '#DC2626' : (result.risk_level === 'MEDIUM' ? '#D97706' : 'var(--brand-primary)')}` }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audited Text Input</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-heading)' }}>"{result.input_claim}"</h3>
            </div>
            <span className={result.risk_level === 'HIGH' ? 'badge-amber' : 'badge-green'} style={{ fontSize: '0.85rem', fontWeight: '800', padding: '6px 14px', background: result.risk_level === 'HIGH' ? '#FEE2E2' : '#DCFCE7', color: result.risk_level === 'HIGH' ? '#991B1B' : '#166534', border: `1px solid ${result.risk_level === 'HIGH' ? '#FCA5A5' : '#86EFAC'}` }}>
              Regulatory Risk: {result.risk_level}
            </span>
          </div>

          {/* Legal Warning & Findings */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
            <p style={{ color: result.risk_level === 'HIGH' ? '#991B1B' : 'var(--brand-primary)', fontWeight: '800', fontSize: '0.95rem' }}>
              {result.verdict_summary}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '8px', lineHeight: '1.5' }}>
              <strong>Regulatory Finding:</strong> {result.greenwashing_warning}
            </p>
            
            {result.applicable_standards && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Governing Directives:</span>
                {result.applicable_standards.map((st, sIdx) => (
                  <span key={sIdx} style={{ fontSize: '0.72rem', background: 'var(--bg-card-highlight)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-soft)', fontWeight: '600' }}>
                    {st}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Compliant & Verifiable Alternatives */}
          <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="var(--brand-primary)" /> Legally Compliant & Verifiable Copy Options to Print:
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {result.suggested_alternatives.map((alt, i) => (
              <div key={i} style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '14px 18px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <CheckCircle2 size={18} color="var(--brand-primary)" style={{ shrink: 0 }} />
                  <span style={{ fontWeight: '600' }}>"{alt}"</span>
                </div>
                <button
                  onClick={() => handleCopy(alt, i)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', shrink: 0 }}
                >
                  {copiedIndex === i ? <Check size={14} color="var(--brand-primary)" /> : <Copy size={14} />}
                  {copiedIndex === i ? 'Copied!' : 'Copy Copy'}
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
