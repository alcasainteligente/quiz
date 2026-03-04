import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Home, ArrowRight } from 'lucide-react';

interface PresentationProps {
  onStart: () => void;
}

const Presentation: React.FC<PresentationProps> = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Sua Casa, <span className="text-cyan-400 text-glow-cyan">Mais Inteligente</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Descubra como transformar o seu lar num espaço conectado, seguro e eficiente, sem obras e sem complicações.
        </p>
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-cyan-500/30 flex items-center gap-2 mx-auto"
        >
          Começar Quiz Gratuito <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Benefits Cards */}
      <motion.div id="solucoes" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20 scroll-mt-32" variants={itemVariants}>
        <BenefitCard
          icon={<Home className="w-8 h-8 text-cyan-400" />}
          title="Conforto Total"
          description="Controle luzes, estores e temperatura com a voz, telemóvel ou automações automáticas."
        />
        <BenefitCard
          icon={<Shield className="w-8 h-8 text-cyan-400" />}
          title="Segurança 24/7"
          description="Monitorize a sua casa em tempo real e receba alertas imediatos."
        />
        <BenefitCard
          icon={<Zap className="w-8 h-8 text-cyan-400" />}
          title="Eficiência Energética"
          description="Poupe na fatura da luz com automações inteligentes."
        />
      </motion.div>

      {/* How it Works */}
      <motion.div id="projetos" className="w-full bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10 scroll-mt-32" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-12">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          
          <Step
            number="1"
            title="Responda ao Quiz"
            description="Partilhe as características da sua casa e o que mais valoriza."
          />
          <Step
            number="2"
            title="Receba o Plano"
            description="Obtenha uma lista personalizada de equipamentos ideais para si."
          />
          <Step
            number="3"
            title="Transforme a Casa"
            description="Simples, prático e pensado para si."
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const BenefitCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm transition-colors"
  >
    <div className="bg-cyan-500/20 p-3 rounded-lg w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center relative z-10">
    <div className="w-12 h-12 bg-gray-900 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 font-bold text-xl mb-4 shadow-lg shadow-cyan-500/20">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default Presentation;
