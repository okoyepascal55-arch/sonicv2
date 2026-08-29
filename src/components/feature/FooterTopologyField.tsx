import { useRef, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   FOOTER TOPOLOGY FIELD — Interactive Liquid Glass Water
   Mouse ripple physics | Iridescent lime-teal color shift
   Noise texture | Wake trail | Water droplet sound | Iridescent grid
   Depth-of-field via opacity | Rain mode | Scroll-linked wave speed
   Horizon mist/fog glow | PERFORMANCE-OPTIMIZED
   ═══════════════════════════════════════════════════════════════════ */

interface WaveLayer {
  baseY: number;
  freq: number;
  speed: number;
  amp: number;
  phase: number;
  thickness: number;
  brightness: number;
  depth: number;
}

interface Ripple {
  x: number;
  y: number;
  birthTime: number;
  amplitude: number;
  frequency: number;
  decay: number;
  speed: number;
}

interface WakePoint {
  x: number;
  y: number;
  birthTime: number;
  strength: number;
}

interface RainDrop {
  x: number;
  y: number;
  birthTime: number;
  impactY: number;
  fallSpeed: number;
  splashed: boolean;
}

interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  birthTime: number;
  lifetime: number;
  size: number;
  hue: number;
}

const WAVE_LAYERS: WaveLayer[] = [
  { baseY: 0.50, freq: 1.6, speed: 0.07, amp: 0.095, phase: 0.0,  thickness: 3.0, brightness: 1.0, depth: 0.0 },
  { baseY: 0.64, freq: 2.4, speed: 0.05, amp: 0.075, phase: 1.9,  thickness: 2.6, brightness: 0.90, depth: 0.12 },
  { baseY: 0.42, freq: 1.2, speed: 0.10, amp: 0.110, phase: 3.7,  thickness: 3.2, brightness: 0.72, depth: 0.28 },
  { baseY: 0.76, freq: 3.0, speed: 0.06, amp: 0.060, phase: 0.8,  thickness: 2.0, brightness: 0.82, depth: 0.08 },
  { baseY: 0.57, freq: 1.9, speed: 0.08, amp: 0.085, phase: 5.2,  thickness: 2.6, brightness: 0.78, depth: 0.18 },
  { baseY: 0.70, freq: 2.7, speed: 0.05, amp: 0.068, phase: 2.5,  thickness: 2.2, brightness: 0.85, depth: 0.04 },
  { baseY: 0.47, freq: 3.5, speed: 0.09, amp: 0.052, phase: 4.1,  thickness: 1.8, brightness: 0.65, depth: 0.36 },
  { baseY: 0.82, freq: 2.0, speed: 0.07, amp: 0.048, phase: 1.2,  thickness: 1.8, brightness: 0.70, depth: 0.06 },
  { baseY: 0.36, freq: 0.9, speed: 0.12, amp: 0.130, phase: 2.8,  thickness: 3.4, brightness: 0.55, depth: 0.44 },
];

/* ── Sparse displacement lookup grid — reduces ~4300 calls/frame to ~630 ── */
const DISP_GRID_COLS = 35;
const DISP_GRID_ROWS = 18;

const GRID_COLS = 56;
const GRID_ROWS = 26;
const REFRACTION_STRENGTH = 0.18;

/* ── DOF via opacity: deeper = more transparent + wider body, no expensive ctx.filter ── */
function getDOFOpacity(depth: number): number {
  if (depth <= 0.05) return 1.0;
  if (depth <= 0.15) return 0.82;
  if (depth <= 0.25) return 0.62;
  if (depth <= 0.35) return 0.42;
  return 0.28;
}

function getDOFBodyWidth(depth: number, baseThickness: number): number {
  const extra = depth * depth * 14;
  return baseThickness * 12 * (1 + depth * 0.5) + extra;
}

function scrollVelocityToMultiplier(velPxPerSec: number): number {
  const base = 1.0;
  const max = 1.6; /* reduced from 3.0 — scroll boosts waves but doesn't go crazy */
  const sensitivity = 0.0005;
  return Math.min(max, base + velPxPerSec * sensitivity);
}

function hslToRgbStr(h: number, s: number, l: number, a: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a2 = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a2 * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  const r = Math.round(f(0) * 255);
  const g = Math.round(f(8) * 255);
  const b = Math.round(f(4) * 255);
  return `rgba(${r},${g},${b},${a})`;
}

