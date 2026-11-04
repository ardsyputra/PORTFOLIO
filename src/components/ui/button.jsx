export function Button({ className = "", variant = "default", children, ...props }) {
  const variants = {
    default: "bg-[#B9251F] text-white hover:bg-[#9F1E19]",
    outline: "border border-[#B9251F]/25 bg-[#F7F4ED] text-[#B9251F] hover:bg-white",
  };

  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B9251F]/20 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
