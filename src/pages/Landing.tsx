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
              <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base font-poppins">LU</span>
              </div>
              <span className="text-xl font-bold text-white font-poppins tracking-tight">Level Up Money</span>
            </div>

            {/* Center Link */}
            <div className="hidden md:block">
              <a href="#why-choose" className="text-white hover:text-brand-green transition-colors font-inter font-medium text-base">
                Why Choose Level Up
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-inter font-medium">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold shadow-lg shadow-brand-green/30 rounded-xl px-6 font-inter">
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
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-poppins leading-tight">
                Step-by-step milestones to escape the paycheck-to-paycheck cycle.
              </h1>

              {/* Subheadline */}
              <h2 className="text-3xl md:text-4xl text-white mb-8 font-poppins italic font-normal">
                Get off the rat race
              </h2>

              {/* CTA Button */}
              <div className="mb-12">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xl px-16 py-8 rounded-2xl shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-300 hover:scale-105 font-poppins h-auto animate-pulse"
                  >
                    Start Your Free Trial
                  </Button>
                </Link>
              </div>

              {/* Rat in Wheel Illustration */}
              <div className="max-w-md">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Wheel base */}
                  <g>
                    {/* Wheel structure */}
                    <circle cx="200" cy="150" r="100" fill="none" stroke="#2ECC71" strokeWidth="8" opacity="0.3" />
                    <circle cx="200" cy="150" r="90" fill="none" stroke="#2ECC71" strokeWidth="4" opacity="0.5" />

                    {/* Wheel spokes with dollar coins */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 200 + 30 * Math.cos(rad);
                      const y1 = 150 + 30 * Math.sin(rad);
                      const x2 = 200 + 90 * Math.cos(rad);
                      const y2 = 150 + 90 * Math.sin(rad);
                      return (
                        <g key={i}>
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2ECC71" strokeWidth="2" opacity="0.4" />
                          {/* Dollar coin */}
                          <circle cx={x2} cy={y2} r="15" fill="#2ECC71" stroke="#fff" strokeWidth="2" />
                          <text x={x2} y={y2 + 6} textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">$</text>
                        </g>
                      );
                    })}

                    {/* Center hub */}
                    <circle cx="200" cy="150" r="25" fill="#2ECC71" stroke="#fff" strokeWidth="3" />
                    <circle cx="200" cy="150" r="8" fill="#fff" />
                  </g>

                  {/* Rat/Mouse */}
                  <g className="animate-[bounce_2s_ease-in-out_infinite]">
                    {/* Body */}
                    <ellipse cx="180" cy="130" rx="35" ry="25" fill="#F5F5DC" stroke="#E5E5CC" strokeWidth="2" />

                    {/* Head */}
                    <circle cx="145" cy="125" r="22" fill="#F5F5DC" stroke="#E5E5CC" strokeWidth="2" />

                    {/* Ears */}
                    <ellipse cx="135" cy="110" rx="8" ry="12" fill="#F5F5DC" stroke="#E5E5CC" strokeWidth="1.5" />
                    <ellipse cx="155" cy="110" rx="8" ry="12" fill="#F5F5DC" stroke="#E5E5CC" strokeWidth="1.5" />
                    <ellipse cx="135" cy="112" rx="4" ry="6" fill="#FFB6C1" />
                    <ellipse cx="155" cy="112" rx="4" ry="6" fill="#FFB6C1" />

                    {/* Eyes */}
                    <circle cx="138" cy="123" r="3" fill="#2C3E50" />
                    <circle cx="152" cy="123" r="3" fill="#2C3E50" />
                    <circle cx="139" cy="122" r="1.5" fill="#fff" />
                    <circle cx="153" cy="122" r="1.5" fill="#fff" />

                    {/* Nose */}
                    <ellipse cx="145" cy="132" rx="3" ry="2" fill="#FFB6C1" />

                    {/* Whiskers */}
                    <line x1="120" y1="128" x2="135" y2="126" stroke="#2C3E50" strokeWidth="1" opacity="0.6" />
                    <line x1="120" y1="132" x2="135" y2="130" stroke="#2C3E50" strokeWidth="1" opacity="0.6" />
                    <line x1="170" y1="128" x2="155" y2="126" stroke="#2C3E50" strokeWidth="1" opacity="0.6" />
                    <line x1="170" y1="132" x2="155" y2="130" stroke="#2C3E50" strokeWidth="1" opacity="0.6" />

                    {/* Legs */}
                    <ellipse cx="170" cy="150" rx="6" ry="10" fill="#F5F5DC" stroke="#E5E5CC" strokeWidth="1.5" />
                    <ellipse cx="190" cy="150" rx="6" ry="10" fill="#F5F5DC" stroke="#E5E5CC" strokeWidth="1.5" />

                    {/* Tail */}
                    <path d="M 215 130 Q 240 120, 250 125" fill="none" stroke="#E5E5CC" strokeWidth="3" strokeLinecap="round" />
                  </g>

                  {/* Movement lines (speed effect) */}
                  <g opacity="0.4">
                    <line x1="120" y1="140" x2="100" y2="140" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="115" y1="150" x2="95" y2="150" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Side - 3D Stairs Illustration */}
            <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <svg viewBox="0 0 400 500" className="w-full h-auto">
                {/* Step 1 (Bottom) */}
                <g>
                  <polygon points="50,450 150,420 150,470 50,500" fill="#4CAF70" />
                  <polygon points="150,420 250,400 250,450 150,470" fill="#5FC77D" />
                  <polygon points="150,470 150,420 250,400 250,450" fill="#3E9D5A" />
                  {/* Dollar sign */}
                  <text x="180" y="440" fontSize="32" fill="#fff" fontWeight="bold" textAnchor="middle">$</text>
                </g>

                {/* Step 2 */}
                <g>
                  <polygon points="80,380 180,350 180,400 80,430" fill="#4CAF70" />
                  <polygon points="180,350 280,330 280,380 180,400" fill="#5FC77D" />
                  <polygon points="180,400 180,350 280,330 280,380" fill="#3E9D5A" />
                  {/* Stacked coins */}
                  <circle cx="210" cy="360" r="20" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <ellipse cx="210" cy="360" rx="20" ry="6" fill="#FFA500" />
                  <circle cx="210" cy="345" r="20" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <ellipse cx="210" cy="345" rx="20" ry="6" fill="#FFA500" />
                </g>

                {/* Step 3 */}
                <g>
                  <polygon points="110,310 210,280 210,330 110,360" fill="#4CAF70" />
                  <polygon points="210,280 310,260 310,310 210,330" fill="#5FC77D" />
                  <polygon points="210,330 210,280 310,260 310,310" fill="#3E9D5A" />
                  {/* Growth chart */}
                  <polyline points="230,300 245,290 260,295 275,280" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  <polygon points="270,275 280,280 275,285" fill="#fff" />
                </g>

                {/* Step 4 */}
                <g>
                  <polygon points="140,240 240,210 240,260 140,290" fill="#4CAF70" />
                  <polygon points="240,210 340,190 340,240 240,260" fill="#5FC77D" />
                  <polygon points="240,260 240,210 340,190 340,240" fill="#3E9D5A" />
                  {/* Dollar coins */}
                  <circle cx="260" cy="225" r="15" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <text x="260" y="232" fontSize="16" fill="#fff" fontWeight="bold" textAnchor="middle">$</text>
                  <circle cx="290" cy="220" r="15" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <text x="290" y="227" fontSize="16" fill="#fff" fontWeight="bold" textAnchor="middle">$</text>
                </g>

                {/* Step 5 */}
                <g>
                  <polygon points="170,170 270,140 270,190 170,220" fill="#4CAF70" />
                  <polygon points="270,140 370,120 370,170 270,190" fill="#5FC77D" />
                  <polygon points="270,190 270,140 370,120 370,170" fill="#3E9D5A" />
                  {/* More coins */}
                  <circle cx="290" cy="155" r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <circle cx="310" cy="150" r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                  <circle cx="330" cy="145" r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                </g>

                {/* Step 6 (Top) - Money Plant */}
                <g>
                  <polygon points="200,100 300,70 300,120 200,150" fill="#4CAF70" />
                  <polygon points="300,70 380,55 380,105 300,120" fill="#5FC77D" />
                  <polygon points="300,120 300,70 380,55 380,105" fill="#3E9D5A" />

                  {/* Flower pot */}
                  <path d="M 320 110 L 330 90 L 350 90 L 360 110 Z" fill="#C17850" stroke="#8B5A3C" strokeWidth="2" />

                  {/* Plant stem */}
                  <path d="M 340 90 Q 340 70, 345 50" fill="none" stroke="#4CAF70" strokeWidth="3" />

                  {/* Money leaves (dollar coins) */}
                  <g transform="translate(325, 60)">
                    <circle r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                    <text y="5" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(345, 55)">
                    <circle r="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                    <text y="5" fontSize="14" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(335, 70)">
                    <circle r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                    <text y="4" fontSize="12" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                  <g transform="translate(355, 65)">
                    <circle r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                    <text y="4" fontSize="12" fill="#2C3E50" fontWeight="bold" textAnchor="middle">$</text>
                  </g>
                </g>

                {/* Upward arrows */}
                <g opacity="0.7">
                  <polygon points="380,420 390,400 400,420" fill="#fff" />
                  <rect x="385" y="420" width="10" height="30" fill="#fff" />

                  <polygon points="380,320 390,300 400,320" fill="#fff" />
                  <rect x="385" y="320" width="10" height="30" fill="#fff" />

                  <polygon points="380,220 390,200 400,220" fill="#fff" />
                  <rect x="385" y="220" width="10" height="30" fill="#fff" />
                </g>
              </svg>
            </div>
          </div>

          {/* Spanish Translation - Bottom */}
          <div className="mt-16 text-center">
            <p className="text-2xl md:text-3xl text-white font-poppins italic opacity-90">
              Deja de vivir de sueldo a sueldo
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2C3E50]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 font-poppins">
            Why Choose Level Up Money?
          </h2>
          <p className="text-xl text-white/80 text-center mb-16 font-inter">
            Built for people who are ready to break free from financial stress
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Step-by-Step Guidance",
                description: "Clear milestones that show you exactly where you are and what to do next"
              },
              {
                title: "Visual Progress Tracking",
                description: "See your financial growth with beautiful charts and celebrate every win"
              },
              {
                title: "Personalized Dashboard",
                description: "Your financial journey is unique. Your dashboard should be too."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <div className="w-8 h-8 bg-brand-green rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-poppins text-center">{feature.title}</h3>
                <p className="text-white/80 font-inter leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2C3E50] to-[#4CAF70]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
            Ready to Escape the Paycheck-to-Paycheck Cycle?
          </h2>
          <p className="text-xl text-white/90 mb-8 font-inter">
            Join thousands who are building their financial freedom, one milestone at a time
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xl px-16 py-8 rounded-2xl shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-300 hover:scale-105 font-poppins h-auto"
            >
              Start Your Free Trial
            </Button>
          </Link>
          <p className="text-white/70 text-sm mt-6 font-inter">
            No credit card required • Cancel anytime • Get started in 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
