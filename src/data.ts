import { Lightbulb, Lock, Thermometer, Tv, Wifi, Zap, Video, Speaker, Smartphone, Home } from 'lucide-react';

export interface Question {
  id: string;
  question: string;
  options: string[];
}

export interface Recommendation {
  name: string;
  icon: any;
  description: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'moradia',
    question: 'Onde mora?',
    options: ['Apartamento', 'Moradia', 'Escritório']
  },
  {
    id: 'area',
    question: 'Qual a área aproximada?',
    options: ['Até 100m²', '100-200m²', 'Mais de 200m²']
  },
  {
    id: 'habitantes',
    question: 'Quem vive na casa?',
    options: ['Vivo sozinho', 'Casal', 'Família com crianças', 'Tenho animais de estimação']
  },
  {
    id: 'prioridade',
    question: 'O que é mais importante para si?',
    options: ['Conforto', 'Segurança', 'Poupança de energia', 'Entretenimento']
  },
  {
    id: 'controlo',
    question: 'Como prefere controlar os dispositivos?',
    options: ['Voz (Alexa/Google)', 'App no telemóvel', 'Automatizado (sensores)', 'Mistura de tudo']
  },
  {
    id: 'internet',
    question: 'Como é a cobertura Wi-Fi atual?',
    options: ['Excelente em todo o lado', 'Falha em alguns quartos', 'Preciso de melhorar urgentemente']
  },
  {
    id: 'estores',
    question: 'Tem estores elétricos?',
    options: ['Sim, em todas as janelas', 'Apenas em algumas', 'Não, são manuais']
  },
  {
    id: 'aquecimento',
    question: 'Qual o sistema de climatização principal?',
    options: ['Ar Condicionado', 'Aquecimento Central', 'Aquecedores elétricos', 'Nenhum específico']
  },
  {
    id: 'iluminacao',
    question: 'Sabe qual o tipo de instalação elétrica?',
    options: ['Com fio neutro nos interruptores', 'Sem fio neutro (instalação antiga)', 'Não sei']
  },
  {
    id: 'orcamento',
    question: 'Tem orçamento definido?',
    options: ['Solução básica (€)', 'Solução intermédia (€€)', 'Solução premium (€€€)']
  },
  {
    id: 'equipamentos',
    question: 'Já tem algum equipamento inteligente?',
    options: ['Nenhum', 'Assistente de voz', 'Lâmpadas inteligentes', 'Tomadas inteligentes']
  }
];

