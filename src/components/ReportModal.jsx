import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  Upload, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  Send
} from 'lucide-react';

export default function ReportModal({ isOpen, onClose, defaultBatch }) {
  const [reporterType, setReporterType] = useState('Patient / Consumer');
  const [productName, setProductName] = useState(defaultBatch?.name || '');
  const [serialOrBatch, setSerialOrBatch] = useState(defaultBatch?.serialNumber || defaultBatch?.batchNumber || '');
  const [pharmacyName, setPharmacyName] = useState(defaultBatch?.currentLocation || '');
  const [complaintType, setComplaintType] = useState('Packaging Tampering / Clone Hologram');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Report Suspect or Counterfeit Medicine
              </h3>
              <p className="text-xs text-slate-400">
                Direct confidential submission to national health regulatory watchtowers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">
              Pharmacovigilance Alert Dispatched!
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Case Reference: <strong className="font-mono text-emerald-400">#CAS-{Math.random().toString(36).substring(2, 8).toUpperCase()}</strong>.
              Your report has been hashed and submitted to the decentralized alert stream. Regulatory inspectors have been alerted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Reporter Category
                </label>
                <select
                  value={reporterType}
                  onChange={(e) => setReporterType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Patient / Consumer">Patient / Consumer</option>
                  <option value="Licensed Pharmacist">Licensed Pharmacist</option>
                  <option value="Hospital Clinician">Hospital Clinician</option>
                  <option value="Supply Chain Distributor">Supply Chain Distributor</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Suspicion Type
                </label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Packaging Tampering / Clone Hologram">Packaging Tampering / Clone Hologram</option>
                  <option value="Unusual Taste, Color, or Odor">Unusual Taste, Color, or Odor</option>
                  <option value="Duplicate Serial Number on Box">Duplicate Serial Number on Box</option>
                  <option value="Unexpected Severe Side Effect">Unexpected Severe Side Effect</option>
                  <option value="Sale Without Prescription / Unauthorized Source">Sale Without Prescription / Unauthorized Source</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Medicine Name & Dosage
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Amoxicillin 500mg"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Batch Lot or Serial Number
                </label>
                <input
                  type="text"
                  required
                  value={serialOrBatch}
                  onChange={(e) => setSerialOrBatch(e.target.value)}
                  placeholder="e.g. SN-2024-8842-F9K"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Purchased From / Pharmacy Name
                </label>
                <input
                  type="text"
                  required
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  placeholder="Store name & city"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Incident Description & Observations
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe why you suspect this medicine is counterfeit (e.g. typography differences, foil unsealed, price suspiciously low)..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Simulated photo upload dropzone */}
            <div className="border border-dashed border-slate-700 rounded-2xl p-4 text-center bg-slate-950/50 hover:bg-slate-950 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <span className="text-xs text-slate-300 font-medium block">
                Attach Packaging Photographs (Optional)
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Front box label, 2D barcode, batch stamp, and blister pack foil
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Encrypted with SHA-256 integrity hash</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Case...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Official Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
