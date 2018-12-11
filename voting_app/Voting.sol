pragma solidity ^0.4.23;

contract Voting {
    bytes32[] public candidateList;
    mapping (bytes32 => uint8)  public votesReceived;
    // constructor to initialize candidates
    constructor( bytes32[] memory candidateNames)  public  {
        candidateList = candidateNames;
    }
    // vote for candidates
    function voteForCandidates(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }
    // get count of votes for each candidates
    function totalVotesFor(bytes32 candidate) public view returns(uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    function validCandidate(bytes32 candidate) view private returns(bool) {
        for(uint i=0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
