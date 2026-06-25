import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <div className="text-center py-20 md:py-40 max-w-[1280px] mx-auto px-4">
      <div className="flex justify-center mb-6">
        <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>
      <h1 className="font-display font-extrabold text-4xl mb-4 text-primary tracking-tight">TRANSACTION APPROVED</h1>
      <p className="font-sans text-on-secondary-container max-w-md mx-auto mb-8 leading-relaxed">
        Your performance ledger has been updated. The order is registered and will dispatch via priority logistics routing.
      </p>
      <Link to="/" className="btn-primary px-8 py-4 font-display font-bold text-xs uppercase tracking-widest inline-block">
        Return to Storefront
      </Link>
    </div>
  );
}
