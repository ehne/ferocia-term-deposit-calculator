import { describe, expect, test } from "@jest/globals";
import {
  getCompoundInterestGained,
  InterestPayFrequency,
} from "../src/getCompoundInterestGained";

// expected result values come from https://www.bendigobank.com.au/calculators/deposit-and-savings/
describe("compound interest gained calculation works for 'normal' inputs", () => {
  // interest paid frequency: monthly
  test.each([
    // [starting balance, interest rate per-anum, months invested, expected gain]
    [10000, 0.011, 12, 111],
    [1000, 0.0245, 12 * 5, 130],
    [54321, 0.011, 3, 150],
    [0, 0.011, 12, 0],
    [54321, 0, 12, 0],
  ])(
    "interest paid: monthly, principal: %i, interest rate: %f p.a., over %i months => $%i gained",
    (principal, yearlyInterestRate, monthsInvested, expectedGain) => {
      expect(
        // converts yearly interest rate into monthly interest rate because the function expects it in that format.
        getCompoundInterestGained(
          principal,
          yearlyInterestRate / 12.0,
          monthsInvested,
          InterestPayFrequency.MONTHLY,
        ),
      ).toBe(expectedGain);
    },
  );

  // interest paid frequency: quarterly
  test.each([
    // [starting balance, interest rate per-anum, months invested, expected gain]
    [10000, 0.011, 12, 110],
    [1000, 0.0245, 12 * 5, 130],
    [1000, 0.0245, 7, 14],
    [54321, 0.011, 3, 149],
    [0, 0.011, 12, 0],
    [54321, 0, 12, 0],
  ])(
    "interest paid: quarterly, principal: %i, interest rate: %f p.a., over %i months => $%i gained",
    (principal, yearlyInterestRate, monthsInvested, expectedGain) => {
      expect(
        // converts yearly interest rate into monthly interest rate because the function expects it in that format.
        getCompoundInterestGained(
          principal,
          yearlyInterestRate / 12.0,
          monthsInvested,
          InterestPayFrequency.QUARTERLY,
        ),
      ).toBe(expectedGain);
    },
  );
});
