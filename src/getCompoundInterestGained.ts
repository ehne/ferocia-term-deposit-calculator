export enum InterestPayFrequency {
  MONTHLY,
  QUARTERLY,
  ANNUALLY,
}

/**
 * Returns the amount of interest gained when using compound interest, over the specified interest pay frequency.
 * Result is rounded to the nearest whole number.
 *
 * @param startingBalance the starting balance (aka. the "principal")
 * @param monthlyInterestRate the interest rate per-month (instead of per-anum)
 * @param monthsInvested how many months the money was invested for
 * @param interestPayFrequency the frequency that interest is paid onto the balance
 */
export const getCompoundInterestGained = (
  startingBalance: number,
  monthlyInterestRate: number,
  monthsInvested: number,
  interestPayFrequency: InterestPayFrequency,
): number => {
  return 0;
};
