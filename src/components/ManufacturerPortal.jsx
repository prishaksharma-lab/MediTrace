import React, { useState } from 'react';
import { Factory, PlusCircle, QrCode, CheckCircle2, Wallet } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { mintBatchOnChain } from '../utils/web3Service';
import { MEDITRACE_CONTRACT_ADDRESS } from '../utils/contractAbi';

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
  const [mintError, setMintError] = useState('');

  const simulatedHash = '0x' + Array.from(
    `${formData.batchNumber}-${formData.name}-${formData.manufactureDate}`
  ).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0x811c9dc5).toString(16).padEnd(64, 'a');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    setIsMinting(true);
    setMintError('');

    try {
      const generatedSerial = `SN-2025-${formData.batchNumber}-${Math.floor(1000 + Math.random() * 9000)}`;

      let web3Result = null;
      if (mintOnChain) {
        web3Result = await mintBatchOnChain({
          serialNumber: generatedSerial,
          batchNumber: formData.batchNumber,
          name: formData.name,
          brand: formData.brand,
          ndc: formData.ndc,
          manufactureDate: formData.manufactureDate,
          expiryDate: formData.expiryDate
        });
      }

      const newBatch = {
        id: `MT-${Math.floor(1000 + Math.random() * 9000)}-AUTH`,
        name: formData.name,
        brand: formData.brand,
        dosage: formData.dosage,
        ndc: formData.ndc,
        gtin: '003' + Math.floor(10000000000 + Math.random() * 90000000000),
        batchNumber: formData.batchNumber,
        serialNumber: generatedSerial,
        status: 'AUTHENTIC',
        manufactureDate: formData.manufactureDate,
        expiryDate: formData.expiryDate,
        storageTemp: formData.storageTemp,
        currentTemp: '21.5°C',
        composition: formData.composition,
        packageType: formData.packageType,
        authenticityScore: 99.9,
        scanCount: 0,
        verifiedAt: 'Minted Just Now',
        manufacturerAddress: formData.plantLocation,
        currentLocation: formData.plantLocation,
        cryptoProof: {
          blockNumber: web3Result?.blockNumber || 'Not on-chain',
          txHash: web3Result?.txHash || simulatedHash,
          merkleRoot: 'N/A (future scope)',
          digitalSignature: `Signed by wallet ${(walletAccount || 'not connected').substring(0, 10)}`,
          smartContract: MEDITRACE_CONTRACT_ADDRESS
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
            id: `ev-${Date.now()}-1`,
            stage: 'Manufacturing & Serialization',
            title: 'Batch Genesis',
            facility: formData.plantLocation,
            location: 'USA',
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            status: 'COMPLETED',
            authorizedBy: formData.leadPharmacist,
            details: `Lot of ${Number(formData.totalUnits).toLocaleString()} units registered.`,
            txHash: web3Result?.txHash || simulatedHash,
            block: web3Result?.blockNumber || 0
          }
        ]
      };

      setCreatedBatch(newBatch);
      setTxReceipt({
        txHash: web3Result?.txHash || simulatedHash,
        block: web3Result?.blockNumber || 0
      });
      onBatchCreated(newBatch);
    } catch (err) {
      console.error('Error minting batch:', err);
      setMintError(err.shortMessage || err.message || 'Transaction failed');
    } finally {
      setIsMinting(false);
    }
  };

  const inputCls = (extra = '') =>
    `w-full px-3 py-2 text-xs ${extra} rounded-xl border transition-colors outline-none focus:ring-1 focus:ring-blue-500 ${
      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
    }`;
  const labelCls = 'block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1';
  const cardCls = isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      <div className={`border rounded-2xl p-6 sm:p-7 shadow-xs ${cardCls}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Factory className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-semibold">
                Pharmaceutical Origin Gateway
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Manufacturer Batch Minting & Serialization
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Register verified medicine production batches directly onto the blockchain.
              </p>
            </div>
          </div>
          {!walletAccount && (
            <button
              onClick={onConnectWallet}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 border rounded-2xl p-6 shadow-xs ${cardCls}`}>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
            Batch Serialization Parameters
          </h3>

          <form onSubmit={handleCreateBatch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Medicine Brand Name & Molecule</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls()} />
              </div>
              <div>
                <label className={labelCls}>Manufacturer License Holder</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className={inputCls()} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Dosage Formulation</label>
                <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} required className={inputCls()} />
              </div>
              <div>
                <label className={labelCls}>Batch / Lot ID</label>
                <input type="text" name="batchNumber" value={formData.batchNumber} onChange={handleChange} required className={inputCls('font-mono')} />
              </div>
              <div>
                <label className={labelCls}>NDC / FDA Identifier</label>
                <input type="text" name="ndc" value={formData.ndc} onChange={handleChange} required className={inputCls('font-mono')} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Manufacture Date</label>
                <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} required className={inputCls()} />
              </div>
              <div>
                <label className={labelCls}>Expiration Date</label>
                <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required className={inputCls()} />
              </div>
              <div>
                <label className={labelCls}>Units To Mint</label>
                <input type="number" name="totalUnits" value={formData.totalUnits} onChange={handleChange} required className={inputCls()} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Active Chemical Ingredients & Excipients</label>
              <input type="text" name="composition" value={formData.composition} onChange={handleChange} required className={inputCls()} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Manufacturing Facility & Plant ID</label>
                <input type="text" name="plantLocation" value={formData.plantLocation} onChange={handleChange} required className={inputCls()} />
              </div>
              <div>
                <label className={labelCls}>Lead Pharmacist Signer</label>
                <input type="text" name="leadPharmacist" value={formData.leadPharmacist} onChange={handleChange} required className={inputCls()} />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="mintOnChain"
                checked={mintOnChain}
                onChange={(e) => setMintOnChain(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <label htmlFor="mintOnChain" className="text-xs text-slate-700 dark:text-slate-300">
                Commit batch to MediTrace Smart Contract (Sepolia)
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isMinting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                {isMinting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Waiting for transaction...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Mint & Register Batch</span>
                  </>
                )}
              </button>
              {mintError && <p className="text-xs text-red-600 pt-2">Mint failed: {mintError}</p>}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <div className={`border rounded-2xl p-5 shadow-xs space-y-4 ${cardCls}`}>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Packaging Serialization Preview
            </h4>

            <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center">
              <QRCodeSVG
                value={`https://meditrace.health/verify?id=${createdBatch?.id || 'MT-DEMO'}&sn=${createdBatch?.serialNumber || 'SN-PREVIEW'}`}
                size={130}
                level="M"
              />
              <span className="text-[10px] font-mono text-slate-700 mt-2">
                {createdBatch ? createdBatch.serialNumber : `SN-2025-${formData.batchNumber}-SAMPLE`}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
              QR code linked to the batch serial number registered on the blockchain.
            </p>

            {createdBatch && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>
                    {mintOnChain ? 'Batch recorded on Sepolia!' : 'Batch created (off-chain).'}
                    {mintOnChain && txReceipt?.txHash && (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${txReceipt.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block underline text-[10px] mt-1"
                      >
                        View on Etherscan
                      </a>
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onSwitchToVerify(createdBatch)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium text-xs"
                >
                  Verify Minted Item in Portal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}