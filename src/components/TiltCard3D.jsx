"use client";

import { useRef, useState } from "react";

export default function TiltCard3D({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45), transparent 65%)",
  });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glare) {
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${Math.round(px * 100)}% ${Math.round(py * 100)}%, rgba(255, 255, 255, 0.35), transparent 62%)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    if (glare) {
      setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
        transition: "transform 0.2s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          style={{
            opacity: glareStyle.opacity,
            background: glareStyle.background,
            transition: "opacity 0.25s ease",
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
        />
      )}
    </div>
  );
}
