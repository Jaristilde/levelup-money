import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-green-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-green-100">
            Building financial freedom through awareness and action
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Core Philosophy */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              Escaping the rat race isn't about abandoning a 9-to-5 job — it's about breaking free from the <strong>Money Trap</strong>: the endless pursuit of the next paycheck, purchase, or fleeting lifestyle upgrade.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The rat race isn't defined by your occupation; it's defined by your dependence. True freedom comes from transforming your relationship with money — understanding how it flows, where it leaks, and how to redirect it toward building long-term value.
            </p>
          </div>
        </section>

        {/* What We Believe */}
        <section className="mb-12 bg-green-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What We Believe
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <p className="text-lg text-gray-700">
                <strong>Financial freedom ≠ Quitting your job</strong>
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <p className="text-lg text-gray-700">
                <strong>True freedom = Control over your money</strong>
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <p className="text-lg text-gray-700">
                <strong>Success = Production &gt; Consumption</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Consumption vs Production */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Consumption vs. Production
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            At LevelUp Money, we believe in creating balance between <strong>consumption</strong> and <strong>production</strong>. Consumption represents what we spend to maintain our lifestyle; production is what we contribute that generates income and value.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="text-xl font-bold text-red-900 mb-3">
                📉 Consumption
              </h3>
              <p className="text-gray-700">
                What you spend to maintain your lifestyle. Most people struggle not because they don't earn enough, but because their consumption overwhelms their production.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                📈 Production
              </h3>
              <p className="text-gray-700">
                What you contribute that generates income and value. This is your ability to solve problems and create results in the marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Two-Part Approach
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                1. Build Awareness (Control Consumption)
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Financial wellness begins by developing awareness — budgeting, tracking habits, and building an emergency fund to create stability.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Track every dollar that flows through your life</li>
                <li>Build a 3-6 month emergency fund</li>
                <li>Eliminate wasteful spending</li>
                <li>Pay off high-interest debt</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                2. Scale Your Income (Increase Production)
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                But awareness alone isn't enough. Financial wellness expands through production — increasing your marketplace value, learning to solve problems, and producing results at scale.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Develop high-value skills</li>
                <li>Find ways to produce value at scale</li>
                <li>Build multiple income streams</li>
                <li>Invest in income-producing assets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Scale Principle */}
        <section className="mb-12 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Scale Principle
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Whether you produce through your career, a side project, or entrepreneurship, your goal shouldn't simply be to save money — <strong>it should be to scale your income</strong>.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Influencers like Graham Stephan and Dave Ramsey teach the fundamentals of financial control, but what truly separates millionaires is their ability to produce value at scale. Graham uses YouTube as his production vehicle; you can leverage your own skills — whether in design, communication, or analytics — to do the same.
          </p>
        </section>

        {/* Final Mission Statement */}
        <section className="mb-12 border-t-4 border-green-600 pt-8">
          <blockquote className="text-2xl font-semibold text-gray-900 italic mb-6 pl-6 border-l-4 border-green-600">
            "LevelUp Money's mission is to help consumers escape financial limitation by mastering both sides of the equation — responsible consumption and scalable production — paving a path toward financial independence and real freedom."
          </blockquote>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-green-500 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Finances?
          </h2>
          <p className="text-xl mb-6">
            Start taking control of your money today.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
