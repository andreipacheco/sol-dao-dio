import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contractAddress = 'ENDERECO_DO_SEU_CONTRATO';
const contractABI = [
  // ABI do seu contrato
];

const contract = new ethers.Contract(contractAddress, contractABI, signer);

export { provider, signer, contract };
