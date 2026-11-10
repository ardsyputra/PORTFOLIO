import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;

function createParticles(rings = 128, segments = 48) {
  const particles = [];
  const palette = ["#f27655", "#dc674a", "#dba08a", "#f4c9b8"];

  for (let ring = 0; ring < rings; ring += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const theta = (ring / rings) * TAU;
      const phi = (segment / segments) * TAU;
      const colorIndex = Math.floor((ring / rings) * palette.length) % palette.length;
      const normal = [Math.cos(phi) * Math.cos(theta), Math.cos(phi) * Math.sin(theta), Math.sin(phi)];
      const jitter = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
      const direction = normal.map((value, axis) => value * 0.72 + jitter[axis] * 0.5);
      const magnitude = Math.hypot(...direction) || 1;
      particles.push({
        theta,
        phi,
        normal,
        direction: direction.map((value) => value / magnitude),
        phase: Math.random() * TAU,
        distance: 0.12 + Math.random() * 0.42,
        radius: 0.7 + Math.random() * 0.85,
        color: palette[colorIndex],
      });
    }
  }
  return particles;
}

function rotate(point, angleY, angleX, angleZ) {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosZ = Math.cos(angleZ);
  const sinZ = Math.sin(angleZ);
  const x1 = point[0] * cosY + point[2] * sinY;
  const z1 = -point[0] * sinY + point[2] * cosY;
  const y2 = point[1] * cosX - z1 * sinX;
  const z2 = point[1] * sinX + z1 * cosX;
  return [x1 * cosZ - y2 * sinZ, x1 * sinZ + y2 * cosZ, z2];
}

export default function ParticleOrb() {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const movingRef = useRef(false);
  const pinnedRef = useRef(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
    const particles = createParticles(isSmallScreen ? 72 : 128, isSmallScreen ? 32 : 48);
    let width = 0;
    let height = 0;
    let frame = 0;
    let isVisible = false;
    let previousTime = 0;
    let rotationY = -0.3;
    let dispersion = 0;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.25 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      const delta = Math.min((time - previousTime) / 1000 || 0, 0.04);
      previousTime = time;
      const target = movingRef.current || pinnedRef.current ? 1 : 0;
      dispersion += (target - dispersion) * (reducedMotion ? 1 : 1 - Math.exp(-delta * 3.3));
      if (!reducedMotion) rotationY += delta * (0.12 + Math.sin(time * 0.00016) * 0.035);

      ctx.clearRect(0, 0, width, height);
      const angleX = 0.95 + (reducedMotion ? 0 : Math.sin(time * 0.00018) * 0.07);
      const angleZ = 0.32 + (reducedMotion ? 0 : Math.sin(time * 0.00022 + 0.8) * 0.1 + Math.sin(time * 0.00009) * 0.04);
      const scale = Math.min(width, height) * 0.48;
      const camera = 4.1;
      const rise = reducedMotion ? 0 : (0.5 + 0.5 * Math.sin(time * 0.00024 - 1)) * height * 0.035;
      const drift = reducedMotion ? 0 : Math.sin(time * 0.00041 + 1.4) * height * 0.008;
      const centerY = height / 2 - rise + drift;
      const projected = [];

      for (const particle of particles) {
        const fluid = reducedMotion ? 0 : Math.sin(time * 0.00042 + particle.phase) * 0.018;
        const theta = particle.theta + fluid * 0.4;
        const phi = particle.phi + Math.sin(time * 0.00033 + particle.phase) * (reducedMotion ? 0 : 0.025);
        const majorRadius = 0.58 + Math.sin(theta * 2.2 + time * 0.00024 + particle.phase) * (reducedMotion ? 0 : 0.035);
        const tubeRadius = 0.29 + Math.sin(theta * 2 - phi * 2 + time * 0.0003) * (reducedMotion ? 0 : 0.035);
        const normal = [Math.cos(phi) * Math.cos(theta), Math.cos(phi) * Math.sin(theta), Math.sin(phi)];
        const base = [
          (majorRadius + tubeRadius * Math.cos(phi)) * Math.cos(theta),
          (majorRadius + tubeRadius * Math.cos(phi)) * Math.sin(theta),
          tubeRadius * Math.sin(phi),
        ];
        const scatter = particle.distance * dispersion;
        const point = rotate(base.map((value, axis) => value + particle.direction[axis] * scatter), rotationY, angleX, angleZ);
        const viewNormal = rotate(normal, rotationY, angleX, angleZ);
        const isFront = viewNormal[2] > 0.025;
        if (!isFront && dispersion < 0.2) continue;

        const perspective = camera / (camera - point[2]);
        const lambert = Math.max(0.16, 0.36 + viewNormal[0] * -0.25 + viewNormal[1] * 0.36 + viewNormal[2] * 0.55);
        const depthAlpha = isFront ? 0.45 + lambert * 0.48 : dispersion * 0.32;
        projected.push({
          x: width / 2 + point[0] * scale * perspective,
          y: centerY - point[1] * scale * perspective,
          z: point[2],
          radius: particle.radius * (0.7 + perspective * 0.34),
          color: particle.color,
          alpha: Math.min(0.96, depthAlpha),
        });
      }

      projected.sort((a, b) => a.z - b.z);
      for (const dot of projected) {
        ctx.globalAlpha = dot.alpha;
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (isVisible) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !frame) frame = requestAnimationFrame(draw);
      else if (!isVisible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "120px" });
    visibilityObserver.observe(host);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  const togglePinned = () => {
    pinnedRef.current = !pinnedRef.current;
    setPinned(pinnedRef.current);
  };

  return (
    <div className="orb-scene-wrap">
      <button
        ref={hostRef}
        type="button"
        className="particle-orb"
        aria-label="Partikel 3D. Arahkan kursor atau tekan untuk menggerakkan pusaran partikel."
        aria-pressed={pinned}
        onPointerEnter={() => { movingRef.current = true; }}
        onPointerLeave={() => { movingRef.current = false; }}
        onFocus={() => { movingRef.current = true; }}
        onBlur={() => { movingRef.current = false; }}
        onClick={togglePinned}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
      </button>
    </div>
  );
}
