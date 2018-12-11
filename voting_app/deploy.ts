import * as fs from "fs";
const solc = require("solc");
import Web3 = require("web3");

const contractName = "Voting";

// compile code
const code = fs.readFileSync("Voting.sol", "UTF-8").toString();
const compileSolc = solc.compile(code);
const { interface: ethInterface, bytecode } = compileSolc.contracts[
  `:${contractName}`
];
const abi = JSON.parse(ethInterface);

// GET THE abi
console.log(`==========ABI==========`);
console.log(ethInterface);
console.log(`==========ABI==========`);

// setup web3
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const VotingContract = new web3.eth.Contract(abi);

// deploy contract
// CHANGE
const Owner = "0xA7C17a9d75b78C38C65b64f86F972414FAeFB02A";

VotingContract.deploy({
  data: "0x" + bytecode,
  arguments: [
    [
      web3.utils.asciiToHex("Han"),
      web3.utils.asciiToHex("Yan"),
      web3.utils.asciiToHex("Yun")
    ]
  ]
})
  .send({
    from: Owner,
    gas: 1500000,
    gasPrice: "300000000000"
  })
  .on("receipt", async receipt => {
    const address = receipt.contractAddress;
    VotingContract.options.address = address;
    console.log(`==========Contract Address==========`);
    console.log(address);
    console.log(`==========Contract Address==========`);
  });

// Vote contracts
