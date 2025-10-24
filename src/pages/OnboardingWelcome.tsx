import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      emoji: '👋',
      title: 'Welcome to LevelUp Money',
      description: 'Your journey to financial freedom starts here.',
      content: (
        <div className="space-y-4 text-left">
          <p className="text-lg text-gray-700">
            We're here to help you:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3 text-xl">✓</span>
              <span><strong>Spend less than you earn</strong> (control consumption)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3 text-xl">✓</span>
              <span><strong>Track where your money goes</strong> (build awareness)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3 text-xl">✓</span>
              <span><strong>Scale your income</strong> (increase production)</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      emoji: '🎯',
      title: 'What LevelUp Money Is About',
      description: "Let's be clear about our philosophy",
      content: (
        <div className="space-y-4 text-left">
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Financial freedom ≠ Quitting your job
            </p>
            <p className="text-gray-700">
              We're not here to tell you to abandon your career or sell you a "get rich quick" scheme.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Financial freedom = Taking control
            </p>
            <p className="text-gray-700">
              It's about spending less than you earn, building stability, and creating options for your future.
            </p>
          </div>
        </div>
      )
    },
    {
      emoji: '⚖️',
      title: 'Production vs. Consumption',
      description: 'The key to escaping the Money Trap',
      content: (
        <div className="space-y-4 text-left">
          <p className="text-lg text-gray-700 mb-4">
            Most people struggle not because they don't earn enough, but because their <strong>consumption overwhelms their production</strong>.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
              <h4 className="font-bold text-red-900 mb-2">📉 Consumption</h4>
              <p className="text-sm text-gray-700">
                What you spend to maintain your lifestyle
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-bold text-green-900 mb-2">📈 Production</h4>
              <p className="text-sm text-gray-700">
                Value you create that generates income
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mt-4">
            <strong>Your goal:</strong> Produce more value than you consume.
          </p>
        </div>
      )
    },
    {
      emoji: '🚀',
      title: 'Ready to Level Up?',
      description: "Let's build your financial profile",
      content: (
        <div className="space-y-4 text-left">
          <p className="text-lg text-gray-700">
            We'll help you:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3">1️⃣</span>
              <span>Set up your income and expenses</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">2️⃣</span>
              <span>Track your debts and create a payoff plan</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">3️⃣</span>
              <span>Build an emergency fund</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">4️⃣</span>
              <span>Identify opportunities to increase income</span>
            </li>
          </ul>

          <div className="bg-green-500 text-white p-4 rounded-lg mt-6">
            <p className="font-semibold">
              Remember: Your job isn't the problem — losing control of your money is.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/financial-profile-setup');
    }
  };

  const handleSkip = () => {
    navigate('/financial-profile-setup');
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8 space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-green-500'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Emoji */}
        <div className="text-6xl text-center mb-6">
          {currentSlideData.emoji}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
          {currentSlideData.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 text-center mb-8">
          {currentSlideData.description}
        </p>

        {/* Content */}
        <div className="mb-8">
          {currentSlideData.content}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            Skip intro
          </button>

          <button
            onClick={handleNext}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full sm:w-auto shadow-lg hover:shadow-xl"
          >
            {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
