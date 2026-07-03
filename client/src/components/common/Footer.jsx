import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
];

const policyLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Shipping Policy', to: '/shipping-policy' },
  { label: 'Replacement & Refund Policy', to: '/replacement-refund-policy' },
];

const trustBadges = [
  'Genuine Products',
  'Order Confirme by Phone',
  'Local Delivery (Anand, Gujarat)',
];

const contactItems = [
  { icon: 'location_on', label: 'Anand, Gujarat' },
  { icon: 'call', label: 'Phone number coming soon' },
  { icon: 'mail', label: 'support@kingprotein.local' },
  { icon: 'schedule', label: 'Monday to Saturday' },
];

const socialItems = [
  { icon: 'photo_camera', label: 'Instagram' },
  { icon: 'thumb_up', label: 'Facebook' },
  { icon: 'smart_display', label: 'YouTube' },
];

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="font-display text-[11px] font-semibold tracking-widest text-on-surface-variant hover:text-yellow-100 transition-colors uppercase"
    >
      {children}
    </Link>
  );
}

function FooterHeading({ children }) {
  return (
    <h3 className="font-display text-xs font-bold tracking-[0.28em] text-primary uppercase">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface-dim border-t border-white/10 w-full mt-10 md:mt-20 relative z-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-100/40 to-transparent" />
      <div className="absolute -top-32 right-0 w-72 h-72 bg-yellow-200/10 rounded-full blur-[130px]" />
      <div className="absolute -bottom-28 left-0 w-72 h-72 bg-white/5 rounded-full blur-[130px]" />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <section className="glass-card rounded-xl p-6 md:p-8 lg:col-span-5 overflow-hidden relative">
            <div className="absolute -right-16 -top-16 w-44 h-44 bg-yellow-200/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-primary uppercase">
                King Protein
              </span>
              <p className="font-display mt-2 text-[10px] font-bold tracking-[0.28em] text-yellow-100/80 uppercase">
                Premium Performance Nutrition
              </p>
              <p className="font-sans mt-5 text-sm leading-relaxed text-on-secondary-container max-w-xl">
                King Protein provides genuine supplements with a focus on customer trust, clear order confirmation, and helping customers move toward their fitness goals with local support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
                {trustBadges.map((badge) => (
                  <div key={badge} className="border border-white/10 bg-white/[0.04] rounded-lg px-4 py-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-yellow-100 text-base mt-0.5">check_circle</span>
                    <span className="font-display text-[10px] font-bold leading-relaxed tracking-wider text-primary uppercase">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass-card rounded-xl p-6 md:p-8 lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              <div>
                <FooterHeading>Quick Links</FooterHeading>
                <nav className="mt-5 flex flex-col gap-4">
                  {quickLinks.map((link) => (
                    <FooterLink key={link.label} to={link.to}>{link.label}</FooterLink>
                  ))}
                </nav>
              </div>

              <div>
                <FooterHeading>Policies</FooterHeading>
                <nav className="mt-5 flex flex-col gap-4">
                  {policyLinks.map((link) => (
                    <FooterLink key={link.label} to={link.to}>{link.label}</FooterLink>
                  ))}
                </nav>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-xl p-6 md:p-8 lg:col-span-4 overflow-hidden relative">
            <div className="absolute -right-12 top-10 w-40 h-40 bg-yellow-200/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <FooterHeading>Stay Connected</FooterHeading>
              <p className="font-sans mt-5 text-sm leading-relaxed text-on-secondary-container">
                Stay updated on product availability, order support, and local King Protein announcements.
              </p>

              <div className="mt-6 flex items-end gap-3 border border-white/10 bg-white/[0.03] rounded-lg px-4 py-3">
                <label className="flex-1 min-w-0">
                  <span className="sr-only">Newsletter email</span>
                  <input
                    className="glass-input w-full font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/50"
                    placeholder="Email address"
                    type="email"
                  />
                </label>
                <button
                  type="button"
                  className="glass-btn w-11 h-11 rounded-sm flex items-center justify-center text-primary shrink-0"
                  aria-label="Submit newsletter email"
                >
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {socialItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="glass-btn rounded-lg px-3 py-4 flex flex-col items-center gap-2 text-primary hover:text-yellow-100"
                    aria-label={item.label}
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-display text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {contactItems.map((item) => (
            <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-yellow-100 text-xl">{item.icon}</span>
              <span className="font-display text-[10px] font-bold tracking-widest text-on-surface uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </section>

        <div className="hairline-divider mt-10" />

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-center md:text-left">
          <p className="font-sans text-[10px] tracking-widest text-on-surface-variant opacity-70 uppercase">
            © 2026 King Protein. All rights reserved.
          </p>
          <p className="font-sans text-[10px] tracking-widest text-on-surface-variant opacity-70 uppercase">
            Designed & Developed by King Protein
          </p>
        </div>
      </div>
    </footer>
  );
}
