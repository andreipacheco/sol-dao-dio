import React, { useState, useEffect } from 'react';
import CreateProposal from './components/CreateProposal';
import ProposalsList from './components/ProposalsList';
import Vote from './components/Vote';
import { provider } from './ethers';

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Erro ao conectar ao Metamask:", error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      <h1>DAO Simples</h1>
      {account ? (
        <div>
          <p>Conectado como: {account}</p>
          <CreateProposal />
          <ProposalsList />
          <Vote />
        </div>
      ) : (
        <p>Conecte sua carteira Metamask para interagir com a DAO.</p>
      )}
    </div>
  );
}

export default App;
