import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { GoalSelectionStep } from "@/components/onboarding/GoalSelectionStep";
import { AccountConnectionStep } from "@/components/onboarding/AccountConnectionStep";
import { SetGoalStep } from "@/components/onboarding/SetGoalStep";
import { DashboardTourStep } from "@/components/onboarding/DashboardTourStep";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export type FinancialGoal = "credit-score" | "debt" | "emergency" | "home" | null;

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal>(null);
  const [targetScore, setTargetScore] = useState(700);
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Load saved progress from localStorage
    const savedStep = localStorage.getItem("onboardingStep");
    const savedGoal = localStorage.getItem("selectedGoal");
    
    if (savedStep) setCurrentStep(parseInt(savedStep));
    if (savedGoal) setSelectedGoal(savedGoal as FinancialGoal);

    // Check if onboarding is already completed
    const hasCompleted = localStorage.getItem("hasCompletedOnboarding");
    if (hasCompleted === "true") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem("onboardingStep", currentStep.toString());
    if (selectedGoal) {
      localStorage.setItem("selectedGoal", selectedGoal);
    }
  }, [currentStep, selectedGoal]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem("hasCompletedOnboarding", "true");
      localStorage.removeItem("onboardingStep");
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasCompletedOnboarding", "true");
    localStorage.removeItem("onboardingStep");
    navigate("/");
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress indicator */}
      {currentStep > 1 && currentStep < 5 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of 5
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
              >
                Skip
              </Button>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      )}

      {/* Steps */}
      <div className={currentStep > 1 && currentStep < 5 ? "pt-24" : ""}>
        {currentStep === 1 && (
          <WelcomeStep onNext={handleNext} onSkip={handleSkip} />
        )}
        {currentStep === 2 && (
          <GoalSelectionStep
            selectedGoal={selectedGoal}
            onSelectGoal={setSelectedGoal}
            onNext={handleNext}
          />
        )}
        {currentStep === 3 && (
          <AccountConnectionStep onNext={handleNext} onSkip={handleNext} />
        )}
        {currentStep === 4 && (
          <SetGoalStep
            selectedGoal={selectedGoal}
            targetScore={targetScore}
            setTargetScore={setTargetScore}
            targetDate={targetDate}
            setTargetDate={setTargetDate}
            onNext={handleNext}
          />
        )}
        {currentStep === 5 && (
          <DashboardTourStep onComplete={handleNext} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
