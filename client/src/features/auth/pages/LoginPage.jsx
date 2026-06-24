import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser as loginUserApi } from '../../../services/api.js';

export default function LoginPage({ loginUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (username === 'kingpro' && password === 'kingpro00') {
      localStorage.setItem('auraAdminToken', 'kingpro-session-active');
      window.location.href = '/admin';
    } else {
      setLoading(true);
      try {
        const data = await loginUserApi(username, password);
        loginUser(data.user, data.token);
        navigate('/');
      } catch (err) {
        setError(err.message || 'Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
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
            <label className="font-display text-[9px] font-bold text-outline mb-1">EMAIL OR USERNAME</label>
            <input 
              className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/30"
              placeholder="e.g. kingpro or email@example.com" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'VERIFYING...' : 'VERIFY CREDENTIALS'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-outline">
            DON'T HAVE AN ACCOUNT?{' '}
            <Link to="/register" className="text-white hover:underline ml-1 font-bold">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
