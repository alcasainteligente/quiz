import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Presentation from './components/Presentation';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { generateRecommendations, Recommendation } from './data';

type ViewState = 'presentation' | 'quiz' | 'result';

function App() {
  const [view, setView] = useState<ViewState>('presentation');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [automations, setAutomations] = useState<string[]>([]);

  const handleStartQuiz = () => {
    setView('quiz');
  };

  const handleQuizComplete = (finalAnswers: Record<string, string>) => {
    const result = generateRecommendations(finalAnswers);
    setRecommendations(result.equipamentos);
    setAutomations(result.automacoes);
    setView('result');
  };

  const handleRestart = () => {
    setRecommendations([]);
    setAutomations([]);
    setView('presentation');
  };

  const handleRedoQuiz = () => {
    setRecommendations([]);
    setAutomations([]);
    setView('quiz');
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans overflow-x-hidden relative selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#02040a]" />
        <div className="absolute inset-0 bg-grid-pattern" />
        
        {/* Rotating Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] min-w-[600px] min-h-[600px] opacity-60">
          {/* Outer Blue Circle - Clockwise - Half Circle */}
          <div className="absolute inset-0 rounded-full border-[1px] border-transparent border-t-cyan-500/50 border-r-cyan-500/50 animate-[spin_60s_linear_infinite]" />
          
          {/* Inner Orange Circle - Counter-Clockwise */}
          <div className="absolute inset-[15%] rounded-full border-[1px] border-transparent border-b-orange-500/50 border-l-orange-500/50 animate-[spin_50s_linear_infinite_reverse]" />
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleRestart}>
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Static faint ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/30" />
              
              {/* Rotating partial ring */}
              <div className="absolute inset-0 rounded-full border border-transparent border-l-cyan-400 animate-[spin_10s_linear_infinite] shadow-[0_0_10px_rgba(34,211,238,0.2)]" />
              
              {/* Central orange dot */}
              <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-lg tracking-tight leading-none">
              <span className="font-bold text-white">AL</span>
              <span className="font-light text-cyan-400 ml-2">Casa Inteligente</span>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end leading-none">
            <span className="font-bold text-white tracking-widest text-xs">CASA INTELIGENTE</span>
            <span className="font-bold text-cyan-400 tracking-widest text-xs mt-0.5">SEM OBRAS</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'presentation' && (
            <motion.div
              key="presentation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center"
            >
              <Presentation onStart={handleStartQuiz} />
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center"
            >
              <Quiz 
                onComplete={handleQuizComplete} 
                onBackToStart={() => setView('presentation')} 
              />
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <Result 
                recommendations={recommendations} 
                automations={automations} 
                onRestart={handleRedoQuiz} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer id="contactos" className="relative z-10 border-t border-white/5 bg-[#02040a] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <div className="text-base tracking-tight leading-none text-white">
              <span className="font-bold">AL</span> <span className="font-normal opacity-90">Casa Inteligente</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/80 text-xs">
              © 2026 AL Casa Inteligente. Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-[10px] mt-1 uppercase tracking-wider">
              Montijo • Margem Sul • Lisboa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
