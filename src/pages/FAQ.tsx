import React, { useState } from 'react';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is LevelUp Money about quitting my job?",
      answer: (
        <div className="space-y-3">
          <p className="font-semibold text-lg text-green-600">
            No! We're not anti-employment.
          </p>
          <p>
            LevelUp Money is about escaping the "Money Trap" — living paycheck to paycheck, constantly stressed about finances. Not about abandoning your career.
          </p>
          <p>
            Whether you work a 9-to-5, run a business, or freelance, our goal is to help you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Spend less than you earn</li>
            <li>Build financial stability</li>
            <li>Increase your income potential</li>
            <li>Achieve real financial freedom</li>
          </ul>
          <p className="font-semibold">
            Your job isn't the problem — losing control of your money is.
          </p>
        </div>
      )
    },
    {
      question: "What is the 'Money Trap'?",
      answer: (
        <div className="space-y-3">
          <p>
            The Money Trap is the endless cycle of chasing the next paycheck or purchase, never getting ahead financially. It's characterized by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Living paycheck to paycheck</li>
            <li>Constant financial stress and anxiety</li>
            <li>Inability to save or invest for the future</li>
            <li>Feeling trapped despite earning income</li>
          </ul>
          <p>
            The trap isn't about how much you earn — it's about your relationship with money and the balance between what you consume and what you produce.
          </p>
        </div>
      )
    },
    {
      question: "What do you mean by 'Production vs. Consumption'?",
      answer: (
        <div className="space-y-3">
          <p>
            <strong>Consumption</strong> is what you spend to maintain your lifestyle — rent, food, entertainment, purchases, etc.
          </p>
          <p>
            <strong>Production</strong> is the value you create that generates income — your work, skills, services, or businesses.
          </p>
          <p className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <strong>The key insight:</strong> Most people struggle not because they don't earn enough, but because their consumption overwhelms their production.
          </p>
          <p>
            LevelUp Money helps you control consumption (through budgeting and tracking) while also identifying ways to increase production (income strategies and opportunities).
          </p>
        </div>
      )
    },
    {
      question: "Do I need to start a business or side hustle to use LevelUp Money?",
      answer: (
        <div className="space-y-3">
          <p className="font-semibold">
            Absolutely not!
          </p>
          <p>
            LevelUp Money is valuable whether you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Work a traditional 9-to-5 job</li>
            <li>Are a freelancer or contractor</li>
            <li>Run your own business</li>
            <li>Have multiple income streams</li>
            <li>Are just starting your career</li>
          </ul>
          <p>
            Our primary focus is helping you <strong>control your spending and track your money</strong>. Income strategies are secondary and optional — but available when you're ready.
          </p>
        </div>
      )
    },
    {
      question: "How is LevelUp Money different from other finance apps?",
      answer: (
        <div className="space-y-3">
          <p>
            Most finance apps focus solely on <strong>cutting expenses</strong> (consumption control). LevelUp Money is unique because we focus on <strong>both sides of the equation</strong>:
          </p>
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <div>
              <p className="font-semibold text-red-600">📉 Control Consumption</p>
              <p className="text-sm">Budget tracking, expense management, debt payoff strategies</p>
            </div>
            <div>
              <p className="font-semibold text-green-600">📈 Increase Production</p>
              <p className="text-sm">Income insights, skill development, value-scaling opportunities</p>
            </div>
          </div>
          <p>
            We also don't sell your data to third parties or bombard you with ads. Your financial privacy matters.
          </p>
        </div>
      )
    },
    {
      question: "Is LevelUp Money free?",
      answer: (
        <div className="space-y-3">
          <p>
            Yes! Our core features are <strong>free forever</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Budget and expense tracking</li>
            <li>Debt management and payoff strategies</li>
            <li>Financial goal setting</li>
            <li>Income tracking</li>
          </ul>
          <p>
            We may introduce premium features in the future (like advanced analytics or coaching), but the fundamentals will always remain free.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about LevelUp Money
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <span className={`text-2xl text-green-600 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ↓
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-green-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Still have questions?
          </h2>
          <p className="text-lg mb-6 text-green-100">
            We're here to help. Reach out anytime.
          </p>
          <a
            href="mailto:support@levelupmoney.com"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQ;
