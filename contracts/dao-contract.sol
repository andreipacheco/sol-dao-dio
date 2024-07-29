// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    mapping(address => bool) public members;
    mapping(address => mapping(uint256 => bool)) public votes;

    constructor() {
        // O endereço que implanta o contrato se torna o primeiro membro
        members[msg.sender] = true;
    }

    modifier onlyMember() {
        require(members[msg.sender], "Not a member");
        _;
    }

    function addMember(address newMember) public onlyMember {
        members[newMember] = true;
    }

    function createProposal(string memory description) public onlyMember {
        proposals[proposalCount] = Proposal({
            description: description,
            voteCount: 0,
            executed: false
        });
        proposalCount++;
    }

    function vote(uint256 proposalId) public onlyMember {
        require(!votes[msg.sender][proposalId], "Already voted");
        require(!proposals[proposalId].executed, "Proposal already executed");

        votes[msg.sender][proposalId] = true;
        proposals[proposalId].voteCount++;
    }

    function executeProposal(uint256 proposalId) public onlyMember {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.voteCount > 1, "Not enough votes");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
        // Lógica para executar a proposta
    }
}
