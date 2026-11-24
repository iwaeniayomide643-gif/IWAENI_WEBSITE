import { useEffect, useRef } from "react";
import { gsap, REDUCED_MOTION } from "@/lib/motion";

interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  phase: number;
  speed: number;
}

/**
 * A little floating dust lit by the projector beam. It runs only while it is on
 * screen, uses a handful of dots, and shows a single still frame when the visitor
 * prefers reduced motion.
 */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    let w = 0;
    let h = 0;
    let motes: Mote[] = [];
    let onScreen = true;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * m.speed + m.phase);
        ctx.globalAlpha = m.a * twinkle;
        ctx.fillStyle = m.r > 1.3 ? "#ecd7a9" : "#f7efe5";
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 22 : 48;
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -(0.05 + Math.random() * 0.17),
        a: 0.18 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.9,
      }));
      draw(0);
    };

    const tick = (time: number) => {
      if (!onScreen) return;
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -4) {
          m.y = h + 4;
          m.x = Math.random() * w;
        }
        if (m.x < -4) m.x = w + 4;
        if (m.x > w + 4) m.x = -4;
      }
      draw(time);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
    });
    visibility.observe(canvas);
    if (!reduced) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
