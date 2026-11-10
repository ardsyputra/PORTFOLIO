import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * 3D Interactive Tilt Card Component
 * Provides smooth 3D perspective rotation and dynamic lighting sheen on hover.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  ...props
}) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        reduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
            }
      }
      whileHover={reduceMotion ? undefined : { scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic 3D lighting sheen */}
      {glare && !reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
}
