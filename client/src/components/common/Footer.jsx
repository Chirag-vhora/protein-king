import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-dim border-t border-white/10 w-full mt-20 relative z-20">
      <div className="flex flex-col items-center py-16 px-4 md:px-16 gap-8 max-w-[1280px] mx-auto">
        <span className="font-display font-bold text-lg text-primary tracking-widest">AURA PERFORMANCE</span>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#privacy">PRIVACY</a>
          <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#terms">TERMS</a>
          <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#shipping">SHIPPING</a>
          <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#contact">CONTACT</a>
        </div>
        <p className="font-sans text-[10px] tracking-widest text-on-surface-variant opacity-60 text-center uppercase">
          © 2026 AURA PERFORMANCE. ENGINEERED FOR ELITE RESULTS.
        </p>
      </div>
    </footer>
  );
}
