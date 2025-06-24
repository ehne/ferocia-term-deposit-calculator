/**
 * Returns the amount of interest gained when using simple interest, rounded to the nearest whole number.
 * Uses the formula found on https://www.calculator.net/simple-interest-calculator.html
 *
 *
 * @param startingBalance the starting balance (aka. the "principal")
 * @param monthlyInterestRate the interest rate per-month (instead of per-anum)
 * @param monthsInvested how many months the money was invested for
 */
export const getSimpleInterestGained = (
  startingBalance: number,
  monthlyInterestRate: number,
  monthsInvested: number,
): number => {
  return Math.round(startingBalance * monthlyInterestRate * monthsInvested);
};
