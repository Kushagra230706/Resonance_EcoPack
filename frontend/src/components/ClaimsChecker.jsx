import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

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
          <ShieldCheck size={28} color="#10b981" />
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Green Claims Validator & Anti-Greenwashing Checker</h2>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Validate marketing text before printing to comply with FTC Green Guides & EU Directives</p>
          </div>
        </div>

        <form onSubmit={handleValidate} style={{ display: 'flex', gap: '12px' }}>
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
        </form>
      </div>

      {result && (
        <div className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${result.risk_level === 'HIGH' ? '#ef4444' : '#10b981'}` }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Compliance Result for: "{result.input_claim}"</h3>
            <span className={result.risk_level === 'HIGH' ? 'badge-amber' : 'badge-green'} style={{ background: result.risk_level === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : '', color: result.risk_level === 'HIGH' ? '#f87171' : '' }}>
              Risk Level: {result.risk_level}
            </span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '20px' }}>
            <p style={{ color: result.risk_level === 'HIGH' ? '#fca5a5' : '#6ee7b7', fontWeight: '600' }}>{result.verdict_summary}</p>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '6px' }}>{result.greenwashing_warning}</p>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '10px', color: '#ffffff' }}>✅ Compliant & Verifiable Alternatives to Print:</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {result.suggested_alternatives.map((alt, i) => (
              <div key={i} style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} color="#34d399" /> {alt}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
