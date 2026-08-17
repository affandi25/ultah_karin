import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const AuraBackground = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate random heart bubbles only on client side to avoid hydration mismatch
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10, // 10px to 30px
      left: Math.random() * 100, // 0 to 100%
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 10,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Top Left Deep Pink Aura */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-pink-400/30 blur-[120px] mix-blend-multiply"
        animate={{
          x: [0, 50, 0, -30, 0],
          y: [0, 30, -50, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Bottom Right Soft Pink Aura */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-rose-400/20 blur-[150px] mix-blend-multiply"
        animate={{
          x: [0, -70, 0, 40, 0],
          y: [0, -50, 60, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Center Bright Accent Aura */}
      <motion.div
        className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-accent/20 blur-[100px] mix-blend-multiply"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 80, 100, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Love Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute text-brand-accent/40"
          style={{
            left: `${bubble.left}%`,
            bottom: '-10%',
          }}
          animate={{
            y: ['0vh', '-120vh'], // Float from bottom to above the screen
            x: [0, Math.random() * 50 - 25, 0, Math.random() * 50 - 25, 0], // Gentle sway
            opacity: [0, 0.6, 0.8, 0], // Fade in and fade out
            rotate: [0, 180, 360],
          }}
          transition={{
            y: { duration: bubble.duration, repeat: Infinity, ease: "linear", delay: bubble.delay },
            x: { duration: bubble.duration / 2, repeat: Infinity, ease: "easeInOut", delay: bubble.delay },
            opacity: { duration: bubble.duration, repeat: Infinity, ease: "linear", delay: bubble.delay },
            rotate: { duration: bubble.duration, repeat: Infinity, ease: "linear", delay: bubble.delay }
          }}
        >
          <Heart size={bubble.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default AuraBackground;
