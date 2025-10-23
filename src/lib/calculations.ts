/**
 * Centralized financial calculation utilities
 * These functions ensure consistent calculations across the application
 */

/**
 * Calculate total debt from credit cards and loans
 */
export function calculateTotalDebt(creditCards: any[], loans: any[]): number {
  const creditCardTotal = creditCards.reduce((sum, card) => sum + (card.balance || 0), 0);
  const loanTotal = loans.reduce((sum, loan) => sum + (loan.balance || 0), 0);
  return creditCardTotal + loanTotal;
}

/**
 * Convert any frequency amount to monthly amount
 * @param amount - The amount to convert
 * @param frequency - The frequency period (weekly, biweekly, monthly, annually)
 * @returns Monthly equivalent amount
 */
function convertToMonthly(amount: number, frequency: string): number {
  switch (frequency) {
    case 'weekly':
      return amount * 52 / 12; // 52 weeks per year / 12 months
    case 'biweekly':
      return amount * 26 / 12; // 26 bi-weekly periods per year / 12 months
    case 'monthly':
      return amount;
    case 'annually':
      return amount / 12;
    default:
      return amount;
  }
}

/**
 * Calculate total monthly income from all income sources
 */
export function calculateMonthlyIncome(incomeSources: any[]): number {
  return incomeSources.reduce((sum, source) => {
    const amount = source.amount || 0;
    return sum + convertToMonthly(amount, source.frequency || 'monthly');
  }, 0);
}

/**
 * Calculate total monthly expenses from all expense items
 */
export function calculateMonthlyExpenses(expenses: any[]): number {
  return expenses.reduce((sum, expense) => {
    const amount = expense.amount || 0;
    return sum + convertToMonthly(amount, expense.frequency || 'monthly');
  }, 0);
}

/**
 * Calculate net budget (income - expenses)
 */
export function calculateNetBudget(income: number, expenses: number): number {
  return income - expenses;
}

/**
 * Calculate debt-to-income ratio
 * @param totalMinimumPayment - Total minimum monthly debt payments
 * @param monthlyIncome - Total monthly income
 * @returns DTI ratio as a percentage
 */
export function calculateDTI(totalMinimumPayment: number, monthlyIncome: number): number {
  if (monthlyIncome === 0) return 0;
  return (totalMinimumPayment / monthlyIncome) * 100;
}

/**
 * Calculate total minimum payments from debts
 */
export function calculateTotalMinimumPayment(debts: any[]): number {
  return debts.reduce((sum, debt) => sum + (debt.minimumPayment || debt.minimum_payment || 0), 0);
}
