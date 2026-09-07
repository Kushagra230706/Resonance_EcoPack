import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, ShieldCheck, Leaf, Box, Cpu, DollarSign, Star, TrendingDown } from 'lucide-react';

export default function PackWiseHero({ onStartOptimize, onOpenCopilot }) {
  const [boxOpened, setBoxOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxOpened(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 70% 35%, #082d20 0%, #04140e 55%, #020907 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      padding: '48px 36px 40px 36px',
      marginBottom: '36px',
      boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.8)'
    }}>
      
      {/* Background Grid Pattern & Ambient Glows */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: '-120px',
        right: '-100px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* Main 2-Column Hero Grid */}
      <div style={{
        maxWidth: '1350px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>

        {/* LEFT COLUMN: Headline & CTAs */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#34d399',
              marginBottom: '20px'
            }}
          >
            <Sparkles size={14} color="#34d399" />
            <span>AI-Powered Packaging Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              fontWeight: '800',
              lineHeight: '1.12',
              color: '#FFFFFF',
              marginBottom: '20px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Don't Choose the Greenest Package. <br />
            <span style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #34d399 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Choose the Smartest One.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: '0.98rem',
              lineHeight: '1.6',
              color: '#a7f3d0',
              marginBottom: '28px',
              maxWidth: '560px'
            }}
          >
            PackWise uses AI and multi-objective optimization to find the best packaging solution by balancing cost, carbon footprint, product protection, circularity, and real-world sustainability.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}
          >
            <button 
              onClick={onStartOptimize}
              className="btn-primary" 
              style={{
                padding: '14px 28px',
                fontSize: '0.95rem',
                borderRadius: '12px',
                background: '#4ade80',
                color: '#04140e',
                fontWeight: '800',
                boxShadow: '0 0 30px rgba(74, 222, 128, 0.45)'
              }}
            >
              Optimize My Packaging <ArrowRight size={18} />
            </button>

            <button 
              onClick={onOpenCopilot}
              className="btn-secondary" 
              style={{
                padding: '14px 24px',
                fontSize: '0.95rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              See How It Works
            </button>
          </motion.div>

          {/* 3 Checkmark Feature Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#6ee7b7', fontWeight: '600' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#34d399', borderRadius: '50%', padding: '2px' }}><Check size={12} color="#000" /></div>
              <span>AI-Powered Optimization</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#34d399', borderRadius: '50%', padding: '2px' }}><Check size={12} color="#000" /></div>
              <span>Damage-Aware Carbon Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#34d399', borderRadius: '50%', padding: '2px' }}><Check size={12} color="#000" /></div>
              <span>Region-Aware Recyclability</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Box Visual on Pedestal + Swirling Green Aura & Metric Cards */}
        <div style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Glowing Pedestal Platform */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            width: '280px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.5) 0%, rgba(6, 78, 59, 0.2) 60%, transparent 100%)',
            boxShadow: '0 0 60px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(52, 211, 153, 0.5)',
            border: '1.5px solid rgba(52, 211, 153, 0.4)',
            transform: 'rotateX(70deg)'
          }} />

          {/* REALISTIC 3D CARDBOARD BOX */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '180px',
            perspective: '1000px',
            marginBottom: '40px'
          }}>
            
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(20deg) rotateY(-18deg)'
            }}>
              
              {/* Inner Dark Depth Cavity */}
              <div style={{
                position: 'absolute',
                inset: '2px',
                background: 'radial-gradient(circle, #020907 0%, #000000 100%)',
                boxShadow: 'inset 0 0 40px #000',
                borderRadius: '4px'
              }} />

              {/* Front Face of Carton */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #c78d46 0%, #8c5b23 100%)',
                border: '1.5px solid #dba15c',
                borderRadius: '4px',
                transform: 'translateZ(90px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '4px', borderRadius: '6px' }}>
                    <Leaf size={18} color="#3d2105" />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#3d2105', fontFamily: 'Outfit, sans-serif' }}>PackWise</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', opacity: 0.7 }}>
                  <Box size={14} color="#3d2105" />
                  <ShieldCheck size={14} color="#3d2105" />
                </div>
              </div>

              {/* 4 NATURAL OPEN FLAPS */}
              {/* Top Front Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: boxOpened ? -125 : 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '75px',
                  background: 'linear-gradient(180deg, #d99f5e 0%, #aa7336 100%)',
                  transformOrigin: 'top center',
                  transform: 'translateZ(90px)',
                  border: '1px solid #ecc08b',
                  borderRadius: '3px 3px 0 0',
                  zIndex: 10
                }}
              />

              {/* Top Back Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: boxOpened ? 125 : 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '75px',
                  background: 'linear-gradient(0deg, #b87d3b 0%, #7d4d1d 100%)',
                  transformOrigin: 'top center',
                  transform: 'translateZ(-90px)',
                  border: '1px solid #c48b48',
                  borderRadius: '3px 3px 0 0',
                  zIndex: 5
                }}
              />

              {/* Left Flap */}
              <motion.div
                initial={{ rotateZ: 0 }}
                animate={{ rotateZ: boxOpened ? -115 : 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '75px',
                  background: 'linear-gradient(-90deg, #c48b48 0%, #8c5923 100%)',
                  transformOrigin: 'left center',
                  border: '1px solid #d99f5e',
                  zIndex: 8
                }}
              />

              {/* Right Flap */}
              <motion.div
                initial={{ rotateZ: 0 }}
                animate={{ rotateZ: boxOpened ? 115 : 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '75px',
                  background: 'linear-gradient(90deg, #c48b48 0%, #8c5923 100%)',
                  transformOrigin: 'right center',
                  border: '1px solid #d99f5e',
                  zIndex: 8
                }}
              />

            </div>

            {/* RISING 3D PACKWISE EMBLEM & SWIRLING LEAF AURA */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.5 }}
              animate={{
                y: boxOpened ? -140 : 30,
                opacity: boxOpened ? 1 : 0,
                scale: boxOpened ? 1.05 : 0.5
              }}
              transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                x: '-50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 30,
                pointerEvents: 'none'
              }}
            >
              {/* Floating Leaf Particles Swirling out of box */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30 - (i * 10)],
                    x: [(i % 2 === 0 ? -15 : 15), (i % 2 === 0 ? -40 : 40)],
                    opacity: [1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  style={{ position: 'absolute', color: '#34d399', fontSize: '14px' }}
                >
                  🍃
                </motion.div>
              ))}

              {/* Glowing Volumetric Badge */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%)',
                padding: '12px 28px',
                borderRadius: '18px',
                boxShadow: '0 0 40px rgba(52, 211, 153, 0.8), inset 0 0 18px rgba(255, 255, 255, 0.5)',
                border: '2px solid #6ee7b7',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Cpu size={24} color="#FFFFFF" />
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '2px',
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                }}>
                  PackWise
                </span>
              </div>
            </motion.div>

          </div>

          {/* 5 Floating Glassmorphism Metric Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '-20px',
              background: 'rgba(4, 20, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#34d399',
              fontWeight: '700',
              boxShadow: '0 12px 25px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🍃 32% Lower CO₂</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              position: 'absolute',
              top: '25px',
              right: '-20px',
              background: 'rgba(4, 20, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#38bdf8',
              fontWeight: '700',
              boxShadow: '0 12px 25px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📦 28% Less Material Waste</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '90px',
              left: '-10px',
              background: 'rgba(4, 20, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#6ee7b7',
              fontWeight: '700',
              boxShadow: '0 12px 25px rgba(0,0,0,0.5)'
            }}
          >
            <span>🛡️ 94% Protection Score</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '90px',
              right: '-10px',
              background: 'rgba(4, 20, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#fbbf24',
              fontWeight: '700',
              boxShadow: '0 12px 25px rgba(0,0,0,0.5)'
            }}
          >
            <span>♻️ High Circularity</span>
          </motion.div>

          {/* Mini Live Line Graph Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{
              position: 'absolute',
              bottom: '15px',
              right: '30px',
              background: 'rgba(4, 20, 15, 0.9)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              color: '#a7f3d0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
            }}
          >
            <TrendingDown size={16} color="#34d399" />
            <div>
              <div style={{ fontWeight: '700', color: '#FFFFFF' }}>Optimizing your packaging...</div>
              <div style={{ fontSize: '0.65rem', color: '#34d399' }}>Live AI Trade-off Engine</div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* SECONDARY ANIMATION: Sustainable Delivery Semi-Truck & Floating Leaf Exhaust */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '75px',
        marginTop: '28px',
        borderTop: '1px dashed rgba(16, 185, 129, 0.25)',
        paddingTop: '10px',
        overflow: 'hidden'
      }}>
        
        {/* Road Line */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.5) 50%, transparent 100%)'
        }} />

        {/* Moving Semi-Truck */}
        <motion.div
          animate={{ x: ['-15%', '115%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            bottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '0px'
          }}
        >
          
          {/* Continuous Fluttering Green Leaf Exhaust Stream */}
          <div style={{ position: 'relative', width: '130px', height: '40px', marginRight: '-6px' }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [-5, -90 - (i * 14)],
                  y: [0, -25 - (i * 5)],
                  opacity: [1, 0],
                  scale: [0.7, 1.4],
                  rotate: [0, 240 + (i * 45)]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: 'easeOut'
                }}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '12px',
                  color: i % 2 === 0 ? '#34d399' : '#10b981',
                  fontSize: i % 2 === 0 ? '16px' : '12px',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))'
                }}
              >
                {i % 2 === 0 ? '🌿' : '🍃'}
              </motion.div>
            ))}
          </div>

          {/* High-Definition Semi-Truck Container & Driver Cab */}
          <div style={{ display: 'flex', alignItems: 'flex-end', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))' }}>
            
            {/* Long Trailer Container */}
            <div style={{
              background: 'linear-gradient(135deg, #053B2C 0%, #064E3B 100%)',
              border: '1.5px solid #34d399',
              borderRadius: '8px 4px 4px 8px',
              padding: '10px 20px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '1.5px', color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
                  PackWise
                </span>
                <span style={{ fontSize: '0.6rem', color: '#6ee7b7', fontWeight: '700', letterSpacing: '0.5px' }}>
                  Cleaner Packaging, Greener Future.
                </span>
              </div>
              <Leaf size={20} color="#34d399" />
              
              {/* Rear 4 Wheels */}
              <div style={{ position: 'absolute', bottom: '-11px', left: '14px', display: 'flex', gap: '4px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
              </div>
            </div>

            {/* Front Driver Cab */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: '1.5px solid #6ee7b7',
              borderRadius: '0 10px 6px 0',
              width: '44px',
              height: '44px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '4px'
            }}>
              <div style={{ background: '#0284c7', borderRadius: '0 6px 2px 0', width: '28px', height: '18px', border: '1px solid #7dd3fc' }} />
              <div style={{ position: 'absolute', right: '-4px', bottom: '8px', width: '6px', height: '10px', background: '#fef08a', borderRadius: '2px', boxShadow: '0 0 12px #fef08a' }} />
              <div style={{ position: 'absolute', bottom: '-11px', right: '4px', display: 'flex', gap: '3px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
              </div>
            </div>

          </div>

        </motion.div>

      </div>

      {/* BOTTOM TRADE-OFF CATEGORY BAR */}
      <div style={{
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.9rem', color: '#a7f3d0', fontWeight: '600', marginBottom: '16px' }}>
          Packaging is a trade-off. PackWise helps you make the <span style={{ color: '#34d399', fontWeight: '800' }}>right one</span>.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <DollarSign size={16} color="#34d399" />
            </div>
            <span>Cost</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <Leaf size={16} color="#34d399" />
            </div>
            <span>Carbon</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <ShieldCheck size={16} color="#34d399" />
            </div>
            <span>Protection</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <Box size={16} color="#34d399" />
            </div>
            <span>Circularity</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <Star size={16} color="#34d399" />
            </div>
            <span>Customer Experience</span>
          </div>

        </div>
      </div>

    </section>
  );
}
