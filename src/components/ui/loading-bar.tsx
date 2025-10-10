import { cn } from "@/lib/utils";

interface LoadingBarProps {
  className?: string;
}

export const LoadingBar = ({ className }: LoadingBarProps) => {
  return (
    <div className={cn("fixed top-0 left-0 right-0 h-1 bg-primary/20 overflow-hidden z-50", className)}>
      <div 
        className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]"
        style={{
          animation: 'loading 1.5s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
