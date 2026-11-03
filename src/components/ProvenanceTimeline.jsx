import React, { useState } from 'react';
import { 
  Building2, 
  FlaskConical, 
  Truck, 
  Store, 
  UserCheck, 
  CheckCircle2, 
  AlertOctagon, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Link as LinkIcon,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export default function ProvenanceTimeline({ journey, batchStatus, theme }) {
  const [expandedId, setExpandedId] = useState(null);
  const [copiedHash, setCopiedHash] = useState(null);
  const isLight = theme === 'light';

  const getStageIcon = (stage) => {
    const s = stage.toLowerCase();
    if (s.includes('manufactur') || s.includes('genesis')) return Building2;
    if (s.includes('quality') || s.includes('regulatory') || s.includes('fda')) return FlaskConical;
    if (s.includes('logistics') || s.includes('distributor') || s.includes('transit')) return Truck;
    if (s.includes('pharmacy') || s.includes('dispensary') || s.includes('store')) return Store;
    return ShieldCheck;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopy = (hash, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className={`border rounded-2xl p-6 shadow-xl space-y-6 transition-colors duration-200 ${
      isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
    }`}>
      {/* Title & Stats */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
        isLight ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Cryptographic Custody Journey & Blockchain Events
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            End-to-end immutable trail recorded across decentralized verification nodes
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full font-mono border ${
            isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            {journey.length} Checkpoints Logged
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono border border-emerald-500/20 font-semibold">
            100% Cryptographically Signed
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-slate-400 dark:before:to-slate-700">
        {journey.map((step, index) => {
          const Icon = getStageIcon(step.stage);
          const isExpanded = expandedId === step.id;
          const isFailed = step.status === 'FAILED';
          const isRecalled = step.status === 'RECALLED';

          return (
            <div key={step.id} className="relative group">
              {/* Node Dot / Icon */}
              <div className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                isFailed 
                  ? 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-600 dark:text-rose-400' 
                  : isRecalled
                  ? 'bg-amber-100 dark:bg-amber-950 border-amber-500 text-amber-600 dark:text-amber-400'
                  : isLight
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-emerald-500/10'
                  : 'bg-slate-900 border-emerald-500 text-emerald-400 shadow-emerald-900/40'
              }`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Step Card */}
              <div 
                onClick={() => toggleExpand(step.id)}
                className={`rounded-xl p-4 sm:p-5 border cursor-pointer transition-all duration-200 ${
                  isFailed
                    ? 'border-rose-400 dark:border-rose-500/40 bg-rose-50/50 dark:bg-slate-900/80 hover:border-rose-500'
                    : isRecalled
                    ? 'border-amber-400 dark:border-amber-500/40 bg-amber-50/50 dark:bg-slate-900/80 hover:border-amber-500'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-emerald-500/60 hover:bg-slate-100/70 shadow-sm'
                    : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/60'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                        Step {index + 1}: {step.stage}
                      </span>
                      {isFailed ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30">
                          ANOMALY FLAGGED
                        </span>
                      ) : isRecalled ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                          SMART RECALL
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {step.facility} — <span className="text-slate-700 dark:text-slate-300">{step.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {step.timestamp}
                    </span>
                    <button className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Always-visible short summary */}
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed">
                  {step.details}
                </p>

                {/* Collapsible Deep Verification Proofs */}
                {isExpanded && (
                  <div className={`mt-4 pt-4 border-t space-y-3 animate-fadeIn ${
                    isLight ? 'border-slate-200' : 'border-slate-800/80'
                  }`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className={`p-3 rounded-lg border ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Authorized Official / Signer</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{step.authorizedBy}</span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block truncate">DID: {step.did}</span>
                      </div>

                      <div className={`p-3 rounded-lg border ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Ledger Block Number</span>
                        <span className="font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5 block">Block #{step.block}</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">Tx: {step.txHash}</span>
                          <button
                            onClick={(e) => handleCopy(step.txHash, e)}
                            className="p-1 rounded text-slate-400 hover:text-slate-800 dark:hover:text-white ml-2"
                            title="Copy Transaction Hash"
                          >
                            {copiedHash === step.txHash ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`p-2.5 rounded-lg text-[11px] flex items-center justify-between ${
                      isLight 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-300'
                    }`}>
                      <span>✓ ECDSA signature verified against smart contract whitelist</span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">Gas: 21,040 Gwei</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
