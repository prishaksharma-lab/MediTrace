import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Share2, 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Building2,
  Calendar,
  Thermometer,
  ShieldAlert,
  Lock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function VerificationView({ 
  selectedBatch, 
  onSelectBatch, 
  batches, 
  onOpenReportModal 
}) {
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const term = searchInput.trim().toLowerCase();
    const found = batches.find(
      b => b.id.toLowerCase().includes(term) ||
           b.serialNumber.toLowerCase().includes(term) ||
           b.batchNumber.toLowerCase().includes(term) ||
           b.name.toLowerCase().includes(term)
    );
    if (found) {
      onSelectBatch(found);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAuthentic = selectedBatch.status === 'AUTHENTIC';
  const isDuplicate = selectedBatch.status === 'SUSPICIOUS_DUPLICATE';
  const isRecalled = selectedBatch.status === 'RECALLED';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Search & Hero Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Medicine Authentication
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Verify pharmaceutical supply chain pedigree, serialization integrity, and recall status.
          </p>
        </div>

        {/* Clean Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter unique Serial Number, Batch Code, or Drug Name..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 transition-colors"
          >
            Verify
          </button>
        </form>

        {/* Preset Sample Pills */}
        <div className="flex items-center gap-2 pt-1 text-xs text-zinc-500">
          <span className="text-[11px] font-medium text-zinc-400">Samples:</span>
          <div className="flex flex-wrap gap-1.5">
            {batches.map((b) => {
              const isSelected = selectedBatch.id === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBatch(b)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors border ${
                    isSelected
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-transparent font-medium'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {b.name.split('(')[0].trim()}
                  <span className="opacity-60 ml-1 font-mono text-[10px]">
                    ({b.status === 'AUTHENTIC' ? 'Genuine' : b.status === 'SUSPICIOUS_DUPLICATE' ? 'Duplicate' : 'Recalled'})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flagged Alert Banner (Duplicate or Recall) */}
      {!isAuthentic && (
        <div className={`p-4 rounded-xl border text-xs space-y-2 ${
          isDuplicate
            ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200'
            : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-950 dark:text-amber-200'
        }`}>
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              {isDuplicate ? 'CRITICAL: Concurrent Duplicate Serial Collision Detected' : 'SAFETY RECALL NOTICE IN EFFECT'}
            </span>
            <span className="font-mono text-[11px] opacity-75">
              Serial: {selectedBatch.serialNumber}
            </span>
          </div>

          {isDuplicate && selectedBatch.anomalyDetails && (
            <div className="space-y-1.5 pt-1 text-[11px] leading-relaxed">
              <p>{selectedBatch.anomalyDetails.description}</p>
              <div className="flex gap-4 pt-1 font-mono">
                {selectedBatch.anomalyDetails.collisionLocations.map((loc, idx) => (
                  <span key={idx} className="bg-white/60 dark:bg-black/30 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/40">
                    {loc.city}: {loc.store} ({loc.time})
                  </span>
                ))}
              </div>
              <p className="font-semibold text-rose-800 dark:text-rose-300 pt-1">
                Directive: {selectedBatch.anomalyDetails.recommendation}
              </p>
            </div>
          )}

          {isRecalled && selectedBatch.recallNotice && (
            <div className="space-y-1 pt-1 text-[11px] leading-relaxed">
              <p><strong>Reason:</strong> {selectedBatch.recallNotice.reason}</p>
              <p><strong>Action:</strong> {selectedBatch.recallNotice.actionRequired}</p>
            </div>
          )}
        </div>
      )}

      {/* Main Verification Dossier */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm divide-y divide-zinc-100 dark:divide-zinc-800 transition-colors">
        
        {/* Status Header */}
        <div className="p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                isAuthentic
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : isDuplicate
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isAuthentic ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                {isAuthentic ? 'Verified Authentic' : selectedBatch.status.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {selectedBatch.verifiedAt}
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
              {selectedBatch.name}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {selectedBatch.dosage} • <span className="font-medium text-zinc-700 dark:text-zinc-300">{selectedBatch.brand}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReportModal}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Report (PDF)</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              title="Share record"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Specification Monograph */}
        <div className="p-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
            Product Specifications
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-zinc-400 block text-[11px]">Batch Lot</span>
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 block">{selectedBatch.batchNumber}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[11px]">Unique Serial Key</span>
              <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block truncate" title={selectedBatch.serialNumber}>
                {selectedBatch.serialNumber}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[11px]">National Drug Code</span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200 mt-0.5 block">{selectedBatch.ndc}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[11px]">Current Location</span>
              <span className="text-zinc-800 dark:text-zinc-200 mt-0.5 block truncate" title={selectedBatch.currentLocation}>
                {selectedBatch.currentLocation}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <div>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">Active Formulation: </span>
              <span>{selectedBatch.composition}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">Expiry Date: </span>
              <span className="font-mono">{selectedBatch.expiryDate}</span>
              <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-200">Storage: </span>
              <span>{selectedBatch.storageTemp}</span>
            </div>
          </div>
        </div>

        {/* Custody Journey Timeline */}
        <div className="p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Supply Chain Custody Trail
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
            {selectedBatch.journey.map((step, idx) => (
              <div key={idx} className="relative group">
                <span className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white dark:bg-zinc-900 flex items-center justify-center ${
                  step.status === 'FAILED' 
                    ? 'border-rose-500' 
                    : step.status === 'RECALLED'
                    ? 'border-amber-500'
                    : 'border-emerald-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    step.status === 'FAILED' ? 'bg-rose-500' : 'bg-emerald-600'
                  }`}></span>
                </span>

                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{step.stage}</span>
                    <span className="font-mono text-zinc-400 text-[11px]">{step.timestamp}</span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {step.facility} — {step.location}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-300 text-[11px] mt-1">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cryptographic Ledger Details */}
        <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-semibold">
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
              <span>HealthLedger Proof • Block #{selectedBatch.cryptoProof?.blockNumber}</span>
            </div>
            <div className="truncate max-w-md">Tx: {selectedBatch.cryptoProof?.txHash}</div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <QRCodeSVG
              value={`https://meditrace.health/verify?sn=${selectedBatch.serialNumber}`}
              size={64}
              level="M"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
