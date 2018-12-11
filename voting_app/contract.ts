import * as fs from "fs";
const solc = require("solc");
import Web3 = require("web3");

// compile code
const contractName = "Voting"
const code = fs.readFileSync("Voting.sol", "UTF-8").toString();
const compileSolc = solc.compile(code);
const { interface: ethInterface } = compileSolc.contracts[`:${contractName}`];
const abi = JSON.parse(ethInterface);

// setup web3
const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:7545")
);

// CHANGE
const address = "0x1A48226a2b104d2956D7Fba571D78D4b5472fd06";
// CHANGE
const Owner = '0xe4a33bADcF434275D016370b6fBb415cD42969D5'

const VotingContract = new web3.eth.Contract(abi, address, {
  from: Owner,
  gasPrice: "20000000000"
});

async function main() {
  const vote = (name: string) => web3.utils.asciiToHex(name);
  await VotingContract.methods.voteForCandidates(vote("Han")).send({
    from: Owner,
    gasPrice: "20000000000"
  })
  console.log(await VotingContract.methods.totalVotesFor(vote("Han")).call());
  await VotingContract.methods.voteForCandidates(vote("Yan")).send({
    from: Owner,
    gasPrice: "20000000000"
  })
  console.log(await VotingContract.methods.totalVotesFor(vote("Yan")).call());
  await VotingContract.methods.voteForCandidates(vote("Yun")).send({
    from: Owner,
    gasPrice: "20000000000"
  })
  console.log(await VotingContract.methods.totalVotesFor(vote("Yun")).call());
}

main()
