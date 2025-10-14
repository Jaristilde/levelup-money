import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, AlertCircle, Search, Zap, Crown } from "lucide-react";

export type AwarenessLevel = "unaware" | "problem-aware" | "solution-aware" | "product-aware" | "most-aware";

interface AwarenessQualificationStepProps {
  onComplete: (level: AwarenessLevel) => void;
}

const questions = [
  {
    id: 1,
    question: "How would you describe your current financial situation?",
    options: [
      {
        text: "I don't really think about it much. Everything seems fine.",
        level: "unaware" as const,
        icon: Sparkles,
        color: "from-purple-400 to-pink-500"
      },
      {
        text: "I'm stressed about debt and my credit score is holding me back.",
        level: "problem-aware" as const,
        icon: AlertCircle,
        color: "from-orange-400 to-red-500"
      },
      {
        text: "I know I need a financial planning tool, but I'm researching options.",
        level: "solution-aware" as const,
        icon: Search,
        color: "from-blue-400 to-cyan-500"
      },
      {
        text: "I've tried several apps and I'm comparing features to find the best one.",
        level: "product-aware" as const,
        icon: Zap,
        color: "from-emerald-400 to-teal-500"
      },
      {
        text: "I'm already managing my finances well, looking for advanced optimization.",
        level: "most-aware" as const,
        icon: Crown,
        color: "from-amber-400 to-yellow-500"
      },
    ],
  },
];

export const AwarenessQualificationStep = ({ onComplete }: AwarenessQualificationStepProps) => {
  const handleSelect = (level: AwarenessLevel) => {
    // Store awareness level for personalization
    localStorage.setItem("awarenessLevel", level);
    onComplete(level);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Let's personalize your experience
        </h2>
        <p className="text-lg text-muted-foreground">
          This helps us show you exactly what you need, when you need it
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {questions[0].question}
        </h3>

        {questions[0].options.map((option) => {
          const Icon = option.icon;

          return (
            <Card
              key={option.level}
              onClick={() => handleSelect(option.level)}
              className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border hover:border-primary/50 group"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-full bg-gradient-to-br transition-all group-hover:scale-110",
                  option.color
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-base md:text-lg text-foreground font-medium flex-1">
                  {option.text}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't worry, you can always change this later in settings
        </p>
      </div>
    </div>
  );
};
