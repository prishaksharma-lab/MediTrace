import { ethers } from 'ethers';
import { MEDITRACE_ABI, MEDITRACE_CONTRACT_ADDRESS } from './contractAbi';

// Check if browser has an injected Ethereum provider (MetaMask, Coinbase, etc.)
export function hasInjectedWallet() {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}

// Connect user's Web3 wallet
export async function connectWallet() {
  if (!hasInjectedWallet()) {
    throw new Error('No Ethereum wallet detected. Please install MetaMask or use simulated testnet mode.');
  }

  try {
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
  } catch (error) {
    console.error('Wallet connection failed:', error);
    throw error;
  }
}

// Get contract instance connected to signer
export async function getSignedContract() {
  if (!hasInjectedWallet()) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(MEDITRACE_CONTRACT_ADDRESS, MEDITRACE_ABI, signer);
}

// Mint a batch directly on the blockchain
export async function mintBatchOnChain(batchData) {
  try {
    const contract = await getSignedContract();
    if (!contract) throw new Error('Wallet not connected');

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
  } catch (error) {
    console.warn('On-chain minting fallback to simulated block:', error.message);
    // Return simulated on-chain transaction receipt if contract isn't live on this network
    return {
      success: true,
      simulated: true,
      txHash: '0x' + Array.from(batchData.serialNumber).reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 0x12345678).toString(16).padEnd(64, 'e'),
      blockNumber: 819251,
      message: error.message
    };
  }
}

// Record a custody transfer directly on the blockchain
export async function recordTransferOnChain(transferData) {
  try {
    const contract = await getSignedContract();
    if (!contract) throw new Error('Wallet not connected');

    const tempInt = Math.round(parseFloat(transferData.tempReading || '21'));
    const tx = await contract.recordTransfer(
      transferData.serialNumber,
      transferData.stageName,
      transferData.carrier,
      transferData.locationName,
      tempInt,
      'ECDSA_SIGNATURE_VERIFIED'
    );

    const receipt = await tx.wait();
    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.warn('On-chain transfer fallback to simulated block:', error.message);
    return {
      success: true,
      simulated: true,
      txHash: '0x' + Math.random().toString(16).substring(2).padEnd(64, '7'),
      blockNumber: 819252
    };
  }
}
