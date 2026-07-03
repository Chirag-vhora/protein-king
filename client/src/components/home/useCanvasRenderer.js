import { useCallback, useRef } from "react";

export default function useCanvasRenderer() {
  const canvasRef = useRef(null);

  const drawFrame = useCallback((image) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      canvas.width !== width * dpr ||
      canvas.height !== height * dpr
    ) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, width, height);

    const scale = Math.max(
      width / image.width,
      height / image.height
    );

    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );
  }, []);

  return {
    canvasRef,
    drawFrame,
  };
}