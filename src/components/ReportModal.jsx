import React from 'react';
import { X, Printer, Shield, Check, Lock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ReportModal({ isOpen, onClose, batch }) {
  if (!isOpen || !batch) return null;

  const isAuthentic = batch.status === 'AUTHENTIC';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-zinc-900 rounded-xl shadow-2xl overflow-hidden my-8 border border-zinc-200">
        
        {/* Controls bar (hidden during print) */}
        <div className="no-print flex items-center justify-between px-6 py-3.5 bg-zinc-50 border-b border-zinc-200">
          <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider font-mono">
            Verification Report • {batch.serialNumber}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Report Document */}
        <div className="p-8 sm:p-12 space-y-8 bg-white">
          
          {/* Document Header */}
          <div className="border-b border-zinc-300 pb-6 flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-zinc-800 font-mono text-xs uppercase tracking-widest font-semibold">
                <Shield className="w-4 h-4 text-zinc-800" />
                MediTrace Global Registry
              </div>
              <h1 className="text-2xl font-serif font-bold text-zinc-900 mt-1">
                Certificate of Pharmaceutical Analysis & Provenance
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Issued in accordance with DSCSA Track & Trace Protocol standards
              </p>
            </div>

            <div className="text-right text-xs font-mono text-zinc-600">
              <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div className="font-semibold text-zinc-900 mt-0.5">Doc ID: {batch.id}</div>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className={`p-4 rounded-lg border flex items-center justify-between gap-4 ${
            isAuthentic 
              ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/50 border-rose-300 text-rose-950'
          }`}>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-75">
                Authentication Status
              </div>
              <div className="text-lg font-bold font-serif mt-0.5">
                {isAuthentic ? 'Verified Authentic • Supply Chain Intact' : batch.status.replace(/_/g, ' ')}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono uppercase opacity-75 block">Score</span>
              <span className="text-xl font-mono font-bold">{batch.authenticityScore}%</span>
            </div>
          </div>

          {/* Product Monograph */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold border-b border-zinc-200 pb-1 mb-3">
              1. Pharmaceutical Monograph
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-zinc-500 block">Product Trade Name</span>
                <span className="font-semibold text-zinc-900 text-sm mt-0.5 block">{batch.name}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Active Dosage Form</span>
                <span className="font-medium text-zinc-900 mt-0.5 block">{batch.dosage}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Manufacturer</span>
                <span className="font-medium text-zinc-900 mt-0.5 block">{batch.brand}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Batch / Lot Number</span>
                <span className="font-mono font-semibold text-zinc-900 mt-0.5 block">{batch.batchNumber}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">GS1 Serial Key</span>
                <span className="font-mono font-semibold text-emerald-800 mt-0.5 block">{batch.serialNumber}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">National Drug Code (NDC)</span>
                <span className="font-mono text-zinc-900 mt-0.5 block">{batch.ndc}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Manufacturing Date</span>
                <span className="text-zinc-900 mt-0.5 block">{batch.manufactureDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Expiration Date</span>
                <span className="text-zinc-900 mt-0.5 block">{batch.expiryDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Permissible Storage</span>
                <span className="text-zinc-900 mt-0.5 block">{batch.storageTemp}</span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-zinc-50 rounded border border-zinc-200 text-xs">
              <span className="text-zinc-500 font-semibold">Active Formulation: </span>
              <span className="text-zinc-800">{batch.composition}</span>
            </div>
          </div>

          {/* Custody Audit Trail */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold border-b border-zinc-200 pb-1 mb-3">
              2. Custody Audit Trail
            </h2>

            <div className="space-y-2 text-xs">
              {batch.journey.map((step, idx) => (
                <div key={idx} className="flex items-start justify-between py-1.5 border-b border-dashed border-zinc-200">
                  <div>
                    <span className="font-semibold text-zinc-900">{step.stage}</span>
                    <span className="text-zinc-500 ml-2">{step.facility} ({step.location})</span>
                    <p className="text-zinc-600 text-[11px] mt-0.5">{step.details}</p>
                  </div>
                  <span className="font-mono text-zinc-500 text-[11px] shrink-0 ml-4">{step.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Ledger Proof & QR */}
          <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-zinc-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-zinc-600" />
                Cryptographic Ledger Anchor
              </div>
              <div className="font-mono text-[11px] text-zinc-600">
                Block #{batch.cryptoProof?.blockNumber || 819245} • Smart Contract: {batch.cryptoProof?.smartContract}
              </div>
              <div className="font-mono text-[11px] text-zinc-500 break-all">
                Hash: {batch.cryptoProof?.txHash}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center">
              <QRCodeSVG
                value={`https://meditrace.health/verify?sn=${batch.serialNumber}`}
                size={88}
                level="M"
              />
              <span className="text-[9px] font-mono text-zinc-500 mt-1">Scan to Verify</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-zinc-300 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="border-b border-zinc-400 pb-1 font-serif italic text-zinc-800">
                Dr. Elena Vance, PharmD
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                Serialization & Quality Release
              </div>
            </div>
            <div>
              <div className="border-b border-zinc-400 pb-1 font-serif italic text-zinc-800">
                Sarah Lin, Supervising Pharmacist
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                Dispensary Intake Auditor
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
