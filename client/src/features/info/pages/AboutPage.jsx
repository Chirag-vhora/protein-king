import { CTA, GlassCard, PageShell, SectionHeader } from './shared.jsx';

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="King Protein"
      title="About Us"
      description="King Protein is built around premium supplement access, genuine products, customer trust, and local service for fitness-focused customers in Anand."
    >
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard icon="verified" title="Genuine Products">
          We focus on supplements customers can buy with confidence, with product details presented clearly before order requests are submitted.
        </GlassCard>
        <GlassCard icon="fitness_center" title="Fitness Goals">
          Whether the goal is strength, recovery, or consistency, King Protein helps customers choose products that fit their routine.
        </GlassCard>
        <GlassCard icon="handshake" title="Local Trust">
          Service is personal and local, with phone confirmation used to make every order clear before delivery.
        </GlassCard>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 glass-card rounded-xl p-6 md:p-10">
          <SectionHeader label="Our Approach" title="Premium service without overpromising" />
          <p className="font-sans mt-6 text-on-secondary-container leading-relaxed">
            King Protein keeps the experience direct: discover products, place an order request, receive a confirmation call, and finalize delivery and payment details with the team. The focus is on dependable local service, customer clarity, and products that support serious training goals.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {['Premium supplements', 'Customer-first support', 'Anand-focused delivery'].map((item) => (
            <div key={item} className="glass-card rounded-xl p-6 flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-100">workspace_premium</span>
              <span className="font-display text-xs font-bold text-primary uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <CTA title="Local, clear, and personal" text="Have a product or order question? Reach out before placing your request." />
    </PageShell>
  );
}
