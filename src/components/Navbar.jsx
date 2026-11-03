import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  QrCode, 
  Factory, 
  Truck, 
  Layers, 
  AlertTriangle,
  Flag,
  Radio,
  Sun,
  Moon,
  Wallet,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenReportModal, 
  alertCount = 1,
  theme,
  onToggleTheme,
  walletAccount,
  onConnectWallet,
  isConnectingWallet
}) {
  const isLight = theme === 'light';

  const navItems = [
    { id: 'verify', label: 'Verify Medicine', icon: QrCode, badge: null },
    { id: 'manufacturer', label: 'Manufacturer Portal', icon: Factory, badge: null },
    { id: 'distributor', label: 'Distributor Logistics', icon: Truck, badge: null },
    { id: 'ledger', label: 'Blockchain Ledger', icon: Layers, badge: 'Live' },
    { id: 'fraud', label: 'Risk Intelligence', icon: AlertTriangle, badge: alertCount > 0 ? `${alertCount}` : null },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${
      isLight 
        ? 'bg-white/95 border-slate-200/90 text-slate-800 shadow-xs' 
        : 'bg-slate-950/90 border-slate-800/80 text-white'
    }`}>
      {/* Top micro-bar */}
      <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap items-center justify-between gap-2 transition-colors ${
        isLight
          ? 'bg-slate-50/80 border-slate-200/70 text-slate-600'
          : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-blue-700 dark:text-blue-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
            HEALTHLEDGER MAINNET #819248
          </span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="hidden sm:inline text-[11px]">
            Consensus: 14/14 Regulatory Nodes Synced
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300">
            <Radio className="w-3 h-3 text-cyan-600" />
            Zero-Tamper Serialization Active
          </span>
          <button 
            onClick={onOpenReportModal}
            className="text-amber-700 dark:text-amber-400 hover:text-amber-600 font-medium flex items-center gap-1 transition-colors"
          >
            <Flag className="w-3 h-3" /> Report Suspect Medicine
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('verify')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-lg tracking-tight text-slate-900 dark:text-white">
                  Medi<span className="text-blue-600 dark:text-blue-400">Trace</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-medium">
                  v2.4
                </span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wide font-medium">
                Cryptographic Medicine Provenance
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? isLight
                        ? 'bg-blue-50 text-blue-800 border border-blue-100 font-semibold'
                        : 'bg-slate-800 text-blue-300 border border-slate-700 font-semibold'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                      item.badge === 'Live'
                        ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Theme Toggle + Wallet Connect */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-xl border transition-colors ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300/80 text-slate-700' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Web3 Wallet Connect Button */}
            <button
              onClick={onConnectWallet}
              disabled={isConnectingWallet}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                walletAccount
                  ? isLight
                    ? 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100'
                    : 'bg-blue-950/40 border-blue-500/40 text-blue-300 hover:bg-blue-900/40'
                  : 'bg-blue-700 hover:bg-blue-800 text-white border-transparent'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              {isConnectingWallet ? (
                <span>Syncing Node...</span>
              ) : walletAccount ? (
                <span className="font-mono">
                  {walletAccount.substring(0, 6)}...{walletAccount.slice(-4)}
                </span>
              ) : (
                <span>Connect Node</span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto gap-1 pb-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white font-medium'
                    : isLight
                      ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                      : 'text-slate-400 bg-slate-900 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
