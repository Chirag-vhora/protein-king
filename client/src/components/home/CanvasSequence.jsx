import { useEffect, useRef } from "react";

export default function CanvasSequence({
  frames,
  currentFrame,
}) {
  const canvasRef = useRef(null);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      draw(currentFrame);
    };

    window.addEventListener("resize", resize);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };

    function draw(frameIndex) {
      const image = frames[frameIndex];

      if (!image) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageRatio = image.width / image.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth;
      let drawHeight;
      let x;
      let y;

      if (imageRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imageRatio;
        x = (canvas.width - drawWidth) / 2;
        y = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imageRatio;
        x = 0;
        y = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(
        image,
        x,
        y,
        drawWidth,
        drawHeight
      );
    }
  }, [frames]);

  // Draw current frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const image = frames[currentFrame];

    if (!image) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imageRatio = image.width / image.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth;
    let drawHeight;
    let x;
    let y;

    if (imageRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imageRatio;
      x = (canvas.width - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imageRatio;
      x = 0;
      y = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );
  }, [currentFrame, frames]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
    />
  );
}