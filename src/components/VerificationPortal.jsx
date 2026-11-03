import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  QrCode, 
  Search, 
  Calendar, 
  Clock, 
  Building, 
  CheckCircle2, 
  XCircle, 
  Thermometer, 
  FileText, 
  Printer, 
  Share2, 
  Lock, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import ProvenanceTimeline from './ProvenanceTimeline';
import TamperAlertBanner from './TamperAlertBanner';
import PrintCertificateModal from './PrintCertificateModal';

export default function VerificationPortal({ 
  selectedBatch, 
  onSelectBatch, 
  onOpenScanner, 
  onOpenReport,
  batches,
  onNavigateToLedger,
  theme
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const isLight = theme === 'light';

  // Trigger celebration confetti on authentic scan with refined sapphire & cyan palette
  useEffect(() => {
    if (selectedBatch && selectedBatch.status === 'AUTHENTIC') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#06b6d4', '#6366f1', '#38bdf8']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  }, [selectedBatch?.id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const diffTime = new Date(expiryDate) - new Date();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = selectedBatch ? getDaysUntilExpiry(selectedBatch.expiryDate) : 0;
  const isAuthentic = selectedBatch?.status === 'AUTHENTIC';
  const isDuplicate = selectedBatch?.status === 'SUSPICIOUS_DUPLICATE';
  const isRecalled = selectedBatch?.status === 'RECALLED';
  const isColdBreach = selectedBatch?.status === 'COLD_CHAIN_BREACH';

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      
      {/* Top Search & Presets Hero */}
      <div className={`border rounded-2xl p-5 sm:p-7 shadow-xs relative overflow-hidden transition-colors duration-200 ${
        isLight
          ? 'bg-white border-slate-200/80'
          : 'bg-slate-900 border-slate-800/80'
      }`}>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Trust Pharmaceutical Traceability
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Verify Medicine Authenticity & Supply Chain
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Scan packaging QR or enter serial numbers to inspect decentralized ledger verification, chain-of-custody provenance, and thermal safety records.
          </p>

          {/* Quick Scanner Action Bar */}
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onOpenScanner}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:scale-[1.01]"
            >
              <QrCode className="w-4 h-4" />
              <span>Launch Barcode / QR Scanner</span>
            </button>

            <button
              onClick={onOpenScanner}
              className={`px-4 py-3 rounded-xl border font-medium text-xs flex items-center justify-center gap-2 transition-colors ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-xs'
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Enter Serial Number / NDC</span>
            </button>
          </div>

          {/* Quick-Preset scenario pills */}
          <div className={`mt-5 pt-4 border-t ${isLight ? 'border-slate-200/80' : 'border-slate-800/70'}`}>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Instant Demo Presets:
            </div>
            <div className="flex flex-wrap gap-2">
              {batches.map((batch) => {
                const isSelected = selectedBatch?.id === batch.id;
                let btnStyle = isLight 
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                if (batch.status === 'AUTHENTIC') {
                  btnStyle = isSelected 
                    ? 'bg-blue-500/15 border-blue-500/60 text-blue-700 dark:text-blue-300 font-semibold ring-1 ring-blue-500/30' 
                    : isLight
                      ? 'bg-white border-blue-200 text-blue-700 hover:border-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-blue-500/40';
                } else if (batch.status === 'SUSPICIOUS_DUPLICATE') {
                  btnStyle = isSelected 
                    ? 'bg-purple-500/15 border-purple-500/60 text-purple-700 dark:text-purple-300 font-semibold ring-1 ring-purple-500/30' 
                    : isLight
                      ? 'bg-white border-purple-200 text-purple-700 hover:border-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-purple-500/40';
                } else if (batch.status === 'RECALLED') {
                  btnStyle = isSelected 
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-700 dark:text-amber-300 font-semibold ring-1 ring-amber-500/30' 
                    : isLight
                      ? 'bg-white border-amber-200 text-amber-700 hover:border-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40';
                } else if (batch.status === 'COLD_CHAIN_BREACH') {
                  btnStyle = isSelected 
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-700 dark:text-cyan-300 font-semibold ring-1 ring-cyan-500/30' 
                    : isLight
                      ? 'bg-white border-cyan-200 text-cyan-700 hover:border-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40';
                }

                return (
                  <button
                    key={batch.id}
                    onClick={() => onSelectBatch(batch)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${btnStyle}`}
                  >
                    <span>{batch.name.split('(')[0].trim()}</span>
                    <span className="text-[10px] opacity-75 font-mono">({batch.status.replace(/_/g, ' ')})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tamper / Duplicate / Recall Alert Banner */}
      {selectedBatch && (
        <TamperAlertBanner batch={selectedBatch} onOpenReport={onOpenReport} theme={theme} />
      )}

      {/* Main Verification Card */}
      {selectedBatch && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Product Dossier & Verification Badge */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`border rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden transition-colors duration-200 ${
              isLight
                ? isAuthentic 
                  ? 'bg-white border-blue-200'
                  : isDuplicate
                  ? 'bg-white border-purple-200'
                  : 'bg-white border-amber-200'
                : isAuthentic
                ? 'bg-slate-900/90 border-blue-500/30'
                : isDuplicate
                ? 'bg-slate-900/90 border-purple-500/30'
                : 'bg-slate-900/90 border-amber-500/30'
            }`}>
              
              {/* Status Header Badge */}
              <div className={`flex flex-wrap items-center justify-between gap-4 pb-5 border-b ${
                isLight ? 'border-slate-200/80' : 'border-slate-800/80'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isAuthentic
                      ? 'bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400'
                      : isDuplicate
                      ? 'bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400'
                      : 'bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400'
                  }`}>
                    {isAuthentic ? (
                      <ShieldCheck className="w-7 h-7" />
                    ) : isDuplicate ? (
                      <ShieldAlert className="w-7 h-7" />
                    ) : (
                      <AlertTriangle className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isAuthentic
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30'
                          : isDuplicate
                          ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                      }`}>
                        {selectedBatch.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Verified: {selectedBatch.verifiedAt}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {isAuthentic && 'Verified Genuine • Authorized Supply Chain'}
                      {isDuplicate && 'Discrepancy Detected — Duplicate Serial Collision'}
                      {isRecalled && 'Product Under Active Regulatory Recall Notice'}
                      {isColdBreach && 'Thermal Excursion Flagged — Requires Inspection'}
                    </h2>
                  </div>
                </div>

                {/* Authenticity Score Dial */}
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Authenticity Score</div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                    isAuthentic 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : isDuplicate 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {selectedBatch.authenticityScore}%
                  </div>
                  <div className="text-[10px] text-slate-400">Zero-Tamper Index</div>
                </div>
              </div>

              {/* Medicine Core Details */}
              <div className={`py-5 border-b space-y-4 ${isLight ? 'border-slate-200/80' : 'border-slate-800/80'}`}>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {selectedBatch.name}
                  </h3>
                  <p className="text-xs font-medium mt-0.5 text-slate-600 dark:text-slate-300">
                    {selectedBatch.dosage} • <span className="text-blue-600 dark:text-blue-400 font-semibold">{selectedBatch.brand}</span>
                  </p>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200/80' : 'bg-slate-950/50 border-slate-800/80'}`}>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Batch Number</span>
                    <span className="text-xs font-semibold font-mono text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedBatch.batchNumber}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200/80' : 'bg-slate-950/50 border-slate-800/80'}`}>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Unique Serial #</span>
                    <span className="text-xs font-semibold font-mono text-blue-600 dark:text-blue-400 mt-0.5 block truncate" title={selectedBatch.serialNumber}>
                      {selectedBatch.serialNumber}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200/80' : 'bg-slate-950/50 border-slate-800/80'}`}>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">NDC / GTIN</span>
                    <span className="text-xs font-semibold font-mono text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedBatch.ndc}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200/80' : 'bg-slate-950/50 border-slate-800/80'}`}>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Current Location</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5 block truncate" title={selectedBatch.currentLocation}>
                      {selectedBatch.currentLocation}
                    </span>
                  </div>
                </div>

                {/* Active Composition & Packaging */}
                <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                  isLight ? 'bg-slate-50/80 border-slate-200/80' : 'bg-slate-950/40 border-slate-800/70'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-medium w-24 flex-shrink-0">Composition:</span>
                    <span className="text-slate-700 dark:text-slate-300">{selectedBatch.composition}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-medium w-24 flex-shrink-0">Packaging:</span>
                    <span className="text-slate-700 dark:text-slate-300">{selectedBatch.packageType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-medium w-24 flex-shrink-0">Storage Spec:</span>
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      {selectedBatch.storageTemp} (Current: <strong className="text-slate-900 dark:text-white">{selectedBatch.currentTemp}</strong>)
                    </span>
                  </div>
                </div>
              </div>

              {/* Expiry & Lifecycle Bar */}
              <div className={`py-5 border-b space-y-2.5 ${isLight ? 'border-slate-200/80' : 'border-slate-800/80'}`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Manufactured: <strong className="text-slate-900 dark:text-white font-medium">{selectedBatch.manufactureDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Expires: <strong className={`font-medium ${daysLeft < 60 ? 'text-amber-600' : 'text-slate-900 dark:text-white'}`}>{selectedBatch.expiryDate}</strong></span>
                  </div>
                  <div className="font-mono text-xs font-semibold">
                    {daysLeft > 0 ? (
                      <span className={daysLeft < 90 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}>
                        {daysLeft} Days Remaining
                      </span>
                    ) : (
                      <span className="text-purple-600 dark:text-purple-400 font-bold">EXPIRED</span>
                    )}
                  </div>
                </div>

                <div className={`w-full h-2 rounded-full overflow-hidden border ${isLight ? 'bg-slate-200 border-slate-300/80' : 'bg-slate-950 border-slate-800'}`}>
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      daysLeft > 365 
                        ? 'bg-blue-600'
                        : daysLeft > 90 
                        ? 'bg-amber-500'
                        : 'bg-purple-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(10, (daysLeft / 1095) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Security Seal & Tamper Checklist */}
              <div className="pt-5">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Autonomous Verification Parameters
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.sealIntegrity
                      ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-500/20 text-blue-900 dark:text-blue-200'
                      : 'bg-purple-50/70 dark:bg-purple-950/20 border-purple-200 dark:border-purple-500/20 text-purple-900 dark:text-purple-200'
                  }`}>
                    <span className="font-medium">1. Tamper-Evident Seal Monitored</span>
                    {selectedBatch.tamperChecklist.sealIntegrity ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.hologramValid
                      ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-500/20 text-blue-900 dark:text-blue-200'
                      : 'bg-purple-50/70 dark:bg-purple-950/20 border-purple-200 dark:border-purple-500/20 text-purple-900 dark:text-purple-200'
                  }`}>
                    <span className="font-medium">2. Micro-Hologram Feature Valid</span>
                    {selectedBatch.tamperChecklist.hologramValid ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.hashMatched
                      ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-500/20 text-blue-900 dark:text-blue-200'
                      : 'bg-purple-50/70 dark:bg-purple-950/20 border-purple-200 dark:border-purple-500/20 text-purple-900 dark:text-purple-200'
                  }`}>
                    <span className="font-medium">3. Smart Contract Hash Integrity</span>
                    {selectedBatch.tamperChecklist.hashMatched ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.noDuplicateScans
                      ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-500/20 text-blue-900 dark:text-blue-200'
                      : 'bg-purple-50/70 dark:bg-purple-950/20 border-purple-200 dark:border-purple-500/20 text-purple-900 dark:text-purple-200'
                  }`}>
                    <span className="font-medium">4. Zero Duplicate Serial Collisions</span>
                    {selectedBatch.tamperChecklist.noDuplicateScans ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Provenance Timeline */}
            <ProvenanceTimeline 
              journey={selectedBatch.journey} 
              batchStatus={selectedBatch.status} 
              theme={theme}
            />
          </div>

          {/* Right Column: Digital QR Passport, Blockchain Proof & Share Actions */}
          <div className="space-y-6">
            
            {/* Digital Passport Card */}
            <div className={`border rounded-2xl p-5 shadow-xs space-y-4 transition-colors ${
              isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                  <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Digital Medicine Passport
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  ERC-721 Tokenized
                </span>
              </div>

              {/* QR Code Container */}
              <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col items-center justify-center">
                <QRCodeSVG
                  value={`https://meditrace.health/verify?id=${selectedBatch.id}&sn=${selectedBatch.serialNumber}`}
                  size={150}
                  level="H"
                  includeMargin={true}
                />
                <div className="text-[11px] font-mono text-slate-800 mt-2 font-medium">
                  {selectedBatch.serialNumber}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Packaging 2D DataMatrix with ECDSA cryptographic signature preventing counterfeit replication.
              </p>

              {/* Action Buttons */}
              <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-slate-200/80' : 'border-slate-800/80'}`}>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Open Verification Certificate</span>
                </button>

                <button
                  onClick={handleShare}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border transition-colors ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Public Record'}</span>
                </button>
              </div>
            </div>

            {/* Blockchain Node Proof Details */}
            <div className={`border rounded-2xl p-5 shadow-xs space-y-3.5 transition-colors ${
              isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                  <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Immutable Ledger Proof
                </h4>
                <button 
                  onClick={onNavigateToLedger}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Explorer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Blockchain Block</span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono font-semibold">#{selectedBatch.cryptoProof.blockNumber}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Transaction Hash</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-[11px] break-all block">
                    {selectedBatch.cryptoProof.txHash}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Merkle State Root</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px] break-all block">
                    {selectedBatch.cryptoProof.merkleRoot}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Smart Contract Core</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] break-all block">
                    {selectedBatch.cryptoProof.smartContract}
                  </span>
                </div>

                <div className={`pt-2 border-t text-slate-500 text-[11px] flex items-center justify-between ${
                  isLight ? 'border-slate-200/80' : 'border-slate-800/80'
                }`}>
                  <span>Consensus Proof:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{selectedBatch.cryptoProof.consensus}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Official Print Certificate Modal */}
      <PrintCertificateModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        batch={selectedBatch}
      />
    </div>
  );
}
