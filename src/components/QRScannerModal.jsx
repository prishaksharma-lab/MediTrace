import React, { useState } from 'react';
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
    }, 500);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    
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
      setScanStatus('No matching serial found in active ledger oracle.');
      setTimeout(() => setScanStatus(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Scan Medicine Packaging Barcode
              </h3>
              <p className="text-[11px] text-slate-400">
                Compatible with GS1 DataMatrix, 2D QR & NDC barcodes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2.5 font-medium transition-colors ${
              activeTab === 'demo' ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-800/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sample Test Scans
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2.5 font-medium transition-colors ${
              activeTab === 'manual' ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-800/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Manual Serial Entry
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                Select a pharmaceutical verification scenario to test the ledger scanner:
              </p>

              <div className="space-y-2">
                {batches.map((batch) => {
                  const isAuth = batch.status === 'AUTHENTIC';
                  const isDup = batch.status === 'SUSPICIOUS_DUPLICATE';
                  const isRec = batch.status === 'RECALLED';

                  return (
                    <button
                      key={batch.id}
                      onClick={() => handleSelectPreset(batch)}
                      className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                            {batch.name}
                          </span>
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                            isAuth 
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
                              : isDup 
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          }`}>
                            {batch.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          SN: {batch.serialNumber} • Lot: {batch.batchNumber}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                        Scan →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Serial Number, Batch ID or NDC
                </label>
                <input
                  type="text"
                  placeholder="e.g. SN-2024-9921-X7Q or B9921-X"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {scanStatus && (
                <div className="text-xs text-amber-400 font-medium">
                  {scanStatus}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                Inspect Serial in Ledger
              </button>
            </form>
          )}

          {isScanning && (
            <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
              <span>{scanStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
