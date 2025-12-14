
import React, { useEffect, useRef } from 'react';
import { getLabAnalyser } from '../features/soundlab/soundlab';

export default function SpectrogramBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
      canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const analyser = getLabAnalyser();
      const w = canvas.width;
      const h = canvas.height;

      ctx2d.clearRect(0, 0, w, h);

      // Background glow
      const grad = ctx2d.createRadialGradient(w * 0.2, h * 0.2, 0, w * 0.2, h * 0.2, Math.min(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(175,132,186,0.22)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, w, h);

      // Draw fake data if analyser not enabled yet
      const bins = 120;
      const data = new Uint8Array(bins);

      if (analyser) {
        const fft = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fft);
        for (let i = 0; i < bins; i++) {
          const idx = Math.floor((i / bins) * (fft.length * 0.45));
          data[i] = fft[idx] ?? 0;
        }
      } else {
        const t = performance.now() / 1000;
        for (let i = 0; i < bins; i++) {
          const wave = Math.sin(t * 1.2 + i * 0.22) * 0.5 + 0.5;
          const wave2 = Math.sin(t * 0.7 + i * 0.08) * 0.5 + 0.5;
          data[i] = Math.floor((wave * 0.65 + wave2 * 0.35) * 140);
        }
      }

      const barW = w / bins;
      for (let i = 0; i < bins; i++) {
        const v = data[i] / 255;
        const barH = v * h * 0.18;

        const x = i * barW;
        const y = h - barH - (h * 0.06);

        const hueMix = i / bins;
        // purple → teal
        const r = Math.floor(175 + (143 - 175) * hueMix);
        const g = Math.floor(132 + (211 - 132) * hueMix);
        const b = Math.floor(186 + (204 - 186) * hueMix);

        ctx2d.fillStyle = `rgba(${r},${g},${b},${0.16 + v * 0.35})`;
        ctx2d.fillRect(x, y, Math.max(1, barW - 2), barH);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas id="spectrogramCanvas" ref={canvasRef} aria-hidden="true" />;
}
