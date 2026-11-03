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
    <div className={`rounded-2xl border p-5 mb-6 shadow-2xl relative overflow-hidden transition-colors ${
      isLight
        ? isDuplicate
          ? 'bg-rose-50 border-rose-300 shadow-rose-500/10'
          : isRecall
          ? 'bg-amber-50 border-amber-300 shadow-amber-500/10'
          : 'bg-cyan-50 border-cyan-300 shadow-cyan-500/10'
        : isDuplicate 
        ? 'bg-rose-950/40 border-rose-500/60 shadow-rose-950/50' 
        : isRecall 
        ? 'bg-amber-950/40 border-amber-500/60 shadow-amber-950/50'
        : 'bg-cyan-950/40 border-cyan-500/60 shadow-cyan-950/50'
    }`}>
      {/* Background glow effect */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 -mr-20 -mt-20 ${
        isDuplicate ? 'bg-rose-500' : isRecall ? 'bg-amber-500' : 'bg-cyan-500'
      }`}></div>

      <div className="relative z-10">
        {/* Banner Top Header */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border flex items-center justify-center animate-pulse ${
              isDuplicate 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-400' 
                : isRecall
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400'
                : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-600 dark:text-cyan-400'
            }`}>
              {isDuplicate ? (
                <ShieldAlert className="w-7 h-7" />
              ) : isRecall ? (
                <FileWarning className="w-7 h-7" />
              ) : (
                <ThermometerSnowflake className="w-7 h-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isDuplicate 
                    ? 'bg-rose-600 text-white' 
                    : isRecall 
                    ? 'bg-amber-500 text-slate-950 font-black' 
                    : 'bg-cyan-600 text-white'
                }`}>
                  {isDuplicate ? 'Critical Security Flag' : isRecall ? 'Urgent Safety Recall' : 'Cold-Chain Failure'}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  REF: {batch.serialNumber}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {isDuplicate && 'DUPLICATE SERIAL DETECTED — SUSPECTED COUNTERFEIT'}
                {isRecall && `BATCH RECALLED BY REGULATORY AUTHORITY: ${batch.recallNotice?.recallId || 'URGENT NOTICE'}`}
                {isColdBreach && 'TEMPERATURE VIOLATION — EFFICACY DEGRADED'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              File Quarantine Report
            </button>
          </div>
        </div>

        {/* Anomaly Breakdown Body */}
        {isDuplicate && batch.anomalyDetails && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {batch.anomalyDetails.description}
            </p>

            {/* Conflicting Geolocation scans */}
            <div className={`rounded-xl p-4 border ${
              isLight ? 'bg-white border-rose-200' : 'bg-slate-950/70 border-rose-500/30'
            }`}>
              <h4 className="text-xs font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <MapPin className="w-4 h-4 text-rose-500" />
                Concurrent Physical Scans In Conflict:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {batch.anomalyDetails.collisionLocations.map((loc, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border text-xs space-y-1 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                  }`}>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{loc.city}</span>
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono font-bold">Scan #{idx + 1}</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">{loc.store}</div>
                    <div className="text-slate-500 font-mono text-[11px] flex items-center gap-1 pt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {loc.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`text-xs p-3 rounded-xl flex items-start gap-2 border ${
              isLight 
                ? 'bg-rose-100/70 border-rose-200 text-rose-900' 
                : 'bg-rose-950/30 border-rose-900/50 text-rose-300'
            }`}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <span><strong>Action Directive:</strong> {batch.anomalyDetails.recommendation}</span>
            </div>
          </div>
        )}

        {/* Recall Notice Body */}
        {isRecall && batch.recallNotice && (
          <div className="mt-4 space-y-3">
            <div className={`rounded-xl p-4 border space-y-2 text-xs ${
              isLight ? 'bg-white border-amber-200' : 'bg-slate-950/70 border-amber-500/30'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-amber-800 dark:text-amber-300 font-semibold">
                <span className="font-bold text-sm">{batch.recallNotice.classification}</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">Issued by: {batch.recallNotice.issuingBody} ({batch.recallNotice.dateAnnounced})</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Reason for Recall:</strong> {batch.recallNotice.reason}
              </p>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-900 dark:text-amber-200 text-xs">
                <strong>Mandatory Pharmacy / Patient Protocol:</strong> {batch.recallNotice.actionRequired}
              </div>
            </div>
          </div>
        )}

        {/* Cold Chain Breach Body */}
        {isColdBreach && batch.temperatureBreach && (
          <div className="mt-4 space-y-3">
            <div className={`rounded-xl p-4 border text-xs space-y-2 ${
              isLight ? 'bg-white border-cyan-200' : 'bg-slate-950/70 border-cyan-500/30'
            }`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-slate-500 text-[10px]">Permitted Spec</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{batch.temperatureBreach.permittedRange}</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-rose-500 text-[10px]">Peak Excursion</div>
                  <div className="font-bold text-rose-600 dark:text-rose-400 text-sm">{batch.temperatureBreach.peakRecorded}</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-slate-500 text-[10px]">Excursion Duration</div>
                  <div className="font-bold text-amber-600 dark:text-amber-400 text-sm">{batch.temperatureBreach.durationAboveThreshold}</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-slate-500 text-[10px]">Telemetry Oracle</div>
                  <div className="font-bold text-cyan-700 dark:text-cyan-400 text-xs truncate">{batch.temperatureBreach.carrierSensorId}</div>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg text-xs border ${
                isLight ? 'bg-cyan-50 text-cyan-900 border-cyan-200' : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/40'
              }`}>
                <strong>Biochemical Impact:</strong> {batch.temperatureBreach.impactAssessment}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
