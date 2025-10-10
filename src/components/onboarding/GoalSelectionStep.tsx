import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Shield, Home } from "lucide-react";
import { FinancialGoal } from "@/pages/Onboarding";
import { cn } from "@/lib/utils";

interface GoalSelectionStepProps {
  selectedGoal: FinancialGoal;
  onSelectGoal: (goal: FinancialGoal) => void;
  onNext: () => void;
}

const goals = [
  {
    id: "credit-score" as const,
    title: "Improve Credit Score to 700+",
    icon: TrendingUp,
  },
  {
    id: "debt" as const,
    title: "Pay Off Debt",
    icon: DollarSign,
  },
  {
    id: "emergency" as const,
    title: "Save for Emergency Fund",
    icon: Shield,
  },
  {
    id: "home" as const,
    title: "Buy a Home",
    icon: Home,
  },
];

export const GoalSelectionStep = ({
  selectedGoal,
  onSelectGoal,
  onNext,
}: GoalSelectionStepProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What's your primary financial goal?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoal === goal.id;

          return (
            <Card
              key={goal.id}
              onClick={() => onSelectGoal(goal.id)}
              className={cn(
                "p-6 md:p-8 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105",
                isSelected
                  ? "border-primary border-2 bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={cn(
                    "p-4 rounded-full transition-colors",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  {goal.title}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          size="lg"
          disabled={!selectedGoal}
          className="px-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
