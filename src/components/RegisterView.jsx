import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function RegisterView({ onBatchCreated, onSwitchToVerify, walletAccount }) {
  const [formData, setFormData] = useState({
    name: 'Paxlovid (Nirmatrelvir / Ritonavir)',
    brand: 'Pfizer BioPharma Global',
    dosage: '150 mg / 100 mg Tablets',
    ndc: '0069-5318-30',
    batchNumber: 'PX-2025-08',
    totalUnits: 25000,
    manufactureDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 3).toISOString().split('T')[0],
    storageTemp: '20°C to 25°C',
    composition: 'Nirmatrelvir 150mg, Ritonavir 100mg, microcrystalline cellulose',
    plantLocation: 'Pfizer Biotech Complex, Kalamazoo, MI'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBatch, setCreatedBatch] = useState(null);

  const generatedSerial = `SN-2025-${formData.batchNumber.replace(/[^a-zA-Z0-9]/g, '')}-MNT`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
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
        currentTemp: '21.0°C',
        composition: formData.composition,
        packageType: 'Blister Pack with Tamper Seal',
        authenticityScore: 100,
        scanCount: 0,
        verifiedAt: 'Just Minted',
        manufacturerAddress: formData.plantLocation,
        currentLocation: formData.plantLocation,
        cryptoProof: {
          blockNumber: 819249,
          txHash: '0x' + Array.from(generatedSerial).reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 0x12345678).toString(16).padEnd(64, 'f'),
          smartContract: '0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55'
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
            id: `step-${Date.now()}`,
            stage: 'Production & Packaging',
            facility: formData.plantLocation,
            location: 'Kalamazoo, MI',
            timestamp: new Date().toLocaleString(),
            status: 'COMPLETED',
            authorizedBy: walletAccount || 'Lead Serialization Pharmacist',
            details: `Minted ${formData.totalUnits.toLocaleString()} serialized doses with cryptographic packaging hashes.`,
            txHash: '0x1a89b...e4f1',
            block: 819249
          }
        ]
      };

      setIsSubmitting(false);
      setCreatedBatch(newBatch);
      onBatchCreated(newBatch);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Register Pharmaceutical Batch
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Mint serialized medicine units to the immutable supply chain ledger.
        </p>
      </div>

      {createdBatch ? (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Batch Successfully Minted to Block #819249</span>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg text-xs space-y-2 border border-zinc-200 dark:border-zinc-800">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{createdBatch.name}</div>
            <div className="text-zinc-500">Serial Key: <span className="font-mono text-zinc-800 dark:text-zinc-200">{createdBatch.serialNumber}</span></div>
            <div className="text-zinc-500 truncate">Transaction: <span className="font-mono text-zinc-800 dark:text-zinc-200">{createdBatch.cryptoProof.txHash}</span></div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onSwitchToVerify(createdBatch)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              Verify in Scanner
            </button>
            <button
              onClick={() => setCreatedBatch(null)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Register Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Product Commercial Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Manufacturer Entity</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Dosage & Strength</label>
              <input
                type="text"
                required
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">National Drug Code (NDC)</label>
              <input
                type="text"
                required
                value={formData.ndc}
                onChange={(e) => setFormData({ ...formData, ndc: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Batch Lot Identifier</label>
              <input
                type="text"
                required
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Lot Quantity (Units)</label>
              <input
                type="number"
                required
                value={formData.totalUnits}
                onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Manufacturing Date</label>
              <input
                type="date"
                required
                value={formData.manufactureDate}
                onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Expiration Date</label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Active Chemical Formulation</label>
            <input
              type="text"
              value={formData.composition}
              onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? 'Minting on-chain...' : 'Register & Mint Batch'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
