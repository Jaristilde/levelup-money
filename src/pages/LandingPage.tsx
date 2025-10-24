import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ratWheelImage from '../assets/rat-wheel.png';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex gap-1.5 items-baseline">
            <span className="text-2xl font-extrabold text-gray-900" style={{ letterSpacing: '-0.015em' }}>
              Level Up
            </span>
            <span className="text-2xl font-extrabold text-green-600" style={{ letterSpacing: '-0.015em' }}>
              Money
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              FAQ
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
            >
              Start Free Trial
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Professional Design */}
      <section className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white py-24 pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Left side - Text content */}
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                Escape the Money Trap<br />
                Through <span className="text-green-200">Growth</span>
              </h1>

              <p className="text-xl mb-4 text-white" style={{ animationDelay: '0.1s' }}>
                Money comes in. Money goes out. Time to break the cycle with <strong>positive action.</strong>
              </p>

              <p className="text-lg mb-8 text-green-100" style={{ animationDelay: '0.2s' }}>
                LevelUp Money helps you track spending, crush debt, and build real financial freedom — without quitting your job.
              </p>

              <div className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.3s' }}>
                <Link
                  to="/signup"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl text-center transform active:scale-95"
                >
                  Take Positive Action Today →
                </Link>

                <Link
                  to="/about"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 text-center transform hover:scale-105 active:scale-95"
                >
                  Learn Our Mission
                </Link>
              </div>

              <div className="flex gap-6 mt-8 mb-12 text-sm text-green-100">
                <div className={`flex items-center gap-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: '0.4s' }}>
                  <span>✓</span> Free to start
                </div>
                <div className={`flex items-center gap-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: '0.5s' }}>
                  <span>✓</span> No credit card
                </div>
                <div className={`flex items-center gap-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: '0.6s' }}>
                  <span>✓</span> Real growth
                </div>
              </div>
            </div>

            {/* Right side - Professional mockup with float animation */}
            <div className="relative">
              <div className="relative z-10 animate-float">
                <img
                  src={ratWheelImage}
                  alt="LevelUp Money App"
                  className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

          </div>
        </div>

        {/* Subtle bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Believe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financial freedom isn't about dramatic life changes. It's about mastering two simple principles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Control Consumption
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Track spending, build budgets, see where money leaks. Stop the financial bleeding first.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Increase Production
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Strategies to boost income without burning out. Scale your value in the marketplace.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Build Stability
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Emergency funds, debt payoff, long-term goals. Create a foundation for freedom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-3xl md:text-4xl font-bold mb-6 leading-relaxed animate-slide-in-left">
            "The rat race isn't your job — it's living paycheck to paycheck, always chasing the next purchase."
          </blockquote>
          <p className="text-xl text-green-100 mb-8">
            Real freedom comes from producing more value than you consume.
          </p>
          <Link
            to="/about"
            className="inline-block mt-4 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform active:scale-95"
          >
            Read Our Full Mission →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How LevelUp Money Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple tools to take control of your financial future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                📊 Budget & Expense Tracking
              </h3>
              <p className="text-gray-700 leading-relaxed">
                See exactly where every dollar goes. Track income, expenses, and build realistic budgets that actually work.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                💳 Debt Payoff Strategies
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Use proven snowball or avalanche methods to eliminate debt faster and save thousands in interest.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🎯 Financial Goals
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Set goals, track progress, and stay motivated. From emergency funds to retirement planning.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                📈 Income Insights
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Identify opportunities to increase your earning potential and scale your production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stop Chasing Paychecks. Start Building Freedom.
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands taking control of their financial future.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-green-500 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform active:scale-95"
          >
            Get Started Free
          </Link>
          <p className="text-gray-500 mt-6 text-sm">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* Footer with Tagline */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-lg font-semibold">
                Spend less. Earn more. Build freedom.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                — LevelUp Money
              </p>
            </div>

            <nav className="flex gap-6">
              <Link to="/about" className="hover:text-green-400 transition-all duration-300">
                About
              </Link>
              <Link to="/faq" className="hover:text-green-400 transition-all duration-300">
                FAQ
              </Link>
              <a href="mailto:support@levelupmoney.com" className="hover:text-green-400 transition-all duration-300">
                Contact
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2025 LevelUp Money. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default LandingPage;
