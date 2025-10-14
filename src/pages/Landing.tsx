import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#2C3E50] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2C3E50] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2ECC71] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base font-['Inter']">LU</span>
              </div>
              <span className="text-xl font-bold text-white font-['Poppins'] tracking-tight">Level Up Money</span>
            </div>

            {/* Center Link */}
            <div className="hidden md:block">
              <a href="#why-choose" className="text-white hover:text-[#2ECC71] transition-colors font-['Inter'] font-medium text-base">
                Why Choose Level Up
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-['Inter'] font-medium">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold shadow-lg shadow-[#2ECC71]/30 rounded-xl px-6 font-['Inter']">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#7FD98E] to-[#4CAF70] overflow-hidden">
        {/* Organic Curved Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large organic wave shapes */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path
              d="M0,300 C320,200 640,400 960,300 C1280,200 1440,350 1440,350 L1440,800 L0,800 Z"
              fill="#5FC77D"
            />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-15" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path
              d="M0,500 C360,400 720,600 1080,500 C1260,450 1440,550 1440,550 L1440,800 L0,800 Z"
              fill="#3E9D5A"
            />
          </svg>
          {/* Circular blobs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#5FC77D]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-32 w-[500px] h-[500px] bg-[#3E9D5A]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Main Headline - Responsive sizing */}
              <h1 className="text-[36px] md:text-[52px] leading-[1.2] font-bold text-white mb-6 font-['Poppins']">
                Step-by-step milestones to escape the paycheck-to-paycheck cycle.
              </h1>

              {/* Subheadline - 36px */}
              <h2 className="text-[24px] md:text-[36px] text-white mb-8 font-['Poppins'] italic font-normal leading-relaxed">
                Get off the rat race
              </h2>

              {/* CTA Button */}
              <div className="mb-16">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-[#7FD98E] hover:bg-[#6FCC7E] text-[#2C3E50] font-bold text-xl px-14 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-['Poppins'] h-auto"
                  >
                    Start Your Free Trial
                  </Button>
                </Link>
              </div>

              {/* Rat in Wheel Illustration - With Animation */}
              <div className="max-w-[250px] mx-auto lg:mx-0 mt-12">
                <svg viewBox="0 0 300 300" className="w-full h-auto animate-fade-in">
                  {/* Shadow underneath */}
                  <ellipse cx="150" cy="270" rx="80" ry="15" fill="#3E9D5A" opacity="0.3" />
                  
                  {/* Outer wheel circle - green with rotation animation */}
                  <g className="animate-[spin_20s_linear_infinite] origin-center" style={{ transformOrigin: '150px 150px' }}>
                    <circle cx="150" cy="150" r="120" fill="none" stroke="#2C3E50" strokeWidth="4" />
                    
                    {/* Inner wheel circle - lighter green */}
                    <circle cx="150" cy="150" r="110" fill="none" stroke="#4CAF70" strokeWidth="3" opacity="0.5" />
                    
                    {/* Dollar coin circles around the wheel */}
                    {[0, 90, 180, 270].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 150 + 110 * Math.cos(rad);
                    const y = 150 + 110 * Math.sin(rad);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="20" fill="#4CAF70" stroke="#2C3E50" strokeWidth="2.5" />
                        <text x={x} y={y + 7} textAnchor="middle" fontSize="24" fill="#2C3E50" fontWeight="bold">$</text>
                      </g>
                    );
                  })}
                  </g>

                  {/* White rat/hamster INSIDE the wheel */}
                  <g transform="translate(150, 150)">
                    {/* Body - white/cream */}
                    <ellipse cx="0" cy="10" rx="40" ry="28" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2.5" />
                    
                    {/* Head */}
                    <circle cx="-25" cy="0" r="28" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2.5" />
                    
                    {/* Pink ears */}
                    <circle cx="-38" cy="-15" r="10" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2" />
                    <circle cx="-38" cy="-13" r="6" fill="#FFB6C1" />
                    <circle cx="-12" cy="-20" r="10" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2" />
                    <circle cx="-12" cy="-18" r="6" fill="#FFB6C1" />
                    
                    {/* Eyes - simple dots */}
                    <circle cx="-30" cy="-2" r="3" fill="#2C3E50" />
                    <circle cx="-18" cy="-2" r="3" fill="#2C3E50" />
                    
                    {/* Pink nose */}
                    <circle cx="-25" cy="8" r="4" fill="#FFB6C1" />
                    
                    {/* Smile */}
                    <path d="M -30 12 Q -25 15, -20 12" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Running legs - extended back (chasing motion) */}
                    <ellipse cx="15" cy="32" rx="8" ry="18" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2" />
                    <ellipse cx="30" cy="28" rx="8" ry="16" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2" />
                    
                    {/* Front legs - tucked in */}
                    <ellipse cx="-5" cy="30" rx="7" ry="14" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2" />
                    
                    {/* Small tail */}
                    <circle cx="42" cy="8" r="7" fill="#FFF8E1" stroke="#2C3E50" strokeWidth="2" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Side - 3D Stairs Illustration */}
            <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Large background circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-[#5FC77D]/20 rounded-full blur-2xl"></div>
              
              <svg viewBox="0 0 500 600" className="w-full h-auto drop-shadow-2xl relative z-10 max-w-[400px] md:max-w-none mx-auto">
                {/* Step 1 (Bottom) - Dollar sign */}
                <g className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                  <polygon points="80,520 180,490 180,540 80,570" fill="#4CAF70" />
                  <polygon points="180,490 280,460 280,510 180,540" fill="#7FD98E" />
                  <polygon points="180,540 180,490 280,460 280,510" fill="#2ECC71" />
                  <text x="210" y="510" fontSize="48" fill="#2C3E50" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                </g>

                {/* Step 2 - Circle icon */}
                <g className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                  <polygon points="110,450 210,420 210,470 110,500" fill="#4CAF70" />
                  <polygon points="210,420 310,390 310,440 210,470" fill="#7FD98E" />
                  <polygon points="210,470 210,420 310,390 310,440" fill="#2ECC71" />
                  <circle cx="240" cy="425" r="22" fill="#4CAF70" stroke="#2C3E50" strokeWidth="3" />
                </g>

                {/* Step 3 - Two coin stacks */}
                <g className="animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
                  <polygon points="140,380 240,350 240,400 140,430" fill="#4CAF70" />
                  <polygon points="240,350 340,320 340,370 240,400" fill="#7FD98E" />
                  <polygon points="240,400 240,350 340,320 340,370" fill="#2ECC71" />
                  {/* Coin stacks */}
                  <g>
                    <circle cx="260" cy="365" r="18" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <ellipse cx="260" cy="365" rx="18" ry="5" fill="#FFA500" />
                    <circle cx="260" cy="350" r="18" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                  </g>
                  <g>
                    <circle cx="295" cy="365" r="18" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <ellipse cx="295" cy="365" rx="18" ry="5" fill="#FFA500" />
                    <circle cx="295" cy="350" r="18" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                  </g>
                </g>

                {/* Step 4 - Growth chart */}
                <g className="animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
                  <polygon points="170,310 270,280 270,330 170,360" fill="#4CAF70" />
                  <polygon points="270,280 370,250 370,300 270,330" fill="#7FD98E" />
                  <polygon points="270,330 270,280 370,250 370,300" fill="#2ECC71" />
                  {/* Chart icon */}
                  <rect x="290" y="285" width="50" height="40" rx="4" fill="#2C3E50" opacity="0.2" />
                  <polyline points="295,315 305,310 315,305 325,295 335,300" fill="none" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Step 5 - Upward arrow with coins */}
                <g className="animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
                  <polygon points="200,240 300,210 300,260 200,290" fill="#4CAF70" />
                  <polygon points="300,210 400,180 400,230 300,260" fill="#7FD98E" />
                  <polygon points="300,260 300,210 400,180 400,230" fill="#2ECC71" />
                  {/* Arrow up */}
                  <polygon points="330,215 340,200 350,215" fill="#2C3E50" />
                  <rect x="335" y="215" width="10" height="25" fill="#2C3E50" />
                  {/* Coins */}
                  <circle cx="315" cy="230" r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <text x="315" y="236" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  <circle cx="365" cy="220" r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <text x="365" y="226" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                </g>

                {/* Step 6 (Top) - Money Plant */}
                <g className="animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}>
                  <polygon points="230,170 330,140 330,190 230,220" fill="#4CAF70" />
                  <polygon points="330,140 430,110 430,160 330,190" fill="#7FD98E" />
                  <polygon points="330,190 330,140 430,110 430,160" fill="#2ECC71" />

                  {/* Flower pot */}
                  <path d="M 355 175 L 363 155 L 387 155 L 395 175 Z" fill="#C17850" stroke="#8B5A3C" strokeWidth="2.5" />
                  <ellipse cx="375" cy="175" rx="20" ry="4" fill="#8B5A3C" />

                  {/* Plant stem */}
                  <path d="M 375 155 Q 373 130, 375 110 Q 377 90, 380 75" fill="none" stroke="#4CAF70" strokeWidth="4" strokeLinecap="round" />

                  {/* Money leaves (dollar coins) */}
                  <g transform="translate(360, 120)">
                    <circle r="14" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="16" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(380, 100)">
                    <circle r="16" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="6" fontSize="18" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(395, 120)">
                    <circle r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(370, 85)">
                    <circle r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(385, 70)">
                    <circle r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                    <text y="4" fontSize="12" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                </g>

                {/* Upward arrows with glow - right side */}
                <g opacity="0.8">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <polygon points="450,490 460,470 470,490" fill="#7FD98E" filter="url(#glow)" />
                  <rect x="455" y="490" width="10" height="35" fill="#7FD98E" filter="url(#glow)" />

                  <polygon points="450,370 460,350 470,370" fill="#7FD98E" filter="url(#glow)" />
                  <rect x="455" y="370" width="10" height="35" fill="#7FD98E" filter="url(#glow)" />

                  <polygon points="450,250 460,230 470,250" fill="#7FD98E" filter="url(#glow)" />
                  <rect x="455" y="250" width="10" height="35" fill="#7FD98E" filter="url(#glow)" />
                </g>
              </svg>
            </div>
          </div>

          {/* Spanish Translation - Bottom */}
          <div className="mt-32 pt-12 text-center border-t border-white/10">
            <p className="text-[28px] md:text-[36px] text-white font-['Poppins'] italic opacity-80 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'backwards' }}>
              Deja de vivir de sueldo a sueldo
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2C3E50]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4 font-['Poppins']">
            Why Choose Level Up Money?
          </h2>
          <p className="text-xl text-white/80 text-center mb-16 font-['Inter'] max-w-2xl mx-auto">
            Built for people who are ready to break free from financial stress
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Step-by-Step Guidance",
                description: "Clear milestones that show you exactly where you are and what to do next",
                icon: "📍"
              },
              {
                title: "Visual Progress Tracking",
                description: "See your financial growth with beautiful charts and celebrate every win",
                icon: "📊"
              },
              {
                title: "Personalized Dashboard",
                description: "Your financial journey is unique. Your dashboard should be too.",
                icon: "✨"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-[#2ECC71]/20 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-['Poppins'] text-center">{feature.title}</h3>
                <p className="text-white/80 font-['Inter'] leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2C3E50] to-[#4CAF70]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-['Poppins']">
            Ready to Escape the Paycheck-to-Paycheck Cycle?
          </h2>
          <p className="text-xl text-white/90 mb-10 font-['Inter']">
            Join thousands who are building their financial freedom, one milestone at a time
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-bold text-lg px-12 py-6 rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 hover:scale-105 font-['Poppins'] h-auto"
            >
              Start Your Free Trial
            </Button>
          </Link>
          <p className="text-white/70 text-sm mt-6 font-['Inter']">
            No credit card required • Cancel anytime • Get started in 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
