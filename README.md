# 💊 MediTrace

**Blockchain-based medicine verification and anti-counterfeiting.**

Every medicine batch gets a unique serial number registered on a blockchain. Every handover (manufacturer → distributor → pharmacy) is recorded permanently with a temperature reading. Anyone can scan a QR code to check whether a medicine is genuine.

---

## 🎯 The Problem

Fake medicines look identical to real ones, and paper records or ordinary databases can be forged or quietly edited. MediTrace uses a blockchain, a shared record book that nobody can secretly change, to make a medicine's history trustworthy and publicly verifiable.

## ✨ Features

- **Batch registration:** manufacturers register a batch once, with a unique serial number
- **Custody trail:** every handover is logged with facility, location, temperature, time and handler
- **Counterfeit detection:** unregistered serials are rejected as potential fakes
- **Clone detection:** a serial scanned more than 10 times is flagged `DuplicateAlert`
- **Cold-chain monitoring:** a temperature above 10°C is flagged `ThermalBreach`
- **Regulator recall:** only the authority address can mark a batch `Recalled`
- **QR codes** for each batch and a printable **Certificate of Authenticity**
- **Light/dark theme** and MetaMask wallet connection

## 🧱 Tech Stack

| Layer | Tools |
|---|---|
| Smart contract | Solidity ^0.8.20 |
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Blockchain connection | ethers.js v6, MetaMask |
| Extras | qrcode.react, lucide-react |
| Networks | Ethereum Sepolia, Polygon Amoy, local Hardhat/Anvil |

## 🔗 Smart Contract (`contracts/MediTrace.sol`)

**Statuses:** `Authentic`, `DuplicateAlert`, `Recalled`, `ThermalBreach`

| Function | Purpose |
|---|---|
| `registerBatch(...)` | Registers a batch, rejects duplicates, adds a "Production Genesis" checkpoint |
| `recordTransfer(...)` | Logs a handover with temperature; flags breach above 10°C |
| `verifyBatch(serial)` | Increments scan count; reverts for unregistered serials; flags clones |
| `recallBatch(serial, reason)` | Authority-only recall |

**Events:** `BatchRegistered`, `CustodyRecorded`, `AnomalyFlagged`, `BatchRecalled`

## 🖥️ App Screens

1. **Verify Medicines:** scan a QR or pick a batch; see the verdict, authenticity score, tamper checklist, provenance timeline and certificate
2. **Manufacturer Portal:** register a batch and generate its serial number and QR code
3. **Distributor Logistics:** log a handover with carrier, location and temperature
4. **Blockchain Ledger:** an Etherscan-style explorer of blocks and transactions
5. **Risk Intelligence:** a dashboard and investigation queue of flagged batches

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/prishaksharma-lab/MediTrace.git
cd MediTrace

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in a browser with MetaMask installed.

### Deploying the contract

1. Open [Remix IDE](https://remix.ethereum.org) and paste `contracts/MediTrace.sol`
2. Compile, then deploy using **Injected Provider - MetaMask** on **Sepolia**
3. Copy the deployed address into `contractAbi.js`
4. Reload the app and connect your wallet

> ⚠️ Use a **testnet** only. Never connect real funds or Ethereum Mainnet for this demo.

## 📁 Project Structure

```
MediTrace/
├── contracts/
│   └── MediTrace.sol        # Solidity smart contract
├── src/
│   ├── App.jsx              # Global state and tabs
│   ├── components/          # Portals, verification views, modals
│   ├── services/web3Service.js   # Wallet + contract calls (ethers.js)
│   ├── contractAbi.js       # Contract address and ABI
│   └── mockBatches.js       # Demo data (genuine, clone, recalled)
└── README.md
```

*(Folder names may differ slightly; adjust to match the repo.)*

## ⚠️ Current Limitations

This is an academic prototype. Being upfront:

- The contract address in `contractAbi.js` is a **placeholder** until deployed
- The Verify screen and Ledger Explorer use **demo data**, not live contract reads
- The ABI and some function parameters **do not yet match** the Solidity file
- **No role-based access:** anyone can call `registerBatch` and `recordTransfer`
- Temperature is **entered manually**, not read from sensors
- Labels such as "Zero-Knowledge Proof Layer", "Validator Nodes", "ERC-721" and DSCSA/GS1 compliance are **display-only** and not implemented
- Merkle roots and some transaction hashes are generated for display

## 🔮 Future Scope

- Role-based access for manufacturers, distributors, pharmacies and regulators
- Mark-as-sold at payment, so a second sale of the same serial is an instant clone alert
- Live reads from the chain on the Verify screen
- IoT temperature sensors for automatic cold-chain logging
- Store hashes on-chain and data off-chain to reduce gas costs
- Deployment on a low-cost chain such as Polygon

## 🧠 Blockchain Concepts Demonstrated

Immutability · Provenance and custody trail · Smart contracts · Role-based authority · Events · Tamper and duplicate detection

