import { Link } from 'react-router-dom';
import { faqItems } from './pageData.js';
import { GlassCard, PageShell } from './shared.jsx';

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="Help"
      title="FAQ"
      description="Quick answers about placing orders, Anand delivery, phone confirmation, payment, replacement requests, and support."
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          {faqItems.map((item, index) => (
            <details key={item.question} className="glass-card rounded-xl p-5 md:p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-display text-[10px] font-bold text-yellow-100/80">0{index + 1}</span>
                  <h2 className="font-display text-sm md:text-base font-bold text-primary uppercase tracking-wide">{item.question}</h2>
                </div>
                <span className="material-symbols-outlined text-primary group-open:rotate-45 transition-transform">add</span>
              </summary>
              <p className="font-sans mt-5 pl-8 md:pl-12 text-sm leading-relaxed text-on-secondary-container">{item.answer}</p>
            </details>
          ))}
        </div>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-5">
            <GlassCard icon="support_agent" title="Still Need Help?">
              Send your question with your name and phone number so the team can follow up clearly.
            </GlassCard>
            <Link to="/contact" className="btn-primary block rounded-sm px-7 py-4 font-display text-xs font-bold uppercase tracking-widest text-center">
              Contact Support
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
