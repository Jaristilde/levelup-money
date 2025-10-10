import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";

interface DashboardTourStepProps {
  onComplete: () => void;
}

const tourSteps = [
  {
    title: "Track your progress here",
    description: "Monitor your credit score changes over time",
    icon: TrendingUp,
  },
  {
    title: "Stay motivated with milestones",
    description: "Celebrate achievements as you reach your goals",
    icon: Target,
  },
  {
    title: "Manage all accounts in one place",
    description: "View and organize all your financial accounts",
    icon: CreditCard,
  },
];

export const DashboardTourStep = ({ onComplete }: DashboardTourStepProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleNext = () => {
    if (currentTip < tourSteps.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      // Show celebration
      setShowCelebration(true);
      
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#10B981", "#059669", "#34D399"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#10B981", "#059669", "#34D399"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Auto-complete after celebration
      setTimeout(() => {
        onComplete();
      }, 3500);
    }
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-[#059669] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Achievement Unlocked! 🏆
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">
              Profile Setup Complete
            </p>
            <p className="text-md text-white/80">
              You're all set to start your financial journey!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = tourSteps[currentTip];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen bg-background/50 relative">
      {/* Spotlight overlay */}
      <div className="fixed inset-0 bg-black/60 z-40" />

      {/* Tour content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full p-8 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Icon className="w-12 h-12" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              {currentStep.title}
            </h3>
            <p className="text-muted-foreground">
              {currentStep.description}
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentTip < tourSteps.length - 1 ? "Next" : "Start Using FinWell"}
            </Button>

            <div className="flex justify-center gap-2">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentTip
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
