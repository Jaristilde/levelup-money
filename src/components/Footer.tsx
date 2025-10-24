import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-950 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Tagline */}
        <div className="text-center mb-8">
          <p className="text-xl md:text-2xl font-semibold text-emerald-400 mb-2">
            Spend less. Earn more. Build freedom.
          </p>
          <p className="text-sm text-gray-400">
            — LevelUp Money
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link to="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors">
            FAQ
          </Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-emerald-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-emerald-400 transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="text-gray-300 hover:text-emerald-400 transition-colors">
            Sign Up
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
          <p>&copy; {new Date().getFullYear()} LevelUp Money. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
