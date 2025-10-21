import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import ratWheelImage from "../assets/rat-wheel.png";

const HeroSection: React.FC = () => {
  return (
    <section 
      style={{ 
        background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)',
        padding: '80px 20px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Left: Text Content */}
          <div style={{ textAlign: 'left' }}>
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              marginBottom: '24px'
            }}>
              Escape the Paycheck-to-Paycheck Cycle
            </h1>
            
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: '#6B7280',
              lineHeight: '1.6',
              marginBottom: '32px',
              maxWidth: '600px'
            }}>
              Build wealth step-by-step with smart budgeting, credit building, and personalized milestones.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
              <Link 
                to="/signup"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#10B981',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  padding: '20px 48px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.2s ease',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#059669';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#10B981';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.3)';
                }}
              >
                Start Free Trial
              </Link>
              
              <a 
                href="#features"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  color: '#1F2937',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  padding: '20px 48px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  border: '2px solid #E5E7EB',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F9FAFB';
                  e.currentTarget.style.borderColor = '#10B981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }}
              >
                Learn More
              </a>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#6B7280' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                <Check size={20} style={{ color: '#10B981' }} />
                Free to start
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                <Check size={20} style={{ color: '#10B981' }} />
                No credit card
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                <Check size={20} style={{ color: '#10B981' }} />
                Cancel anytime
              </span>
            </div>
          </div>
          
          {/* Right: Rat Wheel Image */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(16, 185, 129, 0.2)',
                filter: 'blur(60px)',
                borderRadius: '50%'
              }}></div>
              <img
                src={ratWheelImage}
                alt="Break free from the cycle"
                style={{ 
                  position: 'relative', 
                  zIndex: 10, 
                  maxWidth: '100%', 
                  height: 'auto',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))'
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;