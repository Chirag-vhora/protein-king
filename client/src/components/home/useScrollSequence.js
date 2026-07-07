import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MESSAGE_WINDOW_START = 0.28;
const MESSAGE_WINDOW_END = 0.55;
const FRAME_SEQUENCE_END = 0.72;
const HOMEPAGE_REVEAL_START = 0.8;

export default function useScrollSequence({
  sectionRef,
  canvasRef,
  textRef,
  homepageRef,
  frames,
}) {
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const text = textRef.current;
    const homepage = homepageRef?.current;
    const canvasElement = section?.querySelector("canvas");

    if (!section) return;
    if (!canvas) return;
    if (!frames.length) return;

    // Reset window scroll to 0 to ensure the intro starts at the very beginning
    window.scrollTo(0, 0);

    const playhead = {
      frame: 0,
    };

    let animationFrame = null;
    let lastFrame = -1;

    const draw = (force = false) => {
      animationFrame = null;

      const frameIndex = gsap.utils.clamp(
        0,
        frames.length - 1,
        Math.round(playhead.frame)
      );

      if (!force && frameIndex === lastFrame) return;

      const image = frames[frameIndex];
      if (!image) return;

      lastFrame = frameIndex;
      canvas.draw(image);
    };

    const requestDraw = (force = false) => {
      if (force) {
        lastFrame = -1;
      }

      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        draw(force);
      });
    };

    requestDraw(true);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia(
      "(max-width: 767px)"
    ).matches;

    let homepageAccessEnabled = false;

    const setHomepageAccess = (enabled) => {
      if (!homepage || homepageAccessEnabled === enabled) return;
      homepageAccessEnabled = enabled;

      homepage.inert = !enabled;
      homepage.style.pointerEvents = enabled ? "" : "none";

      if (enabled) {
        homepage.removeAttribute("aria-hidden");
      } else {
        homepage.setAttribute("aria-hidden", "true");
      }
    };

    const prepareHomepage = (y = "100vh") => {
      if (!homepage || prefersReducedMotion) return;

      gsap.set(homepage, {
        position: "fixed",
        inset: 0,
        width: "100%",
        zIndex: 20,
        y,
        autoAlpha: 1,
        overflow: "visible",
        willChange: "transform",
        marginTop: 0,
      });

      setHomepageAccess(false);
    };

    const releaseHomepage = () => {
      if (!homepage) return;

      homepage.inert = false;
      homepage.removeAttribute("aria-hidden");
      gsap.set(homepage, {
        clearProps:
          "position,inset,width,zIndex,y,transform,opacity,visibility,overflow,willChange,pointerEvents",
      });
      gsap.set(homepage, {
        marginTop: "-100vh",
      });
      homepageAccessEnabled = true;
    };

    if (canvasElement) {
      gsap.set(canvasElement, {
        autoAlpha: 1,
        willChange: "transform, opacity",
        transform: "translate3d(0, 0, 0)",
      });
    }

    prepareHomepage();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,

        start: "top top",

        end: "+=5000",

        pin: true,

        scrub: true,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onEnter: () => prepareHomepage(),

        onLeave: () => releaseHomepage(),

        onEnterBack: () => prepareHomepage(0),

        onLeaveBack: () => prepareHomepage(),

        onUpdate: (self) => {
          if (!homepage || prefersReducedMotion) return;

          setHomepageAccess(
            self.progress >= HOMEPAGE_REVEAL_START
          );
        },
      },
    });

    timeline.to(
      playhead,
      {
        frame: frames.length - 1,
        duration: FRAME_SEQUENCE_END,
        ease: "none",
        onUpdate: () => requestDraw(),
      },
      0
    );

    if (text) {
      const messages = text.messages.filter(Boolean);
      const enterFrom = isMobile
        ? { x: 0, y: 20 }
        : { x: -40, y: 0 };
      const exitTo = isMobile
        ? { x: 0, y: -16 }
        : { x: -24, y: 0 };

      gsap.set(text.root, { autoAlpha: 1 });
      gsap.set([text.heading, ...messages], {
        autoAlpha: 0,
        ...enterFrom,
        filter: "blur(10px)",
        willChange: "transform, opacity, filter",
      });

      if (prefersReducedMotion) {
        gsap.set(text.heading, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });

        gsap.set(messages[0], {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });
      } else {
        timeline
          .to(
            text.heading,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              duration: 0.1,
              ease: "power3.out",
            },
            0
          )
          .to(
            text.heading,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              duration: 0.15,
              ease: "none",
            },
            0.1
          );

        const messageSlot =
          (MESSAGE_WINDOW_END - MESSAGE_WINDOW_START) /
          messages.length;

        messages.forEach((message, index) => {
          const start =
            MESSAGE_WINDOW_START + messageSlot * index;
          const hold = messageSlot * 0.42;
          const fade = messageSlot * 0.29;

          timeline
            .to(
              message,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                duration: fade,
                ease: "power3.out",
              },
              start
            )
            .to(
              message,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                duration: hold,
                ease: "none",
              },
              start + fade
            )
            .to(
              message,
              {
                autoAlpha: 0,
                ...exitTo,
                filter: "blur(10px)",
                duration: fade,
                ease: "power2.inOut",
              },
              start + fade + hold
            );
        });

        timeline.to(
          [text.heading, ...messages],
          {
            autoAlpha: 0,
            ...exitTo,
            filter: "blur(10px)",
            duration: 0.15,
            ease: "power2.inOut",
          },
          0.55
        );
      }
    }

    if (homepage && !prefersReducedMotion) {
      timeline.to(
        homepage,
        {
          y: 0,
          duration: 1 - HOMEPAGE_REVEAL_START,
          ease: "power2.out",
        },
        HOMEPAGE_REVEAL_START
      );
    }

    if (canvasElement) {
      timeline.to(
        canvasElement,
        {
          autoAlpha: 0,
          duration: 1 - HOMEPAGE_REVEAL_START,
          ease: "power1.out",
        },
        HOMEPAGE_REVEAL_START
      );
    }

    const handleResize = () => {
      canvas.resize();
      requestDraw(true);
      timeline.scrollTrigger?.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      timeline.kill();
      releaseHomepage();

      if (canvasElement) {
        gsap.set(canvasElement, {
          clearProps: "transform,opacity,visibility,willChange",
        });
      }

      if (text) {
        gsap.set([text.heading, ...text.messages], {
          clearProps: "transform,opacity,filter,willChange",
        });
      }

      if (homepage) {
        gsap.set(homepage, {
          clearProps: "marginTop",
        });
      }
    };
  }, [sectionRef, canvasRef, textRef, homepageRef, frames]);
}
