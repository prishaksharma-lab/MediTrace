import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Clock, 
  Hash, 
  Activity, 
  Copy, 
  Check,
  Code
} from 'lucide-react';
import { mockLedgerBlocks } from '../data/mockBatches';

export default function BlockchainExplorer({ theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [copiedText, setCopiedText] = useState(null);
  const isLight = theme === 'light';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredBlocks = mockLedgerBlocks.filter(block => 
    block.blockNumber.toString().includes(searchTerm) ||
    block.validator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.eventSummary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl transition-colors duration-200 ${
        isLight
          ? 'bg-gradient-to-r from-white via-cyan-50/40 to-slate-50 border-slate-200'
          : 'bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/60 border-slate-800'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-semibold">
                Decentralized State Inspector
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                MediTrace Blockchain Ledger Explorer
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Immutable, distributed audit trail of every pharmaceutical serialization, transfer event, and verification probe.
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-4 px-4 py-2.5 rounded-2xl border text-xs ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}>
            <div>
              <div className="text-slate-500 font-mono text-[10px]">CURRENT BLOCK</div>
              <div className="text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm">#819248</div>
            </div>
            <div className={`w-px h-6 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`}></div>
            <div>
              <div className="text-slate-500 font-mono text-[10px]">AVG BLOCK TIME</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">2.1s</div>
            </div>
            <div className={`w-px h-6 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`}></div>
            <div>
              <div className="text-slate-500 font-mono text-[10px]">CONSENSUS</div>
              <div className="text-slate-800 dark:text-white font-mono font-bold text-sm">IBFT 2.0 PoA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by Block Number, Validator Node, or Event description..."
          className={`w-full pl-11 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:border-cyan-500 ${
            isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-white'
          }`}
        />
      </div>

      {/* Blocks Feed */}
      <div className="space-y-3">
        {filteredBlocks.map((block) => (
          <div
            key={block.blockNumber}
            onClick={() => setSelectedBlock(block)}
            className={`border rounded-2xl p-5 transition-all duration-200 cursor-pointer shadow-lg group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-cyan-500 hover:shadow-cyan-500/10'
                : 'bg-slate-900 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform ${
                  isLight 
                    ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
                    : 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400'
                }`}>
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-slate-900 dark:text-white text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      Block #{block.blockNumber}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                      {block.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{block.timestamp}</span>
                    <span>•</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{block.validatorLabel}</span>
                    <span className="text-slate-500 font-mono text-[11px]">({block.validator})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="text-slate-600 dark:text-slate-400 font-mono">{block.txCount} Pharma Txs</div>
                  <div className="text-[11px] text-slate-500 font-mono">Gas: {block.gasUsed}</div>
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 group-hover:text-cyan-400'
                }`}>
                  <Code className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            <div className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
              isLight ? 'border-slate-100 text-slate-600' : 'border-slate-800/60 text-slate-300'
            }`}>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span>{block.eventSummary}</span>
              </div>
              <div className="text-slate-500 font-mono text-[11px] truncate max-w-sm">
                Root: {block.merkleRoot}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Raw Block Inspector Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-2xl border rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-lg font-bold">
                  Block #{selectedBlock.blockNumber} Raw Cryptographic Payload
                </h3>
              </div>
              <button
                onClick={() => setSelectedBlock(null)}
                className={`text-sm px-2.5 py-1 rounded-lg ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Close
              </button>
            </div>

            <div className={`p-4 rounded-xl border text-xs font-mono space-y-2 overflow-x-auto ${
              isLight ? 'bg-slate-900 text-emerald-300 border-slate-800' : 'bg-slate-950 text-emerald-300 border-slate-800'
            }`}>
              <pre>{JSON.stringify(selectedBlock, null, 2)}</pre>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span>Cryptographic consensus secured by 14 authorized health oracles.</span>
              <button
                onClick={() => handleCopy(JSON.stringify(selectedBlock, null, 2))}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 hover:bg-cyan-500/30 font-semibold"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Raw JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
