import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import "../styles/landing.css";

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-wrapper">
          <Link to="/" className="logo-link">
            <span className="logo-main">Level Up</span>
            <span className="logo-sub">Money</span>
          </Link>
          <nav className="header-nav">
            <a href="#features" className="nav-link">Why Choose Level Up</a>
            <Link to="/login" className="nav-link">Log In</Link>
            <Link to="/signup" className="header-cta-btn">Start Free Trial</Link>
          </nav>
        </div>
      </header>

      {/* Premium Hero Section */}
      <HeroSection />

      {/* Milestone Section */}
      <section className="milestone-section">
        <div className="milestone-container">
          <h2 className="milestone-title">
            Level Up Your Finances — One Milestone at a Time 💰
          </h2>
          <p className="milestone-description">
            Whether it's budgeting, debt payoff, or improving your credit, Level Up gives you 
            the exact roadmap to escape financial stress and finally take control.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="features-section" id="features">
        <div className="features-container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-box">💸</div>
              <h3 className="feature-title">Budget Smarter</h3>
              <p className="feature-tagline">Know where every dollar goes</p>
              <p className="feature-description">
                Track your expenses effortlessly and create spending plans that actually stick.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">🔍</div>
              <h3 className="feature-title">Build Credit</h3>
              <p className="feature-tagline">Monitor, improve, repeat</p>
              <p className="feature-description">
                Stay on top of your credit report and understand what affects your score.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">🚫</div>
              <h3 className="feature-title">Pay Off Debt</h3>
              <p className="feature-tagline">Make progress every month</p>
              <p className="feature-description">
                Break large debts into manageable chunks with easy payoff milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-banner">
        <div className="final-cta-content">
          <h2 className="final-cta-title">
            Start Your Journey to Financial Freedom Today
          </h2>
          <p className="final-cta-subtitle">
            It's easy to start — and even easier to stay on track.
          </p>
          <Link to="/signup" className="final-cta-button">
            Start Free Trial ↑
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>&copy; 2025 Level Up Money. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;