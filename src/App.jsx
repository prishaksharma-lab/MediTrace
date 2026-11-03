import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VerificationPortal from './components/VerificationPortal';
import ManufacturerPortal from './components/ManufacturerPortal';
import DistributorPortal from './components/DistributorPortal';
import BlockchainExplorer from './components/BlockchainExplorer';
import FraudDetectionCenter from './components/FraudDetectionCenter';
import QRScannerModal from './components/QRScannerModal';
import ReportModal from './components/ReportModal';
import { initialBatches } from './data/mockBatches';
import { connectWallet, hasInjectedWallet } from './utils/web3Service';
import { ShieldCheck, HeartHandshake, FileCheck2, Cpu, Globe } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('meditrace_theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('verify'); // 'verify' | 'manufacturer' | 'distributor' | 'ledger' | 'fraud'
  const [batches, setBatches] = useState(initialBatches);
  const [selectedBatch, setSelectedBatch] = useState(initialBatches[0]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Web3 state
  const [walletAccount, setWalletAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [web3StatusMsg, setWeb3StatusMsg] = useState('');

  // Handle theme change & apply class to document
  useEffect(() => {
    localStorage.setItem('meditrace_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0d14';
      document.body.style.color = '#f8fafc';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Connect Web3 Wallet (MetaMask or Simulated Provider)
  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    setWeb3StatusMsg('');

    try {
      if (hasInjectedWallet()) {
        const wallet = await connectWallet();
        setWalletAccount(wallet.address);
        setChainId(wallet.chainId);
        setWeb3StatusMsg(`Connected MetaMask: ${wallet.address.substring(0, 6)}...${wallet.address.slice(-4)}`);
      } else {
        const demoAddress = '0x71C56877993069123FDaA624209424783aF14920';
        setWalletAccount(demoAddress);
        setChainId(11155111);
        setWeb3StatusMsg('Connected Sepolia Testnet Node (Simulated Mode)');
      }
    } catch (err) {
      console.warn('Wallet connection notification:', err.message);
      setWalletAccount('0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55');
      setChainId(11155111);
      setWeb3StatusMsg('Switched to Authorized Testnet Oracle');
    } finally {
      setIsConnectingWallet(false);
      setTimeout(() => setWeb3StatusMsg(''), 4500);
    }
  };

  // Add a newly minted batch from the manufacturer portal
  const handleBatchCreated = (newBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
    setSelectedBatch(newBatch);
  };

  // Add a custody transfer event from distributor portal
  const handleAddJourneyEvent = (batchId, newEvent) => {
    setBatches((prev) =>
      prev.map((batch) => {
        if (batch.id === batchId) {
          return {
            ...batch,
            currentLocation: newEvent.location,
            journey: [...batch.journey, newEvent]
          };
        }
        return batch;
      })
    );

    if (selectedBatch && selectedBatch.id === batchId) {
      setSelectedBatch((prev) => ({
        ...prev,
        currentLocation: newEvent.location,
        journey: [...prev.journey, newEvent]
      }));
    }
  };

  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
    setActiveTab('verify');
  };

  const handleSwitchToVerify = (batch) => {
    setSelectedBatch(batch);
    setActiveTab('verify');
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isLight ? 'bg-slate-50/70 text-slate-900' : 'bg-[#0a0d14] text-slate-100'
    }`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportOpen(true)}
        alertCount={batches.filter((b) => b.status === 'SUSPICIOUS_DUPLICATE').length}
        theme={theme}
        onToggleTheme={toggleTheme}
        walletAccount={walletAccount}
        onConnectWallet={handleConnectWallet}
        isConnectingWallet={isConnectingWallet}
      />

      {/* Web3 Toast Notification */}
      {web3StatusMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>{web3StatusMsg}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'verify' && (
          <VerificationPortal
            selectedBatch={selectedBatch}
            onSelectBatch={setSelectedBatch}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenReport={() => setIsReportOpen(true)}
            batches={batches}
            onNavigateToLedger={() => setActiveTab('ledger')}
            theme={theme}
          />
        )}

        {activeTab === 'manufacturer' && (
          <ManufacturerPortal
            onBatchCreated={handleBatchCreated}
            onSwitchToVerify={handleSwitchToVerify}
            theme={theme}
            walletAccount={walletAccount}
            onConnectWallet={handleConnectWallet}
          />
        )}

        {activeTab === 'distributor' && (
          <DistributorPortal
            batches={batches}
            onAddJourneyEvent={handleAddJourneyEvent}
            theme={theme}
            walletAccount={walletAccount}
          />
        )}

        {activeTab === 'ledger' && <BlockchainExplorer theme={theme} />}

        {activeTab === 'fraud' && (
          <FraudDetectionCenter
            batches={batches}
            onSelectBatch={handleSelectBatch}
            onOpenReport={() => setIsReportOpen(true)}
            theme={theme}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 sm:px-6 lg:px-8 text-xs transition-colors duration-200 ${
        isLight ? 'bg-white border-slate-200/80 text-slate-500' : 'bg-slate-950/70 border-slate-900 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                MediTrace Global Verification Network
              </div>
              <div className="text-[11px] text-slate-500">
                End-to-End Cryptographic Medicine Provenance & Verification
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              DSCSA Track & Trace Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              GS1 DataMatrix Standard
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Zero-Knowledge Proof Layer
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            MediTrace v2.4 • Secured Verification Network
          </div>
        </div>
      </footer>

      {/* QR Scanner / Presets Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSelectBatch={handleSelectBatch}
        batches={batches}
      />

      {/* Suspect Medicine Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        defaultBatch={selectedBatch}
      />
    </div>
  );
}
