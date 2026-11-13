import { ethers } from 'ethers';
import { MEDITRACE_ABI, MEDITRACE_CONTRACT_ADDRESS } from './contractAbi';

// Check if browser has an injected Ethereum provider (MetaMask, etc.)
export function hasInjectedWallet() {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}

// Connect user's Web3 wallet
export async function connectWallet() {
  if (!hasInjectedWallet()) {
    throw new Error('No Ethereum wallet detected. Please install MetaMask.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const network = await provider.getNetwork();

  return {
    address: accounts[0],
    chainId: Number(network.chainId),
    provider,
    signer
  };
}

// Get contract instance connected to signer
export async function getSignedContract() {
  if (!hasInjectedWallet()) throw new Error('Wallet not connected');
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(MEDITRACE_CONTRACT_ADDRESS, MEDITRACE_ABI, signer);
}

// Register a batch on the blockchain (calls registerBatch in MediTrace.sol)
export async function mintBatchOnChain(batchData) {
  const contract = await getSignedContract();

  const mfgEpoch = Math.floor(new Date(batchData.manufactureDate).getTime() / 1000);
  const expEpoch = Math.floor(new Date(batchData.expiryDate).getTime() / 1000);

  const tx = await contract.registerBatch(
    batchData.serialNumber,
    batchData.batchNumber,
    batchData.name,
    batchData.brand,
    batchData.ndc,
    mfgEpoch,
    expEpoch
  );

  const receipt = await tx.wait();
  return {
    success: true,
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber
  };
}

// Record a custody transfer on the blockchain (calls recordTransfer in MediTrace.sol)
export async function recordTransferOnChain(transferData) {
  const contract = await getSignedContract();

  const tempInt = Math.round(parseFloat(transferData.tempReading || '21'));

  const tx = await contract.recordTransfer(
    transferData.serialNumber,
    transferData.stageName,
    transferData.carrier,
    transferData.locationName,
    tempInt
  );

  const receipt = await tx.wait();
  return {
    success: true,
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber
  };
}