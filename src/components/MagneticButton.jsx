import { useRef, useEffect, useCallback } from "react";

/**
 * MagneticButton
 * - Efek hover magnetis halus: elemen tertarik searah kursor dengan jarak terbatas.
 * - Otomatis dinonaktifkan pada layar sentuh.
 * - Hanya mengubah transform (translate), aman untuk performa & tidak menyebabkan layout shift.
 * - Polymorphic via prop `as` (default "span").
 */
export default function MagneticButton({
  as = "span",
  className = "",
  strength = 0.4,
  maxDistance = 20,
  children,
  ...props
}) {
  const ref = useRef(null);
  const x = useRef(0);
  const y = useRef(0);
  const tx = useRef(0);
  const ty = useRef(0);
  const rafRef = useRef(null);
  const animateRef = useRef(() => {});

  const cancelFrame = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mx = x.current - rect.left - rect.width / 2;
    const my = y.current - rect.top - rect.height / 2;

    tx.current += (mx * strength - tx.current) * 0.18;
    ty.current += (my * strength - ty.current) * 0.18;

    const cappedX = Math.max(-maxDistance, Math.min(maxDistance, tx.current));
    const cappedY = Math.max(-maxDistance, Math.min(maxDistance, ty.current));

    el.style.transform = `translate(${cappedX}px, ${cappedY}px)`;

    const dx = Math.abs(mx);
    const dy = Math.abs(my);
    const settling =
      Math.abs(tx.current - cappedX) > 0.01 || Math.abs(ty.current - cappedY) > 0.01;

    if (dx > 0.01 || dy > 0.01 || settling) {
      rafRef.current = requestAnimationFrame(animateRef.current);
    } else {
      rafRef.current = null;
      el.style.transform = "translate(0, 0)";
    }
  }, [strength, maxDistance]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      x.current = e.clientX;
      y.current = e.clientY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      cancelFrame();
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelFrame();
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "translate(0, 0)";
    };
  }, [strength, maxDistance, animate, cancelFrame]);

  const Comp = as;
  return (
    <Comp ref={ref} className={`magnetic ${className}`} {...props} style={{ display: "inline-flex", ...props.style }}>
      {children}
    </Comp>
  );
}
