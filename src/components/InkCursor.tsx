import { useEffect, useRef } from "react";

const InkCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpi = window.devicePixelRatio || 1;

    function resizeCanvas() {
      canvas.width = window.innerWidth * dpi;
      canvas.height = window.innerHeight * dpi;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let lx = 0, ly = 0, lt = 0;
    let moving = false;
    let lastMoveTime = 0;

    function drawBristleStroke(x: number, y: number, px: number, py: number, speed: number) {
      const dx = x - px, dy = y - py;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 1) return;

      const angle = Math.atan2(dy, dx);
      const baseW = Math.max(3, Math.min(28, 28 - speed * 10));
      const segments = Math.max(3, Math.ceil(dist / 3));

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      // Main stroke body — dark, opaque ink core
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(20,10,5,0.82)';
      ctx.lineWidth = baseW * 0.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Bristle fibers — streaky, angled texture
      const numBristles = Math.floor(baseW * 0.9);
      for (let b = 0; b < numBristles; b++) {
        const offset = (b / numBristles - 0.5) * baseW * 1.4;
        const perpX = Math.cos(angle + Math.PI/2) * offset;
        const perpY = Math.sin(angle + Math.PI/2) * offset;

        const edgeFactor = Math.abs(b / numBristles - 0.5) * 2;
        const spread = edgeFactor * baseW * 0.25;
        const spreadX = (Math.random() - 0.5) * spread;
        const spreadY = (Math.random() - 0.5) * spread;

        const centerProx = 1 - edgeFactor;
        const alpha = (0.55 + centerProx * 0.35) * (0.7 + Math.random() * 0.3);

        ctx.beginPath();
        ctx.moveTo(px + perpX + spreadX, py + perpY + spreadY);
        ctx.lineTo(x + perpX + spreadX * 0.6, y + perpY + spreadY * 0.6);
        ctx.strokeStyle = `rgba(15,8,3,${alpha})`;
        ctx.lineWidth = 0.4 + Math.random() * 0.8;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Ink splatter/bleed at stroke edges
      for (let s = 0; s < 3; s++) {
        const t = Math.random();
        const sx = px + dx * t + (Math.random() - 0.5) * baseW * 0.8;
        const sy = py + dy * t + (Math.random() - 0.5) * baseW * 0.8;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * baseW * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15,8,3,${0.08 + Math.random() * 0.12})`;
        ctx.fill();
      }

      ctx.restore();
    }

    let lastIdleTimer: NodeJS.Timeout | null = null;

    function fadeLoop() {
      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const fadeAlpha = timeSinceMove > 300 ? 0.038 : 0.012;
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      requestAnimationFrame(fadeLoop);
    }
    requestAnimationFrame(fadeLoop);

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX, y = e.clientY;
      const now = performance.now();
      const dt = Math.max(now - lt, 8);
      const dx = x - lx, dy = y - ly;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const speed = dist / dt; // px/ms

      if (lt > 0 && dist > 0.5) {
        drawBristleStroke(x, y, lx, ly, speed);
      }

      lx = x; ly = y; lt = now;
      lastMoveTime = now;
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (lastIdleTimer) clearTimeout(lastIdleTimer);
    };
  }, []);

  return <canvas ref={canvasRef} id="ink-canvas" />;
};

export default InkCursor;
