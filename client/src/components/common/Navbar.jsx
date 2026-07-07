import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { hoverScale, tapScale, hoverOpacity, getSpringTransition } from '../../constants/motionVariants.js';

export default function Navbar({ cartCount, user, logoutUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto h-20">
        <div className="flex items-center gap-8">
          <Link to="/">
            <motion.div
              className="font-display font-extrabold text-xl md:text-2xl tracking-tighter text-primary"
              whileHover={hoverScale(shouldReduceMotion, 1.015)}
              whileTap={tapScale(shouldReduceMotion, 0.98)}
              transition={getSpringTransition()}
            >
              KING PROTINE
            </motion.div>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link to="/">
              <motion.div
                className="font-display font-semibold text-xs tracking-wider text-primary border-b-2 border-primary pb-1"
                whileHover={hoverScale(shouldReduceMotion, 1.04)}
                whileTap={tapScale(shouldReduceMotion, 0.96)}
                transition={getSpringTransition()}
              >
                SHOP
              </motion.div>
            </Link>
            <a href="#discover">
              <motion.div
                className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary transition-colors"
                whileHover={hoverScale(shouldReduceMotion, 1.04)}
                whileTap={tapScale(shouldReduceMotion, 0.96)}
                transition={getSpringTransition()}
              >
                DISCOVER
              </motion.div>
            </a>
            <a href="#science">
              <motion.div
                className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary transition-colors"
                whileHover={hoverScale(shouldReduceMotion, 1.04)}
                whileTap={tapScale(shouldReduceMotion, 0.96)}
                transition={getSpringTransition()}
              >
                SCIENCE
              </motion.div>
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/cart" aria-label="View Shopping Cart">
            <motion.div
              className="p-2 hover:bg-white/5 transition-all rounded-full relative flex items-center"
              whileHover={hoverScale(shouldReduceMotion, 1.06)}
              whileTap={tapScale(shouldReduceMotion, 0.94)}
              transition={getSpringTransition()}
            >
              <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.div>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <motion.span
                className="font-display font-semibold text-[10px] tracking-wider text-primary border border-white/20 px-2 py-1 rounded bg-white/5 uppercase select-none"
                whileHover={hoverScale(shouldReduceMotion, 1.02)}
                transition={getSpringTransition()}
              >
                {user.name}
              </motion.span>
              <motion.button 
                onClick={logoutUser} 
                className="font-display font-semibold text-[10px] tracking-wider text-outline hover:text-primary transition-colors uppercase"
                whileHover={hoverOpacity(shouldReduceMotion, 0.8)}
                whileTap={tapScale(shouldReduceMotion, 0.96)}
                transition={getSpringTransition()}
              >
                LOGOUT
              </motion.button>
            </div>
          ) : (
            <Link to="/login" aria-label="Sign In">
              <motion.div
                className="p-2 hover:bg-white/5 transition-all rounded-full flex items-center"
                whileHover={hoverScale(shouldReduceMotion, 1.06)}
                whileTap={tapScale(shouldReduceMotion, 0.94)}
                transition={getSpringTransition()}
              >
                <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
              </motion.div>
            </Link>
          )}

          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-white/5 transition-all rounded-full flex items-center text-primary"
            aria-label="Toggle Navigation Menu"
            whileHover={hoverScale(shouldReduceMotion, 1.06)}
            whileTap={tapScale(shouldReduceMotion, 0.94)}
            transition={getSpringTransition()}
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </motion.button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-surface/95 backdrop-blur-2xl transition-all duration-300">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <motion.div
                className="font-display font-semibold text-xs tracking-wider text-primary py-2 border-b border-white/5"
                whileTap={tapScale(shouldReduceMotion, 0.98)}
                transition={getSpringTransition()}
              >
                SHOP
              </motion.div>
            </Link>
            <a href="#discover" onClick={() => setMenuOpen(false)}>
              <motion.div
                className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary py-2 border-b border-white/5 transition-colors"
                whileTap={tapScale(shouldReduceMotion, 0.98)}
                transition={getSpringTransition()}
              >
                DISCOVER
              </motion.div>
            </a>
            <a href="#science" onClick={() => setMenuOpen(false)}>
              <motion.div
                className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary py-2 transition-colors"
                whileTap={tapScale(shouldReduceMotion, 0.98)}
                transition={getSpringTransition()}
              >
                SCIENCE
              </motion.div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
