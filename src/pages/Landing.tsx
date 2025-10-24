import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
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
      <section style={{ 
        background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)',
        padding: '96px 40px'
      }} id="features">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            
            {/* Card 1: Budget Smarter */}
            <div 
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '40px 32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #10B981, #059669)'
              }}></div>
              
              <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>💸</div>
              
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.015em'
              }}>
                Budget Smarter
              </h3>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#10B981',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                Know where every dollar goes
              </p>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                Track your expenses effortlessly and create spending plans that actually stick.
              </p>
            </div>
            
            {/* Card 2: Build Credit */}
            <div 
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '40px 32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #10B981, #059669)'
              }}></div>
              
              <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>🔍</div>
              
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.015em'
              }}>
                Build Credit
              </h3>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#10B981',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                Monitor, improve, repeat
              </p>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                Stay on top of your credit report and understand what affects your score.
              </p>
            </div>
            
            {/* Card 3: Pay Off Debt */}
            <div 
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '40px 32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #10B981, #059669)'
              }}></div>
              
              <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>🚫</div>
              
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.015em'
              }}>
                Pay Off Debt
              </h3>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#10B981',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                Make progress every month
              </p>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#6B7280',
                lineHeight: '1.6'
              }}>
                Break large debts into manageable chunks with easy payoff milestones.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        padding: '120px 40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '24px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            Start Your Journey to Financial Freedom Today
          </h2>
          
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            marginBottom: '48px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            It's easy to start — and even easier to stay on track.
          </p>
          
          <Link
            to="/signup"
            style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif',
              background: '#FFFFFF',
              color: '#10B981',
              padding: '20px 48px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            Start Free Trial ↑
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;