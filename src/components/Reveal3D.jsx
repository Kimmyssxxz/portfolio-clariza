"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal3D({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible
          ? "perspective(1200px) rotateX(0deg) translateY(0px) scale(1)"
          : "perspective(1200px) rotateX(10deg) translateY(28px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease",
        transformOrigin: "center bottom",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
