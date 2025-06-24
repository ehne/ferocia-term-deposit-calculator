export enum InterestPayFrequency {
  MONTHLY,
  QUARTERLY,
  ANNUALLY,
}

/**
 * Returns the amount of interest gained when using compound interest, over the specified interest pay frequency.
 * Result is rounded to the nearest whole number.
 *
 * Formula for compound interest comes from: https://moneysmart.gov.au/saving/compound-interest
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
  // get how many months there are per the interest pay frequency.
  const monthsPerInterestPayPeriod = {
    [InterestPayFrequency.MONTHLY]: 1,
    [InterestPayFrequency.QUARTERLY]: 3,
    [InterestPayFrequency.ANNUALLY]: 12,
  }[interestPayFrequency];

  // ensure that it is possible to actually pay interest with the frequency chosen given how long the money is invested for.
  if (monthsInvested < monthsPerInterestPayPeriod) {
    throw Error(
      `Cannot calculate compound interest: Cannot pay interest every ${monthsPerInterestPayPeriod} month(s) when money is invested for only ${monthsInvested} month(s)`,
    );
  }

  // calculate final balance after compound interest is applied over the time period.
  const finalBalance =
    startingBalance *
    Math.pow(
      1 + monthlyInterestRate * monthsPerInterestPayPeriod,
      monthsInvested / monthsPerInterestPayPeriod,
    );

  // calculate interest gained and round the result before returning it
  // (because this is used in a simple user-facing tool, returning decimals are not relevant from the user's perspective)
  const interestGained = finalBalance - startingBalance;
  return Math.round(interestGained);
};
