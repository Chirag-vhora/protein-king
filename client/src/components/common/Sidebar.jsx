import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ activeTab, setActiveTab, logoutAdmin }) {
  return (
    <aside className="fixed left-0 h-full w-64 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-white/5 shadow-2xl flex flex-col p-6 z-40">
      <div className="mb-12">
        <h1 className="font-display font-bold text-xl text-primary tracking-tighter mb-1">ADMIN PORTAL</h1>
        <p className="font-display text-[9px] font-bold text-on-tertiary-container tracking-widest opacity-60">SYSTEM COMMAND</p>
      </div>

      <nav className="flex-grow space-y-2">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`w-full flex items-center gap-4 px-4 py-3 font-display font-semibold text-xs tracking-wider transition-all duration-300 ${
            activeTab === 'inventory' 
              ? 'bg-white/10 text-primary border-r-2 border-primary' 
              : 'text-on-secondary-container hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'inventory' ? "'FILL' 1" : "'FILL' 0" }}>inventory_2</span>
          <span>INVENTORY</span>
        </button>

        <button 
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center gap-4 px-4 py-3 font-display font-semibold text-xs tracking-wider transition-all duration-300 ${
            activeTab === 'orders' 
              ? 'bg-white/10 text-primary border-r-2 border-primary' 
              : 'text-on-secondary-container hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'orders' ? "'FILL' 1" : "'FILL' 0" }}>receipt_long</span>
          <span>ORDERS</span>
        </button>
      </nav>

      <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
        <Link 
          to="/" 
          className="w-full flex items-center gap-4 px-4 py-2 font-display text-[10px] tracking-wider text-outline hover:text-primary transition-colors uppercase font-semibold"
        >
          <span className="material-symbols-outlined text-sm">storefront</span>
          <span>BACK TO STORE</span>
        </Link>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-white/10">
            <span className="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-white uppercase">SYSTEM OPERATOR</span>
            <button onClick={logoutAdmin} className="text-[8px] text-primary tracking-wider text-left hover:underline uppercase font-semibold">LOG OUT</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
