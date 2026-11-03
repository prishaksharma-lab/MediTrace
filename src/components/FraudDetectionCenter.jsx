import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  FileWarning, 
  ThermometerSnowflake, 
  Search, 
  Radio, 
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { fraudMetrics } from '../data/mockBatches';

export default function FraudDetectionCenter({ batches, onSelectBatch, onOpenReport, theme }) {
  const [quarantineBroadcasted, setQuarantineBroadcasted] = useState(false);
  const isLight = theme === 'light';

  const handleBroadcast = () => {
    setQuarantineBroadcasted(true);
    setTimeout(() => setQuarantineBroadcasted(false), 4000);
  };

  const flaggedBatches = batches.filter(b => b.status !== 'AUTHENTIC');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      {/* Header Banner */}
      <div className={`border rounded-2xl p-6 sm:p-7 shadow-xs transition-colors duration-200 ${
        isLight
          ? 'bg-gradient-to-r from-white via-purple-50/20 to-slate-50 border-slate-200/80'
          : 'bg-gradient-to-r from-slate-900 via-slate-950 to-purple-950/20 border-slate-800/80'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-semibold">
                Autonomous Threat Intelligence
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Risk Surveillance & Recall Operations
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Monitoring serial barcode anomalies, geographic collisions, and official health agency recall directives.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBroadcast}
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Broadcast Recall Directive</span>
            </button>
          </div>
        </div>
      </div>

      {quarantineBroadcasted && (
        <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 animate-fadeIn border ${
          isLight ? 'bg-purple-50 border-purple-200 text-purple-900' : 'bg-purple-950/40 border-purple-500/30 text-purple-200'
        }`}>
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-purple-600 dark:text-purple-400" />
          <span>
            <strong>Global Broadcast Dispatched:</strong> Quarantine instruction transmitted to 14,800 connected pharmacy dispensary terminals & point-of-sale systems.
          </span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className={`border rounded-xl p-4 shadow-xs transition-colors ${
          isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Authenticity Rate</span>
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-2">
            {fraudMetrics.authenticityRate}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-medium">99.2% Target Baseline</div>
        </div>

        <div className={`border rounded-xl p-4 shadow-xs transition-colors ${
          isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Duplicate Collisions</span>
            <ShieldAlert className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-2">
            {fraudMetrics.duplicateDetections}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 mt-0.5 font-medium">Auto-quarantined at POS</div>
        </div>

        <div className={`border rounded-xl p-4 shadow-xs transition-colors ${
          isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Recalls</span>
            <FileWarning className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-2">
            {fraudMetrics.activeRecalls}
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 font-medium">Class II Regulatory Alerts</div>
        </div>

        <div className={`border rounded-xl p-4 shadow-xs transition-colors ${
          isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Thermal Excursions</span>
            <ThermometerSnowflake className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono mt-2">
            {fraudMetrics.thermalExcursions}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-medium">Transit Sensor Violations</div>
        </div>
      </div>

      {/* Flagged Batches Surveillance Queue */}
      <div className={`border rounded-2xl p-5 shadow-xs space-y-4 transition-colors ${
        isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              Active Security & Recall Investigation Queue
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Items flagged for immediate regulatory inspection or consumer verification review
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-medium">
            {flaggedBatches.length} Flagged Units
          </span>
        </div>

        <div className="space-y-2.5">
          {flaggedBatches.map(batch => {
            const isDuplicate = batch.status === 'SUSPICIOUS_DUPLICATE';
            const isRecall = batch.status === 'RECALLED';

            return (
              <div 
                key={batch.id}
                onClick={() => onSelectBatch(batch)}
                className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 cursor-pointer transition-all ${
                  isLight
                    ? 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80'
                    : 'bg-slate-950/50 hover:bg-slate-800/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${
                    isDuplicate 
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' 
                      : isRecall
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
                  }`}>
                    {isDuplicate ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : isRecall ? (
                      <FileWarning className="w-5 h-5" />
                    ) : (
                      <ThermometerSnowflake className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {batch.name}
                      </h4>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.2 rounded border font-medium ${
                        isDuplicate 
                          ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20' 
                          : isRecall
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                          : 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20'
                      }`}>
                        {batch.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3 mt-0.5">
                      <span>Batch: <strong className="font-mono text-slate-700 dark:text-slate-300">{batch.batchNumber}</strong></span>
                      <span>Serial: <strong className="font-mono text-slate-700 dark:text-slate-300">{batch.serialNumber}</strong></span>
                      <span>Facility: {batch.currentLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">Authenticity</span>
                    <span className={`text-xs font-bold font-mono ${
                      isDuplicate ? 'text-purple-600 dark:text-purple-400' : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {batch.authenticityScore}%
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
