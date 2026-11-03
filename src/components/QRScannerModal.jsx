import React, { useState, useEffect } from 'react';
import { 
  X, 
  Camera, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Upload, 
  Keyboard, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRScannerModal({ isOpen, onClose, onSelectBatch, batches }) {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'simulate' | 'manual'
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (batch) => {
    setIsScanning(true);
    setScanStatus(`Acquiring DataMatrix for ${batch.name}...`);
    setTimeout(() => {
      setIsScanning(false);
      onSelectBatch(batch);
      onClose();
    }, 700);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    
    // Find matching batch
    const search = manualInput.trim().toLowerCase();
    const found = batches.find(
      b => b.id.toLowerCase().includes(search) || 
           b.serialNumber.toLowerCase().includes(search) ||
           b.batchNumber.toLowerCase().includes(search) ||
           b.name.toLowerCase().includes(search)
    );

    if (found) {
      onSelectBatch(found);
      onClose();
    } else {
      setScanStatus('No registered cryptographic ledger record matches this identifier.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Scan Medicine 2D Barcode / QR
              </h3>
              <p className="text-xs text-slate-400">
                Point reader at medicine packaging to verify cryptographic blockchain provenance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('demo')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'demo'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            One-Click Test Presets
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'simulate'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Camera Viewfinder
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'manual'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            Enter Serial / NDC
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* TAB 1: ONE CLICK TEST PRESETS */}
          {activeTab === 'demo' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                Select any pre-configured medicine scenario to immediately observe verification results:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {batches.map((batch) => {
                  let badgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
                  let Icon = CheckCircle2;
                  let borderHover = 'hover:border-emerald-500/60';

                  if (batch.status === 'SUSPICIOUS_DUPLICATE') {
                    badgeColor = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
                    Icon = ShieldAlert;
                    borderHover = 'hover:border-rose-500/60';
                  } else if (batch.status === 'RECALLED') {
                    badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
                    Icon = AlertTriangle;
                    borderHover = 'hover:border-amber-500/60';
                  } else if (batch.status === 'COLD_CHAIN_BREACH') {
                    badgeColor = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
                    Icon = AlertTriangle;
                    borderHover = 'hover:border-cyan-500/60';
                  }

                  return (
                    <div
                      key={batch.id}
                      onClick={() => handleSelectPreset(batch)}
                      className={`p-4 rounded-xl border border-slate-800 bg-slate-950/60 cursor-pointer transition-all duration-200 ${borderHover} hover:scale-[1.01] hover:bg-slate-800/40 group flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badgeColor}`}>
                            <Icon className="w-3 h-3" />
                            {batch.status.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {batch.id}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {batch.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {batch.dosage}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Mfg: {batch.brand}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:underline font-medium">
                        <span>Click to Scan & Verify</span>
                        <QrCode className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CAMERA VIEWFINDER SIMULATOR */}
          {activeTab === 'simulate' && (
            <div className="space-y-4">
              <div className="relative aspect-video max-h-64 mx-auto w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {/* Simulated Camera Feed Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                {/* Laser Scanning Line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-bounce top-1/3"></div>

                {/* Targeting Reticle */}
                <div className="relative w-44 h-44 border-2 border-emerald-500/50 rounded-2xl flex items-center justify-center p-2 bg-emerald-950/10 backdrop-blur-[1px]">
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                  <div className="p-3 bg-white rounded-lg shadow-lg">
                    <QRCodeSVG 
                      value={`meditrace://verify?batch=${batches[0].id}&sn=${batches[0].serialNumber}`} 
                      size={120}
                    />
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-emerald-400/90 font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    OPTICAL ENGINE: ALIGNED
                  </span>
                  <span>FPS: 60 • 4K SENSOR</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectPreset(batches[0])}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Camera className="w-4 h-4" />
                  Capture Sample Target (Lipitor)
                </button>
                <button
                  onClick={() => handleSelectPreset(batches[1])}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Capture Suspect Barcode (Amoxicillin)
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MANUAL INPUT */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Enter Serial Number, Batch Code, or GTIN
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="e.g. SN-2024-9921-X7Q or MT-8842-WARN"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
                  >
                    Lookup
                  </button>
                </div>
              </div>

              {scanStatus && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{scanStatus}</span>
                </div>
              )}

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Quick Test Keys:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setManualInput('SN-2024-9921-X7Q')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono text-[11px]"
                  >
                    SN-2024-9921-X7Q (Authentic)
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualInput('SN-2024-8842-F9K')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded font-mono text-[11px]"
                  >
                    SN-2024-8842-F9K (Counterfeit)
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualInput('MT-7719-RECL')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded font-mono text-[11px]"
                  >
                    MT-7719-RECL (Recalled)
                  </button>
                </div>
              </div>
            </form>
          )}

          {isScanning && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{scanStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
