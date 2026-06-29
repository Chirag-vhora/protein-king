import { BulletList, GlassCard, PageShell, ProcessGrid, SectionHeader } from './shared.jsx';

export default function ShippingPolicyPage() {
  return (
    <PageShell
      eyebrow="Delivery"
      title="Shipping Policy"
      description="King Protein currently provides local delivery only within Anand, Gujarat, with every order confirmed by phone before delivery."
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-card rounded-xl p-6 md:p-10">
          <SectionHeader label="Coverage" title="Anand-only delivery" text="Delivery is currently available only within Anand, Gujarat. Orders outside Anand are not accepted at this time." />
          <div className="mt-8 font-sans text-on-secondary-container">
            <BulletList
              items={[
                'Every order is confirmed through a phone call before delivery.',
                'Customers place an order request through the website.',
                'Payment and delivery details are finalized during confirmation.',
                'No online payment gateway is currently available.',
              ]}
            />
          </div>
        </div>
        <div className="lg:col-span-5">
          <GlassCard icon="map" title="Delivery Area" className="h-full">
            <div className="aspect-[4/3] rounded-lg border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center text-center p-6">
              <span className="material-symbols-outlined text-yellow-100 text-6xl">location_on</span>
              <p className="font-display mt-4 text-xl font-extrabold text-primary uppercase">Anand, Gujarat</p>
              <p className="mt-3 text-on-secondary-container">Current service area only</p>
            </div>
          </GlassCard>
        </div>
      </section>

      <ProcessGrid />
    </PageShell>
  );
}
