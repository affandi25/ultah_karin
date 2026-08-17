import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Gift, Heart } from 'lucide-react';

const ClosingSection = () => {
  const [wish, setWish] = useState('');
  const [giftOpened, setGiftOpened] = useState(false);

  const WA_NUMBER = "62882006836919"; // format: 62 + nomor tanpa 0 di depan

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!wish) return;
    const text = `Halo sayang! Di umurku yang ke-20 ini, harapanku adalah: ${wish}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleOpenGift = () => {
    setGiftOpened(true);

    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="min-h-screen w-full bg-brand-bg py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Wish Box */}
        <motion.div
          data-aos="fade-right"
          className="torn-wrapper w-full"
        >
          <div className="torn-paper p-8 md:p-10 w-full">
            <h2 className="text-3xl font-heading text-brand-text mb-6">Make a Wish</h2>
            <p className="text-brand-text/80 mb-6 font-body text-sm">Tuliskan harapanmu di umur yang baru ini, dan doa terbaikku akan selalu menyertaimu.</p>

            <form onSubmit={handleSendWish} className="flex flex-col gap-4">
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Harapanku adalah..."
                className="w-full p-4 rounded-xl border border-brand-accent/30 bg-white/50 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 min-h-[150px] resize-none font-body"
                required
              ></textarea>
              <button type="submit" className="btn-primary w-full justify-center">
                Kirim Harapan <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Virtual Gift */}
        <motion.div
          data-aos="fade-left"
          className="flex flex-col items-center justify-center"
        >
          {!giftOpened ? (
            <div className="text-center">
              <h3 className="text-2xl font-heading text-brand-text mb-8">Ada kado spesial buat kamu!</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpenGift}
                className="bg-brand-accent w-40 h-40 rounded-3xl flex items-center justify-center text-white shadow-2xl relative group cursor-pointer"
              >
                {/* Ribbon decoration */}
                <div className="absolute w-full h-8 bg-white/30 top-1/2 transform -translate-y-1/2"></div>
                <div className="absolute h-full w-8 bg-white/30 left-1/2 transform -translate-x-1/2"></div>

                <Gift size={64} className="z-10 group-hover:animate-bounce" />
              </motion.button>
              <p className="mt-6 text-brand-text/70 animate-pulse">Ketuk kadonya!</p>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="torn-wrapper text-center w-full max-w-sm"
            >
              <div className="torn-paper p-8 bg-brand-accent text-white">
                <Heart size={48} className="mx-auto mb-4 animate-pulse" />
                <h3 className="text-3xl font-heading mb-2">Kupon Spesial!</h3>
                <div className="bg-white/20 rounded-xl p-4 my-4 backdrop-blur-sm border border-white/30">
                  <p className="text-xl font-bold font-heading">REWARD HUG 24 JAM</p>
                  <p className="text-sm opacity-90 mt-1">Berlaku seumur hidup</p>
                </div>
                <p className="font-body text-sm">Screenshot kupon ini dan tukarkan ke aku!</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

    </section>
  );
};

export default ClosingSection;
