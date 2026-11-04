import { motion, useReducedMotion } from "framer-motion";

export default function MotionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 64,
}) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: -distance, y: 0 }
    : direction === "right" ? { x: distance, y: 0 }
      : direction === "zoom" ? { x: 0, y: 28, scale: 0.94 }
      : { x: 0, y: distance };

  return (
    <motion.div
      className={`motion-reveal ${className}`}
      initial={reduceMotion ? false : {
        opacity: 0,
        ...offset,
        filter: direction === "zoom" ? "blur(10px)" : "blur(4px)",
        clipPath: direction === "up" ? "inset(8% 0 0 0)" : undefined,
      }}
      whileInView={reduceMotion ? undefined : {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0% 0 0 0)",
      }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
