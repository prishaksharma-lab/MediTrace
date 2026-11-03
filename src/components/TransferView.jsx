import React, { useState } from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';

export default function TransferView({ batches, onAddJourneyEvent }) {
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [carrier, setCarrier] = useState('McKesson Logistics Fleet #402');
  const [locationName, setLocationName] = useState('Newark Air Cargo Hub, NJ');
  const [tempReading, setTempReading] = useState('4.2');
  const [stageName, setStageName] = useState('Logistics Transit Handoff');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newEvent = {
        id: `step-${Date.now()}`,
        stage: stageName,
        facility: carrier,
        location: locationName,
        timestamp: new Date().toLocaleString(),
        status: parseFloat(tempReading) > 10 ? 'FAILED' : 'COMPLETED',
        authorizedBy: 'Logistics Custodian',
        details: `Custody transferred under secure seal. Recorded temperature: ${tempReading}°C.`,
        txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...',
        block: 819250
      };

      onAddJourneyEvent(selectedBatchId, newEvent);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Custody Transfer Handoff
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Log physical custody transitions and cold-chain temperature telemetry.
        </p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Custody checkpoint recorded successfully on HealthLedger.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Target Batch</label>
            <select
              value={selectedBatchId}
              onChange={(e) => setSelectedBatchId(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.serialNumber}) — {b.status}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Carrier / Custodian</label>
              <input
                type="text"
                required
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Checkpoint Stage</label>
              <select
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                <option value="Logistics Transit Handoff">Logistics Transit Handoff</option>
                <option value="Regional Warehouse Check-in">Regional Warehouse Check-in</option>
                <option value="Dispensary Intake">Dispensary Intake</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">GPS Location / Hub</label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 mb-1">Sensor Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                required
                value={tempReading}
                onChange={(e) => setTempReading(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? 'Recording...' : 'Commit Custody Checkpoint'}
          </button>
        </div>
      </form>
    </div>
  );
}
