/**
 * Marquee — animated technology ticker.
 * Duplicate children internally for seamless loop.
 */
export default function Marquee({ children, className = "", speed = 24 }) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ "--speed": `${speed}s` }}
    >
      <div className="animate-marquee">
        {children}
        {children}
      </div>
    </div>
  );
}
