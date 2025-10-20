import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import "../styles/landing-redesign.css";
import ratWheelImage from "/public/images/rat-wheel.png";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-premium">
      <div className="hero-container-premium">
        {/* Left: Text Content */}
        <div className="hero-text-block">
          <h1 className="hero-headline-premium">
            Escape the Paycheck-to-Paycheck Cycle
          </h1>
          
          <p className="hero-subheadline-premium">
            Build wealth step-by-step with smart budgeting, 
            credit building, and personalized milestones.
          </p>
          
          <div className="hero-cta-container">
            <Link to="/signup" className="btn-primary-premium">
              Start Free Trial
            </Link>
            <a href="#features" className="btn-secondary-premium">
              Learn More
            </a>
          </div>
          
          <div className="trust-badge-premium">
            <span className="trust-item">
              <Check size={16} className="check-icon" />
              Free to start
            </span>
            <span className="trust-item">
              <Check size={16} className="check-icon" />
              No credit card
            </span>
            <span className="trust-item">
              <Check size={16} className="check-icon" />
              Cancel anytime
            </span>
          </div>
        </div>

        {/* Right: Rat Wheel Image */}
        <div className="hero-image-block">
          <div className="image-glow-effect"></div>
          <img 
            src={ratWheelImage} 
            alt="Break free from the cycle" 
            className="rat-wheel-premium"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;