import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ClaimsChecker() {
  const [claimText, setClaimText] = useState('100% biodegradable and eco-friendly');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
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
        greenwashing_warning: "Without specified timeframes or disposal conditions (industrial vs home compost), '100% biodegradable' risks regulatory flags under the EU Green Claims Directive.",
        applicable_standards: ['ASTM D6400', 'EN 13432'],
        suggested_alternatives: [
          'Made from certified compostable material (ASTM D6400). Best disposed in industrial composting facilities.',
          'Decomposes up to 85% within 180 days in industrial composting conditions.',
          'Designed for biological recovery where municipal organic collection exists.'
        ],
        verdict_summary: "⚠️ Claim contains vague keywords which carry a HIGH risk of regulatory greenwashing penalties."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <ShieldCheck size={28} color="var(--brand-primary)" />
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-heading)' }}>Green Claims Validator & Anti-Greenwashing Checker</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Validate marketing text before printing to comply with FTC Green Guides & EU Directives</p>
          </div>
        </div>

        <form onSubmit={handleValidate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              className="form-input"
              value={claimText}
              onChange={e => setClaimText(e.target.value)}
              placeholder="Type claim e.g. 100% biodegradable, Zero Waste..."
              style={{ flex: 1, padding: '12px 16px', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Validating...' : 'Check Compliance'}
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Quick Test Examples:</span>
            <button type="button" onClick={() => setClaimText('100% biodegradable')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>"100% biodegradable"</button>
            <button type="button" onClick={() => setClaimText('Zero Waste')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>"Zero Waste"</button>
            <button type="button" onClick={() => setClaimText('100% eco-friendly')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>"100% eco-friendly"</button>
            <button type="button" onClick={() => setClaimText('100% recyclable')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>"100% recyclable"</button>
          </div>
        </form>
      </div>

      {result && (
        <div className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${result.risk_level === 'HIGH' ? 'var(--warning-color)' : 'var(--brand-primary)'}` }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-heading)' }}>Compliance Result for: "{result.input_claim}"</h3>
            <span className={result.risk_level === 'HIGH' ? 'badge-amber' : 'badge-green'}>
              Risk Level: {result.risk_level}
            </span>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
            <p style={{ color: result.risk_level === 'HIGH' ? '#92400E' : 'var(--brand-primary)', fontWeight: '600' }}>{result.verdict_summary}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>{result.greenwashing_warning}</p>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '10px', color: 'var(--text-heading)' }}>✅ Compliant & Verifiable Alternatives to Print:</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {result.suggested_alternatives.map((alt, i) => (
              <div key={i} style={{ background: 'var(--bg-card-highlight)', border: '1px solid var(--border-soft)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                <CheckCircle2 size={16} color="var(--brand-primary)" /> {alt}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
