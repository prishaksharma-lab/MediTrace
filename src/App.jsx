import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VerificationView from './components/VerificationView';
import RegisterView from './components/RegisterView';
import TransferView from './components/TransferView';
import LedgerView from './components/LedgerView';
import IncidentsView from './components/IncidentsView';
import ReportModal from './components/ReportModal';
import { initialBatches } from './data/mockBatches';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('meditrace_theme') || 'light');
  const [activeTab, setActiveTab] = useState('verify');
  const [batches, setBatches] = useState(initialBatches);
  const [selectedBatch, setSelectedBatch] = useState(initialBatches[0]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [walletAccount, setWalletAccount] = useState(null);

  useEffect(() => {
    localStorage.setItem('meditrace_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAccount(accounts[0]);
      } catch (err) {
        console.warn('Wallet connection dismissed');
      }
    } else {
      // Connect in simulated mode if no extension
      setWalletAccount('0x71C56877993069123FDaA624209424783aF14920');
    }
  };

  const handleBatchCreated = (newBatch) => {
    setBatches(prev => [newBatch, ...prev]);
    setSelectedBatch(newBatch);
  };

  const handleAddJourneyEvent = (batchId, newEvent) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          currentLocation: newEvent.location,
          journey: [...b.journey, newEvent]
        };
      }
      return b;
    }));

    if (selectedBatch.id === batchId) {
      setSelectedBatch(prev => ({
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

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        walletAccount={walletAccount}
        connectWallet={connectWallet}
      />

      <main className="flex-1">
        {activeTab === 'verify' && (
          <VerificationView
            selectedBatch={selectedBatch}
            onSelectBatch={setSelectedBatch}
            batches={batches}
            onOpenReportModal={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'register' && (
          <RegisterView
            onBatchCreated={handleBatchCreated}
            onSwitchToVerify={handleSelectBatch}
            walletAccount={walletAccount}
          />
        )}

        {activeTab === 'transfer' && (
          <TransferView
            batches={batches}
            onAddJourneyEvent={handleAddJourneyEvent}
          />
        )}

        {activeTab === 'ledger' && <LedgerView />}

        {activeTab === 'incidents' && (
          <IncidentsView
            batches={batches}
            onSelectBatch={handleSelectBatch}
          />
        )}
      </main>

      <footer className="no-print border-t border-zinc-200 dark:border-zinc-800/80 py-6 text-center text-xs text-zinc-400">
        MediTrace Pharmaceutical Verification • DSCSA Track & Trace Protocol
      </footer>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        batch={selectedBatch}
      />
    </div>
  );
}
