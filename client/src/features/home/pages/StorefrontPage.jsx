
import { useNavigate } from 'react-router-dom';
import ScrollIntro from '../../../components/home/ScrollIntro.jsx';

export default function StorefrontPage({ products, loading, addToCart }) {
  const navigate = useNavigate();

  return (
    <div>
      <ScrollIntro />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-16 max-w-[1280px] mx-auto min-h-0 lg:min-h-[819px] flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
          <div className="space-y-2">
            <span className="font-display text-xs font-semibold tracking-widest text-outline uppercase">Next-Gen Bioavailability</span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-primary leading-none tracking-tight">
              PRECISION <br/>ENGINEERED <br/>PEAK RESULTS.
            </h1>
          </div>
          <p className="font-sans text-lg text-on-secondary-container max-w-lg mx-auto lg:mx-0">
            Elite supplements designed for those who demand cognitive clarity and physical dominance. No fillers. Pure performance.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <a href="#shop" className="btn-primary px-8 py-4 font-display font-semibold text-xs rounded-sm uppercase tracking-widest flex items-center justify-center">
              Shop Now
            </a>
            <a href="#science" className="glass-btn px-8 py-4 font-display font-semibold text-xs text-primary rounded-sm uppercase tracking-widest flex items-center justify-center">
              The Science
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative w-full h-[300px] md:h-[500px] flex items-center justify-center">
          <div 
            className="relative z-10 w-full h-full bg-contain bg-center bg-no-repeat filter grayscale brightness-110 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-[2s] hover:scale-105"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALTF6Sry7zsx5EejXzc1c73eOPc9keykZX25bpHebDdZUlEjpigtxAwMTEoVFdMysYZ7pwCXwCJnFoBerv0fwO3UNBTtCh4aev9_8bEXlwFduFAhpoD3tZLK3HsquVm8V-Rw8PQ9yd7tVZT8c2xiU-jGXTe9erAdkOi2yyUQoRlNjcG6YvLcaOMKAHtOW_Xku-TOc_ePpWzC4MIuAbn1PHae8PQcA19Mleuhaw5vgudmHf4yOx_lbjjpDk28gCkcd8ELkjnZFxmA')` }}
          />
          <div className="absolute inset-0 flex items-center justify-center -z-0">
            <div className="w-[80%] h-[80%] rounded-full bg-white/5 blur-[120px]"></div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section id="discover" className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="mb-8">
          <h2 className="font-display font-semibold text-2xl text-primary tracking-wide">CATEGORIES</h2>
          <div className="hairline-divider mt-4 w-24"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
          <div className="glass-card sm:col-span-2 group relative overflow-hidden flex items-end p-8 min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-60"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2iA6uSwcXcSrcJayZGERunwmp4J8llw4lz43y6kqSrg94muh5ftFeOQ2VG9TE4z0BDQ3O7jgqX6jvYtV9f3itfxivW9OsjAXBkPkLaWbevGS5BQS2i8TVuOChhuzqnaPd_PovngsOejKjs4N-WpuPNOQGF-7JJmkUIajx_7IgF_k9drcuINOA1hUUqL2Pyt-Wy6JcLkWE4ea1GaibYIQslU5Sz176bZiZIwwalWct0KY8HgdfRh1rPuK73z5NkLWa1BhG2HSwVw')` }}
            />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl text-primary">WHEY</h3>
              <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">ISOLATE PERFORMANCE</p>
            </div>
          </div>

          <div className="glass-card group relative overflow-hidden flex items-end p-8 min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-40"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCi9WF6uUOy-0H_ypczQi7vXb42ekyDC5uhC0W0mf_RnyGyzZVwv8WZvDnpQ6RSaqMW5wijRRo0MyIz_TBbJSkSJvj56RFLe7ufkX7sI677R2BMZ5H5osN6Ahua9vJbfTyFrOYibI5yEGTASbUFWBJK8btwJv6v_STyejJFeeF2G4n0pUWLPWu4bluY9UEwRnQuVwCjKLfexrxkwviqOBk_qdkmtC3QieAFosurGJPiW_G1nMts8Qiz07_YJmNreDWzRByQ19JzWw')` }}
            />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl text-primary">VEGAN</h3>
              <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">PLANT PRECISION</p>
            </div>
          </div>

          <div className="glass-card group relative overflow-hidden flex items-end p-8 min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-40"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAURfYfQHOImjbTuOf3DNxcyZA02J-y59XxXmvq5URUmw1LjKKNGQ0xPA9qLHcQeOQU10QTTEpRtnADE0yv_gBjCbElcy9CGggN0DdG8ORow_Mz0EiEZq2DeYKcKC0reOVF9lehPQio7IlnXV7OMAnLjPtZkUMaxl0qJ2x2BTodORTqVPkivFbGt2ES37vXipZyax1DAxhAGCU15-CTvsYiRptW51h4XFr-JKM0jVQTieCLCHp1fNFoArE_mTtt0LZqSx04ewikiQ')` }}
            />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl text-primary">PRE-WORKOUT</h3>
              <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">NEURAL DRIVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display font-semibold text-2xl text-primary uppercase tracking-wide">Elite Formulas</h2>
            <p className="font-display text-xs text-on-surface-variant mt-2 font-semibold tracking-wider">SHOP THE COLLECTION</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">LOADING PERFORMANCE UTILITIES...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(prod => (
              <div key={prod._id} className="glass-card p-6 flex flex-col justify-between gap-6">
                <div 
                  onClick={() => navigate(`/product/${prod._id}`)}
                  className="aspect-square relative flex items-center justify-center bg-white/5 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img 
                    className="w-4/5 h-4/5 object-contain grayscale brightness-110 transition-transform duration-500 group-hover:scale-110" 
                    src={prod.imageUrl} 
                    alt={prod.name}
                  />
                  {prod.tags && prod.tags[0] && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-[9px] font-bold tracking-widest text-primary border border-white/40 rounded-sm uppercase">
                        {prod.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 
                        onClick={() => navigate(`/product/${prod._id}`)}
                        className="font-display font-bold text-base text-primary cursor-pointer hover:underline"
                      >
                        {prod.name}
                      </h4>
                      <p className="font-display text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">{prod.servings || '30 Servings'}</p>
                    </div>
                    <span className="font-display font-bold text-base text-primary">${prod.price.toFixed(2)}</span>
                  </div>
                  <div className="hairline-divider"></div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate')}
                      className="w-full py-3 glass-btn text-primary font-display font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => {
                        addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate');
                        navigate('/cart');
                      }}
                      className="w-full py-3 btn-primary text-black font-display font-bold text-[10px] uppercase tracking-widest transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Science Section */}
      <section id="science" className="py-20 relative overflow-hidden bg-black/20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="glass-card p-6 md:p-12 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[60px]"></div>
              <h2 className="font-display font-bold text-3xl text-primary mb-6">MICRONIZED FOR INSTANT UPTAKE</h2>
              <p className="font-sans text-base text-on-secondary-container leading-relaxed mb-8">
                Our proprietary processing tech ensures particle sizes under 5 microns. Faster absorption. Zero digestive friction. Maximum nitrogen retention for the elite human system.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  <span className="font-display text-xs font-semibold tracking-wider text-primary">BIO-AVAILABLE ISOLATE</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  <span className="font-display text-xs font-semibold tracking-wider text-primary">ZERO ARTIFICIAL SWEETENERS</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  <span className="font-display text-xs font-semibold tracking-wider text-primary">THIRD PARTY LAB CERTIFIED</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 md:order-2 h-[350px] md:h-[500px] glass-card overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center grayscale brightness-75 transition-transform duration-[2000ms] hover:scale-105"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXPZ2xqM91doJnK6Zjhg1HI4ZvesOE63t81qwf4wkbgjCLFN8u1z23NofeyIHXZNmtP8T5zUgCWQ4aHVgp_KNtUXev2_1SlTXR0A_Lz31SHUSAB8AGI_u63FXTQWSfPgDjJh_M5L8ESrt0dXWl0aBmEnJHHLMOTQDpZ2c4wzMAvYqbz7ovcwkx0kumr3SZoBzZJ4DfcsBIH5rUvoY80Si7CyHr_pKnNayi-QZEamP0JGGjCN3NUuXufYXokK0R5aFRvYBfYq2IAg')` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
