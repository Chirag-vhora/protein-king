import { Link } from 'react-router-dom';
import { orderSteps } from './pageData.js';

export function PageShell({ eyebrow, title, description, children }) {
  return (
    <main className="relative overflow-hidden">
      <section className="relative px-4 md:px-16 pt-14 pb-12 md:pt-20 md:pb-16 max-w-[1280px] mx-auto">
        <div className="absolute top-12 right-4 md:right-20 w-56 h-56 bg-yellow-200/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-4xl">
          <span className="font-display text-[10px] md:text-xs font-bold tracking-[0.35em] text-yellow-200/80 uppercase">
            {eyebrow}
          </span>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary leading-[0.95] tracking-tight uppercase">
            {title}
          </h1>
          <p className="font-sans mt-6 text-base md:text-lg leading-relaxed text-on-secondary-container max-w-2xl">
            {description}
          </p>
        </div>
      </section>
      <div className="px-4 md:px-16 pb-20 md:pb-28 max-w-[1280px] mx-auto space-y-10 md:space-y-14">
        {children}
      </div>
    </main>
  );
}

export function SectionHeader({ label, title, text }) {
  return (
    <div className="max-w-3xl">
      <span className="font-display text-[10px] font-bold tracking-[0.35em] text-yellow-200/70 uppercase">
        {label}
      </span>
      <h2 className="font-display mt-3 text-2xl md:text-4xl font-extrabold text-primary uppercase tracking-tight">
        {title}
      </h2>
      {text && <p className="font-sans mt-4 text-sm md:text-base leading-relaxed text-on-secondary-container">{text}</p>}
    </div>
  );
}

export function GlassCard({ icon, title, children, className = '' }) {
  return (
    <div className={`glass-card rounded-xl p-6 md:p-8 group overflow-hidden relative ${className}`}>
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-yellow-200/5 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {icon && (
          <div className="mb-5 w-12 h-12 border border-yellow-200/25 bg-yellow-200/10 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-yellow-100 text-2xl">{icon}</span>
          </div>
        )}
        {title && <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wide">{title}</h3>}
        <div className="font-sans mt-4 text-sm leading-relaxed text-on-secondary-container">{children}</div>
      </div>
    </div>
  );
}

export function ProcessGrid({ items = orderSteps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {items.map((item, index) => (
        <GlassCard key={item.title} icon={item.icon} title={item.title}>
          <div className="flex items-start gap-4">
            <span className="font-display text-xs font-bold text-yellow-100/80">0{index + 1}</span>
            <p>{item.text}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export function CTA({ title = 'Need help choosing products?', text = 'Contact King Protein for local guidance before placing your order request.' }) {
  return (
    <section className="glass-card rounded-xl p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary uppercase tracking-tight">{title}</h2>
        <p className="font-sans mt-3 text-sm md:text-base text-on-secondary-container max-w-2xl">{text}</p>
      </div>
      <Link to="/contact" className="btn-primary rounded-sm px-7 py-4 font-display text-xs font-bold uppercase tracking-widest text-center shrink-0">
        Contact Us
      </Link>
    </section>
  );
}

export function BulletList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item} className="flex gap-4">
          <span className="material-symbols-outlined text-yellow-100 text-xl mt-0.5">check_circle</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
