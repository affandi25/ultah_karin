import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ onNext }) => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black z-10">
      {/* Background Image Overlay - HD (100% opacity) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: "url('/foto.jpeg')" }}
      ></div>

      {/* Lightened Gradient Overlay (Supaya tidak terlalu gelap) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

      {/* Shine Effect (Smooth & Kinclong) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-overlay">
        <motion.div
          className="absolute -top-[50%] -bottom-[50%] w-[200px] bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-45 blur-[4px]"
          initial={{ left: '-50%' }}
          animate={{ left: '150%' }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        ></motion.div>
      </div>

      {/* Content */}
      <div className="z-10 text-center w-full px-6 flex flex-col justify-center items-center h-full pt-20">
        <div className="flex flex-row items-center justify-center gap-6 md:gap-16 w-full max-w-4xl relative">
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, x: -50, y: -20, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: -40,
              rotate: -10
            }}
            transition={{
              opacity: { duration: 1, delay: 0.5 },
              scale: { duration: 1, delay: 0.5, type: "spring" },
              x: { duration: 1, delay: 0.5, type: "spring" },
              y: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.5 },
              rotate: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.5 }
            }}
            className="text-5xl md:text-8xl font-cursive bg-gradient-to-r from-[#FFD1DC] via-[#FFFDF9] to-[#FFD1DC] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          >
            Happy Birthday
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8, x: 50, y: 50, rotate: 5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 40,
              rotate: 12
            }}
            transition={{
              opacity: { duration: 1, delay: 1 },
              scale: { duration: 1, delay: 1, type: "spring" },
              x: { duration: 1, delay: 1, type: "spring" },
              y: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 },
              rotate: { duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }
            }}
            className="text-4xl md:text-7xl font-cursive bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,107,139,0.5)]"
          >
            20th Sayang
          </motion.h1>
          
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="z-10 absolute bottom-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <button
          onClick={onNext}
          className="btn-primary"
        >
          Lanjutkan <ChevronDown size={20} />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
