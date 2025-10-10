import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      lg: "text-lg",
      base: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    variant: {
      default: "text-foreground",
      secondary: "text-muted-foreground",
      disabled: "text-muted-foreground/50",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    variant: "default",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, variant, as = "p", ...props }, ref) => {
    const Comp = as;
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, weight, variant }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
