import { motion, useReducedMotion } from "framer-motion";

/**
 * ScrollReveal — reusable, viewport-wide scroll reveal.
 * - direction: up | down | left | right | zoom | clip
 * - once: reveal only once (default true)
 * - staggerChildren: delay between children when used on a container
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  once = true,
  amount = 0.14,
  margin = "0px 0px -10% 0px",
  staggerChildren,
}) {
  const reduceMotion = useReducedMotion();

  const offset =
    direction === "left" ? { x: -distance, y: 0 }
    : direction === "right" ? { x: distance, y: 0 }
    : direction === "zoom" ? { x: 0, y: 18, scale: 0.97 }
    : direction === "clip" ? { x: 0, y: 0, clipPath: "inset(0 100% 0 0)" }
    : { x: 0, y: distance };

  const initial = reduceMotion
    ? false
    : {
        opacity: 0,
        ...offset,
      };

  const animate = reduceMotion
    ? undefined
    : {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0 0 0)",
      };

  return (
    <motion.div
      className={`scroll-reveal ${className}`}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount, margin }}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ ...(staggerChildren ? { staggerChildren } : {}) }}
    >
      {children}
    </motion.div>
  );
}
