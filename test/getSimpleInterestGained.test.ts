import { describe, test, expect } from "@jest/globals";
import { getSimpleInterestGained } from "../src/getSimpleInterestGained";

// expected result values come from https://www.bendigobank.com.au/calculators/deposit-and-savings/
describe("simple interest gained calculation works for 'normal' inputs ", () => {
  test.each([
    // [starting balance, interest rate per-anum, months invested, expected gain]
    [1000, 0.02, 12 * 5, 100],
    [1000, 0.0245, 12 * 5, 123],
    [54321, 0.011, 3, 149],
    [0, 0.011, 12, 0],
    [54321, 0, 12, 0],
  ])(
    "principal: %i, interest rate: %f p.a., over %i months => $%i gained",
    (principal, yearlyInterestRate, monthsInvested, expectedGain) => {
      expect(
        // converts yearly interest rate into monthly interest rate because the function expects it in that format.
        getSimpleInterestGained(
          principal,
          yearlyInterestRate / 12.0,
          monthsInvested,
        ),
      ).toBe(expectedGain);
    },
  );
});
