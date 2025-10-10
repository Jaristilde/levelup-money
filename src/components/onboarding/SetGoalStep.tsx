import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, addDays, differenceInWeeks } from "date-fns";
import { FinancialGoal } from "@/pages/Onboarding";
import { cn } from "@/lib/utils";

interface SetGoalStepProps {
  selectedGoal: FinancialGoal;
  targetScore: number;
  setTargetScore: (score: number) => void;
  targetDate: Date | undefined;
  setTargetDate: (date: Date | undefined) => void;
  onNext: () => void;
}

export const SetGoalStep = ({
  selectedGoal,
  targetScore,
  setTargetScore,
  targetDate,
  setTargetDate,
  onNext,
}: SetGoalStepProps) => {
  const suggestedDate = addDays(new Date(), 90);
  const currentScore = 580; // Mock current score
  const scoreDifference = targetScore - currentScore;
  const weeks = targetDate ? differenceInWeeks(targetDate, new Date()) : 0;
  const pointsPerWeek = weeks > 0 ? (scoreDifference / weeks).toFixed(1) : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Set your first goal
        </h2>
        <p className="text-lg text-muted-foreground">
          {selectedGoal === "credit-score" && "Let's improve your credit score"}
          {selectedGoal === "debt" && "Let's tackle your debt"}
          {selectedGoal === "emergency" && "Let's build your emergency fund"}
          {selectedGoal === "home" && "Let's work towards homeownership"}
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Target Credit Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Current: {currentScore}</span>
              <span className="text-3xl font-bold text-primary">{targetScore}</span>
            </div>
            <Slider
              value={[targetScore]}
              onValueChange={(value) => setTargetScore(value[0])}
              min={600}
              max={850}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>600</span>
              <span>850</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Target Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12",
                    !targetDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate ? format(targetDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={setTargetDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  defaultMonth={suggestedDate}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {!targetDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Suggested: {format(suggestedDate, "PPP")} (90 days)
              </p>
            )}
          </div>

          {targetDate && weeks > 0 && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Your goal:</span> Increase your score by{" "}
                <span className="font-bold text-primary">{pointsPerWeek} points per week</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          size="lg"
          disabled={!targetDate}
          className="px-12"
        >
          Set My Goal
        </Button>
      </div>
    </div>
  );
};
