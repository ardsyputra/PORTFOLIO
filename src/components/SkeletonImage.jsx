import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && <Skeleton className="absolute inset-0" height="100%" />}
      <img src={src} alt={alt} className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`} onLoad={() => setLoaded(true)} />
    </div>
  );
}
