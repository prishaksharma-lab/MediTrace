// MediTrace Smart Contract ABI and Network Configuration

export const MEDITRACE_CONTRACT_ADDRESS = "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55";

export const SUPPORTED_NETWORKS = {
  11155111: {
    name: "Ethereum Sepolia Testnet",
    currency: "ETH",
    rpcUrl: "https://rpc.sepolia.org",
    explorer: "https://sepolia.etherscan.io"
  },
  80002: {
    name: "Polygon Amoy Testnet",
    currency: "MATIC",
    rpcUrl: "https://rpc-amoy.polygon.technology",
    explorer: "https://amoy.polygonscan.com"
  },
  1337: {
    name: "Local Hardhat / Anvil",
    currency: "ETH",
    rpcUrl: "http://127.0.0.1:8545",
    explorer: "http://localhost:8545"
  }
};

export const MEDITRACE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "serialNumber", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "batchId", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "manufacturer", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" }
    ],
    "name": "BatchMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "serialNumber", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "facility", "type": "string" },
      { "indexed": false, "internalType": "int256", "name": "temperatureCelsius", "type": "int256" },
      { "indexed": true, "internalType": "address", "name": "custodian", "type": "address" }
    ],
    "name": "CustodyLogged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "serialNumber", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "scannerNode", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "totalScans", "type": "uint256" }
    ],
    "name": "DuplicateAlertTriggered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "serialNumber", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "reason", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "authority", "type": "address" }
    ],
    "name": "BatchRecalled",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_serialNumber", "type": "string" },
      { "internalType": "string", "name": "_batchId", "type": "string" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_brand", "type": "string" },
      { "internalType": "string", "name": "_ndc", "type": "string" },
      { "internalType": "uint256", "name": "_mfgDate", "type": "uint256" },
      { "internalType": "uint256", "name": "_expDate", "type": "uint256" }
    ],
    "name": "registerBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_serialNumber", "type": "string" },
      { "internalType": "string", "name": "_stage", "type": "string" },
      { "internalType": "string", "name": "_facility", "type": "string" },
      { "internalType": "string", "name": "_location", "type": "string" },
      { "internalType": "int256", "name": "_tempCelsius", "type": "int256" },
      { "internalType": "string", "name": "_signature", "type": "string" }
    ],
    "name": "recordTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_serialNumber", "type": "string" }
    ],
    "name": "verifyBatch",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "batchId", "type": "string" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "brand", "type": "string" },
          { "internalType": "string", "name": "serialNumber", "type": "string" },
          { "internalType": "string", "name": "ndc", "type": "string" },
          { "internalType": "uint256", "name": "manufactureDate", "type": "uint256" },
          { "internalType": "uint256", "name": "expiryDate", "type": "uint256" },
          { "internalType": "uint8", "name": "status", "type": "uint8" },
          { "internalType": "address", "name": "manufacturer", "type": "address" },
          { "internalType": "uint256", "name": "scanCount", "type": "uint256" },
          { "internalType": "bool", "name": "exists", "type": "bool" }
        ],
        "internalType": "struct MediTrace.MedicineBatch",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "stage", "type": "string" },
          { "internalType": "string", "name": "facility", "type": "string" },
          { "internalType": "string", "name": "location", "type": "string" },
          { "internalType": "int256", "name": "temperatureCelsius", "type": "int256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "custodian", "type": "address" },
          { "internalType": "string", "name": "txSignature", "type": "string" }
        ],
        "internalType": "struct MediTrace.Checkpoint[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_serialNumber", "type": "string" }
    ],
    "name": "getBatch",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "batchId", "type": "string" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "brand", "type": "string" },
          { "internalType": "string", "name": "serialNumber", "type": "string" },
          { "internalType": "string", "name": "ndc", "type": "string" },
          { "internalType": "uint256", "name": "manufactureDate", "type": "uint256" },
          { "internalType": "uint256", "name": "expiryDate", "type": "uint256" },
          { "internalType": "uint8", "name": "status", "type": "uint8" },
          { "internalType": "address", "name": "manufacturer", "type": "address" },
          { "internalType": "uint256", "name": "scanCount", "type": "uint256" },
          { "internalType": "bool", "name": "exists", "type": "bool" }
        ],
        "internalType": "struct MediTrace.MedicineBatch",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "stage", "type": "string" },
          { "internalType": "string", "name": "facility", "type": "string" },
          { "internalType": "string", "name": "location", "type": "string" },
          { "internalType": "int256", "name": "temperatureCelsius", "type": "int256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "custodian", "type": "address" },
          { "internalType": "string", "name": "txSignature", "type": "string" }
        ],
        "internalType": "struct MediTrace.Checkpoint[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBatchesCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
