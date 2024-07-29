import React, { useState } from 'react';
import { contract } from '../ethers';

const Vote = () => {
  const [proposalId, setProposalId] = useState('');

  const vote = async () => {
    try {
      const tx = await contract.vote(proposalId);
      await tx.wait();
      alert('Voto registrado com sucesso!');
      setProposalId(''); // Limpar o campo após votar
    } catch (error) {
      console.error(error);
      alert('Erro ao votar.');
    }
  };

  return (
    <div>
      <h2>Votar em Proposta</h2>
      <input
        type="number"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        placeholder="ID da proposta"
      />
      <button onClick={vote}>Votar</button>
    </div>
  );
};

export default Vote;
