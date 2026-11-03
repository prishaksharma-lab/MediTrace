import React from 'react';
import { Shield, Sun, Moon, Wallet, QrCode } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme, 
  walletAccount, 
  connectWallet 
}) {
  const isDark = theme === 'dark';

  const navItems = [
    { id: 'verify', label: 'Verify Medicine' },
    { id: 'register', label: 'Register Batch' },
    { id: 'transfer', label: 'Custody Transfer' },
    { id: 'ledger', label: 'Ledger Audit' },
    { id: 'incidents', label: 'Flagged Incidents' }
  ];

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur sticky top-0 z-30 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('verify')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">
            <Shield className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-base text-zinc-900 dark:text-zinc-100 font-sans">
                MediTrace
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                Mainnet
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Pharmaceutical Supply Chain Authentication
            </p>
          </div>
        </div>

        {/* Clean Minimalist Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Web3 Wallet */}
          <button
            onClick={connectWallet}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5 font-mono"
          >
            <Wallet className="w-3.5 h-3.5 text-zinc-500" />
            <span>
              {walletAccount 
                ? `${walletAccount.slice(0, 6)}...${walletAccount.slice(-4)}`
                : 'Connect Wallet'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-zinc-100 dark:border-zinc-800/80 gap-1 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded font-medium ${
              activeTab === item.id
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
