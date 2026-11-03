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
  Flame, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl transition-colors duration-200 ${
        isLight
          ? 'bg-gradient-to-r from-white via-rose-50/40 to-slate-50 border-slate-200'
          : 'bg-gradient-to-r from-slate-900 via-slate-950 to-rose-950/60 border-slate-800'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-semibold">
                Autonomous Threat Intelligence
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Fraud & Recall Surveillance Operations Center
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                AI and cryptographic consensus monitoring duplicate barcodes, geographic collisions, and official health agency recall directives.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBroadcast}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Broadcast Emergency Recall Alert</span>
            </button>
          </div>
        </div>
      </div>

      {quarantineBroadcasted && (
        <div className={`p-4 rounded-2xl text-xs flex items-center gap-3 animate-fadeIn border ${
          isLight ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
        }`}>
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />
          <span>
            <strong>Global Broadcast Dispatched:</strong> Automated quarantine instruction transmitted to 14,800 connected pharmacy dispensary terminals & point-of-sale systems.
          </span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`border rounded-2xl p-5 shadow-lg transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Authenticity Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-2">
            {fraudMetrics.authenticityRate}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Over 1.48M doses validated</div>
        </div>

        <div className={`border rounded-2xl p-5 shadow-lg transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Counterfeits Prevented</span>
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-2">
            {fraudMetrics.counterfeitsIntercepted}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Intercepted before patient reach</div>
        </div>

        <div className={`border rounded-2xl p-5 shadow-lg transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Duplicate Serial Collisions</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-2">
            {fraudMetrics.activeDuplicateAlerts} Active
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Geo-anomaly flags raised</div>
        </div>

        <div className={`border rounded-2xl p-5 shadow-lg transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Safety Recalls</span>
            <FileWarning className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            {fraudMetrics.activeRecalls} Directive(s)
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Enforced by smart contract lock</div>
        </div>
      </div>

      {/* Active High-Risk Incident Dossiers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            Active Critical Incidents Under Surveillance
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Click any incident to open full laboratory and cryptographic audit record
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flaggedBatches.map((batch) => {
            const isDup = batch.status === 'SUSPICIOUS_DUPLICATE';
            const isRec = batch.status === 'RECALLED';
            const isCold = batch.status === 'COLD_CHAIN_BREACH';

            return (
              <div
                key={batch.id}
                onClick={() => onSelectBatch(batch)}
                className={`border rounded-2xl p-6 shadow-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between ${
                  isLight
                    ? isDup
                      ? 'bg-white border-rose-300 hover:border-rose-400'
                      : isRec
                      ? 'bg-white border-amber-300 hover:border-amber-400'
                      : 'bg-white border-cyan-300 hover:border-cyan-400'
                    : isDup
                    ? 'bg-slate-900 border-rose-500/50 hover:border-rose-400 hover:bg-slate-850'
                    : isRec
                    ? 'bg-slate-900 border-amber-500/50 hover:border-amber-400 hover:bg-slate-850'
                    : 'bg-slate-900 border-cyan-500/50 hover:border-cyan-400 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isDup
                        ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40'
                        : isRec
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                        : 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40'
                    }`}>
                      {batch.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{batch.id}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{batch.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{batch.dosage}</p>

                  <div className={`mt-4 p-3 rounded-xl border text-xs space-y-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    {isDup && (
                      <p className="text-rose-700 dark:text-rose-300">
                        <strong>Duplicate Scans:</strong> 14 instances across Mumbai & London within 17 mins.
                      </p>
                    )}
                    {isRec && (
                      <p className="text-amber-700 dark:text-amber-300">
                        <strong>Class I Recall:</strong> Potential active ingredient precipitation risk.
                      </p>
                    )}
                    {isCold && (
                      <p className="text-cyan-700 dark:text-cyan-300">
                        <strong>Thermal Spike:</strong> 14.6°C recorded for 7h 22m during reefer freight.
                      </p>
                    )}
                  </div>
                </div>

                <div className={`mt-5 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                  isLight ? 'border-slate-100' : 'border-slate-800'
                }`}>
                  <span className="text-emerald-600 dark:text-emerald-400">Inspect Security Audit</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Regulatory Reporting Guide */}
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Pharmacovigilance Enforcement Protocol (DSCSA & WHO compliant)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Every verified incident is formatted to GS1 and FDA EPCIS standards for rapid law enforcement transmission.
            </p>
          </div>
          <button
            onClick={onOpenReport}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' 
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
          >
            File Custom Intelligence Report
          </button>
        </div>
      </div>
    </div>
  );
}
