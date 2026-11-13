// MediTrace Smart Contract ABI and Network Configuration

export const MEDITRACE_CONTRACT_ADDRESS = "0x90B1d7cf9269Cf225421e44bd3d6f12E7F88435c";

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
			{
				"indexed": true,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "scanner",
				"type": "address"
			}
		],
		"name": "AnomalyFlagged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "BatchRecalled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "manufacturer",
				"type": "address"
			}
		],
		"name": "BatchRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "facility",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "temp",
				"type": "int256"
			}
		],
		"name": "CustodyRecorded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serial",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reason",
				"type": "string"
			}
		],
		"name": "recallBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serial",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_stage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_facility",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_temp",
				"type": "int256"
			}
		],
		"name": "recordTransfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serial",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_brand",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ndc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_mfgDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expDate",
				"type": "uint256"
			}
		],
		"name": "registerBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_serial",
				"type": "string"
			}
		],
		"name": "verifyBatch",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "batchId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "brand",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serialNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ndc",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "manufactureDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expiryDate",
						"type": "uint256"
					},
					{
						"internalType": "enum MediTrace.Status",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "manufacturer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "scanCount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct MediTrace.Batch",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "stage",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "facility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "temperatureCelsius",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "custodian",
						"type": "address"
					}
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
		"inputs": [],
		"name": "authority",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "batches",
		"outputs": [
			{
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "brand",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ndc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "manufactureDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "enum MediTrace.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "manufacturer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "scanCount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "custodyTrail",
		"outputs": [
			{
				"internalType": "string",
				"name": "stage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "facility",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "temperatureCelsius",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "custodian",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]