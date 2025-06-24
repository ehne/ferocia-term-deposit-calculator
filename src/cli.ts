import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  getCompoundInterestGained,
  InterestPayFrequency,
} from "../src/getCompoundInterestGained";
import { getSimpleInterestGained } from "../src/getSimpleInterestGained";

// create a list of all the options for "interest-paid" in the CLI
const interestPaidOptions = [
  ...Object.keys(InterestPayFrequency).filter((x) => isNaN(Number(x))),
  "AT_MATURITY",
];

// parse CLI arguments
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

// convert yearly interest rate into monthly.
const monthlyInterestRate = args.interestRate / 100.0 / 12.0;

// calculate how much interest is gained
let interestGained = 0;
if (args.interestPaid === "AT_MATURITY") {
  interestGained = getSimpleInterestGained(
    args.startingBalance,
    monthlyInterestRate,
    args.investmentTerm,
  );
} else {
  interestGained = getCompoundInterestGained(
    args.startingBalance,
    monthlyInterestRate,
    args.investmentTerm,
    InterestPayFrequency[args.interestPaid],
  );
}

// display the resulting information to the user.
console.log(`
Starting balance: \$${args.startingBalance}
Interest gained: \$${interestGained}

Final balance: \$${args.startingBalance + interestGained}
`);