export const generateRecommendations = (answers: Record<string, string>): { equipamentos: Recommendation[], automacoes: string[] } => {
  const equipamentos: Recommendation[] = [];
  const automacoes: string[] = [];

  // Base Hub/Gateway
  if (answers['orcamento'] !== 'Solução básica (€)' || answers['iluminacao'] === 'Sem fio neutro (instalação antiga)') {
    equipamentos.push({
      name: 'Hub Zigbee 3.0',
      icon: Wifi,
      description: 'Essencial para estabilidade e para conectar dispositivos sem sobrecarregar o Wi-Fi.'
    });
  }

  // Wi-Fi Logic
  if (answers['internet'] !== 'Excelente em todo o lado' || answers['area'] === 'Mais de 200m²') {
    equipamentos.push({
      name: 'Sistema Mesh Wi-Fi 6',
      icon: Wifi,
      description: 'Elimine zonas mortas e garanta internet rápida para todos os dispositivos.'
    });
  }

  // Voice Assistant
  if (answers['controlo'] === 'Voz (Alexa/Google)' || answers['controlo'] === 'Mistura de tudo') {
    equipamentos.push({
      name: 'Assistente de Voz Inteligente',
      icon: Speaker,
      description: 'O centro de comando da sua casa. "Alexa, bom dia!"'
    });
  }

  // Shutter Logic
  if (answers['estores'] !== 'Não, são manuais') {
    equipamentos.push({
      name: 'Módulo de Estores Inteligente',
      icon: Home,
      description: 'Automatize a abertura com o nascer do sol ou feche tudo ao sair de casa.'
    });
    automacoes.push('Fechar estores automaticamente quando o sol bate direto na janela.');
  }

  // HVAC Logic
  if (answers['aquecimento'] === 'Ar Condicionado') {
    equipamentos.push({
      name: 'Controlador IR Inteligente',
      icon: Thermometer,
      description: 'Torne o seu AC antigo inteligente. Controle-o de qualquer lugar.'
    });
  } else if (answers['aquecimento'] === 'Aquecimento Central') {
    equipamentos.push({
      name: 'Termóstato Inteligente',
      icon: Thermometer,
      description: 'Poupe até 30% na fatura de gás com programação inteligente.'
    });
  }

  // Lighting Logic - Always include based on user request
  if (answers['iluminacao'] === 'Sem fio neutro (instalação antiga)') {
    equipamentos.push({
      name: 'Interruptores Inteligentes (Sem Neutro)',
      icon: Lightbulb,
      description: 'Substitua os seus interruptores antigos sem precisar de passar novos cabos.'
    });
  } else {
    equipamentos.push({
      name: 'Módulos de Iluminação Inteligente',
      icon: Zap,
      description: 'Instale atrás dos interruptores existentes para os tornar inteligentes mantendo o design, ou substitua por interruptores inteligentes se preferir.'
    });
  }

  // Priority Logic
  switch (answers['prioridade']) {
    case 'Segurança':
      equipamentos.push(
        { name: 'Câmara de Vigilância 360º', icon: Video, description: 'Visão total da divisão com rastreio de movimento e áudio bidirecional.' },
        { name: 'Sensores de Portas/Janelas', icon: Lock, description: 'Receba alertas imediatos no telemóvel se algo abrir quando não está.' }
      );
      if (answers['moradia'] === 'Moradia') {
        equipamentos.push({ name: 'Videoporteiro Inteligente', icon: Video, description: 'Veja e fale com quem toca à campainha, onde quer que esteja.' });
      }
      
      automacoes.push(
        'Se detetar movimento e não estiver ninguém em casa, tocar sirene e enviar vídeo.',
        'Acender luzes exteriores e interiores aleatoriamente quando está de férias (Simulação de Presença).',
        'Receber notificação com foto se a porta de entrada for aberta entre as 00h e as 06h.',
        'Trancar a fechadura inteligente automaticamente 5 minutos após a porta fechar.',
        'Se o detetor de fumo disparar, acender todas as luzes e destrancar portas para facilitar a saída.'
      );
      break;

    case 'Conforto':
      equipamentos.push(
        { name: 'Lâmpadas Reguláveis (Dimmer)', icon: Lightbulb, description: 'A luz certa para cada atividade, do trabalho focado ao relaxamento noturno.' },
        { name: 'Sensor de Temperatura e Humidade', icon: Thermometer, description: 'Monitorize o conforto de cada divisão e ative o aquecimento automaticamente.' }
      );
      
      automacoes.push(
        'Luz de presença suave no corredor (20%) se detetar movimento durante a noite.',
        'Abrir estores suavemente 15 minutos antes do despertador tocar para um acordar natural.',
        'Ligar o aquecimento na casa de banho 30 minutos antes da hora de acordar.',
        'Ao chegar a casa, ligar luzes de boas-vindas e tocar a sua playlist favorita.',
        'Apagar todas as luzes e fechar estores com um único comando de voz "Boa noite".'
      );
      break;

    case 'Poupança de energia':
      equipamentos.push(
        { name: 'Tomadas com Medidor de Consumo', icon: Zap, description: 'Descubra que aparelhos gastam mais (standby) e crie horários de funcionamento.' }
      );
      if (answers['aquecimento'] === 'Aquecedores elétricos') {
        equipamentos.push({ name: 'Tomada Inteligente 16A', icon: Zap, description: 'Controle os aquecedores elétricos e defina temporizadores para não ficarem ligados.' });
      }
      
      automacoes.push(
        'Desligar automaticamente luzes e AC se não for detetado movimento numa divisão por 15 min.',
        'Fechar estores no verão quando o sol bate direto para poupar no Ar Condicionado.',
        'Desligar tomadas de standby (TV, Consolas) automaticamente durante a noite.',
        'Notificar se uma janela ficar aberta enquanto o aquecimento/AC está ligado.',
        'Avisar se o consumo diário exceder um determinado valor em Euros.'
      );
      break;

    case 'Entretenimento':
      equipamentos.push(
        { name: 'Controlador IR Universal', icon: Tv, description: 'Controle a sua TV e Sistema de Som pelo telemóvel ou voz (substitui os comandos antigos).' },
        { name: 'Fita LED RGBIC', icon: Tv, description: 'Cores dinâmicas que dançam e sincronizam com a música ou imagem da TV.' },
        { name: 'Botão de Cenário Inteligente', icon: Smartphone, description: 'Um clique físico para ativar instantaneamente o modo "Cinema" ou "Gaming".' }
      );
      
      automacoes.push(
        'Ao dizer "Ver Futebol", ligar TV, mudar automaticamente para o canal de desporto e ajustar o som.',
        'Modo Cinema: Ao ligar a TV, baixar luzes para 30%, fechar estores e ligar sistema de som.',
        'Ajustar a temperatura da sala automaticamente ao iniciar um filme para maior conforto.',
        'Luzes atrás da TV (Ambilight) ajustam-se automaticamente à cor desejada para seu ambiente.',
        'Ligar a consola de jogos e mudar a entrada da TV (HDMI) com um único comando.'
      );
      break;
  }

  // Pet Logic - Add to equipment but don't mess up the 5 automations if possible, or add relevant pet automation if space
  if (answers['habitantes'] === 'Tenho animais de estimação' || answers['habitantes'] === 'Família com crianças') {
    equipamentos.push({
      name: 'Câmara Interior para Pets/Bebés',
      icon: Video,
      description: 'Fique tranquilo vendo o que se passa em casa e fale através do áudio bidirecional.'
    });
  }

  // Budget adjustments - Premium
  if (answers['orcamento'] === 'Solução premium (€€€)') {
    equipamentos.push({
      name: 'Tablet de Parede (Dashboard)',
      icon: Smartphone,
      description: 'Controlo centralizado e elegante para toda a família gerir a casa.'
    });
  }

  // Ensure we have exactly 5 automations. 
  // The switch cases above provide 5 specific ones. 
  // If for some reason we need fallbacks (shouldn't happen with current logic, but good practice):
  const fallbackAutomations = [
    'Acender luzes exteriores ao pôr do sol.',
    'Notificação se a porta do frigorífico ficar aberta.',
    'Ligar máquina de café ao acordar.',
    'Simulação de presença nas férias.',
    'Alerta de fuga de água na cozinha.'
  ];

  let finalAutomations = [...automacoes];
  if (finalAutomations.length < 5) {
    const needed = 5 - finalAutomations.length;
    finalAutomations = [...finalAutomations, ...fallbackAutomations.slice(0, needed)];
  }

  return { equipamentos, automacoes: finalAutomations.slice(0, 5) };
};
