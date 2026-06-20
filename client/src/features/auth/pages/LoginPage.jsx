import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ loginUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (username === 'kingpro' && password === 'kingpro00') {
      localStorage.setItem('auraAdminToken', 'kingpro-session-active');
      window.location.href = '/admin';
    } else {
      loginUser(username);
      navigate('/');
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-20 p-8 glass-card rounded-xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[80px]"></div>
      
      <div className="relative z-10">
        <div className="mb-8 text-center">
          <h2 className="font-display font-bold text-xl text-white mb-1">LEDGER SIGN IN</h2>
          <p className="text-[9px] font-bold text-outline tracking-widest uppercase">Verify profile credentials</p>
        </div>

        {error && (
          <div className="text-red-400 text-xs font-display p-2 bg-red-950/20 border border-red-900/50 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="font-display text-[9px] font-bold text-outline mb-1">USERNAME</label>
            <input 
              className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/30"
              placeholder="e.g. kingpro or your_name" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-display text-[9px] font-bold text-outline mb-1">PASSWORD</label>
            <input 
              className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/30"
              placeholder="••••••••" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
          >
            VERIFY CREDENTIALS
          </button>
        </form>
      </div>
    </div>
  );
}
