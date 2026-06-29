import { GlassCard, PageShell, SectionHeader } from './shared.jsx';

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Policy"
      title="Privacy Policy"
      description="King Protein collects only the customer information needed to process order requests, contact customers, and improve service."
    >
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlassCard icon="badge" title="Information Collected">
          Customer name, email, phone number, and address may be collected when an order request or enquiry is submitted.
        </GlassCard>
        <GlassCard icon="support_agent" title="How It Is Used">
          Information is used to process orders, contact customers for confirmation, coordinate delivery, and improve service.
        </GlassCard>
        <GlassCard icon="lock" title="No Data Sale">
          Customer data is not sold to third parties.
        </GlassCard>
      </section>

      <section className="glass-card rounded-xl p-6 md:p-10">
        <SectionHeader label="Customer Data" title="Simple and practical privacy" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassCard icon="manage_accounts" title="Order Support">
            Contact details help the team confirm requests by phone and clarify delivery information before dispatch.
          </GlassCard>
          <GlassCard icon="shield" title="Responsible Handling">
            King Protein keeps customer information limited to service needs and does not use it for unrelated third-party sale.
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
