import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    creditReport: 'Credit Report',
    disputeLetter: 'Dispute Letter',
    budget: 'Budget',
    debt: 'Debt',
    goals: 'Goals',
    retirement: 'Retirement',
    chat: 'AI Assistant',
    settings: 'Settings',
    
    // Home page
    welcomeTitle: 'Your Financial Wellness Journey',
    welcomeSubtitle: 'Take control of your credit and build a brighter financial future',
    creditScore: 'Credit Score',
    monthlyBudget: 'Monthly Budget',
    debtPayoff: 'Debt Progress',
    savingsGoal: 'Savings Goal',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    done: 'Done',
    
    // Credit Report
    creditReportTitle: 'Credit Report Analysis',
    uploadReport: 'Upload Report',
    analyzeCredit: 'Analyze My Credit',
    
    // Dispute Letter
    disputeLetterTitle: 'Generate Dispute Letter',
    disputeLetterSubtitle: 'Create a professional letter to dispute errors on your credit report',
    
    // Budget
    budgetTitle: 'Budget Tracker',
    income: 'Income',
    expenses: 'Expenses',
    cashFlow: 'Cash Flow',
    
    // Debt
    debtTitle: 'Debt Payoff Planner',
    totalDebt: 'Total Debt',
    payoffStrategy: 'Payoff Strategy',
    
    // Goals
    goalsTitle: 'Smart Goal Planner',
    setNewGoal: 'Set New Goal',
    
    // Retirement
    retirementTitle: 'Retirement Readiness',
    checkReadiness: 'Check My Readiness',
    
    // Chat
    chatTitle: 'AI Financial Assistant',
    askQuestion: 'Ask me anything about credit, debt, or savings...',
    
    // Credit Bureau Section
    freeCreditReportTitle: 'Get My Free Credit Report',
    freeCreditReportSubtitle: 'Check your credit for free and stay in control—you\'re entitled to 1 free report every 12 months from each bureau.',
    viewReport: 'View Report',
    didYouKnow: 'Did you know?',
    legalNotice: 'Under U.S. federal law, you are entitled to one free credit report every 12 months from each of the three credit bureaus. Always use AnnualCreditReport.com—the official government-backed site.',
    quickActions: 'Quick Actions',
    generateDisputeLetter: 'Generate Dispute Letter',
    askAIAssistant: 'Ask AI Assistant',
    
    // Money Milestone Map
    milestoneMapTitle: 'Get Off the Rat Race',
    milestoneMapSubtitle: 'Step-by-step milestones to escape paycheck-to-paycheck',
    memeLabel: 'Escaping the Rat Race',
    whoStuck: 'Who\'s stuck in the rat race?',
    genZ: 'Gen Z',
    millennials: 'Millennials',
    genX: 'Gen X',
    babyBoomers: 'Baby Boomers',
    sourceCaption: 'Source: MarketWatch 2025 paycheck-to-paycheck survey',
    
    // Milestones
    milestone1: 'Starter Safety Stack',
    milestone1Goal: 'Build your starter emergency fund',
    milestone2: 'Debt Destroyer Plan',
    milestone2Goal: 'Eliminate non-mortgage debt',
    milestone3: 'Emergency Vault',
    milestone3Goal: '3–6 months of expenses saved',
    milestone4: 'Wealth Wheel',
    milestone4Goal: 'Invest for the future',
    milestone5: 'Future Fund for Family',
    milestone5Goal: 'Smart goals for family & fun',
    milestone6: 'Big-Debt Meltdown',
    milestone6Goal: 'Protect and plan (insurance, will)',
    milestone7: 'Freedom Flourish',
    milestone7Goal: 'Grow, give, and safeguard wealth',
    
    viewDetails: 'View Details',
    complete: 'Complete',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    
    // Milestone 1 checklist
    m1_check1: 'Save your starter fund',
    m1_check2: 'Create a budget',
    m1_check3: 'Complete your Snapshot Tool',
    
    // Milestone 2 checklist
    m2_check1: 'Pick your payoff method (Snowball/Avalanche/Custom)',
    m2_check2: 'Pay off one card and close cards you don\'t need',
    m2_check3: 'Repeat your method across debts until $0',
    
    // Milestone 3 checklist
    m3_check1: 'Calculate full emergency fund (3–6 months)',
    m3_check2: 'Roll freed-up debt payment into savings auto-transfer',
    m3_check3: 'Open a high-yield account / money market',
    
    // Milestone 4 checklist
    m4_check1: 'Set down-payment goal or mortgage payoff plan',
    m4_check2: 'Enroll/raise retirement contributions (~15–18%)',
    m4_check3: 'Automate monthly investing',
    
    // Milestone 5 checklist
    m5_check1: 'Create a SMART goal',
    m5_check2: 'Open dedicated sub-account and automate deposits',
    m5_check3: 'Track and celebrate progress with badges',
    
    // Milestone 6 checklist
    m6_check1: 'Get or review life insurance',
    m6_check2: 'Create/refresh a will (and beneficiaries)',
    m6_check3: 'Review major risks (disability, health)',
    
    // Milestone 7 checklist
    m7_check1: 'Define giving/savings ratio',
    m7_check2: 'Set long-term wealth guardrails',
    m7_check3: 'Plan an annual review',
    
    // Snapshot Tool
    snapshotTitle: 'Financial Snapshot Tool',
    snapshotSubtitle: 'Capture your current financial picture',
    annualIncome: 'Annual Income',
    monthlyExpenses: 'Monthly Expenses',
    totalSavings: 'Total Savings',
    emergencyFund: 'Emergency Fund Balance',
    debtsList: 'Debts List',
    activeCards: 'Active Credit Cards',
    saveSnapshot: 'Save Snapshot',
    snapshotSummary: 'Snapshot Summary',
    dtiRatio: 'DTI Ratio',
    utilization: 'Credit Utilization',
    starterTarget: 'Starter Fund Target',
  },
  es: {
    // Navigation
    home: 'Inicio',
    creditReport: 'Reporte de Crédito',
    disputeLetter: 'Carta de Disputa',
    budget: 'Presupuesto',
    debt: 'Deuda',
    goals: 'Metas',
    retirement: 'Retiro',
    chat: 'Asistente IA',
    settings: 'Configuración',
    
    // Home page
    welcomeTitle: 'Tu Camino al Bienestar Financiero',
    welcomeSubtitle: 'Toma control de tu crédito y construye un futuro financiero brillante',
    creditScore: 'Puntaje de Crédito',
    monthlyBudget: 'Presupuesto Mensual',
    debtPayoff: 'Progreso de Deuda',
    savingsGoal: 'Meta de Ahorro',
    
    // Common
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    next: 'Siguiente',
    back: 'Atrás',
    submit: 'Enviar',
    done: 'Hecho',
    
    // Credit Report
    creditReportTitle: 'Análisis de Reporte de Crédito',
    uploadReport: 'Subir Reporte',
    analyzeCredit: 'Analizar Mi Crédito',
    
    // Dispute Letter
    disputeLetterTitle: 'Generar Carta de Disputa',
    disputeLetterSubtitle: 'Crea una carta profesional para disputar errores en tu reporte de crédito',
    
    // Budget
    budgetTitle: 'Seguimiento de Presupuesto',
    income: 'Ingresos',
    expenses: 'Gastos',
    cashFlow: 'Flujo de Efectivo',
    
    // Debt
    debtTitle: 'Planificador de Pago de Deuda',
    totalDebt: 'Deuda Total',
    payoffStrategy: 'Estrategia de Pago',
    
    // Goals
    goalsTitle: 'Planificador de Metas Inteligentes',
    setNewGoal: 'Establecer Nueva Meta',
    
    // Retirement
    retirementTitle: 'Preparación para el Retiro',
    checkReadiness: 'Revisar Mi Preparación',
    
    // Chat
    chatTitle: 'Asistente Financiero IA',
    askQuestion: 'Pregúntame sobre crédito, deuda o ahorros...',
    
    // Credit Bureau Section
    freeCreditReportTitle: 'Obtén Tu Reporte de Crédito Gratuito',
    freeCreditReportSubtitle: 'Revisa tu crédito gratis y mantén el control—tienes derecho a 1 reporte gratuito cada 12 meses de cada agencia.',
    viewReport: 'Ver Reporte',
    didYouKnow: '¿Sabías que...?',
    legalNotice: 'Según la ley federal de EE.UU., tienes derecho a un informe de crédito gratuito cada 12 meses de cada una de las tres agencias de crédito. Usa siempre AnnualCreditReport.com, el sitio web oficial aprobado por el gobierno.',
    quickActions: 'Acciones Rápidas',
    generateDisputeLetter: 'Generar Carta de Disputa',
    askAIAssistant: 'Preguntar al Asistente IA',
    
    // Money Milestone Map
    milestoneMapTitle: 'Sal de la Rueda del Hámster',
    milestoneMapSubtitle: 'Metas paso a paso para salir de vivir al día',
    memeLabel: 'Salir de la rueda del hámster',
    whoStuck: '¿Quién sigue en la rueda del hámster?',
    genZ: 'Gen Z',
    millennials: 'Millennials',
    genX: 'Generación X',
    babyBoomers: 'Baby Boomers',
    sourceCaption: 'Fuente: Encuesta MarketWatch 2025 sobre vivir al día',
    
    // Milestones
    milestone1: 'Fondo Inicial de Seguridad',
    milestone1Goal: 'Construir tu fondo de emergencia inicial',
    milestone2: 'Plan Destructor de Deudas',
    milestone2Goal: 'Eliminar deudas sin hipoteca',
    milestone3: 'Bóveda de Emergencias',
    milestone3Goal: 'Ahorrar 3–6 meses de gastos',
    milestone4: 'Rueda de Riqueza',
    milestone4Goal: 'Invertir y construir patrimonio',
    milestone5: 'Fondo Futuro para la Familia',
    milestone5Goal: 'Metas familiares y experiencias con SMART',
    milestone6: 'Deshielo de Grandes Deudas',
    milestone6Goal: 'Proteger a tu familia y tu patrimonio',
    milestone7: 'Florecer en Libertad',
    milestone7Goal: 'Hacer crecer, proteger y compartir',
    
    viewDetails: 'Ver Detalles',
    complete: 'Completado',
    inProgress: 'En Progreso',
    notStarted: 'No Iniciado',
    
    // Milestone 1 checklist
    m1_check1: 'Ahorra tu fondo inicial',
    m1_check2: 'Crea tu presupuesto',
    m1_check3: 'Completa tu Herramienta de Instantánea',
    
    // Milestone 2 checklist
    m2_check1: 'Elige tu método de pago (Bola de Nieve/Avalancha/Personalizado)',
    m2_check2: 'Liquida una tarjeta y cierra las que no necesitas',
    m2_check3: 'Repite el método hasta dejar tu deuda en $0',
    
    // Milestone 3 checklist
    m3_check1: 'Calcula tu fondo completo de emergencias (3–6 meses)',
    m3_check2: 'Redirige los pagos de deuda liberados a un ahorro automático',
    m3_check3: 'Abre una cuenta de alto rendimiento / mercado monetario',
    
    // Milestone 4 checklist
    m4_check1: 'Ahorra para enganche de vivienda o plan para pagar hipoteca antes',
    m4_check2: 'Aporta a tu retiro (Roth IRA/401(k)), objetivo de ~15–18%',
    m4_check3: 'Automatiza la inversión mensual',
    
    // Milestone 5 checklist
    m5_check1: 'Crea una meta SMART',
    m5_check2: 'Abre una subcuenta dedicada y automatiza depósitos',
    m5_check3: 'Sigue y celebra el avance con insignias',
    
    // Milestone 6 checklist
    m6_check1: 'Contrata o revisa tu seguro de vida',
    m6_check2: 'Crea/actualiza tu testamento (y beneficiarios)',
    m6_check3: 'Revisa riesgos mayores (incapacidad, salud)',
    
    // Milestone 7 checklist
    m7_check1: 'Define tu proporción dar/ahorrar',
    m7_check2: 'Establece reglas de largo plazo',
    m7_check3: 'Programa una revisión anual',
    
    // Snapshot Tool
    snapshotTitle: 'Herramienta de Instantánea Financiera',
    snapshotSubtitle: 'Captura tu situación financiera actual',
    annualIncome: 'Ingresos Anuales',
    monthlyExpenses: 'Gastos Mensuales',
    totalSavings: 'Ahorros Totales',
    emergencyFund: 'Balance del Fondo de Emergencias',
    debtsList: 'Lista de Deudas',
    activeCards: 'Tarjetas de Crédito Activas',
    saveSnapshot: 'Guardar Instantánea',
    snapshotSummary: 'Resumen de Instantánea',
    dtiRatio: 'Relación DTI',
    utilization: 'Utilización de Crédito',
    starterTarget: 'Meta del Fondo Inicial',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'es' ? 'es' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
