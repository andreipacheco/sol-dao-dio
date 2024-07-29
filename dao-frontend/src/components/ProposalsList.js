import React, { useState, useEffect } from 'react';
import { contract } from '../ethers';

const ProposalsList = () => {
  const [proposals, setProposals] = useState([]);

  const fetchProposals = async () => {
    const proposalCount = await contract.proposalCount();
    const fetchedProposals = [];

    for (let i = 0; i < proposalCount; i++) {
      const proposal = await contract.proposals(i);
      fetchedProposals.push({
        id: i,
        description: proposal.description,
        voteCount: proposal.voteCount.toNumber(),
        executed: proposal.executed,
      });
    }

    setProposals(fetchedProposals);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div>
      <h2>Lista de Propostas</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <p>{proposal.description}</p>
            <p>Votos: {proposal.voteCount}</p>
            <p>Executada: {proposal.executed ? 'Sim' : 'Não'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalsList;
