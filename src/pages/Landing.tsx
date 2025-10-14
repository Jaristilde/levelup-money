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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7FD98E] via-[#5FC77D] to-[#4CAF70] overflow-hidden">
        {/* Organic Curved Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Wave 1 */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path
              d="M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z"
              fill="#5FC77D"
            />
          </svg>
          {/* Wave 2 */}
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-15" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path
              d="M0,600 C480,500 960,700 1440,600 L1440,800 L0,800 Z"
              fill="#3E9D5A"
            />
          </svg>
          {/* Circular blobs */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#5FC77D]/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-32 w-96 h-96 bg-[#3E9D5A]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
            {/* Left Side - Content */}
            <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Main Headline - 48px */}
              <h1 className="text-[48px] leading-[1.2] font-bold text-white mb-6 font-['Poppins']">
                Step-by-step milestones to escape the paycheck-to-paycheck cycle.
              </h1>

              {/* Subheadline - 32px */}
              <h2 className="text-[32px] text-white mb-8 font-['Poppins'] italic font-normal leading-relaxed">
                Get off the rat race
              </h2>

              {/* CTA Button */}
              <div className="mb-12">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-bold text-lg px-12 py-6 rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 hover:scale-105 font-['Poppins'] h-auto"
                  >
                    Start Your Free Trial
                  </Button>
                </Link>
              </div>

              {/* Cute Hamster in Wheel Illustration */}
              <div className="max-w-sm">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Wheel base with dollar coins */}
                  <g>
                    {/* Outer wheel rim */}
                    <circle cx="200" cy="150" r="100" fill="none" stroke="#2ECC71" strokeWidth="6" opacity="0.3" />
                    <circle cx="200" cy="150" r="90" fill="none" stroke="#27AE60" strokeWidth="3" opacity="0.4" />

                    {/* Wheel spokes with dollar coins */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 200 + 30 * Math.cos(rad);
                      const y1 = 150 + 30 * Math.sin(rad);
                      const x2 = 200 + 90 * Math.cos(rad);
                      const y2 = 150 + 90 * Math.sin(rad);
                      return (
                        <g key={i}>
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2ECC71" strokeWidth="2.5" opacity="0.5" />
                          {/* Dollar coin */}
                          <circle cx={x2} cy={y2} r="16" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                          <text x={x2} y={y2 + 6} textAnchor="middle" fontSize="18" fill="#2C3E50" fontWeight="bold">$</text>
                        </g>
                      );
                    })}

                    {/* Center hub */}
                    <circle cx="200" cy="150" r="28" fill="#27AE60" stroke="#fff" strokeWidth="3" />
                    <circle cx="200" cy="150" r="10" fill="#fff" />
                  </g>

                  {/* Cute Hamster - Duolingo style */}
                  <g className="animate-[bounce_2s_ease-in-out_infinite]">
                    {/* Shadow underneath */}
                    <ellipse cx="180" cy="165" rx="40" ry="8" fill="#000" opacity="0.1" />

                    {/* Body - rounded and cute */}
                    <ellipse cx="180" cy="135" rx="35" ry="26" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />

                    {/* Head - big and round (Duolingo style) */}
                    <circle cx="148" cy="128" r="30" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />

                    {/* Ears - round and simple */}
                    <g>
                      {/* Left ear */}
                      <circle cx="132" cy="105" r="12" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />
                      <circle cx="132" cy="108" r="6" fill="#FFB6C1" />
                      
                      {/* Right ear */}
                      <circle cx="164" cy="105" r="12" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />
                      <circle cx="164" cy="108" r="6" fill="#FFB6C1" />
                    </g>

                    {/* Eyes - big, round, Duolingo style */}
                    <g>
                      {/* Left eye white */}
                      <circle cx="138" cy="125" r="7" fill="#fff" />
                      {/* Left pupil */}
                      <circle cx="140" cy="125" r="4" fill="#2C3E50" />
                      {/* Left sparkle */}
                      <circle cx="139" cy="123" r="2" fill="#fff" />
                      
                      {/* Right eye white */}
                      <circle cx="158" cy="125" r="7" fill="#fff" />
                      {/* Right pupil */}
                      <circle cx="160" cy="125" r="4" fill="#2C3E50" />
                      {/* Right sparkle */}
                      <circle cx="159" cy="123" r="2" fill="#fff" />
                    </g>

                    {/* Cute button nose */}
                    <circle cx="148" cy="136" r="4" fill="#FFB6C1" />

                    {/* Big happy smile */}
                    <path d="M 138 142 Q 148 150, 158 142" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />

                    {/* Whiskers - simple and clean */}
                    <g stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="115" y1="132" x2="130" y2="130" opacity="0.7" />
                      <line x1="115" y1="138" x2="130" y2="136" opacity="0.7" />
                      <line x1="166" y1="130" x2="181" y2="132" opacity="0.7" />
                      <line x1="166" y1="136" x2="181" y2="138" opacity="0.7" />
                    </g>

                    {/* Rosy cheeks */}
                    <circle cx="128" cy="135" r="5" fill="#FFB6C1" opacity="0.3" />
                    <circle cx="168" cy="135" r="5" fill="#FFB6C1" opacity="0.3" />

                    {/* Front paws - simple ovals */}
                    <ellipse cx="165" cy="152" rx="9" ry="14" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />
                    <ellipse cx="190" cy="152" rx="9" ry="14" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />
                    
                    {/* Paw pads */}
                    <ellipse cx="165" cy="158" rx="5" ry="3" fill="#FFB6C1" opacity="0.4" />
                    <ellipse cx="190" cy="158" rx="5" ry="3" fill="#FFB6C1" opacity="0.4" />

                    {/* Cute little tail - simplified */}
                    <circle cx="218" cy="138" r="8" fill="#FFF8E1" stroke="#FFE0B2" strokeWidth="2" />
                  </g>

                  {/* Movement lines (speed effect) */}
                  <g opacity="0.3">
                    <line x1="115" y1="130" x2="95" y2="130" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    <line x1="110" y1="140" x2="90" y2="140" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    <line x1="105" y1="150" x2="85" y2="150" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Side - 3D Stairs Illustration */}
            <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <svg viewBox="0 0 400 500" className="w-full h-auto drop-shadow-2xl">
                {/* Step 1 (Bottom) */}
                <g>
                  <polygon points="50,450 150,420 150,470 50,500" fill="#4CAF70" />
                  <polygon points="150,420 250,400 250,450 150,470" fill="#5FC77D" />
                  <polygon points="150,470 150,420 250,400 250,450" fill="#3E9D5A" />
                  {/* Dollar sign */}
                  <text x="180" y="445" fontSize="36" fill="#fff" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                </g>

                {/* Step 2 */}
                <g>
                  <polygon points="80,380 180,350 180,400 80,430" fill="#4CAF70" />
                  <polygon points="180,350 280,330 280,380 180,400" fill="#5FC77D" />
                  <polygon points="180,400 180,350 280,330 280,380" fill="#3E9D5A" />
                  {/* Stacked coins */}
                  <circle cx="210" cy="365" r="22" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                  <ellipse cx="210" cy="365" rx="22" ry="7" fill="#FFA500" />
                  <circle cx="210" cy="348" r="22" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                  <ellipse cx="210" cy="348" rx="22" ry="7" fill="#FFA500" />
                  <circle cx="210" cy="331" r="22" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                </g>

                {/* Step 3 */}
                <g>
                  <polygon points="110,310 210,280 210,330 110,360" fill="#4CAF70" />
                  <polygon points="210,280 310,260 310,310 210,330" fill="#5FC77D" />
                  <polygon points="210,330 210,280 310,260 310,310" fill="#3E9D5A" />
                  {/* Growth chart */}
                  <polyline points="230,300 245,290 260,295 275,280" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="270,275 280,280 275,286" fill="#fff" />
                  <circle cx="230" cy="300" r="3" fill="#fff" />
                  <circle cx="245" cy="290" r="3" fill="#fff" />
                  <circle cx="260" cy="295" r="3" fill="#fff" />
                </g>

                {/* Step 4 */}
                <g>
                  <polygon points="140,240 240,210 240,260 140,290" fill="#4CAF70" />
                  <polygon points="240,210 340,190 340,240 240,260" fill="#5FC77D" />
                  <polygon points="240,260 240,210 340,190 340,240" fill="#3E9D5A" />
                  {/* Piggy bank */}
                  <ellipse cx="280" cy="223" rx="28" ry="22" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2.5" />
                  <circle cx="275" cy="220" r="3" fill="#2C3E50" />
                  <ellipse cx="290" cy="213" rx="8" ry="12" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" />
                  <rect x="277" y="208" width="12" height="6" rx="2" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5" />
                </g>

                {/* Step 5 */}
                <g>
                  <polygon points="170,170 270,140 270,190 170,220" fill="#4CAF70" />
                  <polygon points="270,140 370,120 370,170 270,190" fill="#5FC77D" />
                  <polygon points="270,190 270,140 370,120 370,170" fill="#3E9D5A" />
                  {/* Money bag */}
                  <ellipse cx="310" cy="160" rx="22" ry="18" fill="#8B4513" stroke="#654321" strokeWidth="2.5" />
                  <path d="M 295 148 Q 310 140, 325 148" fill="#654321" stroke="#654321" strokeWidth="2" />
                  <text x="310" y="167" fontSize="20" fill="#FFD700" fontWeight="bold" textAnchor="middle">$</text>
                </g>

                {/* Step 6 (Top) - Money Plant */}
                <g>
                  <polygon points="200,100 300,70 300,120 200,150" fill="#4CAF70" />
                  <polygon points="300,70 380,55 380,105 300,120" fill="#5FC77D" />
                  <polygon points="300,120 300,70 380,55 380,105" fill="#3E9D5A" />

                  {/* Flower pot */}
                  <path d="M 320 110 L 328 88 L 352 88 L 360 110 Z" fill="#C17850" stroke="#8B5A3C" strokeWidth="2.5" />
                  <ellipse cx="340" cy="110" rx="20" ry="4" fill="#8B5A3C" />

                  {/* Plant stem - curvy and organic */}
                  <path d="M 340 88 Q 338 70, 340 55 Q 342 40, 345 30" fill="none" stroke="#4CAF70" strokeWidth="4" strokeLinecap="round" />

                  {/* Money leaves (dollar coins) - arranged nicely */}
                  <g transform="translate(325, 65)">
                    <circle r="14" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="16" fill="#2C3E50" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                  </g>
                  <g transform="translate(345, 50)">
                    <circle r="14" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="16" fill="#2C3E50" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                  </g>
                  <g transform="translate(355, 70)">
                    <circle r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                  </g>
                  <g transform="translate(335, 40)">
                    <circle r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2.5" />
                    <text y="5" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                  </g>
                  <g transform="translate(350, 30)">
                    <circle r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                    <text y="4" fontSize="12" fill="#2C3E50" fontWeight="bold" textAnchor="middle" fontFamily="Poppins">$</text>
                  </g>
                </g>

                {/* Upward arrows with glow */}
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
                  <polygon points="380,420 390,400 400,420" fill="#fff" filter="url(#glow)" />
                  <rect x="385" y="420" width="10" height="35" fill="#fff" filter="url(#glow)" />

                  <polygon points="380,320 390,300 400,320" fill="#fff" filter="url(#glow)" />
                  <rect x="385" y="320" width="10" height="35" fill="#fff" filter="url(#glow)" />

                  <polygon points="380,220 390,200 400,220" fill="#fff" filter="url(#glow)" />
                  <rect x="385" y="220" width="10" height="35" fill="#fff" filter="url(#glow)" />
                </g>
              </svg>
            </div>
          </div>

          {/* Spanish Translation - Bottom */}
          <div className="mt-20 text-center">
            <p className="text-2xl text-white font-['Poppins'] italic opacity-90">
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
