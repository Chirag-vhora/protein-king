import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, user, logoutUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto h-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display font-extrabold text-xl md:text-2xl tracking-tighter text-primary">
            AURA PERFORMANCE
          </Link>
          <div className="hidden md:flex gap-8">
            <Link to="/" className="font-display font-semibold text-xs tracking-wider text-primary border-b-2 border-primary pb-1">
              SHOP
            </Link>
            <a href="#discover" className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary transition-colors">
              DISCOVER
            </a>
            <a href="#science" className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary transition-colors">
              SCIENCE
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/cart" className="p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 relative flex items-center">
            <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-display font-semibold text-[10px] tracking-wider text-primary border border-white/20 px-2 py-1 rounded bg-white/5 uppercase">
                {user.name}
              </span>
              <button 
                onClick={logoutUser} 
                className="font-display font-semibold text-[10px] tracking-wider text-outline hover:text-primary transition-colors uppercase"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 flex items-center">
              <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
            </Link>
          )}

          <Link to="/admin" className="p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 flex items-center">
            <span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
          </Link>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 flex items-center text-primary"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-surface/95 backdrop-blur-2xl transition-all duration-300">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link 
              to="/" 
              onClick={() => setMenuOpen(false)}
              className="font-display font-semibold text-xs tracking-wider text-primary py-2 border-b border-white/5"
            >
              SHOP
            </Link>
            <a 
              href="#discover" 
              onClick={() => setMenuOpen(false)}
              className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              DISCOVER
            </a>
            <a 
              href="#science" 
              onClick={() => setMenuOpen(false)}
              className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary py-2 transition-colors"
            >
              SCIENCE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
