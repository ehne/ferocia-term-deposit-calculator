import { describe, expect, test } from "@jest/globals";
import {
  getCompoundInterestGained,
  InterestPayFrequency,
} from "../src/getCompoundInterestGained";

// expected result values come from https://www.bendigobank.com.au/calculators/deposit-and-savings/
describe("compound interest gained calculation works for 'normal' inputs", () => {
  test("basic test of monthly compounding interest", () => {
    expect(
      getCompoundInterestGained(
        10000,
        0.011 / 12.0,
        12,
        InterestPayFrequency.MONTHLY,
      ),
    ).toBe(111);
  });
});
