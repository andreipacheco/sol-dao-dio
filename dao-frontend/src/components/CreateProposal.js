import React, { useState } from 'react';
import { contract } from '../ethers';

const CreateProposal = () => {
  const [description, setDescription] = useState('');

  const createProposal = async () => {
    try {
      const tx = await contract.createProposal(description);
      await tx.wait();
      alert('Proposta criada com sucesso!');
      setDescription(''); // Limpar o campo após criar a proposta
    } catch (error) {
      console.error(error);
      alert('Erro ao criar proposta.');
    }
  };

  return (
    <div>
      <h2>Criar Proposta</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da proposta"
      />
      <button onClick={createProposal}>Criar</button>
    </div>
  );
};

export default CreateProposal;
