// CHANGE
const abi = JSON.parse(
  `[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidates","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]`
);
// CHANGE
const address = "0x1A48226a2b104d2956D7Fba571D78D4b5472fd06";
// CHANGE
const Owner = "0xe4a33bADcF434275D016370b6fBb415cD42969D5";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const VotingContract = new web3.eth.Contract(abi, address);

new Vue({
  el: "#app",
  data: function() {
    return {
      totalVotes: {
        Han: 0,
        Yun: 0,
        Yan: 0
      }
    };
  },
  methods: {
    voteForCandidates: function(name) {
      return;
    },
    totalVotesFor: function(name) {
      VotingContract.methods
        .totalVotesFor(this.gName(name))
        .call()
        .then(data => {
          this.totalVotes[name] = data;
        });
    },
    gName: function(name) {
      return web3.utils.asciiToHex(name);
    },
    vote: function(name) {
      VotingContract.methods.voteForCandidates(this.gName(name)).send({
        from: Owner,
        gasPrice: "20000000000"
      });
      this.totalVotesFor(name);
    }
  },
  computed: {
    getValInArr: function() {
      let arr = [];
      Object.keys(this.totalVotes).forEach(d => {
        arr = [...arr, { name: d, value: this.totalVotes[d] }];
      });
      return arr;
    }
  },
  mounted() {
    Object.keys(this.totalVotes).forEach(name => {
      this.totalVotesFor(name);
    });
  }
});