function getIridescentColor(depth: number, xNorm: number, t: number, brightness: number, isBody: boolean): string {
  const baseHue = 68 + (172 - 68) * depth;
  const posShift = Math.sin(xNorm * Math.PI * 2 + t * 0.15) * 12;
  const timeShift = Math.sin(t * 0.25 + depth * 3) * 8;
  const hue = (baseHue + posShift + timeShift + 360) % 360;
  const sat = isBody ? 50 + depth * 15 : 60 + (1 - depth) * 10;
  const light = isBody
    ? 45 + (1 - depth) * 12 + brightness * 5
    : 55 + (1 - depth) * 15 + brightness * 8;
  const alpha = isBody ? 0.9 : 1.0;
  return hslToRgbStr(hue, sat, light, alpha);
}

export default function FooterTopologyField() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const startRef    = useRef<number>(0);
  const ripplesRef  = useRef<Ripple[]>([]);
  const wakeRef     = useRef<WakePoint[]>([]);
  const rainRef     = useRef<RainDrop[]>([]);
  const splashRef   = useRef<SplashParticle[]>([]);
  const mouseRef    = useRef<{ x: number; y: number; active: boolean; lastX: number; lastY: number; lastTime: number }>({ x: 0, y: 0, active: false, lastX: 0, lastY: 0, lastTime: 0 });
  const lastRippleRef = useRef<number>(0);
  const noiseRef    = useRef<HTMLCanvasElement | null>(null);
  const lastRainSpawnRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const lastMouseActivityRef = useRef<number>(0);
  const calmFactorRef = useRef<number>(1);
  const smoothScrollYRef = useRef<number>(0);

  const scrollVelRef      = useRef<number>(0);
  const lastScrollYRef    = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);
  const smoothVelRef      = useRef<number>(0);
  const isMobileRef       = useRef<boolean>(false);
  const inViewRef          = useRef<boolean>(true);
  const dprRef             = useRef<number>(1);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    /* ── Generate noise texture (once) ───────────────────────────── */
    const noiseSize = 256;
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = noiseSize;
    noiseCanvas.height = noiseSize;
    const nCtx = noiseCanvas.getContext('2d')!;
    const imgData = nCtx.createImageData(noiseSize, noiseSize);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 255;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 255;
    }
    nCtx.putImageData(imgData, 0, 0);
    noiseRef.current = noiseCanvas;

    /* ── Water droplet sound ──────────────────────────────────── */
    let audioCtx: AudioContext | null = null;
    const getAudioCtx = () => {
      if (!audioCtx) {
        const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AC) audioCtx = new AC();
      }
      return audioCtx;
    };
    const playDroplet = () => {
      const ctx2 = getAudioCtx();
      if (!ctx2) return;
      if (ctx2.state === 'suspended') ctx2.resume();
      const now = ctx2.currentTime;
      const osc = ctx2.createOscillator();
      const gain = ctx2.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(310, now + 0.14);
      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx2.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    };

    /* ── Scroll velocity tracker ───────────────────────────────── */
    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = (now - lastScrollTimeRef.current) / 1000;
      if (lastScrollTimeRef.current > 0 && dt > 0.01) {
        const dy = Math.abs(currentY - lastScrollYRef.current);
        const vel = dy / dt;
        scrollVelRef.current = vel;
        const alpha = 0.12;
        smoothVelRef.current = smoothVelRef.current * (1 - alpha) + vel * alpha;
      }
      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;
    };
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Resize handler ───────────────────────────────────────── */
    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      canvas.width  = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      isMobileRef.current = window.innerWidth < 768;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Shared interaction handler (mouse + touch) ───────────── */
    const handlePointerMove = (x: number, y: number, now: number) => {
      const rect = wrapper.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      const m = mouseRef.current;

      if (m.active) {
        const dx = px - m.lastX;
        const dy = py - m.lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dt = (now - m.lastTime) / 1000;
        const speed = dt > 0 ? dist / dt : 0;
        if (dist > 8 && speed > 180) {
          const steps = Math.max(1, Math.floor(dist / 12));
          for (let s = 0; s < steps; s++) {
            const f = s / steps;
            wakeRef.current.push({
              x: m.lastX + dx * f,
              y: m.lastY + dy * f,
              birthTime: (now - (startRef.current || now)) / 1000,
              strength: Math.min(speed * 0.025, 14),
            });
          }
          if (wakeRef.current.length > 40) {
            wakeRef.current = wakeRef.current.slice(-40);
          }
        }
      }

      m.x = px; m.y = py; m.active = true; m.lastX = px; m.lastY = py; m.lastTime = now;
      lastMouseActivityRef.current = (now - (startRef.current || now)) / 1000;

      if (now - lastRippleRef.current > 180) {
        lastRippleRef.current = now;
        const t2 = (now - (startRef.current || now)) / 1000;
        ripplesRef.current.push({
          x: px, y: py,
          birthTime: t2,
          amplitude: 18 + Math.random() * 12,
          frequency: 0.18 + Math.random() * 0.08,
          decay: 0.012 + Math.random() * 0.006,
          speed: 2.2 + Math.random() * 1.0,
        });
        if (ripplesRef.current.length > 6) ripplesRef.current.shift();
      }
    };

    const handlePointerEnd = () => {
      mouseRef.current.active = false;
    };

    const handleClickLike = (x: number, y: number, now: number) => {
      const rect = wrapper.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      const t2 = (now - (startRef.current || now)) / 1000;
      lastMouseActivityRef.current = t2;
      ripplesRef.current.push({
        x: px, y: py,
        birthTime: t2,
        amplitude: 35,
        frequency: 0.15,
        decay: 0.008,
        speed: 2.8,
      });
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
      if (!isMobileRef.current) playDroplet();
    };

    /* ── Mouse interaction ────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY, performance.now());
    };

    const onMouseLeave = () => {
      handlePointerEnd();
    };

    const onClick = (e: MouseEvent) => {
      handleClickLike(e.clientX, e.clientY, performance.now());
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', onMouseLeave);
    wrapper.addEventListener('click', onClick);

    /* ── Touch interaction ──────────────────────────────────── */
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const now = performance.now();
      handlePointerMove(t.clientX, t.clientY, now);
      handleClickLike(t.clientX, t.clientY, now);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      handlePointerMove(t.clientX, t.clientY, performance.now());
    };

    const onTouchEnd = () => {
      handlePointerEnd();
    };

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true });
    wrapper.addEventListener('touchend', onTouchEnd);

    /* ── Pre-compute sparse displacement field (called ONCE per frame) ── */
    const computeSparseDisplacement = (W: number, H: number, t: number): number[][] => {
      /* Snapshot arrays once to avoid repeated ref reads */
      const ripples = ripplesRef.current;
      const wakes   = wakeRef.current;
      const rains   = rainRef.current;
      const field: number[][] = [];

      const stepX = W / (DISP_GRID_COLS - 1);
      const stepY = H / (DISP_GRID_ROWS - 1);

      for (let row = 0; row < DISP_GRID_ROWS; row++) {
        const rowData: number[] = [];
        const py = row * stepY;
        for (let col = 0; col < DISP_GRID_COLS; col++) {
          const px = col * stepX;
          let total = 0;
          /* ripples */
          for (let r = 0; r < ripples.length; r++) {
            const ri = ripples[r];
            const age = t - ri.birthTime;
            const dx = px - ri.x;
            const dy = py - ri.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const phase = dist * ri.frequency - age * ri.speed;
            const attenuation = Math.exp(-ri.decay * dist) * Math.exp(-0.25 * age);
            if (attenuation > 0.001) {
              total += ri.amplitude * Math.sin(phase) * attenuation;
            }
          }
          /* wakes */
          for (let w = 0; w < wakes.length; w++) {
            const wk = wakes[w];
            const age = t - wk.birthTime;
            if (age < 0 || age > 2.5) continue;
            const dx = px - wk.x;
            const dy = py - wk.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const spread = 28 + age * 20;
            const decay = Math.exp(-age * 1.6);
            const falloff = Math.exp(-(dist * dist) / (spread * spread));
            total -= wk.strength * falloff * decay;
          }
          /* rain */
          for (let d = 0; d < rains.length; d++) {
            const dr = rains[d];
            const age = t - dr.birthTime;
            const impactAge = age - 0.42;
            if (impactAge < 0 || impactAge > 2.0) continue;
            const dx = px - dr.x;
            const dy = py - dr.impactY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const rippleRadius = impactAge * 55;
            const ringDist = Math.abs(dist - rippleRadius);
            const ringWidth = 3 + impactAge * 4;
            const ringFactor = Math.exp(-ringDist * ringDist / (ringWidth * ringWidth));
            const damp = Math.exp(-impactAge * 1.8);
            total += 3.5 * ringFactor * damp * Math.sin(dist * 0.35 - impactAge * 3);
          }
          rowData.push(total);
        }
        field.push(rowData);
      }
      return field;
    };

    /* bilinear interpolation into sparse displacement field */
    const sampleDisplacement = (field: number[][], px: number, py: number, W: number, H: number): number => {
      const colF = (px / W) * (DISP_GRID_COLS - 1);
      const rowF = (py / H) * (DISP_GRID_ROWS - 1);
      const c0 = Math.max(0, Math.min(DISP_GRID_COLS - 2, Math.floor(colF)));
      const r0 = Math.max(0, Math.min(DISP_GRID_ROWS - 2, Math.floor(rowF)));
      const c1 = c0 + 1;
      const r1 = r0 + 1;
      const fc = colF - c0;
      const fr = rowF - r0;
      const v00 = field[r0][c0];
      const v10 = field[r0][c1];
      const v01 = field[r1][c0];
      const v11 = field[r1][c1];
      const top = v00 + (v10 - v00) * fc;
      const bot = v01 + (v11 - v01) * fc;
      return top + (bot - top) * fr;
    };

    /* ── Grid vertex pre-calculation ───────────────────────────── */
    const getGridVertices = (W: number, H: number) => {
      const horizonY = H * 0.28;
      const floorY = H * 0.98;
      const floorH = floorY - horizonY;
      const verts: { x: number; y: number; cNorm: number; rNorm: number }[] = [];
      for (let row = 0; row <= GRID_ROWS; row++) {
        const rNorm = row / GRID_ROWS;
        const persp = rNorm * rNorm;
        const baseY = horizonY + persp * floorH;
        for (let col = 0; col <= GRID_COLS; col++) {
          const cNorm = col / GRID_COLS;
          const hPersp = 0.5 + (cNorm - 0.5) * (0.3 + 0.7 * persp);
          const baseX = W * hPersp;
          verts.push({ x: baseX, y: baseY, cNorm, rNorm });
        }
      }
      return { verts, horizonY, floorY };
    };

    /* ── Base wave height ─────────────────────────────────────── */
    const getWaveHeightAt = (x: number, t: number, speedMul: number, calmMul: number, W: number, H: number): number => {
      let total = 0;
      for (let i = 0; i < WAVE_LAYERS.length; i++) {
        const wave = WAVE_LAYERS[i];
        const u = x / W;
        const angle = t * wave.speed * speedMul * Math.PI * 2 - u * Math.PI * 2 * wave.freq + wave.phase;
        const sinVal = Math.sin(angle);
        const harmonic = Math.sin(angle * 1.7 + 0.9) * 0.25;
        total += (sinVal + harmonic) * wave.amp * H * wave.brightness * calmMul;
      }
      return total;
    };

    /* ── Main draw loop ────────────────────────────────────────── */
    const draw = (ts: number) => {
      frameCountRef.current++;
      if (!startRef.current) startRef.current = ts;
      const realT = (ts - startRef.current) / 1000;
      const dpr = dprRef.current;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const isMobile = isMobileRef.current;

      /* Decay scroll velocity when idle */
      if (smoothVelRef.current < 5) {
        smoothVelRef.current *= 0.92;
      }
      const speedMul = scrollVelocityToMultiplier(smoothVelRef.current);

      /* ── Smoothed scroll position for horizon parallax ────── */
      const rawScrollY = window.scrollY;
      smoothScrollYRef.current += (rawScrollY - smoothScrollYRef.current) * 0.06;
      const scrollParallax = smoothScrollYRef.current * 0.015;

      /* ── Idle calm factor: after 5s no mouse, waves settle ─ */
      const idleElapsed = realT - lastMouseActivityRef.current;
      const targetCalm = idleElapsed > 3.0 ? 0.10 : 1.0;
      const calmLerpSpeed = targetCalm < 0.5 ? 0.005 : 0.06; /* slow settle → active, fast release */
      calmFactorRef.current += (targetCalm - calmFactorRef.current) * calmLerpSpeed;
      const calmFactor = calmFactorRef.current;

      /* ── Rain auto-spawn ───────────────────────────────────── */
      const now = performance.now();
      const rainInterval = (isMobile ? 1800 : 700 + Math.random() * 900) / (0.3 + calmFactor * 0.7);
      if (now - lastRainSpawnRef.current > rainInterval) {
        lastRainSpawnRef.current = now;
        const rx = Math.random() * W;
        const impactY = H * (0.38 + Math.random() * 0.35);
        rainRef.current.push({
          x: rx,
          y: -15 - Math.random() * 30,
          birthTime: realT,
          impactY,
          fallSpeed: 0.9 + Math.random() * 0.5,
          splashed: false,
        });
        const maxRain = isMobile ? 5 : 14;
        if (rainRef.current.length > maxRain) rainRef.current.shift();
      }

      /* Prune stale arrays */
      ripplesRef.current = ripplesRef.current.filter(r => (realT - r.birthTime) < 6);
      wakeRef.current = wakeRef.current.filter(w => (realT - w.birthTime) < 2.5);

      ctx.clearRect(0, 0, W, H);

      /* ── Deep warm background ─────────────────────────────── */
      ctx.fillStyle = '#0b0b0c'; /* matches site bg-foreground-950 */
      ctx.fillRect(0, 0, W, H);
      const warmGrad = ctx.createRadialGradient(W * 0.5, H * 0.55, 0, W * 0.5, H * 0.55, W * 0.7);
      warmGrad.addColorStop(0, 'rgba(18,20,14,0.20)');
      warmGrad.addColorStop(0.5, 'rgba(12,13,10,0.08)');
      warmGrad.addColorStop(1, 'rgba(11,11,12,0)');
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, W, H);

      /* ── ═══ HORIZON MIST / FOG GLOW ═══ ──────────────────────── */
      /* atmospheric perspective: luminous haze where water meets dark depth */
      const horizonY = H * 0.28;
      const parallaxShift = scrollParallax * 2.2;
      const mistTop = horizonY - H * 0.06 + parallaxShift;
      const mistBottom = horizonY + H * 0.28 + parallaxShift;
      const mistH = mistBottom - mistTop;

      /* main horizon glow — wider, more luminous */
      const mistGrad = ctx.createLinearGradient(0, mistTop, 0, mistBottom);
      mistGrad.addColorStop(0, 'rgba(180,210,90,0)');
      mistGrad.addColorStop(0.10, 'rgba(175,205,95,0.025)');
      mistGrad.addColorStop(0.28, 'rgba(160,195,100,0.055)');
      mistGrad.addColorStop(0.48, 'rgba(130,180,120,0.035)');
      mistGrad.addColorStop(0.72, 'rgba(80,150,140,0.014)');
      mistGrad.addColorStop(1, 'rgba(40,100,120,0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, mistTop, W, mistH);

      /* tighter luminous band right at horizon line — the "glow ridge" */
      const glowRidgeY = horizonY + parallaxShift;
      const tightGlow = ctx.createLinearGradient(0, glowRidgeY - 10, 0, glowRidgeY + 28);
      tightGlow.addColorStop(0, 'rgba(190,220,110,0)');
      tightGlow.addColorStop(0.30, 'rgba(175,210,105,0.065)');
      tightGlow.addColorStop(0.55, 'rgba(140,185,115,0.040)');
      tightGlow.addColorStop(1, 'rgba(90,150,130,0)');
      ctx.fillStyle = tightGlow;
      ctx.fillRect(0, glowRidgeY - 10, W, 38);

      /* subtle mist streaks — wide horizontal bands that drift slowly */
      const mistStreaks = isMobile ? 1 : 3;
      for (let i = 0; i < mistStreaks; i++) {
        const streakY = mistTop + (i + 0.5) * (mistH / 3);
        const streakDrift = Math.sin(realT * 0.06 + i * 2.3) * W * 0.15 + scrollParallax * 1.6;
        const streakW = W * (0.6 + Math.sin(realT * 0.04 + i * 1.7) * 0.2);
        const streakX = (W - streakW) * 0.5 + streakDrift;
        const streakAlpha = 0.018 + Math.sin(realT * 0.07 + i * 1.1) * 0.006;
        const streakGrad = ctx.createLinearGradient(streakX, 0, streakX + streakW, 0);
        streakGrad.addColorStop(0, 'rgba(170,210,100,0)');
        streakGrad.addColorStop(0.4, `rgba(170,210,100,${streakAlpha})`);
        streakGrad.addColorStop(0.6, `rgba(140,180,120,${streakAlpha})`);
        streakGrad.addColorStop(1, 'rgba(140,180,120,0)');
        ctx.fillStyle = streakGrad;
        ctx.fillRect(0, streakY - 1.5, W, 3);
      }

      /* ── Pre-compute sparse displacement field ONCE ────────── */
      const dispField = isMobile ? [] : computeSparseDisplacement(W, H, realT);

      /* ── Draw refracted perspective grid — IRIDESCENT ───────── */
      if (!isMobile) {
      /* ── Pre-calculate grid with sampled displacement ──────── */
      const { verts } = getGridVertices(W, H);
      const cols = GRID_COLS + 1;

      const refractedVerts = verts.map(v => {
        const waveH = getWaveHeightAt(v.x, realT, speedMul, calmFactor, W, H);
        const rippleH = sampleDisplacement(dispField, v.x, v.y, W, H);
        const depthFactor = Math.max(0, 1 - v.rNorm * 0.5);
        const refractY = v.y - (waveH + rippleH) * REFRACTION_STRENGTH * depthFactor;
        return { x: v.x, y: refractY, origY: v.y, rNorm: v.rNorm, cNorm: v.cNorm };
      });
      for (let col = 0; col <= GRID_COLS; col++) {
        const distFromCenter = Math.abs(col / GRID_COLS - 0.5) * 2;
        const edgeFade = 1 - distFromCenter * distFromCenter * 0.5;
        for (let row = 0; row < GRID_ROWS; row++) {
          const idx1 = row * cols + col;
          const idx2 = (row + 1) * cols + col;
          const v1 = refractedVerts[idx1];
          const v2 = refractedVerts[idx2];
          const hue = 68 + (172 - 68) * (row / GRID_ROWS) + Math.sin(realT * 0.15 + col * 0.35) * 22;
          const alpha = 0.042 * edgeFade;
          ctx.strokeStyle = hslToRgbStr(hue, 55, 58, alpha);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(v1.x, v1.y);
          ctx.lineTo(v2.x, v2.y);
          ctx.stroke();
        }
      }

      for (let row = 0; row <= GRID_ROWS; row++) {
        const rowFade = 0.3 + (row / GRID_ROWS) * 0.7;
        for (let col = 0; col < GRID_COLS; col++) {
          const idx1 = row * cols + col;
          const idx2 = row * cols + (col + 1);
          const v1 = refractedVerts[idx1];
          const v2 = refractedVerts[idx2];
          const hue = 68 + (172 - 68) * (col / GRID_COLS) + Math.sin(realT * 0.12 + row * 0.28) * 20;
          const alpha = 0.036 * rowFade;
          ctx.strokeStyle = hslToRgbStr(hue, 50, 55, alpha);
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(v1.x, v1.y);
          ctx.lineTo(v2.x, v2.y);
          ctx.stroke();
        }
      }
      }

      /* ── Rain droplets ────────────────────────────────────────── */
      rainRef.current = rainRef.current.filter(d => (realT - d.birthTime) < 3.5);

      for (const d of rainRef.current) {
        const age = realT - d.birthTime;
        const isFalling = age < 0.42;
        const impactAge = age - 0.42;

        /* ── Splash burst on first impact frame ────────────── */
        if (impactAge > 0.001 && !d.splashed) {
          d.splashed = true;
          const particleCount = 5 + Math.floor(Math.random() * 6);
          for (let p = 0; p < particleCount; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 45 + Math.random() * 60;
            splashRef.current.push({
              x: d.x,
              y: d.impactY,
              vx: Math.cos(angle) * speed * (0.3 + Math.random() * 0.7),
              vy: -Math.abs(Math.sin(angle)) * speed * 0.8 - Math.random() * 35,
              birthTime: realT,
              lifetime: 0.5 + Math.random() * 0.55,
              size: 0.7 + Math.random() * 1.4,
              hue: 75 + Math.random() * 25,
            });
          }
          const maxSplash = isMobile ? 30 : 120;
          if (splashRef.current.length > maxSplash) {
            splashRef.current = splashRef.current.slice(-maxSplash);
          }
        }

        if (isFalling) {
          const fy = d.y + (d.impactY + 15) * (age / 0.42);
          const fallAlpha = 0.5 + age / 0.42 * 0.3;
          ctx.beginPath();
          ctx.moveTo(d.x, fy - 7);
          ctx.lineTo(d.x, fy + 3);
          ctx.strokeStyle = `rgba(180,220,120,${fallAlpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.x, fy, 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,255,160,${fallAlpha * 0.7})`;
          ctx.fill();
        }

        if (impactAge > 0 && impactAge < 2.0) {
          const rippleR = impactAge * 55;
          const rippleAlpha = (1 - impactAge / 2) * 0.12;
          const rippleHue = 68 + (172 - 68) * (impactAge / 2);
          if (rippleR > 1) {
            ctx.beginPath();
            ctx.arc(d.x, d.impactY, rippleR, 0, Math.PI * 2);
            ctx.strokeStyle = hslToRgbStr(rippleHue, 40, 58, rippleAlpha);
            ctx.lineWidth = 0.7;
            ctx.stroke();
            const r2 = rippleR * 0.55;
            if (r2 > 1) {
              ctx.beginPath();
              ctx.arc(d.x, d.impactY, r2, 0, Math.PI * 2);
              ctx.strokeStyle = hslToRgbStr(rippleHue + 5, 35, 60, rippleAlpha * 0.7);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      /* ── Splash micro-droplets: particles burst upward & arc down ─ */
      splashRef.current = splashRef.current.filter(p => (realT - p.birthTime) < p.lifetime);
      const GRAVITY = 280;
      for (const sp of splashRef.current) {
        const pAge = realT - sp.birthTime;
        const progress = pAge / sp.lifetime;
        if (progress > 1) continue;
        const px = sp.x + sp.vx * pAge;
        const py = sp.y + sp.vy * pAge + 0.5 * GRAVITY * pAge * pAge;
        const alpha = (1 - progress) * (1 - progress) * 0.75;
        const hue = sp.hue + progress * 30;
        /* tiny glow aura */
        const glow = ctx.createRadialGradient(px, py, 0, px, py, sp.size * 2.5);
        glow.addColorStop(0, hslToRgbStr(hue, 50, 85, alpha * 0.55));
        glow.addColorStop(0.5, hslToRgbStr(hue, 45, 70, alpha * 0.15));
        glow.addColorStop(1, 'rgba(220,240,120,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, sp.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        /* bright core */
        ctx.beginPath();
        ctx.arc(px, py, sp.size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,240,${alpha * 0.80})`;
        ctx.fill();
      }

      /* ── Volumetric Wave Bodies — DOF via opacity, NO ctx.filter ── */
      /* Sorted back-to-front so deeper renders first, surface on top */
      const sortedWaves = [...WAVE_LAYERS]
        .filter(w => !isMobile || w.depth <= 0.20)
        .sort((a, b) => b.depth - a.depth);
      for (const wave of sortedWaves) {
        const anchorY = wave.baseY * H;
        const dofOpacity = getDOFOpacity(wave.depth);
        const bodyWidth = getDOFBodyWidth(wave.depth, wave.thickness);
        const points: { x: number; y: number; sin: number; crest: number }[] = [];
        const step = isMobile ? 6 : 3; /* mobile: even sparser sampling */
        for (let px = -step; px <= W + step; px += step) {
          const u = px / W;
          const angle = realT * wave.speed * speedMul * Math.PI * 2 - u * Math.PI * 2 * wave.freq + wave.phase;
          const sinVal = Math.sin(angle);
          const harmonic = Math.sin(angle * 1.7 + 0.9) * 0.25;
          const combined = sinVal + harmonic;
          const rippleH = isMobile ? 0 : sampleDisplacement(dispField, px, anchorY, W, H);
          const py = anchorY + combined * wave.amp * H * calmFactor + rippleH;
          const crest = Math.max(0, Math.min(1, (combined + 1.2) / 2.4));
          points.push({ x: px, y: py, sin: sinVal, crest });
        }

        /* ── Body glow (deeper = softer, wider, more transparent) ── */
        const bodyAlpha = wave.brightness * 0.070 * (1 - wave.depth * 0.25) * dofOpacity;
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = bodyWidth;
        ctx.strokeStyle = getIridescentColor(wave.depth, wave.baseY, realT, wave.brightness, true);
        ctx.globalAlpha = bodyAlpha;
        ctx.stroke();

        /* Inner body — thinner, brighter */
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.lineWidth = bodyWidth * 0.5;
        ctx.strokeStyle = getIridescentColor(wave.depth * 0.7, wave.baseY, realT, wave.brightness * 1.1, true);
        ctx.globalAlpha = Math.min(1, bodyAlpha * 1.8);
        ctx.stroke();

        /* Surface line */
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.lineWidth = wave.thickness * 0.7;
        ctx.strokeStyle = getIridescentColor(wave.depth * 0.3, wave.baseY, realT, wave.brightness * 1.2, false);
        ctx.globalAlpha = wave.brightness * 0.65;
        ctx.stroke();
        ctx.globalAlpha = 1;

        /* Specular highlights — reduced density (every 6th instead of 3rd, 14th on mobile) */
        for (let i = 0; i < points.length; i += (isMobile ? 14 : 6)) {
          const p = points[i];
          if (p.crest > 0.55) {
            const glintSize = 2 + p.crest * 5;
            const glintAlpha = (p.crest - 0.55) * wave.brightness * 0.5;
            const glowHue = 68 + (172 - 68) * wave.depth + Math.sin(realT * 0.3 + p.x * 0.005) * 20;
            const glowColor = hslToRgbStr((glowHue + 360) % 360, 45, 75, glintAlpha * 0.25);
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glintSize * 3);
            glow.addColorStop(0, glowColor);
            glow.addColorStop(0.5, hslToRgbStr((glowHue + 10) % 360, 40, 70, glintAlpha * 0.08));
            glow.addColorStop(1, 'rgba(220,235,120,0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glintSize * 3, 0, Math.PI * 2);
            ctx.fill();

            const coreColor = hslToRgbStr((glowHue + 15) % 360, 30, 88, glintAlpha);
            const coreGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glintSize);
            coreGlow.addColorStop(0, coreColor);
            coreGlow.addColorStop(1, 'rgba(255,255,220,0)');
            ctx.fillStyle = coreGlow;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glintSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${glintAlpha * 1.3})`;
            ctx.fill();
          }
        }
      }

      /* ── Caustic light patterns ─────────────────────────────── */
      const causticCount = isMobile ? 3 : 8;
      for (let i = 0; i < causticCount; i++) {
        const cx = ((Math.sin(realT * 0.04 + i * 1.9) * 0.5 + 0.5) * 0.9 + 0.05) * W;
        const cy = ((Math.sin(realT * 0.03 + i * 2.7) * 0.5 + 0.5) * 0.4 + 0.35) * H;
        const r = 25 + Math.sin(realT * 0.06 + i * 1.1) * 12;
        const causticHue = 68 + (172 - 68) * (i / 7) + Math.sin(realT * 0.2 + i) * 15;
        const a = 0.008 + Math.sin(realT * 0.05 + i * 2.3) * 0.004;
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        cg.addColorStop(0, hslToRgbStr(causticHue, 50, 55, a));
        cg.addColorStop(0.5, hslToRgbStr(causticHue + 5, 45, 50, a * 0.5));
        cg.addColorStop(1, hslToRgbStr(causticHue, 40, 50, 0));
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── Surface tension rings ──────────────────────────────── */
      if (!isMobile) {
        for (let i = 0; i < 4; i++) {
          const ringPhase = (realT * 0.15 + i * 1.5) % 3;
          const ringProgress = ringPhase / 3;
          const ringX = ((Math.sin(i * 2.1) * 0.5 + 0.5) * 0.8 + 0.1) * W;
          const ringY = ((Math.sin(i * 3.3) * 0.5 + 0.5) * 0.3 + 0.35) * H;
          const ringR = ringProgress * 60;
          const ringHue = 68 + (172 - 68) * ringProgress;
          const ringA = (1 - ringProgress) * 0.035;
          if (ringR > 2) {
            ctx.beginPath();
            ctx.arc(ringX, ringY, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = hslToRgbStr(ringHue, 45, 55, ringA);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      /* ── Wake trail visuals ─────────────────────────────────── */
      if (!isMobile) {
        for (const w of wakeRef.current) {
          const age = realT - w.birthTime;
          const radius = age * 35;
          const alpha = (1 - age / 2.5) * 0.025 * (w.strength / 14);
          const wakeHue = 68 + (172 - 68) * (age / 2.5);
          if (radius > 1 && alpha > 0.001) {
            ctx.beginPath();
            ctx.arc(w.x, w.y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = hslToRgbStr(wakeHue, 40, 55, alpha);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* ── Mouse cursor glow ──────────────────────────────────── */
      if (!isMobile) {
        const mouse = mouseRef.current;
        if (mouse.active) {
          const mGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
          mGrad.addColorStop(0, 'rgba(64,200,184,0.06)');
          mGrad.addColorStop(0.5, 'rgba(64,200,184,0.02)');
          mGrad.addColorStop(1, 'rgba(64,200,184,0)');
          ctx.fillStyle = mGrad;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* ── Bottom water surface reflection ────────────────────── */
      const surfaceGrad = ctx.createLinearGradient(0, H - 50, 0, H);
      surfaceGrad.addColorStop(0, 'rgba(200,212,64,0)');
      surfaceGrad.addColorStop(0.5, 'rgba(200,212,64,0.020)');
      surfaceGrad.addColorStop(1, 'rgba(200,212,64,0.050)');
      ctx.fillStyle = surfaceGrad;
      ctx.fillRect(0, H - 50, W, 50);

      /* ── Subtle vignette ───────────────────────────────────── */
      const vigGrad = ctx.createRadialGradient(W * 0.5, H * 0.5, W * 0.35, W * 0.5, H * 0.5, W * 0.92);
      vigGrad.addColorStop(0, 'rgba(24,24,24,0)');
      vigGrad.addColorStop(0.7, 'rgba(24,24,24,0.10)');
      vigGrad.addColorStop(1, 'rgba(24,24,24,0.40)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);

      /* ── Noise texture overlay (every frame for consistency) ── */
      if (!isMobile) {
        const noiseC = noiseRef.current;
        if (noiseC) {
          ctx.globalAlpha = 0.018;
          ctx.globalCompositeOperation = 'overlay';
          const ns = noiseSize;
          for (let tx = 0; tx < W; tx += ns) {
            for (let ty = 0; ty < H; ty += ns) {
              const dw = Math.min(ns, W - tx);
              const dh = Math.min(ns, H - ty);
              ctx.drawImage(noiseC, 0, 0, ns, ns, tx, ty, dw, dh);
            }
          }
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
        }
      }

      if (inViewRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        rafRef.current = 0;
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    /* ── Fully pause rendering when the footer is off-screen ── */
    const visObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
        } else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { rootMargin: '100px' }
    );
    visObserver.observe(wrapper);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      visObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
      wrapper.removeEventListener('click', onClick);
      wrapper.removeEventListener('touchstart', onTouchStart);
      wrapper.removeEventListener('touchmove', onTouchMove);
      wrapper.removeEventListener('touchend', onTouchEnd);
      if (audioCtx) audioCtx.close();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden cursor-crosshair"
      style={{ zIndex: 0, background: '#0b0b0c', height: 'clamp(140px, 22vw, 300px)' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 0,
        }}
      />

      {/* Top fade — soft transition from content area into waves */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          height: '25%',
          zIndex: 1,
          background:
            'linear-gradient(to bottom, ' +
            'rgba(24,24,24,0.55) 0%, ' +
            'rgba(24,24,24,0.20) 40%, ' +
            'rgba(24,24,24,0.05) 70%, ' +
            'rgba(24,24,24,0) 100%)',
        }}
      />

      {/* Bottom depth darkening */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: 0,
          height: '25%',
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(24,24,24,0.20) 0%, rgba(24,24,24,0.06) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}