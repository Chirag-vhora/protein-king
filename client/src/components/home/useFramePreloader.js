import { useEffect, useState } from "react";

const TOTAL_FRAMES = 192;

export default function useFramePreloader() {
  const [frames, setFrames] = useState([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const images = new Array(TOTAL_FRAMES);

    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();

      const frameNumber = String(i).padStart(4, "0");

      img.src = `/frame/frame_${frameNumber}.webp`;

      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode()
            .then(() => {
              if (cancelled) return;
              loadedCount++;
              setLoaded(loadedCount);
              if (loadedCount === TOTAL_FRAMES) {
                setFrames(images);
              }
            })
            .catch(() => {
              if (cancelled) return;
              loadedCount++;
              setLoaded(loadedCount);
              if (loadedCount === TOTAL_FRAMES) {
                setFrames(images);
              }
            });
        } else {
          if (cancelled) return;
          loadedCount++;
          setLoaded(loadedCount);
          if (loadedCount === TOTAL_FRAMES) {
            setFrames(images);
          }
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame ${frameNumber}`);
      };

      images[i - 1] = img;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    frames,
    loaded,
    total: TOTAL_FRAMES,
    ready: loaded === TOTAL_FRAMES,
  };
}