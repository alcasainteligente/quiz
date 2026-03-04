import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data';

interface QuizProps {
  onComplete: (answers: Record<string, string>) => void;
  onBackToStart: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onBackToStart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(0);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBackToStart();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center min-h-[600px]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-8"
      >
        <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
          <span>Questão {currentQuestionIndex + 1}/{totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        {currentQuestion.question}
      </h2>

      <div className="w-full relative flex-1 flex flex-col justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleOptionSelect(option)}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border transition-all text-left flex items-center justify-between group ${
                  answers[currentQuestion.id] === option
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-cyan-500/50'
                }`}
              >
                <span className="text-lg font-medium">{option}</span>
                {answers[currentQuestion.id] === option && (
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                )}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between w-full mt-12">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-6 py-3 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-5 h-5" />
          Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
            answers[currentQuestion.id]
              ? 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Ver Resultados' : 'Próximo'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Quiz;
