import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Shield, Star, Heart, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface WelcomeStepProps {
  onNext: () => void;
  onSkip: () => void;
}

const messages = [
  {
    headline: "Welcome to LevelUp Money!",
    subtext: "Build wealth, crush debt, live free.",
    icon: Zap,
  },
  {
    headline: "Tired of Stressing About Debt?",
    subtext: "Get your personalized roadmap to financial freedom.",
    icon: Heart,
  },
  {
    headline: "Ready to Boost Your Credit Score?",
    subtext: "Join 50,000+ users who've improved their scores by 127 points.",
    icon: TrendingUp,
  },
  {
    headline: "Take Control of Your Future",
    subtext: "Comprehensive financial planning that actually works.",
    icon: Star,
  },
];

export const WelcomeStep = ({ onNext, onSkip }: WelcomeStepProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = messages[currentMessage].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-[#059669] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Message */}
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce">
              <CurrentIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1
            key={`headline-${currentMessage}`}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in"
          >
            {messages[currentMessage].headline}
          </h1>
          <p
            key={`subtext-${currentMessage}`}
            className="text-lg md:text-xl text-white/90 max-w-xl mx-auto animate-fade-in"
          >
            {messages[currentMessage].subtext}
          </p>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMessage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentMessage
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to message ${index + 1}`}
            />
          ))}
        </div>

        {/* Social Proof Stats - Mobile Optimized */}
        <div className="flex justify-center gap-4 sm:gap-8 py-4">
          <div className="text-white/90 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-xl sm:text-2xl">50K+</span>
            </div>
            <div className="text-xs sm:text-sm text-white/70">Users</div>
          </div>
          <div className="text-white/90 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-xl sm:text-2xl">127 pts</span>
            </div>
            <div className="text-xs sm:text-sm text-white/70">Avg Increase</div>
          </div>
          <div className="text-white/90 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-lg sm:text-2xl">Bank</span>
            </div>
            <div className="text-xs sm:text-sm text-white/70">Security</div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onNext}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-12 py-6 text-lg h-auto"
          >
            Get Started
          </Button>

          <div>
            <button
              onClick={onSkip}
              className="text-white/80 hover:text-white underline text-sm transition-colors"
            >
              I've used this before
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
