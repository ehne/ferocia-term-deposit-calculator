import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { InterestPayFrequency } from "../src/getCompoundInterestGained";

const interestPaidOptions = [
  ...Object.keys(InterestPayFrequency).filter((x) => isNaN(Number(x))),
  "AT_MATURITY",
];

const args = yargs()
  .scriptName("term-deposit-calculator")
  .demandOption([
    "investment-term",
    "interest-rate",
    "starting-balance",
    "interest-paid",
  ])
  .choices("interest-paid", interestPaidOptions)
  .number(["investment-term", "interest-rate", "starting-balance"])
  .describe(
    "investment-term",
    "how many months you want to invest your money for",
  )
  .describe(
    "interest-rate",
    "the per-anum interest rate (as a number from 0 to 100)",
  )
  .describe("starting-balance", "the amount of money you want to invest")
  .help()
  .parseSync(hideBin(process.argv));

console.log(args);
