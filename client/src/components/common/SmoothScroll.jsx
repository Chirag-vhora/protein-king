import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync route changes with Lenis
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (navigationType === 'PUSH' || navigationType === 'REPLACE') {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, navigationType]);

  return null;
}
