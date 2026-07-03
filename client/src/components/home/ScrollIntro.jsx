import CanvasSequence from "./CanvasSequence";
import useFramePreloader from "./useFramePreloader";
import useScrollSequence from "./useScrollSequence";

export default function ScrollIntro() {
  const { frames, ready, loaded, total } = useFramePreloader();

  const currentFrame = useScrollSequence(frames.length);

  if (!ready) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        Loading {loaded}/{total}
      </div>
    );
  }

  return (
    <section
      id="scroll-intro"
      className="relative h-screen overflow-hidden"
    >
      <CanvasSequence
        frames={frames}
        currentFrame={currentFrame}
      />
    </section>
  );
}