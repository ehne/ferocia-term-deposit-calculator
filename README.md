# Term deposit calculator

A term deposit calculator CLI tool.

## Set-up

This project uses [pnpm](https://pnpm.io) as its package manager.
Make sure you've first cloned the repository locally.
To install the required libraries, run `pnpm install` from the command-line in the same directory the `package.json` file.

Code is formatted with [Prettier](https://prettier.io/), which installed via the set-up above, and can be configured to run on save in your IDE.
It can also be executed by running `pnpm format`.

All code for the interest calculating and the cli is under `./src/`.
`./src/cli.ts` contains the script that runs when you run `pnpm start`.
`./test/` is where the tests are located (see below for more info on testing).

## Running the command-line interface

The term deposit calculator tool is provided as a command-line interface (CLI).
See the design decision notes below for more info as to why a CLI was chosen over something more graphical.

After having set up the repository using the process above, you can use the CLI by running `pnpm start --help` to see help page with the available options.

Example usage:

```bash
pnpm start --starting-balance=10000 --investment-term=12 --interest-rate=1.1 --interest-paid=AT_MATURITY
```

- `starting-balance` is how much money you want to invest
- `interest-rate` is the per-anum interest rate.
- `investment-term` is the number of months you wish for your money to be invested for.
- `interest-paid` is when you want interest to be paid on your investment (see the `pnpm start --help` output for the available options).


## Testing

This project uses [Jest](https://jestjs.io) as its testing framework.
Jest is installed automatically through the set-up process above.
To run the tests, run `pnpm test` from the command-line in the repository.

Tests are located in the `/test/` folder, and a TypeScript check is done before running the tests to ensure valid typing.

## Design decisions

- The main functions to calculate interest should work using the smallest unit (months), and things need to be converted into that scale beforehand.
- Interest calculating functions round to the nearest whole number (integer), as they are being used for a simple user-facing presentation.
  - From the perspective of the end-user, this tool is to provide an overview of how their money may grow if they choose to use different strategies with a term deposit.
  - If this code was to be used by business logic to determine how much interest to add to someone's real account, then it should not round the numbers to the nearest dollar (instead rounding to the nearest cent).
- `getCompoundInterestGained` should throw an error if it is passed data that it cannot work with (eg. if the amount of time money is invest is smaller than the interest payment frequency would allow for)
- The tool is provided as a command-line interface because implementing a graphical user interface would involve creating (and testing) a lot more glue and components than the 2 hour time limit would allow for.
  - A GUI could be added in future though.
- The functions to figure out how much interest is gained should not worry about how they'll show up in the CLI. This is so they're generic, and can be used in other situations.

### Interest calculations
Interest is calculated using the formulas found on the following websites:

- Compound interest: https://moneysmart.gov.au/saving/compound-interest
- Simple interest: https://www.calculator.net/simple-interest-calculator.html

## Further tasks
- It would be good to validate the input that the user provides to the system to ensure it is within normal bounds for a _customer_ tool (eg. no investment periods of 4000 years or negative interest rates)
- Adding the ability to input a number of years alongside the months count would improve usability.
- More tests of weird scenarios is always good.
