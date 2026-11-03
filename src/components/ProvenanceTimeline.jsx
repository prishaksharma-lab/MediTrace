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
    <div className={`border rounded-2xl p-6 shadow-xs space-y-5 transition-colors duration-200 ${
      isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
    }`}>
      {/* Title & Stats */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
        isLight ? 'border-slate-200/80' : 'border-slate-800/80'
      }`}>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Chain of Custody & Decentralized Milestones
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Immutable custody trail recorded across decentralized verification nodes
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] border ${
            isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            {journey.length} Checkpoints Logged
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-mono text-[11px] border border-blue-500/20 font-semibold">
            100% Cryptographically Signed
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-indigo-500 before:to-slate-300 dark:before:to-slate-700">
        {journey.map((step, index) => {
          const Icon = getStageIcon(step.stage);
          const isExpanded = expandedId === step.id;
          const isFailed = step.status === 'FAILED';
          const isRecalled = step.status === 'RECALLED';

          return (
            <div key={step.id} className="relative group">
              {/* Node Dot / Icon */}
              <div className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shadow-xs transition-transform duration-200 group-hover:scale-105 ${
                isFailed 
                  ? 'bg-purple-100 dark:bg-purple-950 border-purple-500 text-purple-700 dark:text-purple-300' 
                  : isRecalled
                  ? 'bg-amber-100 dark:bg-amber-950 border-amber-500 text-amber-700 dark:text-amber-300'
                  : isLight
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-blue-500/10'
                  : 'bg-slate-900 border-blue-500 text-blue-400'
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Event Card */}
              <div 
                onClick={() => toggleExpand(step.id)}
                className={`ml-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  isLight 
                    ? isExpanded 
                      ? 'bg-blue-50/40 border-blue-300 shadow-xs' 
                      : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80' 
                    : isExpanded 
                    ? 'bg-slate-800/80 border-blue-500/40 shadow-xs' 
                    : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800/80'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-semibold">
                        {step.stage}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {step.timestamp}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {step.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isFailed 
                        ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20' 
                        : isRecalled 
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' 
                        : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
                    }`}>
                      {step.status}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Always-visible Summary line */}
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-4">
                  <span>Facility: <strong className="text-slate-800 dark:text-slate-200">{step.facility}</strong></span>
                  <span>Location: <strong className="text-slate-800 dark:text-slate-200">{step.location}</strong></span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className={`mt-3 pt-3 border-t text-xs space-y-2.5 transition-all ${
                    isLight ? 'border-slate-200' : 'border-slate-800'
                  }`}>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step.details}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 font-medium block">Authorized Signer:</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">{step.authorizedBy}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Decentralized ID (DID):</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300 truncate block" title={step.did}>{step.did}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[10px] text-slate-500">
                      <div className="flex items-center gap-2">
                        <span>TX: {step.txHash}</span>
                        <button
                          onClick={(e) => handleCopy(step.txHash, e)}
                          className="hover:text-blue-500 transition-colors"
                        >
                          {copiedHash === step.txHash ? (
                            <Check className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <span>Block #{step.block}</span>
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
