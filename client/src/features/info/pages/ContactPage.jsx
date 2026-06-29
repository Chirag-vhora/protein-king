import { contactChannels } from './pageData.js';
import { GlassCard, PageShell, SectionHeader } from './shared.jsx';
import anandMap from "../../../assets/storemap.png"

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Contact Us"
      description="Questions about products, order confirmation, delivery in Anand, or replacement requests can be sent through the contact form."
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-card rounded-xl p-6 md:p-10">
          <SectionHeader label="Message" title="Send an enquiry" text="Share your details and the King Protein team can follow up for product guidance or order support." />
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="font-display text-[9px] font-bold text-outline uppercase tracking-widest">Full Name</span>
                <input className="glass-input font-sans text-sm text-primary py-3 px-0 placeholder:text-on-tertiary-container/50" placeholder="Your name" type="text" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-display text-[9px] font-bold text-outline uppercase tracking-widest">Phone Number</span>
                <input className="glass-input font-sans text-sm text-primary py-3 px-0 placeholder:text-on-tertiary-container/50" placeholder="Your phone number" type="tel" />
              </label>
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="font-display text-[9px] font-bold text-outline uppercase tracking-widest">Email Address</span>
                <input className="glass-input font-sans text-sm text-primary py-3 px-0 placeholder:text-on-tertiary-container/50" placeholder="you@example.com" type="email" />
              </label>
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="font-display text-[9px] font-bold text-outline uppercase tracking-widest">Message</span>
                <textarea className="glass-input min-h-32 resize-y font-sans text-sm text-primary py-3 px-0 placeholder:text-on-tertiary-container/50" placeholder="Tell us what you need help with" />
              </label>
            </div>
            <button type="button" className="btn-primary rounded-sm px-8 py-4 font-display text-xs font-bold uppercase tracking-widest">
              Submit Enquiry
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {contactChannels.map((item) => (
            <GlassCard key={item.title} icon={item.icon} title={item.title}>
              <p>{item.text}</p>
              <p className="mt-4 font-display text-[10px] font-bold uppercase tracking-widest text-yellow-100/80">{item.meta}</p>
            </GlassCard>
          ))}
        </div>
      </section>
      {/* map addition */}
      <section className="mt-20">
  <SectionHeader
    label="Visit Us"
    title="Find Our Store"
    text="Located in Anand, Gujarat. Click the map below to open our location directly in Google Maps."
  />
  <div className="max-w-4xl mx-auto">

  <div className="mt-10 glass-card rounded-2xl overflow-hidden border border-white/10">
    <a
      href="https://maps.app.goo.gl/925dWVwm2c3yduLx8"
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative overflow-hidden">

        {/* Map */}
        <img
          src={anandMap}
          alt="King Protein Store Location"
          className="w-full h-auto transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition duration-500 flex items-center justify-center">

          <div className="opacity-0 group-hover:opacity-100 transition duration-500 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-yellow-300/10 backdrop-blur-md border border-yellow-300/40 flex items-center justify-center animate-pulse">

              <span className="material-symbols-outlined text-5xl text-yellow-200">
                location_on
              </span>

            </div>

            <h3 className="mt-6 font-display text-3xl text-white uppercase tracking-widest">
              Visit Our Store
            </h3>

            <p className="mt-2 text-yellow-100">
              Click anywhere to open Google Maps
            </p>

          </div>

        </div>

      </div>
    </a>

    <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8">

      <div>
        <h3 className="font-display text-2xl text-primary uppercase tracking-wider">
          King Protein
        </h3>

        <p className="mt-4 text-on-secondary-container leading-7">
          We currently serve customers within Anand, Gujarat.
          Every order is personally confirmed over the phone before dispatch,
          ensuring accuracy and a better customer experience.
        </p>

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-200">
              check_circle
            </span>

            <span>Phone confirmation before dispatch</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-200">
              check_circle
            </span>

            <span>Currently delivering within Anand, Gujarat</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-200">
              check_circle
            </span>

            <span>Genuine products only</span>
          </div>

        </div>

      </div>

      <div className="glass-card rounded-xl p-6 border border-white/10">

        <h4 className="font-display text-lg uppercase tracking-widest text-primary">
          Store Information
        </h4>

        <div className="mt-6 space-y-5">

          <div>
            <p className="text-xs uppercase tracking-widest text-outline">
              Location
            </p>

            <p className="mt-1">
              Anand, Gujarat
            </p>

          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-outline">
              Google Maps
            </p>

            <a
              href="https://maps.app.goo.gl/925dWVwm2c3yduLx8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-100"
            >
              Open Navigation

              <span className="material-symbols-outlined">
                north_east
              </span>

            </a>

          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-outline">
              Business Hours
            </p>

            <p className="mt-1">
              Monday – Saturday
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
  </div>
</section>
    </PageShell>
  );
}
