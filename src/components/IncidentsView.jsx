import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function IncidentsView({ batches, onSelectBatch }) {
  const flagged = batches.filter(b => b.status !== 'AUTHENTIC');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Flagged Security Incidents & Recalls
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Active duplicate serialization collisions, unauthorized clones, and regulatory recall notices.
        </p>
      </div>

      <div className="space-y-4">
        {flagged.map((batch) => {
          const isDuplicate = batch.status === 'SUSPICIOUS_DUPLICATE';

          return (
            <div
              key={batch.id}
              onClick={() => onSelectBatch(batch)}
              className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  isDuplicate
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                }`}>
                  {batch.status.replace(/_/g, ' ')}
                </span>
                <span className="text-xs font-mono text-zinc-400">{batch.id}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{batch.name}</h3>
                <p className="text-xs text-zinc-500">{batch.dosage} • {batch.brand}</p>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                {isDuplicate && batch.anomalyDetails && (
                  <p><strong>Collision:</strong> {batch.anomalyDetails.description}</p>
                )}
                {!isDuplicate && batch.recallNotice && (
                  <p><strong>Notice:</strong> {batch.recallNotice.reason}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
