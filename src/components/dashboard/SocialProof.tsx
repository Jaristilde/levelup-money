import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, Users, Award } from "lucide-react";
import { AwarenessLevel } from "@/components/onboarding/AwarenessQualificationStep";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  achievement: string;
  awarenessLevel: AwarenessLevel;
}

const testimonials: Testimonial[] = [
  {
    name: "Jessica Chen",
    role: "Registered Nurse",
    avatar: "problem-aware",
    quote: "I went from stressed about debt to having a clear plan. My credit score jumped 80 points in 6 months!",
    achievement: "Credit Score: 650 → 730",
    awarenessLevel: "problem-aware",
  },
  {
    name: "David Rodriguez",
    role: "High School Teacher",
    avatar: "solution-aware",
    quote: "Finally, a comprehensive tool that gives me the data I need to make informed decisions for my family's future.",
    achievement: "Built $50K emergency fund",
    awarenessLevel: "solution-aware",
  },
  {
    name: "Maria Garcia",
    role: "Marketing Consultant",
    avatar: "product-aware",
    quote: "This app saves me 10 hours a month. The automation features are exactly what I needed for my business.",
    achievement: "Automated finances completely",
    awarenessLevel: "product-aware",
  },
  {
    name: "Ben Carter",
    role: "Software Engineer",
    avatar: "most-aware",
    quote: "The advanced analytics and net worth tracking are unmatched. Perfect for serious wealth builders.",
    achievement: "Reached $2M net worth",
    awarenessLevel: "most-aware",
  },
];

const successStats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    color: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    value: "127 pts",
    label: "Avg Credit Score Increase",
    color: "text-blue-600",
  },
  {
    icon: Award,
    value: "$2.5M",
    label: "Debt Paid Off",
    color: "text-purple-600",
  },
];

interface SocialProofProps {
  awarenessLevel?: AwarenessLevel | null;
  variant?: "testimonials" | "stats" | "both";
}

export const SocialProof = ({ awarenessLevel, variant = "both" }: SocialProofProps) => {
  // Filter testimonials to show relevant ones
  const relevantTestimonials = awarenessLevel
    ? testimonials.filter((t) => t.awarenessLevel === awarenessLevel)
    : testimonials.slice(0, 2);

  const showStats = variant === "stats" || variant === "both";
  const showTestimonials = variant === "testimonials" || variant === "both";

  return (
    <div className="space-y-6">
      {/* Success Stats */}
      {showStats && (
        <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200/50 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Trusted by thousands
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {successStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-slate-100">
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials */}
      {showTestimonials && relevantTestimonials.length > 0 && (
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-slate-200/50 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Success Stories
            </h3>
            <div className="space-y-4">
              {relevantTestimonials.slice(0, 1).map((testimonial) => (
                <div key={testimonial.name}>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-700 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.role}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-emerald-600">
                        {testimonial.achievement}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
