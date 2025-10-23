import { describe, it, expect } from 'vitest';

// Example utility function to test
function calculateTotalDebt(creditCards: number[], loans: number[]): number {
  const cardDebt = creditCards.reduce((sum, balance) => sum + balance, 0);
  const loanDebt = loans.reduce((sum, balance) => sum + balance, 0);
  return cardDebt + loanDebt;
}

describe('Debt Calculation', () => {
  it('should calculate total debt from credit cards and loans', () => {
    const creditCards = [1000, 2500, 500];
    const loans = [15000, 5000];
    
    const total = calculateTotalDebt(creditCards, loans);
    
    expect(total).toBe(24000);
  });

  it('should return 0 for empty arrays', () => {
    const total = calculateTotalDebt([], []);
    
    expect(total).toBe(0);
  });

  it('should handle single values', () => {
    const total = calculateTotalDebt([1000], [5000]);
    
    expect(total).toBe(6000);
  });
});

// Example validation function
function isValidCreditScore(score: number): boolean {
  return score >= 300 && score <= 850;
}

describe('Credit Score Validation', () => {
  it('should accept valid credit scores', () => {
    expect(isValidCreditScore(720)).toBe(true);
    expect(isValidCreditScore(300)).toBe(true);
    expect(isValidCreditScore(850)).toBe(true);
  });

  it('should reject scores below 300', () => {
    expect(isValidCreditScore(299)).toBe(false);
    expect(isValidCreditScore(0)).toBe(false);
    expect(isValidCreditScore(-100)).toBe(false);
  });

  it('should reject scores above 850', () => {
    expect(isValidCreditScore(851)).toBe(false);
    expect(isValidCreditScore(1000)).toBe(false);
  });
});

