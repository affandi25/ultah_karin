import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

const GamesSection = ({ onNext }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showError, setShowError] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null); // Track the correct selected index
  const [gamePhase, setGamePhase] = useState('quiz'); // 'quiz' -> 'impossible'

  const questions = [
    {
      q: "Di mana tempat jadian kita masih ingat gak wkwk?",
      opts: ["Bioskop", "Cafe", "Taman garuda kendal", "Mall"],
      ans: 2,
      successMsg: "awokawokk masih inget ternyata, lucuu kalo diinget-inget"
    },
    {
      q: "Siapa yang paling sering ngambek?",
      opts: ["Aku", "Kamu", "Dua-duanya", "Gak ada"],
      ans: 0,
      successMsg: "Hehehe, bener! kamu tuh sering ngambek ke aku!"
    },
    {
      q: "siapa yang minta wa duluan?",
      opts: ["kamu", "aku", "dua-duanya", "ibukmu",],
      ans: 1,
      successMsg: "HHHHH ngaku jugaaa yaa"
    },
    {
      q: "pertama kali kita ketemu dimana",
      opts: ["sekolah", "masjid", "Gor bahurekso", "curug"],
      ans: 2,
      successMsg: " awokawok effort bngt kan."
    },
    {
      q: "Apa barang pertama yang aku kasih ke kamu?",
      opts: ["bucket", "boneka", "Bunga ", "rocket chicken"],
      ans: 3,
      successMsg: "hhhh biar semngatt pas lomba"
    },
  ];

  const handleNextQuestion = () => {
    if (quizIndex < questions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setCorrectAnswer(null);
    } else {
      setGamePhase('impossible');
    }
  };

  const handleAnswer = (idx) => {
    // Prevent clicking while waiting for next question
    if (correctAnswer !== null) return;

    if (idx === questions[quizIndex].ans) {
      setQuizScore(quizScore + 1);
      setShowError(false);
      setCorrectAnswer(idx);
      // Wait for user to click the next button instead of auto-advancing
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  // Impossible Button State
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setBtnPos({ x, y });
  };

  return (
    <section className="min-h-screen w-full bg-brand-bg py-20 px-4 flex flex-col items-center justify-center">
      {gamePhase === 'quiz' && (
        <div className="torn-wrapper max-w-2xl w-full">
          <div className="torn-paper p-8 md:p-12 w-full">
            <h2 className="text-3xl font-heading text-brand-text mb-2 text-center">Seberapa Kenal Kita?</h2>
            <p className="text-center text-brand-text/70 mb-8">Pertanyaan {quizIndex + 1} dari {questions.length}</p>

            <div className="mb-8">
              <h3 className="text-xl font-body font-medium text-brand-text text-center">{questions[quizIndex].q}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[quizIndex].opts.map((opt, idx) => {
                const isCorrect = correctAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 font-body text-left flex justify-between items-center group
                      ${isCorrect
                        ? 'bg-green-500 border-green-600 text-white shadow-lg scale-105'
                        : 'border-brand-accent/30 text-brand-text hover:bg-brand-accent hover:text-white'
                      }`}
                  >
                    {opt}
                    {isCorrect ? (
                      <Check size={20} className="opacity-100" />
                    ) : (
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Success Message & Next Button */}
            {correctAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="p-4 bg-green-100 text-green-700 rounded-xl flex items-center justify-center gap-2 font-bold text-lg">
                  <Check size={24} className="shrink-0" /> {questions[quizIndex].successMsg}
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary py-3 w-full flex justify-center items-center gap-2"
                >
                  Lanjut ke pertanyaan berikutnya <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {/* Error Message */}
            {showError && correctAnswer === null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center justify-center gap-2"
              >
                <X size={20} /> Yah salah! Ayo coba lagi, masa lupa sih.
              </motion.div>
            )}
          </div>
        </div>
      )}

      {gamePhase === 'impossible' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="torn-wrapper max-w-2xl w-full"
        >
          <div className="torn-paper p-8 md:p-16 w-full text-center">
            <h2 className="text-4xl font-heading text-brand-text mb-12">Satu pertanyaan lagi...</h2>
            <h3 className="text-2xl font-body font-medium text-brand-text mb-12">Kamu makin sayang gak sama aku?</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[150px]">
              <button
                onClick={onNext}
                className="btn-primary w-48 py-4 text-lg"
              >
                Makin Sayang Banget!
              </button>

              <motion.button
                animate={{ x: btnPos.x, y: btnPos.y }}
                onHoverStart={moveButton}
                onClick={moveButton}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium w-48"
              >
                Gak
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GamesSection;
