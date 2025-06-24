import { describe, test, expect } from "@jest/globals";
import { getSimpleInterestGained } from "../src/getSimpleInterestGained";

describe("simple interest gained calculation works for 'normal' inputs ", () => {
  test("simple calculation", () => {
    // expected result value comes from https://www.bendigobank.com.au/calculators/deposit-and-savings/
    expect(getSimpleInterestGained(1000, 0.02 / 12.0, 12 * 5)).toBe(100);
  });
});
