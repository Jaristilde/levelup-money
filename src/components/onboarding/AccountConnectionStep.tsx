import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, FileCheck } from "lucide-react";

interface AccountConnectionStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export const AccountConnectionStep = ({
  onNext,
  onSkip,
}: AccountConnectionStepProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Connect your bank account
        </h2>
        <p className="text-lg text-muted-foreground">
          We use bank-level encryption to keep your data safe 🔒
        </p>
      </div>

      <Card className="p-8 mb-8">
        <div className="space-y-6">
          <Button
            onClick={onNext}
            size="lg"
            className="w-full text-lg h-14"
          >
            <Lock className="mr-2 h-5 w-5" />
            Connect Securely
          </Button>

          <div className="text-center">
            <button
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">
          Your security is our priority
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <p className="text-sm text-foreground font-medium">
              256-bit encryption
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <p className="text-sm text-foreground font-medium">
              Bank-level security
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <FileCheck className="w-6 h-6" />
            </div>
            <p className="text-sm text-foreground font-medium">
              No data sold
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
