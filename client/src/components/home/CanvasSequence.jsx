import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

const CanvasSequence = forwardRef(function CanvasSequence(_, ref) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const resize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx =
      contextRef.current || canvas.getContext("2d", { alpha: false });

    if (!ctx) return;

    contextRef.current = ctx;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    sizeRef.current = { width, height, dpr };

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const draw = useCallback((image) => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx =
      contextRef.current || canvas.getContext("2d", { alpha: false });

    if (!ctx) return;

    contextRef.current = ctx;

    if (sizeRef.current.width === 0) {
      resize();
    }

    const { width, height } = sizeRef.current;

    ctx.clearRect(0, 0, width, height);

    const scale = Math.max(
      width / image.width,
      height / image.height
    );

    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  }, [resize]);

  useImperativeHandle(
    ref,
    () => ({
      draw,
      resize,
    }),
    [draw, resize]
  );

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
    />
  );
});

export default CanvasSequence;
