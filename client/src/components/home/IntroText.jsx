import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

const TRUST_MESSAGES = [
  "Premium Sports Nutrition",
  "100% Genuine Products",
  "Trusted by Fitness Enthusiasts",
  "Serving Anand, Gujarat",
];

const IntroText = forwardRef(function IntroText(_, ref) {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const messageRefs = useRef([]);

  useImperativeHandle(
    ref,
    () => ({
      root: rootRef.current,
      heading: headingRef.current,
      messages: messageRefs.current,
    }),
    []
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-10 text-white"
      aria-label="Welcome to King Protein. Premium Sports Nutrition."
    >
      <div className="intro-copy absolute bottom-[12vh] left-1/2 w-[min(26rem,86vw)] -translate-x-1/2 text-center md:bottom-auto md:left-[8%] md:top-[42%] md:w-[min(26rem,38vw)] md:translate-x-0 md:text-left lg:top-1/2">
        <h1
          ref={headingRef}
          className="font-display text-[clamp(2.35rem,13vw,4.1rem)] font-semibold uppercase leading-[0.9] tracking-normal opacity-0 blur-sm md:text-[clamp(3rem,5.7vw,5.5rem)] lg:text-[clamp(3.35rem,5vw,6.1rem)]"
        >
          <span className="block text-[0.34em] font-medium text-white/70">
            WELCOME TO
          </span>
          <span className="mt-3 block">KING PROTEIN</span>
        </h1>

        <div className="relative mx-auto mt-7 h-8 w-full max-w-[min(26rem,86vw)] sm:mt-8 md:mx-0 md:h-10 md:max-w-[26rem]">
          {TRUST_MESSAGES.map((message, index) => (
            <p
              key={message}
              ref={(node) => {
                messageRefs.current[index] = node;
              }}
              className="absolute inset-0 flex items-center justify-center font-sans text-sm font-medium leading-tight text-white/72 opacity-0 blur-sm sm:text-base md:justify-start md:text-lg"
              aria-hidden={index !== 0}
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
});

export default IntroText;
