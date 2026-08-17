import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

// 3D Branch SVG Component
const TreeBranch = ({ direction }) => {
  const isLeft = direction === 'left';
  return (
    <svg
      className={`absolute top-[-30px] ${isLeft ? 'left-[-5%]' : 'right-[-5%]'} w-[120%] md:w-[90%] h-[120px] md:h-[150px] z-20 pointer-events-none`}
      viewBox="0 0 1000 150"
      preserveAspectRatio="none"
    >
      <defs>
        {/* 3D Wood Gradient */}
        <linearGradient id={`woodGradient-${direction}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A16E4B" />
          <stop offset="40%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#2E1C15" />
        </linearGradient>
        {/* 3D Leaf Gradient */}
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
        {/* Realistic Drop Shadow */}
        <filter id="branchShadow" x="-10%" y="-10%" width="120%" height="150%">
          <feDropShadow dx="0" dy="15" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#branchShadow)">
        {/* The Branch */}
        <path
          d={isLeft
            ? "M -50 40 Q 200 80, 500 50 T 1100 60"
            : "M 1050 40 Q 800 80, 500 50 T -100 60"}
          fill="none"
          stroke={`url(#woodGradient-${direction})`}
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Decorative Leaves with swaying animation */}
        <g fill="url(#leafGradient)">
          {isLeft ? (
            <>
              <path d="M 150 55 Q 130 10 170 5 Q 190 30 150 55"><animateTransform attributeName="transform" type="rotate" values="0 150 55; 5 150 55; 0 150 55" dur="4s" repeatCount="indefinite" /></path>
              <path d="M 350 40 Q 370 80 330 85 Q 310 60 350 40" fill="#4CAF50"><animateTransform attributeName="transform" type="rotate" values="0 350 40; -5 350 40; 0 350 40" dur="5s" repeatCount="indefinite" /></path>
              <path d="M 700 65 Q 680 20 720 15 Q 740 40 700 65"><animateTransform attributeName="transform" type="rotate" values="0 700 65; 4 700 65; 0 700 65" dur="3.5s" repeatCount="indefinite" /></path>
              <path d="M 900 50 Q 920 90 880 95 Q 860 70 900 50" fill="#66BB6A"><animateTransform attributeName="transform" type="rotate" values="0 900 50; -3 900 50; 0 900 50" dur="4.5s" repeatCount="indefinite" /></path>
            </>
          ) : (
            <>
              <path d="M 850 55 Q 870 10 830 5 Q 810 30 850 55"><animateTransform attributeName="transform" type="rotate" values="0 850 55; -5 850 55; 0 850 55" dur="4s" repeatCount="indefinite" /></path>
              <path d="M 650 40 Q 630 80 670 85 Q 690 60 650 40" fill="#4CAF50"><animateTransform attributeName="transform" type="rotate" values="0 650 40; 5 650 40; 0 650 40" dur="5s" repeatCount="indefinite" /></path>
              <path d="M 300 65 Q 320 20 280 15 Q 260 40 300 65"><animateTransform attributeName="transform" type="rotate" values="0 300 65; -4 300 65; 0 300 65" dur="3.5s" repeatCount="indefinite" /></path>
              <path d="M 100 50 Q 80 90 120 95 Q 140 70 100 50" fill="#66BB6A"><animateTransform attributeName="transform" type="rotate" values="0 100 50; 3 100 50; 0 100 50" dur="4.5s" repeatCount="indefinite" /></path>
            </>
          )}
        </g>
      </g>
    </svg>
  );
};

const GallerySection = ({ onNext }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    { id: 1, rot: -5, url: '/jajal.jpeg', caption: 'first time kesaloka' },
    { id: 2, rot: 4, url: '/foto.jpeg', caption: 'first time muncak' },
    { id: 3, rot: -7, url: '/family.jpeg', caption: 'Liburan Bareng my family' },
    { id: 4, rot: 5, url: '/mcd.jpeg', caption: 'nyobain eskrim mcd nih' },
    { id: 5, rot: -4, url: '/jogja.jpeg', caption: 'lucuuu kann' },
    { id: 6, rot: 6, url: '/lucu.jpeg', caption: 'with bocilll' },
    { id: 7, rot: -6, url: '/telomoyo.jpeg', caption: 'telomoyo date wkwk' },
    { id: 8, rot: 3, url: '/genting .jpeg', caption: 'sedingin itu' },
  ];

  // Group photos into pairs for each branch
  const rows = [];
  for (let i = 0; i < photos.length; i += 2) {
    rows.push(photos.slice(i, i + 2));
  }

  // Generate random dust particles once
  const [dustParticles] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
  );

  return (
    <section ref={ref} className="min-h-screen w-full bg-[#FAF5F0] py-24 overflow-hidden relative">
      {/* Background Ambient Lights (Bokeh effect) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-300/20 blur-[100px] mix-blend-multiply"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-accent/10 blur-[120px] mix-blend-multiply"
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-yellow-200/20 blur-[90px] mix-blend-multiply"
          animate={{ x: [0, 60, -30, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Dust Particles (Fireflies) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {dustParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/60 blur-[1px] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-30 max-w-6xl mx-auto px-4">
        <h2 data-aos="fade-down" className="text-5xl md:text-6xl font-cursive bg-gradient-to-r from-[#FF6B8B] via-[#FF8E53] to-[#FF6B8B] text-transparent bg-clip-text mb-4 text-center drop-shadow-sm pb-2">Kenangan Indah Kita</h2>
        <p className="text-brand-text/70 mb-24 font-body text-center text-lg md:text-xl">Kenangan manis yang tergantung di setiap ranting waktu.</p>

        <div className="flex flex-col gap-32 md:gap-48 w-full">
          {rows.map((rowPhotos, rowIndex) => {
            const isLeft = rowIndex % 2 === 0;
            return (
              <div key={rowIndex} className={`relative w-full flex ${isLeft ? 'justify-start' : 'justify-end'} px-4 md:px-20`}>
                <TreeBranch direction={isLeft ? 'left' : 'right'} />

                <div className={`relative w-full md:w-[70%] flex justify-around items-start z-10 ${isLeft ? 'pl-4' : 'pr-4'}`}>
                  {rowPhotos.map((photo, pIndex) => {
                    const isHovered = activePhoto === photo.id;
                    const stringLength = pIndex % 2 === 0 ? "h-16 md:h-20" : "h-24 md:h-32";
                    const swingDuration = 4 + (pIndex % 3);

                    return (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: (rowIndex * 2 + pIndex) * 0.15 }}
                        className="relative flex flex-col items-center group cursor-pointer"
                        style={{ zIndex: isHovered ? 50 : 10 }}
                        onHoverStart={() => setActivePhoto(photo.id)}
                        onHoverEnd={() => setActivePhoto(null)}
                        onClick={() => setActivePhoto(isHovered ? null : photo.id)}
                      >
                        {/* The String */}
                        <div className={`w-[2px] ${stringLength} bg-[#8d6e63] shadow-sm transform origin-top`}></div>

                        {/* The Hanging Polaroid */}
                        <motion.div
                          animate={isHovered ? {
                            scale: 1.2,
                            rotate: 0,
                            y: -20,
                            zIndex: 60
                          } : {
                            scale: 1,
                            rotate: [photo.rot, photo.rot + 4, photo.rot - 4, photo.rot],
                            zIndex: 10
                          }}
                          transition={isHovered
                            ? { type: "spring", stiffness: 300, damping: 20 }
                            : { rotate: { duration: swingDuration, repeat: Infinity, ease: "easeInOut" } }
                          }
                          className="bg-gradient-to-br from-[#FFFCF8] to-[#F3EBE1] p-3 md:p-4 shadow-[2px_4px_16px_rgba(0,0,0,0.15)] rounded-sm border border-[#E8DCCB] relative origin-top transform-gpu flex flex-col items-center"
                        >
                          {/* Pin / Tie hole at top */}
                          <div className="absolute top-2 left-1/2 w-2 h-2 bg-[#3E2723] rounded-full shadow-inner transform -translate-x-1/2 opacity-90 ring-1 ring-white/50"></div>

                          {/* Washi tape decoration */}
                          <div className={`absolute -top-2 ${pIndex % 2 === 0 ? '-left-2 -rotate-12' : '-right-2 rotate-12'} w-10 h-4 bg-orange-100/60 backdrop-blur-sm shadow-sm mix-blend-multiply opacity-70`}></div>

                          <div className="w-32 h-40 md:w-48 md:h-64 bg-gray-300 overflow-hidden relative mt-3 rounded-sm ring-1 ring-black/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                            <img src={photo.url} alt="Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>

                          {/* Caption */}
                          <motion.div
                            className="w-full text-center px-1 mt-4 md:mt-5 mb-2"
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: isHovered ? 1 : 0.85 }}
                          >
                            <p className="font-cursive text-2xl md:text-3xl text-[#4A2E35] leading-tight">{photo.caption}</p>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          className="mt-40 z-30 relative flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <button onClick={onNext} className="btn-primary">
            Kuis Dulu Yuk! <PlayCircle size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
