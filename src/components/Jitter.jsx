import { motion, useReducedMotion } from "framer-motion";

/**
 * Smooth Kinetic Motion Component
 * Replaces jitter with smooth, fluid, spring micro-interactions.
 */
export default function Jitter({
  children,
  className = "",
  ...props
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className} {...props}>{children}</span>;
  }

  return (
    <motion.span
      whileHover={{
        y: -3,
        scale: 1.04,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.96 }}
      className={`inline-block cursor-interactive transition-transform ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
}
