import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera } from 'lucide-react';

const LetterSection = ({ onNext }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fullText = "Selamat ulang tahun yang ke-20th sayang! Terima kasih sudah bertahan bersamaku sejauh ini. Semoga di umur yang baru ini, kamu semakin dewasa, semakin bahagia,tidak marah-marah terus dan semua yang kamu impikan semoga bisa terwujud. maaf ya sayang cuma bisa ngucapin begini, nanti habis kkl kita main yaa. I love you so much bocill!";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(intervalId);
        }
      }, 50); // Typing speed
      return () => clearInterval(intervalId);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="min-h-screen w-full bg-brand-bg py-20 px-4 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">

        {/* Left Side: Letter Card */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="torn-wrapper w-full">
            <div className="torn-paper p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
              <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl font-heading mb-6 bg-gradient-to-r from-[#FF6B8B] via-[#FF8E53] to-[#FF6B8B] text-transparent bg-clip-text z-10 pb-1">Teruntuk Bocilku,</h2>
              <div className="text-lg md:text-xl font-body leading-relaxed text-brand-text/80 space-y-4 max-w-lg text-center">
                {displayedText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Polaroid Frame */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="bg-white p-4 pb-16 shadow-xl rounded-sm transform rotate-3 cursor-pointer relative"
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-64 h-80 bg-gray-200 overflow-hidden">
              <img
                src="/favorite.jpeg"
                alt="Our Memory"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-heading text-center mt-6 text-xl text-brand-text">My Favorite Person</p>
            {/* Shadow effect inside polaroid to make it look realistic */}
            <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 3 }}
      >
        <button onClick={onNext} className="btn-primary">
          Lihat Kenangan Kita <Camera size={20} />
        </button>
      </motion.div>
    </section>
  );
};

export default LetterSection;
