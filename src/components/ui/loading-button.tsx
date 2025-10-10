import * as React from "react";
import { Loader2, Check } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  loadingText?: string;
  successText?: string;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    children, 
    loading = false, 
    success = false,
    loadingText = "Processing...",
    successText = "Done",
    disabled,
    className,
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading || success}
        className={cn(
          loading && "cursor-not-allowed opacity-60",
          success && "cursor-default",
          className
        )}
        {...props}
      >
        {loading && (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {loadingText}
          </>
        )}
        {success && (
          <>
            <Check className="w-4 h-4 mr-2" />
            {successText}
          </>
        )}
        {!loading && !success && children}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
