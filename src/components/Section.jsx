/**
 * Section — consistent section wrapper with scroll-margin for anchor nav.
 */
export default function Section({
  id,
  children,
  className = "",
  padding = "section",
  overflow = "overflow-hidden",
}) {
  const pad = padding === "section" ? "section" : padding === "sm" ? "section-sm" : padding;
  return (
    <section
      id={id}
      className={`relative z-0 ${pad} ${overflow} ${className}`}
    >
      {children}
    </section>
  );
}
