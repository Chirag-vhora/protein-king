export const getFadeUpVariants = (shouldReduceMotion = false) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      mass: 1,
      duration: shouldReduceMotion ? 0 : 0.8,
    },
  },
});

export const getStaggerContainerVariants = (staggerChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
    },
  },
});

export const hoverScale = (shouldReduceMotion = false, amt = 1.02) => 
  shouldReduceMotion ? {} : { scale: amt };

export const tapScale = (shouldReduceMotion = false, amt = 0.98) => 
  shouldReduceMotion ? {} : { scale: amt };

export const hoverOpacity = (shouldReduceMotion = false, amt = 0.85) => 
  shouldReduceMotion ? {} : { opacity: amt };

export const getSpringTransition = () => ({
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.6,
});
