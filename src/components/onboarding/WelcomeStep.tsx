import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export const WelcomeStep = ({ onNext, onSkip }: WelcomeStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-[#059669] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Welcome to FinWell! 🎉
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            We'll help you improve your credit score in 3 simple steps
          </p>
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
