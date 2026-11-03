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
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-xl overflow-hidden my-8 print:my-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        
        {/* Screen Controls Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-xs tracking-wide">
              Official Certificate of Pharmaceutical Verification
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE BODY */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-white text-slate-900 relative">
          
          {/* Decorative Border Frame */}
          <div className="border-2 border-slate-300 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-8xl sm:text-9xl font-black uppercase tracking-widest text-slate-950 -rotate-12">
                AUTHENTIC
              </span>
            </div>

            {/* Certificate Header */}
            <div className="text-center pb-6 border-b border-slate-200 relative">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>

              <div className="text-[11px] font-mono tracking-widest uppercase text-blue-700 font-bold">
                MEDITRACE GLOBAL HEALTH VERIFICATION NETWORK
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 uppercase">
                Certificate of Pharmaceutical Authenticity & Provenance
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Cryptographically Signed & Validated Across Decentralized Regulatory Oracles
              </p>
            </div>

            {/* Certificate Content Grid */}
            <div className="py-6 space-y-6">
              
              {/* Product Profile */}
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2">
                  1. Product Monograph & Batch Data
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Product Commercial Name</span>
                    <strong className="text-slate-900 font-bold">{batch.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Dosage & Formulation</span>
                    <strong className="text-slate-800">{batch.dosage}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Licensed Manufacturer</span>
                    <strong className="text-slate-800">{batch.brand}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Batch / Lot Identifier</span>
                    <strong className="font-mono text-slate-900">{batch.batchNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Unique Serial Number</span>
                    <strong className="font-mono text-blue-700">{batch.serialNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">National Drug Code (NDC)</span>
                    <strong className="font-mono text-slate-800">{batch.ndc}</strong>
                  </div>
                </div>
              </div>

              {/* Regulatory Dates & Cold Chain Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 border border-slate-200 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Manufacture Date</span>
                  <strong className="text-slate-800">{batch.manufactureDate}</strong>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Expiration Date</span>
                  <strong className="text-slate-800">{batch.expiryDate}</strong>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Storage Specification</span>
                  <strong className="text-slate-800">{batch.storageTemp}</strong>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Current Verified Score</span>
                  <strong className="text-blue-700 font-mono font-bold">{batch.authenticityScore}%</strong>
                </div>
              </div>

              {/* Verification QR and Blockchain Proof */}
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/50">
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                    Cryptographic Ledger Attestation
                  </div>
                  <div className="font-mono text-[11px] text-slate-700">
                    <div>Smart Contract: <span className="text-blue-700 font-semibold">{batch.cryptoProof?.smartContract}</span></div>
                    <div>Block Recorded: <span className="text-slate-900 font-semibold">#{batch.cryptoProof?.blockNumber}</span></div>
                    <div>Digital Signature: <span className="text-slate-600">{batch.cryptoProof?.digitalSignature}</span></div>
                    <div>Consensus Quorum: <span className="text-blue-700 font-semibold">{batch.cryptoProof?.consensus}</span></div>
                  </div>
                </div>

                <div className="flex-shrink-0 flex flex-col items-center p-3 bg-white border border-slate-200 rounded-xl">
                  <QRCodeSVG
                    value={`https://meditrace.health/verify?id=${batch.id}&sn=${batch.serialNumber}`}
                    size={90}
                    level="H"
                  />
                  <span className="text-[9px] font-mono text-slate-500 mt-1">Scan for Live Status</span>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
                <div className="space-y-1">
                  <div className="font-serif italic text-sm text-slate-800">
                    {batch.journey?.[0]?.authorizedBy || 'Authorized Lead Serialization Pharmacist'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Lead Quality & Serialization Director • MediTrace Registered Node
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono space-y-0.5">
                  <div>Certificate Ref: CERT-{batch.batchNumber}-{Date.now().toString().slice(-6)}</div>
                  <div>Issued: {new Date().toLocaleDateString()} UTC</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
