
/**
 * Futuristic Sound Lab — lightweight WebAudio engine
 * Purpose: ambient lab tone + filter zones + analyser for spectrogram
 * Note: Created only after user interaction (browser autoplay policies).
 */

export type LabZone = 'low' | 'mid' | 'high' | 'off';

type Engine = {
  ctx: AudioContext;
  analyser: AnalyserNode;
  master: GainNode;
  filter: BiquadFilterNode;
  setZone: (z: LabZone) => void;
  setMuted: (m: boolean) => void;
  ping: () => void;
};

let engine: Engine | null = null;

function createNoiseBuffer(ctx: AudioContext, seconds = 2) {
  const rate = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, rate * seconds, rate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    // soft pink-ish noise
    const white = Math.random() * 2 - 1;
    data[i] = white * 0.15;
  }
  return buffer;
}

export function ensureLabEngine(): Engine {
  if (engine) return engine;

  const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ctx = new AudioCtx();

  const master = ctx.createGain();
  master.gain.value = 0.55;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 900;
  filter.Q.value = 0.9;

  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.82;

  // Ambient oscillators (music-science fusion, non-copyrighted)
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = 110;

  const osc2 = ctx.createOscillator();
  osc2.type = 'triangle';
  osc2.frequency.value = 220;

  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.06;

  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.10; // slow sweep
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 120;

  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  // Noise bed (very low)
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 2);
  noise.loop = true;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.04;

  osc1.connect(oscGain);
  osc2.connect(oscGain);
  oscGain.connect(filter);

  noise.connect(noiseGain);
  noiseGain.connect(filter);

  filter.connect(analyser);
  analyser.connect(master);
  master.connect(ctx.destination);

  osc1.start();
  osc2.start();
  lfo.start();
  noise.start();

  const setZone = (z: LabZone) => {
    // Smooth filter shifts
    const t = ctx.currentTime;
    const smooth = (node: AudioParam, value: number) => {
      node.cancelScheduledValues(t);
      node.setTargetAtTime(value, t, 0.08);
    };

    if (z === 'off') {
      filter.type = 'allpass';
      smooth(filter.frequency, 900);
      smooth(filter.Q, 0.3);
      return;
    }

    filter.type = 'bandpass';
    if (z === 'low') {
      smooth(filter.frequency, 220);
      smooth(filter.Q, 1.1);
    } else if (z === 'mid') {
      smooth(filter.frequency, 900);
      smooth(filter.Q, 0.9);
    } else {
      smooth(filter.frequency, 2400);
      smooth(filter.Q, 0.8);
    }
  };

  const setMuted = (m: boolean) => {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setTargetAtTime(m ? 0.0001 : 0.55, t, 0.06);
  };

  const ping = () => {
    // A short UI-confirmation tone
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = 660;
    const g = ctx.createGain();
    g.gain.value = 0;
    o.connect(g);
    g.connect(master);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.start(t);
    o.stop(t + 0.14);
  };

  engine = { ctx, analyser, master, filter, setZone, setMuted, ping };
  return engine;
}

export function getLabAnalyser(): AnalyserNode | null {
  return engine?.analyser ?? null;
}
