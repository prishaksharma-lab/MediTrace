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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      {/* Header Banner */}
      <div className={`border rounded-2xl p-6 sm:p-7 shadow-xs transition-colors duration-200 ${
        isLight
          ? 'bg-gradient-to-r from-white via-blue-50/20 to-slate-50 border-slate-200/80'
          : 'bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950/20 border-slate-800/80'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-semibold">
                Decentralized State Inspector
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                MediTrace Ledger Explorer
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Inspect real-time blocks, pharmaceutical genesis batches, and zero-knowledge cryptographic proofs.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search block # or event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-colors outline-none focus:ring-1 focus:ring-blue-500 ${
                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Table */}
      <div className={`border rounded-2xl p-5 shadow-xs transition-colors ${
        isLight ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
            Recent Blocks & Event Attestations
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {filteredBlocks.length} Blocks Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-[10px] font-mono uppercase text-slate-400 ${
                isLight ? 'border-slate-200' : 'border-slate-800'
              }`}>
                <th className="pb-3 font-semibold">Block #</th>
                <th className="pb-3 font-semibold">Age</th>
                <th className="pb-3 font-semibold">Event Summary</th>
                <th className="pb-3 font-semibold">Validator Oracle</th>
                <th className="pb-3 font-semibold text-right">Transactions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filteredBlocks.map((block) => (
                <tr 
                  key={block.blockNumber}
                  onClick={() => setSelectedBlock(block)}
                  className={`cursor-pointer transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 font-bold text-blue-600 dark:text-blue-400">
                    #{block.blockNumber}
                  </td>
                  <td className="py-3 text-slate-500">
                    {block.age}
                  </td>
                  <td className="py-3 font-sans text-slate-800 dark:text-slate-200 font-medium">
                    {block.eventSummary}
                  </td>
                  <td className="py-3 text-slate-500 truncate max-w-xs" title={block.validator}>
                    {block.validator}
                  </td>
                  <td className="py-3 text-right text-slate-700 dark:text-slate-300">
                    {block.transactionsCount} txs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Block Inspection Modal / Bottom Drawer */}
      {selectedBlock && (
        <div className={`border rounded-2xl p-5 shadow-xs space-y-3 transition-colors ${
          isLight ? 'bg-white border-blue-200' : 'bg-slate-900/90 border-blue-500/30'
        }`}>
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Block #{selectedBlock.blockNumber} Details
              </h4>
            </div>
            <button
              onClick={() => setSelectedBlock(null)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">State Root Hash</span>
              <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                <span className="break-all">{selectedBlock.hash}</span>
                <button onClick={() => handleCopy(selectedBlock.hash)} className="hover:text-blue-500">
                  {copiedText === selectedBlock.hash ? <Check className="w-3.5 h-3.5 text-blue-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Validator Oracle Node</span>
              <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 block mt-0.5">{selectedBlock.validator}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
