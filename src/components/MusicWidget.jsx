import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // You can replace this URL with an actual music file later
  const musicUrl = "/Virgoun - Surat Cinta Untuk Starla _ A Love Letter To Starla (Official Lyric Video) [FocFked1TbQ].mp3";

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Attempt auto-play on load (might be blocked by browser policy)
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        // Auto-play was prevented
        console.log("Auto-play prevented");
      });
    }
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
    >
      <audio ref={audioRef} src={musicUrl} loop />

      <button
        onClick={togglePlay}
        className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-brand-accent hover:scale-110 transition-transform relative group border-2 border-brand-accent/20"
      >
        {isPlaying ? (
          <>
            <Pause size={24} />
            {/* Simple audio wave animation */}
            <div className="absolute -inset-2 rounded-full border border-brand-accent/30 animate-ping opacity-50"></div>
          </>
        ) : (
          <Music size={24} />
        )}
      </button>
    </motion.div>
  );
};

export default MusicWidget;
