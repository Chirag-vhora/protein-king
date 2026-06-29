import { GlassCard, PageShell, ProcessGrid } from './shared.jsx';

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="Terms & Conditions"
      description="These terms explain how order requests, confirmations, delivery scope, payment, and customer responsibilities currently work."
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <GlassCard icon="receipt_long" title="Order Requests">
          Placing an order through the website creates an order request. The order is confirmed only after the King Protein team contacts the customer by phone.
        </GlassCard>
        <GlassCard icon="location_on" title="Delivery Scope">
          Delivery is currently available only within Anand, Gujarat. Orders outside Anand are not accepted at this time.
        </GlassCard>
        <GlassCard icon="payments" title="Payment">
          No online payment gateway is currently available. Payment and delivery details are finalized during the confirmation call.
        </GlassCard>
        <GlassCard icon="inventory_2" title="Product Condition">
          Customers should check products at delivery and contact King Protein promptly if they receive a damaged, defective, or incorrect product.
        </GlassCard>
      </section>

      <ProcessGrid />
    </PageShell>
  );
}
