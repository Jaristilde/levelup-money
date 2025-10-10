import * as React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost" | "success";
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  quickActions?: { label: string; onClick: () => void }[];
  className?: string;
  illustration?: React.ReactNode;
}

export const EmptyState = React.memo(({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  quickActions,
  className,
  illustration,
}: EmptyStateProps) => {
  return (
    <Card className={cn("border-dashed border-2 bg-muted/20", className)}>
      <CardContent className="p-8 md:p-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
          {illustration ? (
            <div className="w-24 h-24 md:w-32 md:h-32">
              {illustration}
            </div>
          ) : (
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-muted/50 flex items-center justify-center">
              <Icon className="w-10 h-10 md:w-14 md:h-14 text-muted-foreground/60" strokeWidth={1.5} />
            </div>
          )}
          
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {description}
            </p>
          </div>

          {quickActions && quickActions.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {quickActions.map((qa, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={qa.onClick}
                  className="rounded-full"
                >
                  {qa.label}
                </Button>
              ))}
            </div>
          )}

          {action && (
            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-sm">
              <Button
                onClick={action.onClick}
                variant={action.variant || "success"}
                size="lg"
                className="flex-1"
              >
                {action.label}
              </Button>
              {secondaryAction && (
                <Button
                  onClick={secondaryAction.onClick}
                  variant={secondaryAction.variant || "outline"}
                  size="lg"
                  className="flex-1"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

EmptyState.displayName = "EmptyState";
