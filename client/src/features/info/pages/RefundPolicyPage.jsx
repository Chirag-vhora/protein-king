import { replacementRules } from './pageData.js';
import { BulletList, GlassCard, PageShell, SectionHeader } from './shared.jsx';

export default function RefundPolicyPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Replacement & Refund Policy"
      description="King Protein checks products before dispatch and handles replacement or refund requests only for damaged, defective, or incorrect products."
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <GlassCard icon="published_with_changes" title="Eligible Requests" className="h-full">
            <p>Replacement or refund is available only if the customer receives a damaged, defective, or incorrect product.</p>
          </GlassCard>
        </div>
        <div className="lg:col-span-7 glass-card rounded-xl p-6 md:p-10">
          <SectionHeader label="Rules" title="How requests are reviewed" />
          <div className="mt-8 font-sans text-on-secondary-container">
            <BulletList items={replacementRules} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlassCard icon="photo_camera" title="Send Photos">
          Share clear photos of the product, packaging, and issue for verification.
        </GlassCard>
        <GlassCard icon="timer" title="Contact Promptly">
          Contact King Protein as soon as possible after receiving the order.
        </GlassCard>
        <GlassCard icon="block" title="Not Eligible">
          Change of mind, opened products, and used products are not eligible for replacement or refund.
        </GlassCard>
      </section>
    </PageShell>
  );
}
