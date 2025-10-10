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
