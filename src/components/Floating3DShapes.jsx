"use client";

export default function Floating3DShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Top-Left 3D Glass Cube */}
      <div className="hidden lg:block absolute top-32 left-10 xl:left-20 perspective-1000 opacity-75">
        <div className="relative w-14 h-14 animate-cube-3d">
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>

      {/* Bottom-Right Smaller 3D Glass Cube */}
      <div className="hidden md:block absolute bottom-20 right-12 xl:right-24 perspective-1000 opacity-60 scale-75">
        <div
          className="relative w-14 h-14 animate-cube-3d"
          style={{ animationDuration: "24s", animationDirection: "reverse" }}
        >
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>

      {/* 3D Orbital Halo Ring behind Hero Portrait */}
      <div className="hidden lg:flex items-center justify-center absolute top-1/2 right-[8%] xl:right-[12%] -translate-y-1/2 w-[440px] h-[440px] perspective-1400 opacity-50">
        <div className="w-full h-full rounded-full border-2 border-dashed border-teal-600/25 animate-orbit-3d relative">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-teal-600 shadow-md shadow-teal-600/40" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-md shadow-amber-500/40" />
        </div>
      </div>
    </div>
  );
}
