# Term deposit calculator

A term deposit calculator (take home coding task for Ferocia). There'll be code here soon.

## Set-up

This project uses [pnpm](https://pnpm.io) as its package manager.
To install the required libraries, run `pnpm install` from the command-line in the same directory the `package.json` file.

Code is formatted with [Prettier](https://prettier.io/), which installed via the set-up above, and can be configured to run on save in your IDE.
It can also be executed by running `pnpm format`.

## Testing

This project uses [Jest](https://jestjs.io) as its testing framework.
Jest is installed automatically through the set-up process above.
To run the tests, run `pnpm test` from the command-line in the repository.

Tests are located in the `/test/` folder, and a TypeScript check is done before running the tests to ensure valid typing.

## Design decisions

- The main function to calculate interest should work using the smallest unit (months), and things need to be converted into that scale beforehand.
