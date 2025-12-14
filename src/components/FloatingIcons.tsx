
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Particle = { id: number; x: number; y: number; vx: number; vy: number; size: number; kind: 'brain'|'headset'|'wave' };

const BrainSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M8.5 4.5c-2 0-3.5 1.6-3.5 3.6 0 .5.1.9.2 1.3C4 10 3 11.2 3 12.8c0 1.9 1.4 3.5 3.2 3.7.2 1.7 1.6 3 3.3 3H11V4.5H8.5Z" fill="rgba(175,132,186,.85)"/>
    <path d="M15.5 4.5c2 0 3.5 1.6 3.5 3.6 0 .5-.1.9-.2 1.3 1.2.6 2.2 1.8 2.2 3.4 0 1.9-1.4 3.5-3.2 3.7-.2 1.7-1.6 3-3.3 3H13V4.5h2.5Z" fill="rgba(143,211,204,.75)"/>
  </svg>
);

const HeadsetSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-1v-8h3" stroke="rgba(143,211,204,.8)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 12v6a2 2 0 0 0 2 2h1v-8H4" stroke="rgba(175,132,186,.85)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const WaveSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M2 12c3-6 5 6 8 0s5 6 8 0 4 3 4 3" stroke="rgba(245,242,247,.6)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function FloatingIcons() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const mouseRef = useRef({ x: size.w / 2, y: size.h / 2 });

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const initial = useMemo<Particle[]>(() => {
    const kinds: Particle['kind'][] = ['brain','headset','wave','brain','wave','headset'];
    return kinds.map((kind, i) => ({
      id: i + 1,
      kind,
      x: Math.random() * size.w,
      y: Math.random() * size.h,
      vx: (Math.random() * 2 - 1) * 0.35,
      vy: (Math.random() * 2 - 1) * 0.35,
      size: 26 + Math.random() * 16,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particlesRef = useRef<Particle[]>(initial);
  const [, force] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = particlesRef.current;
      const { w, h } = size;
      const m = mouseRef.current;

      for (const it of p) {
        // gentle attraction to cursor
        const dx = (m.x - it.x);
        const dy = (m.y - it.y);
        const dist = Math.max(80, Math.hypot(dx, dy));
        it.vx += (dx / dist) * 0.003;
        it.vy += (dy / dist) * 0.003;

        it.x += it.vx;
        it.y += it.vy;

        // damping
        it.vx *= 0.992;
        it.vy *= 0.992;

        // bounce
        if (it.x < 0 || it.x > w) it.vx *= -1;
        if (it.y < 0 || it.y > h) it.vy *= -1;
      }

      force(v => (v + 1) % 100000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.55 }}>
      {particlesRef.current.map(p => (
        <div key={p.id}
             style={{
               position: 'absolute',
               transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
               filter: 'drop-shadow(0 14px 24px rgba(0,0,0,.35))',
               opacity: 0.85
             }}>
          <div className="glass" style={{ width: p.size + 14, height: p.size + 14, borderRadius: 18, display:'grid', placeItems:'center' }}>
            {p.kind === 'brain' ? <BrainSvg/> : p.kind === 'headset' ? <HeadsetSvg/> : <WaveSvg/>}
          </div>
        </div>
      ))}
    </div>
  );
}
