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
      }, 2200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Report Discrepancy or Suspect Product
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct confidential alert to national regulatory surveillance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Report Successfully Registered</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Surveillance tracking ticket issued. Health regulatory nodes have scheduled verification of the dispensary batch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Reporter Category</label>
                <select
                  value={reporterType}
                  onChange={(e) => setReporterType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Patient / Consumer</option>
                  <option>Licensed Pharmacist</option>
                  <option>Distributor / Logistics Agent</option>
                  <option>Hospital Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Discrepancy Category</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Packaging Tampering / Clone Hologram</option>
                  <option>Barcode Scan Collision / Failure</option>
                  <option>Abnormal Tablet Color / Texture</option>
                  <option>Suspicious Pharmacy Source</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Medication Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  placeholder="e.g. Lipitor 20mg"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Serial or Batch #</label>
                <input
                  type="text"
                  value={serialOrBatch}
                  onChange={(e) => setSerialOrBatch(e.target.value)}
                  required
                  placeholder="e.g. SN-2024-9921-X7Q"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Purchasing Pharmacy / Facility</label>
              <input
                type="text"
                value={pharmacyName}
                onChange={(e) => setPharmacyName(e.target.value)}
                placeholder="e.g. Midtown Pharmacy, NY"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Discrepancy Details</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe observations regarding packaging condition, serial number print, or seal status..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {isSubmitting ? (
                  <span>Submitting Alert...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Investigation Alert</span>
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
