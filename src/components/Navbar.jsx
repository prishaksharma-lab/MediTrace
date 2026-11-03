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
    { id: 'fraud', label: 'Fraud & Recalls', icon: AlertTriangle, badge: alertCount > 0 ? `${alertCount} ALERT` : null },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${
      isLight 
        ? 'bg-white/90 border-slate-200 text-slate-800 shadow-sm' 
        : 'bg-slate-950/85 border-slate-800 text-white'
    }`}>
      {/* Top micro-bar */}
      <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap items-center justify-between gap-2 transition-colors ${
        isLight
          ? 'bg-slate-50 border-slate-200 text-slate-600'
          : 'bg-gradient-to-r from-emerald-950/50 via-slate-950 to-cyan-950/50 border-slate-800/60 text-slate-400'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            HEALTHLEDGER MAINNET #819248
          </span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="hidden sm:inline">
            Consensus: 14/14 Regulatory Nodes Synced
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
            <Radio className="w-3 h-3 animate-pulse" />
            Zero-Tamper Serialization Active
          </span>
          <button 
            onClick={onOpenReportModal}
            className="text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1 transition-colors"
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white dark:border-slate-950"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-white dark:via-slate-100 dark:to-emerald-400 bg-clip-text text-transparent">
                  MediTrace
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block tracking-tight font-medium">
                Anti-Counterfeit Medicine Protocol
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? isLight
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                      item.badge.includes('ALERT') 
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 animate-pulse'
                        : 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-750'
              }`}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Smart Contract / Web3 Wallet Button */}
            <button
              onClick={onConnectWallet}
              disabled={isConnectingWallet}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                walletAccount
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-mono'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 font-mono'
                  : isLight
                    ? 'bg-slate-900 hover:bg-slate-800 text-white border-transparent'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-500" />
              {walletAccount ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {walletAccount.substring(0, 6)}...{walletAccount.slice(-4)}
                </span>
              ) : (
                <span>{isConnectingWallet ? 'Connecting...' : 'Connect Wallet'}</span>
              )}
            </button>

            {/* Quick Scan QR button */}
            <button
              onClick={() => setActiveTab('verify')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className={`lg:hidden flex overflow-x-auto border-t px-2 py-1.5 gap-1 no-scrollbar transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
      }`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isActive
                  ? isLight
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
