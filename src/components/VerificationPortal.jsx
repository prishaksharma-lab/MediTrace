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

  // Trigger celebration confetti on authentic scan
  useEffect(() => {
    if (selectedBatch && selectedBatch.status === 'AUTHENTIC') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#3b82f6', '#34d399']
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
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Search & Presets Hero */}
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors duration-200 ${
        isLight
          ? 'bg-gradient-to-b from-white via-slate-50 to-emerald-50/20 border-slate-200'
          : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Trust Pharmaceutical Traceability
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Verify Medicine Authenticity & Supply Chain
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Scan packaging QR or enter the unique serial number to inspect real-time blockchain registration, custody provenance, temperature integrity, and counterfeit alerts.
          </p>

          {/* Quick Scanner Action Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenScanner}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02]"
            >
              <QrCode className="w-5 h-5" />
              <span>Launch Barcode / QR Scanner</span>
            </button>

            <button
              onClick={onOpenScanner}
              className={`px-5 py-3.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Enter Serial Number / NDC</span>
            </button>
          </div>

          {/* Quick-Preset scenario pills */}
          <div className={`mt-6 pt-5 border-t ${isLight ? 'border-slate-200' : 'border-slate-800/70'}`}>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Instant Demo Presets:
            </div>
            <div className="flex flex-wrap gap-2">
              {batches.map((batch) => {
                const isSelected = selectedBatch?.id === batch.id;
                let btnStyle = isLight 
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                if (batch.status === 'AUTHENTIC') {
                  btnStyle = isSelected 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold' 
                    : isLight
                      ? 'bg-white border-emerald-200 text-emerald-800 hover:border-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-emerald-500/50';
                } else if (batch.status === 'SUSPICIOUS_DUPLICATE') {
                  btnStyle = isSelected 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold' 
                    : isLight
                      ? 'bg-white border-rose-200 text-rose-800 hover:border-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-rose-500/50';
                } else if (batch.status === 'RECALLED') {
                  btnStyle = isSelected 
                    ? 'bg-amber-500/20 border-amber-500 text-amber-800 dark:text-amber-300 font-bold' 
                    : isLight
                      ? 'bg-white border-amber-200 text-amber-800 hover:border-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/50';
                } else if (batch.status === 'COLD_CHAIN_BREACH') {
                  btnStyle = isSelected 
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-800 dark:text-cyan-300 font-bold' 
                    : isLight
                      ? 'bg-white border-cyan-200 text-cyan-800 hover:border-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/50';
                }

                return (
                  <button
                    key={batch.id}
                    onClick={() => onSelectBatch(batch)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${btnStyle}`}
                  >
                    <span>
                      {batch.status === 'AUTHENTIC' ? '✅' : batch.status === 'SUSPICIOUS_DUPLICATE' ? '🚨' : batch.status === 'RECALLED' ? '⚠️' : '❄️'}
                    </span>
                    <span>{batch.name.split('(')[0]}</span>
                    <span className="text-[10px] opacity-70 font-mono">({batch.status.replace(/_/g, ' ')})</span>
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
            <div className={`border rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors duration-200 ${
              isLight
                ? isAuthentic 
                  ? 'bg-white border-emerald-300 shadow-emerald-500/5'
                  : isDuplicate
                  ? 'bg-white border-rose-300 shadow-rose-500/5'
                  : 'bg-white border-amber-300 shadow-amber-500/5'
                : isAuthentic
                ? 'bg-slate-900 border-emerald-500/40 shadow-emerald-950/20'
                : isDuplicate
                ? 'bg-slate-900 border-rose-500/50 shadow-rose-950/30'
                : 'bg-slate-900 border-amber-500/40 shadow-amber-950/20'
            }`}>
              
              {/* Status Header Badge */}
              <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b ${
                isLight ? 'border-slate-200' : 'border-slate-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border shadow-lg ${
                    isAuthentic
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : isDuplicate
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 animate-pulse'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  }`}>
                    {isAuthentic ? (
                      <ShieldCheck className="w-8 h-8" />
                    ) : isDuplicate ? (
                      <ShieldAlert className="w-8 h-8" />
                    ) : (
                      <AlertTriangle className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isAuthentic
                          ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40'
                          : isDuplicate
                          ? 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40'
                      }`}>
                        {selectedBatch.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Scan Verified: {selectedBatch.verifiedAt}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {isAuthentic && 'Genuine Medicine • Authorized Supply Chain'}
                      {isDuplicate && 'Counterfeit / Duplicate Serial Warning'}
                      {isRecalled && 'Product Under Active Regulatory Recall'}
                      {isColdBreach && 'Thermal Excursion Flagged'}
                    </h2>
                  </div>
                </div>

                {/* Authenticity Score Dial */}
                <div className="text-right">
                  <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Authenticity Score</div>
                  <div className={`text-3xl font-black font-mono ${
                    isAuthentic 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : isDuplicate 
                      ? 'text-rose-600 dark:text-rose-400' 
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {selectedBatch.authenticityScore}%
                  </div>
                  <div className="text-[10px] text-slate-400">Zero-Tamper Index</div>
                </div>
              </div>

              {/* Medicine Core Details */}
              <div className={`py-6 border-b space-y-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {selectedBatch.name}
                  </h3>
                  <p className="text-sm font-medium mt-0.5 text-slate-600 dark:text-slate-300">
                    {selectedBatch.dosage} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedBatch.brand}</span>
                  </p>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Batch Number</span>
                    <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedBatch.batchNumber}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Unique Serial #</span>
                    <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block truncate" title={selectedBatch.serialNumber}>
                      {selectedBatch.serialNumber}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">NDC / GTIN</span>
                    <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedBatch.ndc}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Scanned Location</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate" title={selectedBatch.currentLocation}>
                      {selectedBatch.currentLocation}
                    </span>
                  </div>
                </div>

                {/* Active Composition & Packaging */}
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800/80'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-semibold w-24 flex-shrink-0">Composition:</span>
                    <span className="text-slate-700 dark:text-slate-300">{selectedBatch.composition}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-semibold w-24 flex-shrink-0">Packaging:</span>
                    <span className="text-slate-700 dark:text-slate-300">{selectedBatch.packageType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-semibold w-24 flex-shrink-0">Storage Spec:</span>
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      {selectedBatch.storageTemp} (Current: <strong className="text-slate-900 dark:text-white">{selectedBatch.currentTemp}</strong>)
                    </span>
                  </div>
                </div>
              </div>

              {/* Expiry & Lifecycle Bar */}
              <div className={`py-6 border-b space-y-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Manufactured: <strong className="text-slate-900 dark:text-white">{selectedBatch.manufactureDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Expires: <strong className={daysLeft < 60 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}>{selectedBatch.expiryDate}</strong></span>
                  </div>
                  <div className="font-mono text-xs font-semibold">
                    {daysLeft > 0 ? (
                      <span className={daysLeft < 90 ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}>
                        {daysLeft} Days Remaining
                      </span>
                    ) : (
                      <span className="text-rose-500 font-bold">EXPIRED</span>
                    )}
                  </div>
                </div>

                <div className={`w-full h-2.5 rounded-full overflow-hidden border ${isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-950 border-slate-800'}`}>
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      daysLeft > 365 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                        : daysLeft > 90 
                        ? 'bg-gradient-to-r from-amber-500 to-emerald-400' 
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(10, (daysLeft / 1095) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* Security Seal & Tamper Checklist */}
              <div className="pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Autonomous Cryptographic Verification Checklist
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.sealIntegrity
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
                  }`}>
                    <span>1. Tamper-Evident Seal Monitored</span>
                    {selectedBatch.tamperChecklist.sealIntegrity ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.hologramValid
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
                  }`}>
                    <span>2. Micro-Hologram Feature Valid</span>
                    {selectedBatch.tamperChecklist.hologramValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.hashMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
                  }`}>
                    <span>3. Smart Contract Hash Integrity</span>
                    {selectedBatch.tamperChecklist.hashMatched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    selectedBatch.tamperChecklist.noDuplicateScans
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
                  }`}>
                    <span>4. Zero Duplicate Serial Collisions</span>
                    {selectedBatch.tamperChecklist.noDuplicateScans ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
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
            <div className={`border rounded-2xl p-6 shadow-xl space-y-5 transition-colors ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Digital Medicine Passport
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  ERC-721 Tokenized
                </span>
              </div>

              {/* QR Code Container */}
              <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-200 flex flex-col items-center justify-center">
                <QRCodeSVG
                  value={`https://meditrace.health/verify?id=${selectedBatch.id}&sn=${selectedBatch.serialNumber}`}
                  size={160}
                  level="H"
                  includeMargin={true}
                />
                <div className="text-[11px] font-mono text-slate-800 mt-2 font-semibold">
                  {selectedBatch.serialNumber}
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Packaging 2D DataMatrix with ECDSA private-key signature to prevent counterfeit replication.
              </p>

              {/* Action Buttons */}
              <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                {/* BETTER PRINT CERTIFICATE BUTTON */}
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Open Official Verification Certificate</span>
                </button>

                <button
                  onClick={handleShare}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-colors ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Public Verification Record'}</span>
                </button>
              </div>
            </div>

            {/* Blockchain Node Proof Details */}
            <div className={`border rounded-2xl p-6 shadow-xl space-y-4 transition-colors ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Immutable Ledger Proof
                </h4>
                <button 
                  onClick={onNavigateToLedger}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Explorer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Blockchain Block</span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">#{selectedBatch.cryptoProof.blockNumber}</span>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Transaction Hash</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] break-all block">
                    {selectedBatch.cryptoProof.txHash}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Merkle State Root</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px] break-all block">
                    {selectedBatch.cryptoProof.merkleRoot}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Smart Contract Core</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[11px] break-all block">
                    {selectedBatch.cryptoProof.smartContract}
                  </span>
                </div>

                <div className={`pt-2 border-t text-slate-500 text-[11px] flex items-center justify-between ${
                  isLight ? 'border-slate-200' : 'border-slate-800'
                }`}>
                  <span>Consensus Proof:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedBatch.cryptoProof.consensus}</span>
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
