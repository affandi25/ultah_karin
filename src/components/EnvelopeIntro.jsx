import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import gsap from 'gsap';

const BUTTERFLY_COLORS = [
  ['#FF6B9D', '#FFB3D1'],
  ['#C77DFF', '#E0AAFF'],
  ['#48CAE4', '#ADE8F4'],
  ['#F9C74F', '#FFE599'],
  ['#80ED99', '#B7E4C7'],
  ['#FF9A3C', '#FFCB8E'],
  ['#F72585', '#FF85B3'],
  ['#7B2FBE', '#C77DFF'],
];

const ButterflyIcon = ({ color1, color2, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M32 32C32 32 14 12 6 22C-2 32 14 52 32 32Z"
      fill={color1}
      animate={{ scaleX: [1, 0.15, 1] }}
      transition={{ duration: 0.25, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: 'right center' }}
    />
    <motion.path
      d="M32 32C32 32 50 12 58 22C66 32 50 52 32 32Z"
      fill={color1}
      animate={{ scaleX: [1, 0.15, 1] }}
      transition={{ duration: 0.25, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: 'left center' }}
    />
    <motion.path
      d="M32 34C32 34 20 26 14 32C8 38 20 50 32 38Z"
      fill={color2}
      animate={{ scaleX: [1, 0.15, 1] }}
      transition={{ duration: 0.25, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: 'right center' }}
    />
    <motion.path
      d="M32 34C32 34 44 26 50 32C56 38 44 50 32 38Z"
      fill={color2}
      animate={{ scaleX: [1, 0.15, 1] }}
      transition={{ duration: 0.25, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: 'left center' }}
    />
    <path d="M31 18C31 18 28 10 26 8" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M33 18C33 18 36 10 38 8" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="32" cy="32" rx="2" ry="13" fill="#2d2d2d" />
  </svg>
);

// Orbit paths untuk setiap kupu-kupu mengelilingi amplop
const ORBIT_PATHS = [
  { rx: 180, ry: 100, startAngle: 0,   speed: 2.2 },
  { rx: 200, ry: 110, startAngle: 45,  speed: 2.8 },
  { rx: 160, ry: 90,  startAngle: 90,  speed: 2.0 },
  { rx: 220, ry: 120, startAngle: 135, speed: 3.0 },
  { rx: 170, ry: 95,  startAngle: 180, speed: 2.5 },
  { rx: 190, ry: 105, startAngle: 225, speed: 2.3 },
  { rx: 150, ry: 85,  startAngle: 270, speed: 2.7 },
  { rx: 210, ry: 115, startAngle: 315, speed: 2.1 },
];

const FlyingButterfly = ({ color1, color2, orbit, isFlying, onDone, index }) => {
  const [phase, setPhase] = useState('hidden'); // hidden -> emerge -> orbit -> zoom
  const [angle, setAngle] = useState(orbit.startAngle);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!isFlying) return;

    // Delay kemunculan tiap kupu-kupu
    const emergeDelay = index * 120;
    const timer = setTimeout(() => {
      setPhase('emerge');

      // Mulai orbit setelah muncul
      const orbitDelay = setTimeout(() => {
        setPhase('orbit');
        let currentAngle = orbit.startAngle;
        const orbitDuration = 3000; // ms untuk orbit
        const orbitStart = performance.now();

        const animate = (now) => {
          const elapsed = now - orbitStart;
          const progress = elapsed / orbitDuration;
          currentAngle = orbit.startAngle + progress * 360 * orbit.speed * 0.5;
          const rad = (currentAngle * Math.PI) / 180;
          setPos({
            x: Math.cos(rad) * orbit.rx,
            y: Math.sin(rad) * orbit.ry * 0.5,
          });

          if (elapsed < orbitDuration) {
            rafRef.current = requestAnimationFrame(animate);
          } else {
            setPhase('zoom');
          }
        };
        rafRef.current = requestAnimationFrame(animate);
      }, 400);

      return () => clearTimeout(orbitDelay);
    }, emergeDelay);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isFlying]);

  if (phase === 'hidden') return null;

  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      style={{
        top: '50%',
        left: '50%',
        x: pos.x,
        y: pos.y,
        translateX: '-50%',
        translateY: '-50%',
        filter: `drop-shadow(0 0 8px ${color1}88)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        phase === 'emerge'
          ? { scale: 1, opacity: 1 }
          : phase === 'orbit'
          ? { scale: 1, opacity: 1 }
          : phase === 'zoom'
          ? { scale: 20, opacity: 0, x: pos.x, y: pos.y }
          : {}
      }
      transition={
        phase === 'emerge'
          ? { duration: 0.4, ease: 'backOut' }
          : phase === 'zoom'
          ? { duration: 1.2, ease: 'easeIn' }
          : { duration: 0.05 }
      }
      onAnimationComplete={() => {
        if (phase === 'zoom' && onDone) onDone();
      }}
    >
      <ButterflyIcon color1={color1} color2={color2} size={36} />
    </motion.div>
  );
};

const EnvelopeIntro = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => onOpen(), 5500);
  };

  const handleButterflyDone = () => {
    setDoneCount((c) => c + 1);
  };

  const petals = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    id: `petal-${i}`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 14 + 10}px`,
    duration: Math.random() * 6 + 7,
    delay: Math.random() * 8,
    drift: (Math.random() - 0.5) * 120,
    emoji: ['🌸', '🌺', '✿', '❀', '🌷', '💮'][Math.floor(Math.random() * 6)],
  })), []);

  const stars = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: `star-${i}`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 3,
    color: ['#FF6B8B', '#C77DFF', '#48CAE4', '#F9C74F', '#80ED99'][Math.floor(Math.random() * 5)],
  })), []);

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: `p-${i}`,
    x: (Math.random() - 0.5) * 100 + 'vw',
    y: (Math.random() - 0.5) * 100 + 'vh',
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 400,
    y: Math.random() * -300 - 100,
    scale: Math.random() * 0.8 + 0.5,
    delay: Math.random() * 0.5,
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={isOpening ? { backgroundColor: '#000000' } : {}}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: isOpening ? 0.5 : 0 }}
      >
        {/* Background aesthetic */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Base gradient layer */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #fff0f6 0%, #fce4ec 20%, #f3e5f5 40%, #e8eaf6 60%, #fce4ec 80%, #fff8e1 100%)'
          }} />

          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, #FF6B8B 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} />

          {/* Glowing orbs */}
          <motion.div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, #ffb3c6, transparent 70%)' }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, #d4aaff, transparent 70%)' }}
            animate={{ x: [0, -50, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div className="absolute top-1/3 -right-10 w-72 h-72 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #a8d8ff, transparent 70%)' }}
            animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div className="absolute bottom-1/3 -left-10 w-64 h-64 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #ffe0a8, transparent 70%)' }}
            animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          {/* Falling petals */}
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="absolute text-2xl select-none"
              style={{ left: p.left, top: '-40px', fontSize: p.size }}
              animate={{ y: ['0vh', '110vh'], x: [0, p.drift, 0], rotate: [0, 360], opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
            >
              {p.emoji}
            </motion.div>
          ))}

          {/* Twinkling stars */}
          {stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{ left: s.left, top: s.top }}
              animate={{ opacity: [0.1, 1, 0.1], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            >
              <Star size={s.size} fill={s.color} color={s.color} />
            </motion.div>
          ))}

          {/* Sparkle particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute left-1/2 top-1/2 text-brand-accent/50"
              initial={{ x: p.x, y: p.y, opacity: 0.3, scale: p.scale }}
              animate={{ y: `calc(${p.y} - 60px)`, opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            >
              <Sparkles size={10} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative cursor-pointer"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100, duration: 1.5 }}
          onClick={handleClick}
          whileHover={!isOpening ? { scale: 1.05 } : {}}
        >
          {/* Hearts burst */}
          {isOpening &&
            hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute top-1/2 left-1/2 text-brand-accent pointer-events-none"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x: heart.x, y: heart.y, opacity: 0, scale: heart.scale }}
                transition={{ duration: 2, delay: heart.delay, ease: 'easeOut' }}
              >
                <Heart size={32} fill="currentColor" />
              </motion.div>
            ))}

          {/* Amplop */}
          <motion.div
            className="relative w-64 h-48 sm:w-80 sm:h-60"
            animate={!isOpening ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-brand-card rounded-md shadow-2xl border-2 border-brand-accent/30"
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div
                className="absolute bottom-0 left-0 w-full h-full bg-[#fce8eb] origin-bottom"
                style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)' }}
              />
              <div
                className="absolute top-0 left-0 w-full h-full bg-[#f7d9dd]"
                style={{ clipPath: 'polygon(0 0, 40% 50%, 0 100%)' }}
              />
              <div
                className="absolute top-0 right-0 w-full h-full bg-[#f7d9dd]"
                style={{ clipPath: 'polygon(100% 0, 60% 50%, 100% 100%)' }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-brand-accent origin-top z-10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-20"
                animate={isOpening ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart size={20} className="text-brand-accent" fill="currentColor" />
              </motion.div>
            </motion.div>
          </motion.div>

          {!isOpening && (
            <motion.p
              className="absolute -bottom-12 w-full text-center font-heading text-brand-accent text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Ketuk untuk membuka surat spesialmu...
            </motion.p>
          )}

          {/* Kupu-kupu keluar dari amplop */}
          {BUTTERFLY_COLORS.map((colors, i) => (
            <FlyingButterfly
              key={i}
              index={i}
              color1={colors[0]}
              color2={colors[1]}
              orbit={ORBIT_PATHS[i]}
              isFlying={isOpening}
              onDone={i === 0 ? handleButterflyDone : undefined}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnvelopeIntro;
