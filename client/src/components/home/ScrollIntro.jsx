import { useRef, useState, useEffect } from "react";
import CanvasSequence from "./CanvasSequence";
import IntroText from "./IntroText";
import useFramePreloader from "./useFramePreloader";
import useScrollSequence from "./useScrollSequence";

export default function ScrollIntro({ homepageRef }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  const { frames, ready, loaded, total } = useFramePreloader();
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  useScrollSequence({
    sectionRef,
    canvasRef,
    textRef,
    homepageRef,
    frames,
  });

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => {
        setIsLoaderFinished(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  const progressPercent = total > 0 ? (loaded / total) * 100 : 0;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden"
      >
        <CanvasSequence ref={canvasRef} />
        <IntroText ref={textRef} />
      </section>

      {!isLoaderFinished && (
        <div
          className={`fixed inset-0 z-50 bg-[#131313] flex flex-col items-center justify-center gap-6 transition-opacity duration-1000 ease-in-out ${
            ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="text-center space-y-3">
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-white select-none">
              KING PROTEIN
            </h1>
            <p className="font-display text-[9px] font-bold text-white/45 tracking-[0.2em] uppercase select-none animate-pulse">
              Preparing Your Experience
            </p>
          </div>

          <div className="w-48 md:w-56 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-[width] duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
