import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, RotateCcw, Check, Sparkles, Zap } from 'lucide-react';
import { Recommendation } from '../data';

interface ResultProps {
  recommendations: Recommendation[];
  automations: string[];
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ recommendations, automations, onRestart }) => {
  const [showEmailOptions, setShowEmailOptions] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const generateReportText = () => {
    const equipment = recommendations.map(r => `• ${r.name}: ${r.description}`).join('\n');
    const auto = automations.map(a => `• ${a}`).join('\n');
    
    return `Olá! Fiz o quiz da AL Casa Inteligente e este é o meu resultado:\n\n🏠 *Equipamentos Recomendados:*\n${equipment}\n\n⚡ *Automações Sugeridas:*\n${auto}\n\nGostaria de saber mais detalhes.`;
  };

  const generateShortReportText = () => {
    const equipment = recommendations.map(r => `• ${r.name}`).join('\n');
    const auto = automations.map(a => `• ${a}`).join('\n');
    
    return `Olá! Fiz o quiz da AL Casa Inteligente e este é o meu resultado:\n\n🏠 *Equipamentos:*\n${equipment}\n\n⚡ *Automações:*\n${auto}\n\nGostaria de saber mais detalhes.`;
  };

  const reportText = generateReportText();
  const shortReportText = generateShortReportText();
  
  const whatsappAppUrl = `whatsapp://send?phone=351917807428&text=${encodeURIComponent(shortReportText)}`;
  const emailUrl = `mailto:al.casa.inteligente@proton.me?subject=${encodeURIComponent("O meu resultado AL Casa Inteligente")}&body=${encodeURIComponent(shortReportText)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=al.casa.inteligente@proton.me&su=${encodeURIComponent("O meu resultado AL Casa Inteligente")}&body=${encodeURIComponent(reportText)}`;

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-500/20 mb-6">
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          A sua solução <span className="text-cyan-400 text-glow-cyan">Personalizada</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Com base nas suas respostas, criámos o plano perfeito para transformar a sua casa.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mb-12">
        {/* Equipment List */}
        <motion.div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
          {recommendations.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4 backdrop-blur-sm transition-colors"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg shadow-lg shadow-cyan-500/20">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Automations & Actions */}
        <div className="flex flex-col gap-6">
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Automações Sugeridas
            </h3>
            <ul className="space-y-4">
              {automations.map((auto, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
                  <span>{auto}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <a 
              href={whatsappAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20 cursor-pointer no-underline"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar pelo WhatsApp
            </a>
            {!showEmailOptions ? (
              <button 
                onClick={() => setShowEmailOptions(true)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <Mail className="w-5 h-5" />
                Enviar por Email
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-top-2 duration-200">
                <a 
                  href={emailUrl}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  App Padrão
                </a>
                <a 
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600/80 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-red-500/20 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Gmail
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={onRestart}
        className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
        variants={itemVariants}
      >
        <RotateCcw className="w-4 h-4" />
        Refazer Quiz
      </motion.button>
    </motion.div>
  );
};

export default Result;
