import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, ShieldCheck, Leaf, Box, Cpu, TrendingDown, RefreshCw } from 'lucide-react';

export default function PackWiseHero({ onStartOptimize, onOpenCopilot }) {
  const [boxOpened, setBoxOpened] = useState(false);

  // Trigger box opening after 1.2s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxOpened(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 70% 30%, #06261c 0%, #04120e 50%, #020907 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      padding: '48px 36px 80px 36px',
      marginBottom: '36px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* Background Grid Pattern & Glowing Orbs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '-50px',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Main 2-Column Hero Content */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>

        {/* LEFT COLUMN: Copy & CTAs */}
        <div>
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
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

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              fontWeight: '800',
              lineHeight: '1.15',
              color: '#FFFFFF',
              marginBottom: '20px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Don't Choose the Greenest Package. <br />
            <span style={{
              background: 'linear-gradient(135deg, #34d399 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Choose the Smartest One.
            </span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#a7f3d0',
              marginBottom: '28px',
              maxWidth: '560px'
            }}
          >
            PackWise uses AI and multi-objective optimization to find the best packaging solution by balancing cost, carbon footprint, product protection, circularity, and real-world sustainability.
          </motion.p>

          {/* CTAs */}
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
                fontSize: '1rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)'
              }}
            >
              Optimize My Packaging <ArrowRight size={18} />
            </button>

            <button 
              onClick={onOpenCopilot}
              className="btn-secondary" 
              style={{
                padding: '14px 24px',
                fontSize: '1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              See How It Works
            </button>
          </motion.div>

          {/* 3 Small Feature Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              fontSize: '0.8rem',
              color: '#6ee7b7',
              fontWeight: '600'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px' }}>
                <Check size={12} color="#000" />
              </div>
              <span>AI-Powered Optimization</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px' }}>
                <Check size={12} color="#000" />
              </div>
              <span>Damage-Aware Carbon Analysis</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px' }}>
                <Check size={12} color="#000" />
              </div>
              <span>Region-Aware Recyclability</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: 3D Carton Box & Floating PACKWISE Logo Animation */}
        <div style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Outer Energy Ring */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px dashed rgba(16, 185, 129, 0.3)',
            animation: 'spin 25s linear infinite'
          }} />

          {/* 3D Carton Box Container */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '180px',
            perspective: '1000px',
            marginTop: '80px'
          }}>
            
            {/* Box Body */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #c2884a 0%, #8f5d27 100%)',
                borderRadius: '8px',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: 'rotateX(15deg) rotateY(-10deg)',
                border: '1px solid #d99f5e'
              }}
            >
              {/* Packaging Tape Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '48%',
                width: '14px',
                background: 'rgba(235, 215, 175, 0.4)',
                borderLeft: '1px dashed rgba(0,0,0,0.2)',
                borderRight: '1px dashed rgba(0,0,0,0.2)'
              }} />

              {/* Eco Handling Symbols */}
              <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', gap: '6px', opacity: 0.6 }}>
                <Leaf size={14} color="#3e2305" />
                <Box size={14} color="#3e2305" />
              </div>

              {/* Box Flap Left */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: boxOpened ? -120 : 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '45px',
                  background: '#b0793e',
                  transformOrigin: 'top center',
                  borderRadius: '4px 0 0 0',
                  borderBottom: '1px solid #7d4d1d'
                }}
              />

              {/* Box Flap Right */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: boxOpened ? -120 : 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: '45px',
                  background: '#a36f37',
                  transformOrigin: 'top center',
                  borderRadius: '0 4px 0 0',
                  borderBottom: '1px solid #7d4d1d'
                }}
              />
            </motion.div>

            {/* Rising 3D PACKWISE Logo emblem out of the box */}
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.6 }}
              animate={{
                y: boxOpened ? -130 : 20,
                opacity: boxOpened ? 1 : 0,
                scale: boxOpened ? 1 : 0.6
              }}
              transition={{ duration: 1.2, delay: 0.4, type: 'spring', bounce: 0.4 }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                x: '-50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                pointerEvents: 'none'
              }}
            >
              {/* Floating Glowing Badge */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%)',
                padding: '12px 28px',
                borderRadius: '16px',
                boxShadow: '0 0 35px rgba(16, 185, 129, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.5)',
                border: '1.5px solid #6ee7b7',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Cpu size={26} color="#FFFFFF" />
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '2px',
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                  PACKWISE
                </span>
              </div>

              {/* Sub-label */}
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#34d399',
                marginTop: '6px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'rgba(0,0,0,0.6)',
                padding: '3px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                Packaging Intelligence Unboxed
              </span>
            </motion.div>

          </div>

          {/* 4 Floating Glassmorphic Metric Cards around the Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '-10px',
              background: 'rgba(9, 24, 18, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#34d399',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
            }}
          >
            <span>🌍 32% Lower CO₂</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              position: 'absolute',
              top: '30px',
              right: '-10px',
              background: 'rgba(9, 24, 18, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#38bdf8',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
            }}
          >
            <span>📦 28% Less Material</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '10px',
              background: 'rgba(9, 24, 18, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#6ee7b7',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
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
              bottom: '40px',
              right: '10px',
              background: 'rgba(9, 24, 18, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#fbbf24',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
            }}
          >
            <span>♻️ High Circularity</span>
          </motion.div>

        </div>

      </div>

      {/* SECONDARY ANIMATION: Sustainable Delivery Truck with Floating Leaf Exhaust */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '60px',
        marginTop: '40px',
        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
        paddingTop: '10px',
        overflow: 'hidden'
      }}>
        
        {/* Animated Moving Truck */}
        <motion.div
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            bottom: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          
          {/* Animated Green Leaves Exhaust Stream */}
          <div style={{ position: 'relative', width: '80px', height: '30px' }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [-10, -50 - (i * 12)],
                  y: [0, -15 - (i * 6)],
                  opacity: [1, 0],
                  scale: [0.8, 1.3],
                  rotate: [0, 180 + (i * 45)]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '10px',
                  color: '#34d399',
                  fontSize: '14px',
                  pointerEvents: 'none'
                }}
              >
                🌿
              </motion.div>
            ))}
          </div>

          {/* Logistics Truck Body */}
          <div style={{
            background: 'linear-gradient(90deg, #064E3B 0%, #10B981 100%)',
            border: '1px solid #34d399',
            padding: '6px 14px',
            borderRadius: '6px 14px 14px 6px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px', color: '#FFFFFF' }}>PackWise</span>
              <span style={{ fontSize: '0.55rem', color: '#a7f3d0' }}>Eco Logistics</span>
            </div>
            {/* Rotating Wheels */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} 
              style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px dashed #FFF' }} 
            />
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} 
              style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px dashed #FFF' }} 
            />
          </div>

        </motion.div>

        {/* Road line indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2px',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%)'
        }} />

      </div>

    </section>
  );
}
