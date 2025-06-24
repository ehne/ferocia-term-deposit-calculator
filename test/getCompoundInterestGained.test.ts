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

  // interest paid frequency: annually
  test.each([
    // [starting balance, interest rate per-anum, months invested, expected gain]
    [10000, 0.011, 12, 110],
    [1000, 0.0245, 12 * 5, 129],
    [54321, 0.011, 26, 1303],
    [0, 0.011, 12, 0],
    [54321, 0, 12, 0],
  ])(
    "interest paid: annually, principal: %i, interest rate: %f p.a., over %i months => $%i gained",
    (principal, yearlyInterestRate, monthsInvested, expectedGain) => {
      expect(
        // converts yearly interest rate into monthly interest rate because the function expects it in that format.
        getCompoundInterestGained(
          principal,
          yearlyInterestRate / 12.0,
          monthsInvested,
          InterestPayFrequency.ANNUALLY,
        ),
      ).toBe(expectedGain);
    },
  );
});

describe("getCompoundInterestGained throws an error when interest pay frequency is less than investment time", () => {
  test.each([
    // [label (for the test visualiser), months invested, interest pay frequency]
    ["monthly", 0, InterestPayFrequency.MONTHLY],
    ["monthly", -10, InterestPayFrequency.MONTHLY],

    ["quarterly", 0, InterestPayFrequency.QUARTERLY],
    ["quarterly", 2, InterestPayFrequency.QUARTERLY],
    ["quarterly", -10, InterestPayFrequency.QUARTERLY],

    ["annually", 0, InterestPayFrequency.ANNUALLY],
    ["annually", 2, InterestPayFrequency.ANNUALLY],
    ["annually", 7, InterestPayFrequency.ANNUALLY],
    ["annually", -10, InterestPayFrequency.ANNUALLY],
  ])(
    "interest paid %s throws error with months invested: %i",
    (_, monthsInvested, payFrequency) => {
      expect(() =>
        getCompoundInterestGained(
          // arbitrary values for starting balance and interest rate,
          // as that's not what we're interested in with this test.
          1000,
          0.011 / 12.0,
          monthsInvested,
          payFrequency,
        ),
      ).toThrow();
    },
  );
});
