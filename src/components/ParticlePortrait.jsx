import { useEffect, useRef, useState } from "react";
import profile from "../assets/images/profile.png";

export default function ParticlePortrait() {
  const canvasRef = useRef(null);
  const assembledRef = useRef(false);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const image = new Image();
    image.src = profile;
    let particles = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let previousTime = 0;
    let isVisible = true;
    let pointer = { x: -1000, y: -1000 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      if (!image.complete || !image.naturalWidth) return;
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.25 : 1.5);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const buffer = document.createElement("canvas");
      buffer.width = Math.min(320, Math.max(180, Math.round(width)));
      buffer.height = Math.max(1, Math.round(buffer.width * height / width));
      const bctx = buffer.getContext("2d");
      const scale = Math.max(buffer.width / image.width, buffer.height / image.height);
      const iw = image.width * scale;
      const ih = image.height * scale;
      bctx.drawImage(image, (buffer.width - iw) / 2, (buffer.height - ih) / 2, iw, ih);
      const pixels = bctx.getImageData(0, 0, buffer.width, buffer.height).data;
      const detail = window.matchMedia("(max-width: 700px)").matches ? 48 : 68;
      const step = Math.max(4, Math.round(buffer.width / detail));
      particles = [];

      for (let y = 0; y < buffer.height; y += step) {
        for (let x = 0; x < buffer.width; x += step) {
          const pixel = (y * buffer.width + x) * 4;
          if (pixels[pixel + 3] < 80) continue;
          const homeX = (x / buffer.width) * width;
          const homeY = (y / buffer.height) * height;
          const awayX = Math.random() * width;
          const awayY = Math.random() * height;
          particles.push({
            x: awayX,
            y: awayY,
            awayX,
            awayY,
            homeX,
            homeY,
            color: [pixels[pixel], pixels[pixel + 1], pixels[pixel + 2]],
            scatterColor: [
              Math.round(pixels[pixel] * 0.35 + 217 * 0.65),
              Math.round(pixels[pixel + 1] * 0.35 + 160 * 0.65),
              Math.round(pixels[pixel + 2] * 0.35 + 135 * 0.65),
            ],
            colorProgress: 0,
            radius: 1 + Math.random() * 1.25,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = (time = 0) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
      previousTime = time;
      ctx.clearRect(0, 0, width, height);
      const targetIsAssembled = assembledRef.current;
      const followRate = targetIsAssembled ? 6.4 : 4.3;
      const follow = reducedMotion ? 1 : 1 - Math.exp(-followRate * delta);
      const colorFollow = reducedMotion ? 1 : 1 - Math.exp(-7 * delta);
      for (const particle of particles) {
        const driftX = !targetIsAssembled && !reducedMotion ? Math.sin(time * 0.00042 + particle.phase) * 10 : 0;
        const driftY = !targetIsAssembled && !reducedMotion ? Math.cos(time * 0.00036 + particle.phase * 1.4) * 8 : 0;
        const targetX = targetIsAssembled ? particle.homeX : particle.awayX + driftX;
        const targetY = targetIsAssembled ? particle.homeY : particle.awayY + driftY;
        const shimmer = targetIsAssembled && !reducedMotion ? Math.sin(time * 0.00045 + particle.phase) * 0.65 : 0;
        particle.x += (targetX + shimmer - particle.x) * follow;
        particle.y += (targetY + shimmer - particle.y) * follow;
        particle.colorProgress += ((targetIsAssembled ? 1 : 0) - particle.colorProgress) * colorFollow;

        if (targetIsAssembled && !reducedMotion) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < 64) {
            const push = ((64 - distance) / 64) * 0.7;
            particle.x += (dx / distance) * push;
            particle.y += (dy / distance) * push;
          }
        }

        const colorMix = particle.colorProgress;
        const red = Math.round(particle.scatterColor[0] + (particle.color[0] - particle.scatterColor[0]) * colorMix);
        const green = Math.round(particle.scatterColor[1] + (particle.color[1] - particle.scatterColor[1]) * colorMix);
        const blue = Math.round(particle.scatterColor[2] + (particle.color[2] - particle.scatterColor[2]) * colorMix);
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (isVisible) frame = requestAnimationFrame(draw);
    };

    const onImageReady = () => {
      build();
      if (isVisible && !frame) frame = requestAnimationFrame(draw);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !frame) frame = requestAnimationFrame(draw);
      else if (!isVisible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "120px" });
    visibilityObserver.observe(canvas);
    image.addEventListener("load", onImageReady);
    if (image.complete && image.naturalWidth) onImageReady();

    const resize = new ResizeObserver(build);
    resize.observe(canvas);
    const move = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const leave = () => { pointer = { x: -1000, y: -1000 }; };
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      image.removeEventListener("load", onImageReady);
      resize.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  const togglePortrait = () => {
    setAssembled((current) => {
      assembledRef.current = !current;
      return !current;
    });
  };

  return (
    <button
      type="button"
      className={`particle-portrait ${assembled ? "is-assembled" : ""}`}
      aria-label={assembled ? "Uraikan potret partikel" : "Satukan partikel menjadi potret"}
      aria-pressed={assembled}
      onClick={togglePortrait}
    >
      <img src={profile} alt="" aria-hidden="true" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="portrait-hint">{assembled ? "TEKAN UNTUK MENGURAI" : "TEKAN UNTUK MENYATUKAN"}</span>
    </button>
  );
}
