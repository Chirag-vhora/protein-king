import { useRef, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIntro from '../../../components/home/ScrollIntro.jsx';
import { getFadeUpVariants, getStaggerContainerVariants, hoverScale, tapScale, getSpringTransition } from '../../../constants/motionVariants.js';

gsap.registerPlugin(ScrollTrigger);

let lastHomepageScrollY = 0; // Save scroll position across SPA transitions

export default function StorefrontPage({ products, loading, addToCart, introPlayed }) {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const homepageRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Save the scroll position when unmounting/navigating away from Homepage
  useEffect(() => {
    return () => {
      const currentScroll = window.scrollY;
      if (!introPlayed) {
        // If the intro was rendered on this mount, the homepage content scroll position
        // is offset by 5000px (the pinned height of the intro)
        lastHomepageScrollY = Math.max(0, currentScroll - 5000);
      } else {
        // If the intro was not rendered, it's a 1-to-1 scroll position
        lastHomepageScrollY = currentScroll;
      }
    };
  }, [introPlayed]);

  // Restore scroll position on POP navigation (Back/Forward)
  useLayoutEffect(() => {
    if (navigationType === 'POP' && introPlayed) {
      window.scrollTo(0, lastHomepageScrollY);
    }
  }, [navigationType, introPlayed]);

  // Refresh ScrollTrigger only when products finish loading (layout changes)
  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  const showIntro = !introPlayed;

  return (
    <div>
      {showIntro && <ScrollIntro homepageRef={homepageRef} />}

      <div ref={homepageRef}>
        {/* Hero Section */}
        <section className="relative pt-8 pb-12 px-5 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 md:px-16 lg:px-24 max-w-[1280px] mx-auto min-h-0 lg:min-h-[819px] flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24">
          <div className="flex-1 z-10 text-center lg:text-left">
            <span className="font-display text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase mb-2 md:mb-4 block">
              Next-Gen Bioavailability
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-4 md:mb-6">
              PRECISION <br />
              <span className="font-light text-white/50">ENGINEERED</span> <br />
              PEAK RESULTS.
            </h1>
            <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed max-w-md mx-auto lg:mx-0 font-light mb-6 md:mb-8">
              Elite supplements designed for those who demand cognitive clarity and physical dominance. No fillers. Pure performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6">
              <motion.a
                href="#shop"
                className="w-full sm:w-auto px-10 py-4 bg-white text-black font-display font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm flex items-center justify-center"
                whileHover={hoverScale(shouldReduceMotion, 1.015)}
                whileTap={tapScale(shouldReduceMotion, 0.985)}
                transition={getSpringTransition()}
              >
                Shop Now
              </motion.a>
              <motion.a
                href="#science"
                className="w-full sm:w-auto px-6 py-4 text-white/50 hover:text-white font-display font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 group"
                whileHover={hoverScale(shouldReduceMotion, 1.015)}
                whileTap={tapScale(shouldReduceMotion, 0.985)}
                transition={getSpringTransition()}
              >
                The Science
                <span className="material-symbols-outlined text-[10px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </motion.a>
            </div>
          </div>

          <div className="flex-1 relative w-full h-[260px] md:h-[520px] flex items-center justify-center p-2">
            {/* Premium Structural framing for Product Bottle */}
            <div className="w-full h-full border border-white/5 bg-white/[0.02] backdrop-blur-[20px] rounded-2xl flex items-center justify-center relative overflow-hidden group">
              {/* Soft Ambient Inner Radial Gradients */}
              <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />
              <div className="absolute w-[60%] h-[60%] rounded-full bg-white/[0.03] blur-[80px] pointer-events-none" />

              <div
                className="relative z-10 w-[72%] h-[72%] bg-contain bg-center bg-no-repeat filter brightness-[1.05] drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-transform duration-[2s] group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALTF6Sry7zsx5EejXzc1c73eOPc9keykZX25bpHebDdZUlEjpigtxAwMTEoVFdMysYZ7pwCXwCJnFoBerv0fwO3UNBTtCh4aev9_8bEXlwFduFAhpoD3tZLK3HsquVm8V-Rw8PQ9yd7tVZT8c2xiU-jGXTe9erAdkOi2yyUQoRlNjcG6YvLcaOMKAHtOW_Xku-TOc_ePpWzC4MIuAbn1PHae8PQcA19Mleuhaw5vgudmHf4yOx_lbjjpDk28gCkcd8ELkjnZFxmA')`,
                }}
              />

              {/* Precise Structural Corner Lines (Apple/Nothing Inspired) */}
              <div className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-white/15" />
              <div className="absolute top-4 right-4 w-2.5 h-2.5 border-t border-r border-white/15" />
              <div className="absolute bottom-4 left-4 w-2.5 h-2.5 border-b border-l border-white/15" />
              <div className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-white/15" />
            </div>
          </div>
        </section>

        {/* Premium Value Props Trust Bar */}
        <section className="border-y border-white/5 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-4 md:px-16 lg:px-24 py-8 md:py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-y-0">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-center lg:justify-start gap-2 sm:gap-3 border-r border-white/5 lg:pr-6">
                <span className="material-symbols-outlined text-white/30 text-[15px] sm:text-base md:text-lg select-none">
                  verified
                </span>
                <span className="font-display text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase select-none">
                  100% Authentic Formulas
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-center lg:justify-start gap-2 sm:gap-3 lg:border-r lg:border-white/5 lg:px-6">
                <span className="material-symbols-outlined text-white/30 text-[15px] sm:text-base md:text-lg select-none">
                  biotech
                </span>
                <span className="font-display text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase select-none">
                  Third-Party Lab Tested
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-center lg:justify-start gap-2 sm:gap-3 border-r border-white/5 lg:px-6">
                <span className="material-symbols-outlined text-white/30 text-[15px] sm:text-base md:text-lg select-none">
                  local_shipping
                </span>
                <span className="font-display text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase select-none">
                  Expedited Delivery
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-center lg:justify-start gap-2 sm:gap-3 lg:pl-6">
                <span className="material-symbols-outlined text-white/30 text-[15px] sm:text-base md:text-lg select-none">
                  fitness_center
                </span>
                <span className="font-display text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase select-none">
                  For Elite Athletes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bento Grid */}
        <motion.section
          id="discover"
          className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={getStaggerContainerVariants(0.12)}
        >
          <motion.div className="mb-8" variants={getFadeUpVariants(shouldReduceMotion)}>
            <h2 className="font-display font-semibold text-2xl text-primary tracking-wide">CATEGORIES</h2>
            <div className="hairline-divider mt-4 w-24"></div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-auto"
            variants={getStaggerContainerVariants(0.08)}
          >
            <motion.div
              className="glass-card sm:col-span-2 group relative overflow-hidden flex items-end p-8 min-h-[220px]"
              variants={getFadeUpVariants(shouldReduceMotion)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-60"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2iA6uSwcXcSrcJayZGERunwmp4J8llw4lz43y6kqSrg94muh5ftFeOQ2VG9TE4z0BDQ3O7jgqX6jvYtV9f3itfxivW9OsjAXBkPkLaWbevGS5BQS2i8TVuOChhuzqnaPd_PovngsOejKjs4N-WpuPNOQGF-7JJmkUIajx_7IgF_k9drcuINOA1hUUqL2Pyt-Wy6JcLkWE4ea1GaibYIQslU5Sz176bZiZIwwalWct0KY8HgdfRh1rPuK73z5NkLWa1BhG2HSwVw')` }}
              />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl text-primary">WHEY</h3>
                <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">ISOLATE PERFORMANCE</p>
              </div>
            </motion.div>

            <motion.div
              className="glass-card group relative overflow-hidden flex items-end p-8 min-h-[220px]"
              variants={getFadeUpVariants(shouldReduceMotion)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-40"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCi9WF6uUOy-0H_ypczQi7vXb42ekyDC5uhC0W0mf_RnyGyzZVwv8WZvDnpQ6RSaqMW5wijRRo0MyIz_TBbJSkSJvj56RFLe7ufkX7sI677R2BMZ5H5osN6Ahua9vJbfTyFrOYibI5yEGTASbUFWBJK8btwJv6v_STyejJFeeF2G4n0pUWLPWu4bluY9UEwRnQuVwCjKLfexrxkwviqOBk_qdkmtC3QieAFosurGJPiW_G1nMts8Qiz07_YJmNreDWzRByQ19JzWw')` }}
              />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl text-primary">VEGAN</h3>
                <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">PLANT PRECISION</p>
              </div>
            </motion.div>

            <motion.div
              className="glass-card group relative overflow-hidden flex items-end p-8 min-h-[220px]"
              variants={getFadeUpVariants(shouldReduceMotion)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-40"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAURfYfQHOImjbTuOf3DNxcyZA02J-y59XxXmvq5URUmw1LjKKNGQ0xPA9qLHcQeOQU10QTTEpRtnADE0yv_gBjCbElcy9CGggN0DdG8ORow_Mz0EiEZq2DeYKcKC0reOVF9lehPQio7IlnXV7OMAnLjPtZkUMaxl0qJ2x2BTodORTqVPkivFbGt2ES37vXipZyax1DAxhAGCU15-CTvsYiRptW51h4XFr-JKM0jVQTieCLCHp1fNFoArE_mTtt0LZqSx04ewikiQ')` }}
              />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl text-primary">PRE-WORKOUT</h3>
                <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">NEURAL DRIVE</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Product Grid */}
        <section
          id="shop"
          className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto"
        >
          <motion.div 
            className="flex justify-between items-end mb-8" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getFadeUpVariants(shouldReduceMotion)}
          >
            <div>
              <h2 className="font-display font-semibold text-2xl text-primary uppercase tracking-wide">Elite Formulas</h2>
              <p className="font-display text-xs text-on-surface-variant mt-2 font-semibold tracking-wider">SHOP THE COLLECTION</p>
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-20 text-on-surface-variant">LOADING PERFORMANCE UTILITIES...</div>
          ) : (
            <>
              <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={getStaggerContainerVariants(0.08)}
            >
              {products.slice(0, 12).map(prod => (
                <motion.div
                  key={prod._id}
                  className="glass-card p-6 flex flex-col justify-between gap-6"
                  variants={getFadeUpVariants(shouldReduceMotion)}
                >
                  <div 
                    onClick={() => navigate(`/product/${prod._id}`)}
                    className="aspect-square relative flex items-center justify-center bg-white/5 rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <img 
                      className={`w-4/5 h-4/5 object-contain brightness-110 transition-all duration-500 group-hover:scale-110 ${
                        prod.images && prod.images.length > 1 ? 'group-hover:opacity-0' : ''
                      }`} 
                      src={prod.images?.[0] || prod.imageUrl} 
                      alt={prod.name}
                    />
                    {prod.images && prod.images.length > 1 && (
                      <img 
                        className="absolute w-4/5 h-4/5 object-contain brightness-110 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-110 transition-all duration-500 pointer-events-none" 
                        src={prod.images[1]} 
                        alt={`${prod.name} hover`}
                      />
                    )}
                    {prod.tags && prod.tags[0] && (
                      <div className="absolute top-4 left-4 z-10">
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
                      <motion.button 
                        onClick={() => addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate')}
                        className="w-full py-3 glass-btn text-primary font-display font-bold text-[10px] uppercase tracking-widest"
                        whileHover={hoverScale(shouldReduceMotion, 1.015)}
                        whileTap={tapScale(shouldReduceMotion, 0.985)}
                        transition={getSpringTransition()}
                      >
                        Add to Cart
                      </motion.button>
                      <motion.button 
                        onClick={() => {
                          addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate');
                          navigate('/cart');
                        }}
                        className="w-full py-3 btn-primary text-black font-display font-bold text-[10px] uppercase tracking-widest"
                        whileHover={hoverScale(shouldReduceMotion, 1.015)}
                        whileTap={tapScale(shouldReduceMotion, 0.985)}
                        transition={getSpringTransition()}
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center mt-12">
              <motion.button
                onClick={() => navigate('/products')}
                className="px-10 py-4 border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-black font-display font-bold text-[10px] uppercase tracking-[0.2em] transition-all rounded-sm flex items-center justify-center gap-2"
                whileHover={hoverScale(shouldReduceMotion, 1.02)}
                whileTap={tapScale(shouldReduceMotion, 0.98)}
                transition={getSpringTransition()}
              >
                See More Products
                <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </motion.button>
            </div>
          </>
          )}
        </section>

        {/* Science Section */}
        <motion.section
          id="science"
          className="py-20 relative overflow-hidden bg-black/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={getStaggerContainerVariants(0.12)}
        >
          <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid md:grid-cols-2 gap-16 items-center">
            <motion.div className="order-2 md:order-1" variants={getFadeUpVariants(shouldReduceMotion)}>
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
            </motion.div>
            
            <motion.div
              className="order-1 md:order-2 h-[350px] md:h-[500px] glass-card overflow-hidden"
              variants={getFadeUpVariants(shouldReduceMotion)}
            >
              <div 
                className="w-full h-full bg-cover bg-center grayscale brightness-75 transition-transform duration-[2000ms] hover:scale-105"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXPZ2xqM91doJnK6Zjhg1HI4ZvesOE63t81qwf4wkbgjCLFN8u1z23NofeyIHXZNmtP8T5zUgCWQ4aHVgp_KNtUXev2_1SlTXR0A_Lz31SHUSAB8AGI_u63FXTQWSfPgDjJh_M5L8ESrt0dXWl0aBmEnJHHLMOTQDpZ2c4wzMAvYqbz7ovcwkx0kumr3SZoBzZJ4DfcsBIH5rUvoY80Si7CyHr_pKnNayi-QZEamP0JGGjCN3NUuXufYXokK0R5aFRvYBfYq2IAg')` }}
              />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
