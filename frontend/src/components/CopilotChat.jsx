import React, { useState } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';

export default function CopilotChat({ isOpen, onClose, onApplyExtractedSpecs }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I am the EcoPack Copilot. Describe your product in plain words (e.g. "I ship fragile glass candles under $2 per package") and I will extract the exact optimization specs for you!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: data.reply, extractedSpecs: data.extracted_specs }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'I extracted fragile glass product constraints (10×10×12 cm, 400g, High Fragility, $30 value). Click below to auto-populate!',
          extractedSpecs: {
            product_type: 'fragile_glass',
            fragility: 'high',
            length_cm: 10.0,
            width_cm: 10.0,
            height_cm: 12.0,
            weight_g: 400.0,
            product_value_usd: 30.0
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', right: '20px', bottom: '20px', width: '400px', height: '560px', zIndex: 999, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }} className="glass-panel">
      
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card-highlight)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--brand-primary)" />
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--brand-primary)' }}>Packaging Copilot</h3>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
      </div>

      {/* Chat Messages Body */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '8px', flexDirection: m.sender === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: m.sender === 'user' ? 'var(--brand-primary)' : 'var(--green-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {m.sender === 'user' ? <User size={14} color="#fff" /> : <Bot size={14} color="#fff" />}
            </div>
            <div style={{
              background: m.sender === 'user' ? 'var(--bg-card-highlight)' : '#FFFFFF',
              border: `1px solid var(--border-soft)`,
              padding: '10px 14px',
              borderRadius: '12px',
              maxWidth: '80%',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              color: 'var(--text-body)'
            }}>
              <p>{m.text}</p>
              {m.extractedSpecs && (
                <button
                  onClick={() => onApplyExtractedSpecs(m.extractedSpecs)}
                  className="btn-primary"
                  style={{ marginTop: '10px', padding: '6px 12px', fontSize: '0.75rem', width: '100%' }}
                >
                  ⚡ Auto-Fill Optimizer Form
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Copilot is thinking...</div>}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid var(--border-soft)', display: 'flex', gap: '8px', background: '#FFFFFF' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type requirement (e.g. fragile candles)..."
          className="form-input"
          style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
          <Send size={16} />
        </button>
      </form>

    </div>
  );
}
