import React from 'react';
import { mockLedgerBlocks } from '../data/mockBatches';

export default function LedgerView() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          HealthLedger Audit Stream
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Cryptographically finalized serialization and custody blocks on the decentralized network.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
        {mockLedgerBlocks.map((block) => (
          <div key={block.blockNumber} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">Block #{block.blockNumber}</span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500">{block.timestamp}</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 font-medium">{block.eventSummary}</p>
              <div className="text-[11px] font-mono text-zinc-400 truncate">
                Validator: {block.validatorLabel} ({block.validator})
              </div>
            </div>

            <div className="shrink-0 font-mono text-[11px] text-zinc-500 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
              {block.txCount} Verified Events
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
