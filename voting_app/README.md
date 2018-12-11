
- `deploy.ts` will deploy the contract and get the address to use in `contract.ts`.
- `contract.ts` to send in functions for the contract.

# Write contract

Write contract at [Remix](http://remix.ethereum.org/) and deploy it to localhost:7545 (ganache)

# Compile contract

install `solc` package from NPM (make sure solc version is same as your `.sol` file)

* `bytecode` - deploy to ethereum
* `interface` - Application Binary Interface (ABI)

# Deploy with Web3

using `deploy()` function and `send()` ether with that.
