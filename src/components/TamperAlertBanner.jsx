import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ThermometerSnowflake, 
  ExternalLink, 
  FileWarning,
  Flame,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function TamperAlertBanner({ batch, onOpenReport, theme }) {
  if (batch.status === 'AUTHENTIC') {
    return null;
  }

  const isLight = theme === 'light';
  const isDuplicate = batch.status === 'SUSPICIOUS_DUPLICATE';
  const isRecall = batch.status === 'RECALLED';
  const isColdBreach = batch.status === 'COLD_CHAIN_BREACH';

  return (
    <div className={`rounded-2xl border p-5 mb-5 shadow-xs relative overflow-hidden transition-colors ${
      isLight
        ? isDuplicate
          ? 'bg-purple-50/70 border-purple-200'
          : isRecall
          ? 'bg-amber-50/70 border-amber-200'
          : 'bg-cyan-50/70 border-cyan-200'
        : isDuplicate 
        ? 'bg-purple-950/30 border-purple-500/40' 
        : isRecall 
        ? 'bg-amber-950/30 border-amber-500/40'
        : 'bg-cyan-950/30 border-cyan-500/40'
    }`}>
      <div className="relative z-10">
        {/* Banner Top Header */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${
          isLight ? 'border-slate-200/80' : 'border-slate-800/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border flex items-center justify-center ${
              isDuplicate 
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400' 
                : isRecall
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
            }`}>
              {isDuplicate ? (
                <ShieldAlert className="w-6 h-6" />
              ) : isRecall ? (
                <FileWarning className="w-6 h-6" />
              ) : (
                <ThermometerSnowflake className="w-6 h-6" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isDuplicate 
                    ? 'bg-purple-600 text-white' 
                    : isRecall 
                    ? 'bg-amber-500 text-slate-950 font-bold' 
                    : 'bg-cyan-600 text-white'
                }`}>
                  {isDuplicate ? 'Serial Collision Flag' : isRecall ? 'Regulatory Notice' : 'Cold-Chain Notice'}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  REF: {batch.serialNumber}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {isDuplicate && 'Duplicate Serial Barcode Detected Across Disjoint Locations'}
                {isRecall && `Batch Under Regulatory Recall Notice: ${batch.recallNotice?.recallId || 'Official Directive'}`}
                {isColdBreach && 'Temperature Threshold Excursion Recorded in Transit'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isLight 
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800' 
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
              }`}
            >
              Report Discrepancy
            </button>
          </div>
        </div>

        {/* Dynamic Detail Body */}
        <div className="mt-4 text-xs">
          {isDuplicate && (
            <div className="space-y-3">
              <p className="text-slate-700 dark:text-slate-300">
                This item's unique serial number has been registered at more than one facility simultaneously, which often indicates unauthorized cloning or repackaging.
              </p>
              {batch.duplicateWarning && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-white/90 border-purple-200' : 'bg-slate-900/80 border-purple-500/20'}`}>
                    <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> First Confirmed Verification
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-[11px] space-y-0.5">
                      <div>Location: {batch.duplicateWarning.originalLocation}</div>
                      <div>Timestamp: {batch.duplicateWarning.originalTimestamp}</div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-white/90 border-purple-200' : 'bg-slate-900/80 border-purple-500/20'}`}>
                    <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Conflicting Duplicate Attempt
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-[11px] space-y-0.5">
                      <div>Location: {batch.duplicateWarning.conflictingLocation}</div>
                      <div>Timestamp: {batch.duplicateWarning.conflictingTimestamp}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isRecall && (
            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300">
                {batch.recallNotice?.reason || 'Batch flagged by health authority due to packaging variation.'}
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Initiated By: {batch.recallNotice?.authority || 'FDA Regulatory Oracle'} • Level: {batch.recallNotice?.level || 'Class II'}
              </div>
            </div>
          )}

          {isColdBreach && (
            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300">
                Smart data-logger detected temperature levels beyond specified limits during transit. Do not administer until secondary cold-chain audit is signed off.
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Current Sensor Reading: {batch.currentTemp} • Permitted Spec: {batch.storageTemp}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
