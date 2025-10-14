import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, TrendingUp, Shield, DollarSign, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

const Chat = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'en'
        ? 'Hello! I\'m your AI financial assistant powered by LevelUp Money. I can help you with:\n\n• Credit score improvement strategies\n• Debt payoff planning\n• Budgeting and saving tips\n• Investment advice\n• Financial goal setting\n\nWhat would you like to know?'
        : '¡Hola! Soy tu asistente financiero de IA impulsado por LevelUp Money. Puedo ayudarte con:\n\n• Estrategias para mejorar tu puntaje de crédito\n• Planificación de pago de deudas\n• Consejos de presupuesto y ahorro\n• Asesoramiento de inversión\n• Establecimiento de metas financieras\n\n¿Qué te gustaría saber?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { icon: TrendingUp, label: 'How to improve my credit score?', query: 'How can I improve my credit score?' },
    { icon: Shield, label: 'Debt payoff strategies', query: 'What are the best debt payoff strategies?' },
    { icon: DollarSign, label: 'Emergency fund advice', query: 'How much should I save for an emergency fund?' },
    { icon: Target, label: 'Set financial goals', query: 'Help me set realistic financial goals' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Credit score related
    if (input.includes('credit score') || input.includes('improve') && input.includes('credit')) {
      return `Great question! Here are proven strategies to improve your credit score:\n\n✅ Pay all bills on time (35% of score)\n✅ Keep credit utilization under 30% (30% of score)\n✅ Don't close old credit cards\n✅ Limit new credit applications\n✅ Dispute any errors on your report\n\nBased on your current score of 720, focusing on lowering your credit utilization from 25% to under 10% could increase your score by 15-25 points!\n\nWould you like me to create a personalized credit improvement plan?`;
    }

    // Debt related
    if (input.includes('debt') || input.includes('payoff') || input.includes('snowball') || input.includes('avalanche')) {
      return `I can help you choose the best debt payoff strategy! Here's a quick comparison:\n\n🔥 **Snowball Method**\n• Pay smallest debts first\n• Quick psychological wins\n• Builds momentum\n• Great for motivation\n\n💰 **Avalanche Method**\n• Pay highest interest first\n• Saves the most money\n• Mathematically optimal\n• Best for long-term savings\n\nBased on your $12,450 in debt with an extra $350/month payment:\n\n• Snowball: Debt-free in 35 months\n• Avalanche: Debt-free in 34 months, save $287 in interest\n\nWould you like me to create a detailed payoff plan?`;
    }

    // Emergency fund
    if (input.includes('emergency') || input.includes('savings') || input.includes('save')) {
      return `Building an emergency fund is crucial! Here's my recommendation:\n\n🎯 **Target Amount**: 3-6 months of expenses\n📊 **Your estimated need**: $15,000 (based on average expenses)\n💪 **Current progress**: You have $2,500 saved (17% of goal)\n\n**Action Plan:**\n1. Set up automatic $200/month transfer\n2. Save windfalls (tax refunds, bonuses)\n3. Keep in high-yield savings account\n4. Don't touch except for true emergencies\n\nAt $200/month, you'll reach your goal in 5 years. Want to explore ways to increase your monthly savings?`;
    }

    // Budget related
    if (input.includes('budget') || input.includes('spending') || input.includes('expenses')) {
      return `Let's optimize your budget using the 50/30/20 rule:\n\n📊 **Recommended Allocation:**\n• 50% Needs (housing, food, utilities): $2,500\n• 30% Wants (entertainment, dining): $1,500\n• 20% Savings/Debt: $1,000\n\n**Your Current Spending:**\n• Needs: 55% ($2,750) - Slightly high\n• Wants: 25% ($1,250) - Good!\n• Savings: 20% ($1,000) - On track!\n\n💡 **Quick Wins:**\n• Reduce dining out by $100/month\n• Negotiate lower insurance rates\n• Cancel unused subscriptions\n\nThis could free up $200/month for extra debt payments or savings!`;
    }

    // Goals related
    if (input.includes('goal') || input.includes('plan') || input.includes('future')) {
      return `Let's set up SMART financial goals! Here's what I recommend:\n\n🎯 **Short-term (1 year)**\n• Build emergency fund to $5,000\n• Pay off $3,000 in credit card debt\n• Increase credit score to 750+\n\n🎯 **Medium-term (3-5 years)**\n• Save $20,000 for home down payment\n• Become completely debt-free\n• Max out retirement contributions\n\n🎯 **Long-term (10+ years)**\n• Own a home\n• Build $500k net worth\n• Retire comfortably at 65\n\nWould you like me to break any of these down into monthly action steps?`;
    }

    // Investment related
    if (input.includes('invest') || input.includes('retirement') || input.includes('401k')) {
      return `Great question about investing! Here's my advice:\n\n📈 **Priority Order:**\n1. Build $1,000 emergency fund\n2. Get employer 401(k) match (free money!)\n3. Pay off high-interest debt (>7% APR)\n4. Max out Roth IRA ($7,000/year)\n5. Increase 401(k) to 15% of income\n6. Taxable investment account\n\n**Recommended Asset Allocation (Age 32):**\n• 80% Stocks (aggressive growth)\n• 15% Bonds (stability)\n• 5% Cash (liquidity)\n\n💰 **Compound Interest Magic:**\nInvesting $500/month at 8% return = $1.4M in 40 years!\n\nWould you like a personalized investment strategy?`;
    }

    // Default response for other queries
    return `I understand you're asking about ${userInput}. Let me help you with that!\n\nTo give you the most accurate advice, could you provide more details? For example:\n\n• What's your current financial situation?\n• What's your specific goal or concern?\n• What have you tried so far?\n\nIn the meantime, here are some resources:\n• Check your Credit Report page for score insights\n• Visit the Debt page for payoff calculators\n• Review your Budget for spending analysis\n• Set Goals to track your progress\n\nWhat would you like to explore first?`;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const assistantMessage: Message = {
      role: 'assistant',
      content: getAIResponse(input),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins flex items-center gap-2">
                AI Financial Assistant
              </h1>
              <p className="text-slate-600 font-inter flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Powered by advanced AI • Available 24/7
              </p>
            </div>
          </div>
        </header>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-700 mb-3 font-inter">Quick Actions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-brand-green hover:bg-brand-green/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                        <Icon className="w-5 h-5 text-brand-green" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 font-inter">{action.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col rounded-3xl shadow-xl overflow-hidden border-2 border-slate-200">
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className="flex items-start gap-3 max-w-[85%]">
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-green to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-brand-blue to-brand-blue-light text-white'
                        : 'bg-slate-50 text-slate-900 border-2 border-slate-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-inter">
                      {message.content}
                    </p>
                    {message.timestamp && (
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-white/70' : 'text-slate-500'
                      } font-inter`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-sm">You</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-green to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="border-t-2 border-slate-200 p-4 md:p-6 bg-slate-50">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your finances..."
                disabled={isTyping}
                className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter text-slate-900 placeholder-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            {/* Helper Text */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-inter">
              <Lightbulb className="w-4 h-4 text-brand-yellow" />
              <span>Tip: Be specific about your financial questions for better answers</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
