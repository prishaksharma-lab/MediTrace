import React, { useState } from 'react';
import { 
  Factory, 
  PlusCircle, 
  QrCode, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  FileCheck,
  Calendar,
  AlertCircle,
  Wallet
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { mintBatchOnChain } from '../utils/web3Service';

export default function ManufacturerPortal({ 
  onBatchCreated, 
  onSwitchToVerify, 
  theme,
  walletAccount,
  onConnectWallet
}) {
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    name: 'Paxlovid (Nirmatrelvir / Ritonavir)',
    brand: 'Pfizer BioPharma Global',
    dosage: '150 mg / 100 mg Co-packaged Tablets',
    ndc: '0069-5318-30',
    batchNumber: 'PX-2025-08',
    totalUnits: 25000,
    manufactureDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 3).toISOString().split('T')[0],
    storageTemp: '20°C to 25°C (Excursions 15°C - 30°C)',
    composition: 'Nirmatrelvir 150mg, Ritonavir 100mg, microcrystalline cellulose, colloidal silicon dioxide',
    packageType: 'Child-Resistant Push-Through Blister Card (30 Tablets)',
    plantLocation: 'Kalamazoo Facility, Plant 04, MI, USA',
    leadPharmacist: 'Dr. Sarah Sterling (License #PH-99214)'
  });

  const [mintOnChain, setMintOnChain] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [createdBatch, setCreatedBatch] = useState(null);
  const [txReceipt, setTxReceipt] = useState(null);

  const simulatedHash = '0x' + Array.from(
    `${formData.batchNumber}-${formData.name}-${formData.manufactureDate}`
  ).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0x12345678).toString(16).padStart(64, 'a');

  const generatedSerial = `SN-2025-${formData.batchNumber.replace(/[^a-zA-Z0-9]/g, '')}-MNT`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMinting(true);

    try {
      let onChainResult = null;
      if (mintOnChain) {
        onChainResult = await mintBatchOnChain({
          serialNumber: generatedSerial,
          batchNumber: formData.batchNumber,
          name: formData.name,
          brand: formData.brand,
          ndc: formData.ndc,
          manufactureDate: formData.manufactureDate,
          expiryDate: formData.expiryDate
        });
        setTxReceipt(onChainResult);
      }

      const txHashToUse = onChainResult?.txHash || simulatedHash;
      const blockToUse = onChainResult?.blockNumber || 819249;

      const newBatch = {
        id: `MT-${formData.batchNumber}`,
        name: formData.name,
        brand: formData.brand,
        dosage: formData.dosage,
        ndc: formData.ndc,
        gtin: '003' + formData.ndc.replace(/[^0-9]/g, '').padEnd(10, '0'),
        batchNumber: formData.batchNumber,
        serialNumber: generatedSerial,
        status: 'AUTHENTIC',
        manufactureDate: formData.manufactureDate,
        expiryDate: formData.expiryDate,
        storageTemp: formData.storageTemp,
        currentTemp: '21.2°C',
        composition: formData.composition,
        packageType: formData.packageType,
        authenticityScore: 100.0,
        scanCount: 0,
        verifiedAt: 'Just Minted On-Chain',
        manufacturerAddress: formData.plantLocation,
        currentLocation: formData.plantLocation,
        cryptoProof: {
          blockNumber: blockToUse,
          txHash: txHashToUse,
          merkleRoot: '0x' + Math.random().toString(16).substring(2).padEnd(64, 'f'),
          digitalSignature: walletAccount ? `ECDSA-SECP256K1-${walletAccount.substring(0, 8)}` : `ECDSA-SECP256K1-MFR-${formData.batchNumber}`,
          smartContract: '0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55',
          consensus: '14/14 Nodes Confirmed Batch Mint'
        },
        tamperChecklist: {
          sealIntegrity: true,
          hologramValid: true,
          hashMatched: true,
          custodyUnbroken: true,
          tempCompliant: true,
          noDuplicateScans: true
        },
        journey: [
          {
            id: `ev-new-${Date.now()}`,
            stage: 'Manufacturing & Serialization',
            title: 'Batch Genesis & Cryptographic Registration',
            facility: formData.plantLocation,
            location: 'Kalamazoo, MI, USA',
            timestamp: new Date().toLocaleString(),
            status: 'COMPLETED',
            authorizedBy: formData.leadPharmacist,
            did: walletAccount ? `did:pkh:eip155:11155111:${walletAccount}` : 'did:meditrace:mfg:authorized-licensee',
            details: `Minted ${formData.totalUnits.toLocaleString()} serialized units with 2D DataMatrix packaging hashes. Tamper seals verified.`,
            txHash: txHashToUse.substring(0, 18) + '...',
            block: blockToUse
          }
        ]
      };

      setIsMinting(false);
      setCreatedBatch(newBatch);
      onBatchCreated(newBatch);
    } catch (err) {
      console.error(err);
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl transition-colors duration-200 ${
        isLight
          ? 'bg-gradient-to-r from-white via-indigo-50/40 to-slate-50 border-slate-200'
          : 'bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950/60 border-slate-800'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Factory className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-semibold">
                Authorized Serialization Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Manufacturer Batch Registration & Tokenization
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Register authentic pharmaceutical batches, generate cryptographically signed 2D barcodes, and commit genesis state to the blockchain ledger.
              </p>
            </div>
          </div>

          {/* Web3 Wallet Status Badge */}
          <div className="flex items-center gap-2">
            {walletAccount ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Signer: {walletAccount.substring(0, 6)}...{walletAccount.slice(-4)}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onConnectWallet}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect Wallet for On-Chain Minting</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {createdBatch ? (
        /* Success Screen */
        <div className={`border rounded-3xl p-8 shadow-2xl space-y-6 animate-fadeIn transition-colors ${
          isLight ? 'bg-white border-emerald-300' : 'bg-slate-900 border-emerald-500/40'
        }`}>
          <div className={`flex items-center gap-3 pb-6 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                On-Chain Genesis Confirmed • Block #{createdBatch.cryptoProof.blockNumber}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Batch Successfully Minted to HealthLedger!
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="font-bold text-slate-900 dark:text-white text-base">{createdBatch.name}</div>
                <div className="text-slate-500 dark:text-slate-400">{createdBatch.dosage}</div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>
                    <span className="text-slate-500">Batch Code:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-mono font-bold block">{createdBatch.batchNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Serial Key:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold block">{createdBatch.serialNumber}</span>
                  </div>
                </div>
                <div className="pt-2 text-slate-500">
                  <span className="text-slate-500">Transaction Hash:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[11px] block break-all">{createdBatch.cryptoProof.txHash}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onSwitchToVerify(createdBatch)}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Verify in Consumer / Pharmacy Scanner</span>
                </button>
                <button
                  onClick={() => setCreatedBatch(null)}
                  className={`px-5 py-3 rounded-xl font-semibold text-xs border transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  Register Another Batch
                </button>
              </div>
            </div>

            {/* Generated QR Card */}
            <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center space-y-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200">
                <QRCodeSVG
                  value={`meditrace://verify?batch=${createdBatch.id}&sn=${createdBatch.serialNumber}`}
                  size={150}
                  level="H"
                />
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {createdBatch.serialNumber}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Packaging ready for automated blister foil printing.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Batch Creation Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className={`lg:col-span-2 border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-colors ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Batch Registration Monograph
              </h3>

              {/* Direct Smart Contract Toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={mintOnChain}
                  onChange={(e) => setMintOnChain(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Sign Directly with Smart Contract</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Medicine Brand / Commercial Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Manufacturing Licensee / Company
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Dosage Form & Strength
                </label>
                <input
                  type="text"
                  required
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  FDA NDC / National Drug Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.ndc}
                  onChange={(e) => setFormData({ ...formData, ndc: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Batch Lot Identifier
                </label>
                <input
                  type="text"
                  required
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Total Lot Quantity (Units)
                </label>
                <input
                  type="number"
                  required
                  value={formData.totalUnits}
                  onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Manufacturing Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.manufactureDate}
                  onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Active Chemical Ingredients & Excipients
              </label>
              <textarea
                rows={2}
                value={formData.composition}
                onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                className={`w-full px-3.5 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-500 ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                }`}
              />
            </div>

            <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Signing Key: <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {walletAccount ? `${walletAccount.substring(0, 10)}... (MetaMask)` : '0x9F44...A7B1 (Pfizer HSM)'}
                </span>
              </div>

              <button
                type="submit"
                disabled={isMinting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-indigo-600/25 transition-all disabled:opacity-50"
              >
                {isMinting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Minting to HealthLedger Smart Contract...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Cryptographically Sign & Mint On-Chain</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Live Preview Card */}
          <div className="space-y-6">
            <div className={`border rounded-3xl p-6 shadow-xl space-y-4 transition-colors ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Live Packaging QR Preview
              </h4>

              <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center shadow-inner border border-slate-200">
                <QRCodeSVG
                  value={`meditrace://verify?batch=${formData.batchNumber}&sn=${generatedSerial}`}
                  size={160}
                  level="H"
                />
                <div className="text-[11px] font-mono text-slate-900 font-bold mt-2">
                  {generatedSerial}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Simulated SHA-256 Hash</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] break-all block">
                    {simulatedHash}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Security Protocol</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px] block">
                    GS1 DataMatrix + ECDSA Curve secp256k1
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                isLight ? 'bg-indigo-50 text-indigo-900 border-indigo-200' : 'bg-indigo-950/40 text-indigo-300 border-indigo-900/60'
              }`}>
                <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>
                  Once minted, pharmacies and patients worldwide can instantly scan this 2D code to verify supply-chain legitimacy.
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
