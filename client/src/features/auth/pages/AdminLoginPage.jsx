import { useState } from 'react';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'kingpro' && password === 'kingpro00') {
      onLoginSuccess();
    } else {
      setError('ACCESS DENIED: INVALID LEDGER CREDENTIALS');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-dim relative font-sans text-on-surface">
      <div className="mesh-gradient"></div>
      <div className="max-w-[400px] w-full mx-4 p-6 sm:p-8 glass-modal rounded-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h2 className="font-display font-bold text-xl text-white mb-1">SYSTEM AUTHENTICATION</h2>
            <p className="text-[9px] font-bold text-outline tracking-widest uppercase">Admin console encryption check</p>
          </div>

          {error && (
            <div className="text-red-400 text-xs font-display p-2 bg-red-950/20 border border-red-900/50 rounded mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="font-display text-[9px] font-bold text-outline mb-1">OPERATOR ID</label>
              <input 
                className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                placeholder="e.g. kingpro" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-display text-[9px] font-bold text-outline mb-1">PASSCODE</label>
              <input 
                className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                placeholder="••••••••" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-white text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              DECRYPT CONTROL CATALOG
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
