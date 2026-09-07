import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, ShieldCheck, Leaf, Box, Cpu, Truck, Wind } from 'lucide-react';

export default function PackWiseHero({ onStartOptimize, onOpenCopilot }) {
  const [boxOpened, setBoxOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxOpened(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 70% 30%, #06261c 0%, #04120e 50%, #020907 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      padding: '48px 36px 90px 36px',
      marginBottom: '36px',
      boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7)'
    }}>
      
      {/* Background Grid Pattern & Ambient Glows */}
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
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* Main 2-Column Hero Grid */}
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

        {/* LEFT COLUMN */}
        <div>
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

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#6ee7b7', fontWeight: '600' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px' }}><Check size={12} color="#000" /></div>
              <span>AI-Powered Optimization</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px' }}><Check size={12} color="#000" /></div>
              <span>Damage-Aware Carbon Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px' }}><Check size={12} color="#000" /></div>
              <span>Region-Aware Recyclability</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Realistic 3D Cardboard Box Opening Sequence */}
        <div style={{ position: 'relative', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Ambient Glowing Portal */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
            boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)',
            animation: 'pulse 4s ease-in-out infinite'
          }} />

          {/* REALISTIC 3D BOX CONTAINER */}
          <div style={{
            position: 'relative',
            width: '260px',
            height: '200px',
            perspective: '1200px',
            marginTop: '60px'
          }}>
            
            {/* Box Body Container */}
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(22deg) rotateY(-18deg) rotateZ(2deg)'
            }}>
              
              {/* Inner Cavity Shadow */}
              <div style={{
                position: 'absolute',
                inset: '4px',
                background: 'radial-gradient(circle, #050d09 0%, #000000 100%)',
                boxShadow: 'inset 0 0 30px #000',
                borderRadius: '4px'
              }} />

              {/* Front Face */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #d49b59 0%, #9e6c31 100%)',
                border: '1.5px solid #e3b074',
                borderRadius: '4px',
                transform: 'translateZ(100px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
              }}>
                <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', gap: '8px', opacity: 0.7 }}>
                  <Leaf size={16} color="#4a2c07" />
                  <Box size={16} color="#4a2c07" />
                  <ShieldCheck size={16} color="#4a2c07" />
                </div>
                <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '0.65rem', color: '#4a2c07', fontWeight: '800', letterSpacing: '1px' }}>
                  RECYCLABLE 100%
                </div>
              </div>

              {/* REALISTIC 4-FLAP UNBOXING ANIMATIONS */}
              
              {/* Top Front Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: boxOpened ? -135 : 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(180deg, #e3b074 0%, #b87d3b 100%)',
                  transformOrigin: 'top center',
                  border: '1px solid #f0c48d',
                  borderRadius: '3px 3px 0 0',
                  zIndex: 10
                }}
              >
                <div style={{ position: 'absolute', bottom: '2px', left: 0, right: 0, height: '4px', background: 'rgba(0,0,0,0.15)' }} />
              </motion.div>

              {/* Top Back Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: boxOpened ? 135 : 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(0deg, #c48b48 0%, #8c5923 100%)',
                  transformOrigin: 'bottom center',
                  border: '1px solid #d99f5e',
                  borderRadius: '0 0 3px 3px',
                  zIndex: 9
                }}
              />

              {/* Left Flap */}
              <motion.div
                initial={{ rotateZ: 0 }}
                animate={{ rotateZ: boxOpened ? -120 : 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '50%',
                  background: 'linear-gradient(90deg, #b87d3b 0%, #8c5923 100%)',
                  transformOrigin: 'left center',
                  border: '1px solid #d99f5e',
                  zIndex: 8
                }}
              />

              {/* Right Flap */}
              <motion.div
                initial={{ rotateZ: 0 }}
                animate={{ rotateZ: boxOpened ? 120 : 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '50%',
                  background: 'linear-gradient(-90deg, #b87d3b 0%, #8c5923 100%)',
                  transformOrigin: 'right center',
                  border: '1px solid #d99f5e',
                  zIndex: 8
                }}
              />

            </div>

            {/* RISING 3D PACKWISE EMBLEM FLOATING OUT OF BOX */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.5 }}
              animate={{
                y: boxOpened ? -150 : 30,
                opacity: boxOpened ? 1 : 0,
                scale: boxOpened ? 1.05 : 0.5
              }}
              transition={{ duration: 1.3, delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
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
              {/* Volumetric Glowing Badge */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%)',
                padding: '14px 32px',
                borderRadius: '20px',
                boxShadow: '0 0 45px rgba(16, 185, 129, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.6)',
                border: '2px solid #6ee7b7',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Cpu size={28} color="#FFFFFF" />
                <span style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '3px',
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '0 4px 12px rgba(0,0,0,0.6)'
                }}>
                  PACKWISE
                </span>
              </div>

              {/* Tagline */}
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#34d399',
                marginTop: '8px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: 'rgba(2, 9, 7, 0.85)',
                padding: '4px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                Packaging Intelligence Unboxed
              </span>
            </motion.div>

          </div>

          {/* 4 Floating Metric Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              position: 'absolute',
              top: '15px',
              left: '-15px',
              background: 'rgba(4, 18, 14, 0.9)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#34d399',
              fontWeight: '700',
              boxShadow: '0 12px 25px rgba(0,0,0,0.5)'
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
              top: '25px',
              right: '-15px',
              background: 'rgba(4, 18, 14, 0.9)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#38bdf8',
              fontWeight: '700',
              boxShadow: '0 12px 25px rgba(0,0,0,0.5)'
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
              bottom: '35px',
              left: '5px',
              background: 'rgba(4, 18, 14, 0.9)',
              backdropFilter: 'blur(14px)',
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
              bottom: '35px',
              right: '5px',
              background: 'rgba(4, 18, 14, 0.9)',
              backdropFilter: 'blur(14px)',
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

        </div>

      </div>

      {/* ENHANCED HIGH-DEFINITION LOGISTICS TRUCK WITH FLUTTERING LEAF EXHAUST STREAM */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '75px',
        marginTop: '36px',
        borderTop: '1px dashed rgba(16, 185, 129, 0.25)',
        paddingTop: '12px',
        overflow: 'hidden'
      }}>
        
        {/* Road Marker */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.5) 50%, transparent 100%)'
        }} />

        {/* Animated Moving Truck */}
        <motion.div
          animate={{ x: ['-12%', '112%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            bottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '0px'
          }}
        >
          
          {/* Continuous Fluttering Green Leaf Exhaust Stream */}
          <div style={{ position: 'relative', width: '120px', height: '40px', marginRight: '-5px' }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [-5, -80 - (i * 14)],
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

          {/* HD Metallic Truck Chassis & Cab */}
          <div style={{ display: 'flex', alignItems: 'flex-end', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))' }}>
            
            {/* Cargo Container */}
            <div style={{
              background: 'linear-gradient(135deg, #053B2C 0%, #064E3B 100%)',
              border: '1.5px solid #34d399',
              borderRadius: '8px 4px 4px 8px',
              padding: '8px 16px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '900', letterSpacing: '1.5px', color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
                  PackWise
                </span>
                <span style={{ fontSize: '0.6rem', color: '#6ee7b7', fontWeight: '700', letterSpacing: '0.5px' }}>
                  SUSTAINABLE LOGISTICS
                </span>
              </div>
              <Leaf size={18} color="#34d399" />
              
              {/* Rear Dual Wheels */}
              <div style={{ position: 'absolute', bottom: '-10px', left: '16px', display: 'flex', gap: '6px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
              </div>
            </div>

            {/* Truck Cab */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: '1.5px solid #6ee7b7',
              borderRadius: '0 10px 6px 0',
              width: '36px',
              height: '38px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '4px'
            }}>
              {/* Windshield Window */}
              <div style={{ background: '#0284c7', borderRadius: '0 6px 2px 0', width: '22px', height: '14px', border: '1px solid #7dd3fc' }} />
              
              {/* Headlight LED Glow */}
              <div style={{ position: 'absolute', right: '-4px', bottom: '8px', width: '6px', height: '8px', background: '#fef08a', borderRadius: '2px', boxShadow: '0 0 10px #fef08a' }} />
              
              {/* Front Wheel */}
              <div style={{ position: 'absolute', bottom: '-10px', right: '6px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#111', border: '3px stroke #34d399', borderStyle: 'dashed' }} />
              </div>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}
