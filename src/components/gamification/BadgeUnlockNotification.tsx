import { useEffect, useState } from "react";
import { Badge } from "@/lib/gamification";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import confetti from "canvas-confetti";

interface BadgeUnlockNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export const BadgeUnlockNotification = ({
  badge,
  onClose,
}: BadgeUnlockNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10B981", "#14B8A6", "#06B6D4", "#8B5CF6", "#EC4899"],
    });

    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <Card
        className={`max-w-md w-full bg-gradient-to-br ${badge.color} border-none shadow-2xl transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-8 text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4">
            <div className="text-7xl mb-4 animate-bounce">{badge.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Badge Unlocked!
            </h2>
            <h3 className="text-2xl font-semibold text-white/90 mb-3">
              {badge.name}
            </h3>
            <p className="text-white/80 text-lg">{badge.description}</p>
          </div>

          <div className="mt-6 text-white/90 text-sm">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              +10 Points
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
