import { Card, CardContent } from "@/components/ui/card";
import { Badge, getRelevantBadges, getUserBadges, getUserLevel, getTotalPoints } from "@/lib/gamification";
import { AwarenessLevel } from "@/components/onboarding/AwarenessQualificationStep";
import { cn } from "@/lib/utils";
import { Trophy, Star, Lock } from "lucide-react";
import { useState } from "react";

interface BadgesWidgetProps {
  awarenessLevel?: AwarenessLevel | null;
}

export const BadgesWidget = ({ awarenessLevel }: BadgesWidgetProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const allBadges = getUserBadges();
  const relevantBadges = awarenessLevel ? getRelevantBadges(awarenessLevel) : allBadges;
  const userLevel = getUserLevel();
  const totalPoints = getTotalPoints();

  const categories = [
    { id: "all", name: "All" },
    { id: "getting-started", name: "Getting Started" },
    { id: "streak", name: "Streaks" },
    { id: "credit", name: "Credit" },
    { id: "debt", name: "Debt" },
    { id: "savings", name: "Savings" },
  ];

  const filteredBadges = selectedCategory === "all"
    ? relevantBadges
    : relevantBadges.filter((b) => b.category === selectedCategory);

  const unlockedCount = relevantBadges.filter((b) => b.unlocked).length;
  const totalCount = relevantBadges.length;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-slate-200/50 shadow-sm">
      <CardContent className="p-6">
        {/* Header with Level and Points */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Your Achievements
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {unlockedCount} of {totalCount} unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-amber-600 font-bold text-lg">
              <Star className="w-5 h-5 fill-amber-500" />
              Level {userLevel}
            </div>
            <div className="text-sm text-slate-600">{totalPoints} points</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0",
                selectedCategory === category.id
                  ? "bg-purple-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 active:bg-slate-200"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Badge Grid - Responsive */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No badges in this category yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
    >
      <button
        className={cn(
          "w-full aspect-square rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center transition-all active:scale-95",
          badge.unlocked
            ? `bg-gradient-to-br ${badge.color} shadow-md hover:shadow-lg sm:hover:scale-105`
            : "bg-slate-200 opacity-60 hover:opacity-80 active:opacity-90"
        )}
      >
        <div className={cn(
          "text-2xl sm:text-3xl mb-1",
          badge.unlocked ? "" : "grayscale"
        )}>
          {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />}
        </div>
        <div className={cn(
          "text-[9px] sm:text-[10px] font-semibold text-center leading-tight",
          badge.unlocked ? "text-white" : "text-slate-500"
        )}>
          {badge.name.split(" ")[0]}
        </div>

        {/* Progress Bar for Locked Badges with Progress */}
        {!badge.unlocked && badge.progress !== undefined && badge.maxProgress && (
          <div className="w-full mt-1 sm:mt-2 h-1 bg-slate-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
            />
          </div>
        )}
      </button>

      {/* Tooltip - Optimized for mobile */}
      {showTooltip && (
        <div className="fixed sm:absolute bottom-4 sm:bottom-full left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 mb-0 sm:mb-2 z-50 sm:w-48">
          <div className="bg-slate-900 text-white text-xs sm:text-sm rounded-lg p-4 shadow-2xl">
            <div className="font-bold mb-1 text-sm">{badge.name}</div>
            <div className="text-slate-300 leading-relaxed">{badge.description}</div>
            {!badge.unlocked && badge.progress !== undefined && badge.maxProgress && (
              <div className="mt-2 text-slate-400">
                Progress: {badge.progress} / {badge.maxProgress}
              </div>
            )}
            {badge.unlocked && badge.unlockedAt && (
              <div className="mt-2 text-slate-400">
                Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="mt-3 w-full py-2 bg-white/10 rounded hover:bg-white/20 transition-colors sm:hidden"
            >
              Close
            </button>
          </div>
          <div className="hidden sm:block w-2 h-2 bg-slate-900 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
        </div>
      )}
    </div>
  );
};
