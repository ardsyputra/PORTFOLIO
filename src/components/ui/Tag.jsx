import { motion, useReducedMotion } from "framer-motion";

export default function Tag({ label, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="tag"
      {...props}
    >
      {label}
    </motion.span>
  );
}
