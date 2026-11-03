import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Download, Award, FileText, Lock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function PrintCertificateModal({ isOpen, onClose, batch }) {
  if (!isOpen || !batch) return null;

  const handlePrint = () => {
    window.print();
  };

  const isAuthentic = batch.status === 'AUTHENTIC';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-8 print:my-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        
        {/* Screen Controls Header (hidden during printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">
              Official Certificate of Pharmaceutical Verification
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE BODY */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-white text-slate-900 relative">
          
          {/* Decorative Border Frame */}
          <div className="border-4 border-double border-slate-300 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-8xl sm:text-9xl font-black uppercase tracking-widest text-slate-950 -rotate-12">
                AUTHENTIC
              </span>
            </div>

            {/* Certificate Header */}
            <div className="text-center pb-6 border-b-2 border-slate-200 relative">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-9 h-9" />
                </div>
              </div>

              <div className="text-xs font-mono tracking-widest uppercase text-emerald-700 font-bold">
                MEDITRACE GLOBAL HEALTH VERIFICATION NETWORK
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1 uppercase font-serif">
                Certificate of Pharmaceutical Authenticity & Provenance
              </h1>
              <p className="text-xs text-slate-500 max-w-xl mx-auto mt-1">
                Issued under the Decentralized Drug Supply Chain Security Protocol (DSCSA & WHO-Vigilance Compliant)
              </p>

              <div className="mt-3 inline-flex items-center gap-3 text-xs font-mono bg-slate-100 px-4 py-1.5 rounded-full border border-slate-300 text-slate-700">
                <span>CERTIFICATE ID: <strong>CERT-{batch.id}-{batch.serialNumber.replace(/[^a-zA-Z0-9]/g, '').slice(-6)}</strong></span>
                <span>•</span>
                <span>DATE: <strong>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
              </div>
            </div>

            {/* Status Stamp & Score */}
            <div className="my-6 p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 bg-emerald-50/60 border-emerald-200">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Verification Outcome
                  </div>
                  <div className="text-lg font-black text-emerald-900">
                    {isAuthentic ? 'VERIFIED AUTHENTIC — ZERO TAMPER DETECTED' : batch.status.replace(/_/g, ' ')}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono uppercase text-slate-500">Authenticity Confidence</div>
                <div className="text-2xl font-black font-mono text-emerald-700">{batch.authenticityScore}%</div>
              </div>
            </div>

            {/* Medicine Monograph Grid */}
            <div className="my-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 border-b pb-1">
                Pharmaceutical Product Monograph
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Product Trade Name:</span>
                  <span className="font-bold text-slate-900 text-sm block mt-0.5">{batch.name}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Active Formulation / Dosage:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{batch.dosage}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Manufacturer Licensee:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{batch.brand}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Production Batch Code:</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">{batch.batchNumber}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Unique Serial Key (GS1):</span>
                  <span className="font-mono font-bold text-emerald-700 block mt-0.5">{batch.serialNumber}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">National Drug Code (NDC):</span>
                  <span className="font-mono font-semibold text-slate-900 block mt-0.5">{batch.ndc}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Manufacturing Date:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{batch.manufactureDate}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Expiration Date:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{batch.expiryDate}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Storage Temperature Spec:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{batch.storageTemp}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-500 font-semibold">Active Composition: </span>
                <span className="text-slate-800">{batch.composition}</span>
              </div>
            </div>

            {/* Blockchain Proof & Scannable QR */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="sm:col-span-2 space-y-2 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Immutable Cryptographic Ledger Endorsement
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">BLOCKCHAIN BLOCK NUMBER:</span>
                  <span className="font-mono font-bold text-slate-900">Block #{batch.cryptoProof?.blockNumber || 819245}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">TRANSACTION HASH:</span>
                  <span className="font-mono text-slate-800 text-[11px] break-all">{batch.cryptoProof?.txHash}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block">SMART CONTRACT ADDRESS:</span>
                  <span className="font-mono text-slate-800 text-[11px] break-all">{batch.cryptoProof?.smartContract}</span>
                </div>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <QRCodeSVG
                  value={`https://meditrace.health/verify?id=${batch.id}&sn=${batch.serialNumber}`}
                  size={110}
                  level="H"
                />
                <span className="text-[9px] font-mono font-bold text-slate-600 mt-1">SCAN TO AUDIT</span>
              </div>
            </div>

            {/* Custody Journey Summary */}
            <div className="my-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 border-b pb-1">
                Audited Custody Milestones
              </h3>
              <div className="space-y-1.5 text-xs">
                {batch.journey.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
                    <span className="font-semibold text-slate-800">
                      {idx + 1}. {step.stage}: {step.facility} ({step.location})
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">{step.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature & Seal Sign-Off */}
            <div className="mt-8 pt-6 border-t-2 border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end text-xs">
              <div>
                <div className="border-b border-slate-400 pb-1 font-serif text-slate-800 italic">
                  Dr. Elena Vance, PharmD
                </div>
                <div className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                  Lead Serialization Officer
                </div>
              </div>

              <div>
                <div className="border-b border-slate-400 pb-1 font-serif text-slate-800 italic">
                  Sarah Lin, Supervising Pharmacist
                </div>
                <div className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                  Dispensary Intake Auditor
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block p-2 border-2 border-emerald-600 rounded-lg text-emerald-700 font-mono font-bold text-[10px] uppercase text-center">
                  Official Cryptographic Seal
                  <br />
                  MEDITRACE AUTHENTICATED
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
