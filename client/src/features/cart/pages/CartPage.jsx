import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../../services/api.js';

export default function CartPage({ cart, updateQuantity, removeFromCart, clearCart, user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: (typeof user === 'object' && user) ? (user.name || '') : (user || ''),
    email: (typeof user === 'object' && user) ? (user.email || '') : (user ? `${user.toLowerCase().replace(/\s+/g, '')}@aura.tech` : ''),
    phone: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 12.00 : 0;
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError('Please fill in your name, email, phone number, and shipping address.');
      return;
    }

    setSubmitting(true);
    setError('');

    const orderPayload = {
      customerName: formData.name.trim(),
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone.trim(),
      shippingAddress: formData.address.trim(),
      items: cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        flavor: item.flavor
      })),
      subtotal,
      shipping,
      tax,
      totalAmount,
      paymentMethod: 'Manual',
      paymentStatus: 'Pending'
    };

    try {
      await createOrder(orderPayload);
      clearCart();
      navigate('/success');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Checkout failed. Please check stock levels.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-40 max-w-[1280px] mx-auto px-4">
        <h1 className="font-display font-extrabold text-3xl mb-4 text-primary">YOUR CART IS EMPTY</h1>
        <p className="font-sans text-on-secondary-container mb-8">SECURE ENCRYPTED CHECKOUT REQUIRES ACTIVE ITEMS</p>
        <Link to="/" className="btn-primary px-8 py-4 font-display font-bold text-xs uppercase tracking-widest inline-block">
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-12 pb-20 px-4 md:px-16 max-w-[1280px] mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-primary tracking-tight">MY CART</h1>
        <p className="font-display text-xs text-on-secondary-container mt-2 tracking-widest font-semibold">SECURE ENCRYPTED CHECKOUT PROVISION</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart items and forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Cart items list */}
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.product._id}-${item.flavor}-${idx}`} className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 bg-surface-container-highest overflow-hidden rounded flex-shrink-0 flex items-center justify-center p-2">
                  <img className="max-w-full max-h-full object-contain grayscale" src={item.product.images?.[0]} alt={item.product.name} />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-base text-primary tracking-wide">{item.product.name}</h3>
                      <p className="font-display text-[10px] text-outline mt-1 uppercase tracking-wider">FLAVOR: {item.flavor}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product._id, item.flavor)}
                      className="text-on-surface-variant hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-1 border border-white/10 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.flavor, -1)}
                        className="px-3 py-1 hover:bg-white/5 text-primary font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="font-display text-xs px-2">{item.quantity.toString().padStart(2, '0')}</span>
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.flavor, 1)}
                        className="px-3 py-1 hover:bg-white/5 text-primary font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-display font-bold text-base text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form details */}
          <div className="glass-card p-8">
            <h2 className="font-display font-bold text-lg text-primary mb-6">SHIPPING DETAILS</h2>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="font-display text-[9px] font-bold text-outline mb-1">FULL NAME</label>
                  <input 
                    className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                    placeholder="ERIK VANCE" 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-display text-[9px] font-bold text-outline mb-1">EMAIL ADDRESS</label>
                  <input 
                    className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                    placeholder="ERIK@AURA.TECH" 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-display text-[9px] font-bold text-outline mb-1">PHONE NUMBER</label>
                  <input 
                    className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                    placeholder="+1 555 010 2048" 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-display text-[9px] font-bold text-outline mb-1">SHIPPING ADDRESS</label>
                <input 
                  className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                  placeholder="721 NEPTUNE SECTOR, PERFORMANCE HUB" 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pt-6 border-t border-white/10">
                <h2 className="font-display font-bold text-lg text-primary mb-4">MANUAL ORDER CONFIRMATION</h2>
                <div className="flex items-start gap-4 p-5 border border-white/10 bg-white/[0.02] rounded-sm">
                  <span className="material-symbols-outlined text-primary mt-0.5">support_agent</span>
                  <div>
                    <p className="font-display text-xs font-bold text-primary tracking-wide">NO ONLINE PAYMENT IS REQUIRED</p>
                    <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
                      Submit your order request and our team will contact you personally to confirm the order and arrange payment.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Order Summary sticky */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 w-full">
          <div className="glass-card p-8 flex flex-col gap-6">
            <h2 className="font-display font-bold text-xs text-primary border-b border-white/10 pb-4 tracking-wider">ORDER SUMMARY</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-sans">SUBTOTAL</span>
                <span className="font-display font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-sans">PRIORITY SHIPPING</span>
                <span className="font-display font-bold text-primary">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-sans">ESTIMATED TAX (8%)</span>
                <span className="font-display font-bold text-primary">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 flex justify-between items-end">
              <div>
                <span className="font-display text-[9px] text-outline uppercase block font-semibold">TOTAL AMOUNT</span>
                <span className="font-display font-extrabold text-2xl text-primary tracking-tighter">${totalAmount.toFixed(2)}</span>
              </div>
              <span className="font-display text-[10px] text-primary-container bg-white/10 px-2 py-1 rounded-sm">USD</span>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-display text-center p-2 bg-red-950/20 border border-red-900/50 rounded">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button 
                onClick={handleCheckoutSubmit}
                disabled={submitting}
                className="w-full bg-primary text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
              >
                {submitting ? 'SUBMITTING REQUEST...' : 'PLACE ORDER REQUEST'}
              </button>
              <p className="font-display text-[9px] text-outline text-center mt-4">YOUR ORDER WILL REMAIN PENDING UNTIL PERSONALLY CONFIRMED.</p>
            </div>

            <div className="flex items-center justify-center gap-2 opacity-50">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="font-display text-[9px] tracking-widest font-semibold">AES-256 ENCRYPTION ACTIVE</span>
            </div>
          </div>
          
          {/* Support Concierge */}
          <div className="mt-6 p-6 border border-white/5 flex items-center justify-between">
            <div>
              <p className="font-display text-[9px] text-outline font-bold">NEED ASSISTANCE?</p>
              <p className="font-sans text-xs text-on-surface font-semibold mt-1">ELITE CONCIERGE ON STANDBY</p>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
          </div>
        </aside>

      </div>
    </main>
  );
}
