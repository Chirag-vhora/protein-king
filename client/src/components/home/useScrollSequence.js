import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollSequence(totalFrames) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!totalFrames) return;

    const playhead = {
      frame: 0,
    };

    const tween = gsap.to(playhead, {
      frame: totalFrames - 1,

      ease: "none",

      snap: "frame",

      onUpdate: () => {
        setCurrentFrame(playhead.frame);
      },

      scrollTrigger: {
        trigger: "#scroll-intro",

        start: "top top",

        end: "+=5000",

        scrub: 0.5,

        pin: true,

        anticipatePin: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [totalFrames]);

  return currentFrame;
}