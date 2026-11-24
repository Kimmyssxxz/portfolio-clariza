"use client";

import { portfolioData } from "@/data/portfolioData";
import { toolLogoMap, WordIcon } from "./ToolLogos";
import TiltCard3D from "@/components/TiltCard3D";
import Reveal3D from "@/components/Reveal3D";
import { Sparkles } from "lucide-react";

export default function ToolsPlatforms() {
  const { toolsAndPlatforms } = portfolioData;

  return (
    <section
      id="tools"
      className="py-20 bg-[#F3F0EA]/70 border-y border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal3D>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-teal-800 text-xs font-semibold shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Digital Toolkit</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tools & Platforms
            </h2>
            <p className="text-slate-600 text-sm max-w-md mt-2">
              Hover over any tool to see the 3D depth effect.
            </p>
          </div>

          {/* 3D Interactive Pop-Out Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 perspective-1000">
            {toolsAndPlatforms.map((tool) => {
              const LogoComponent = toolLogoMap[tool.id] || WordIcon;
              return (
                <TiltCard3D
                  key={tool.id}
                  maxTilt={15}
                  scale={1.06}
                  glare={true}
                  className="exec-card rounded-2xl p-5 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="depth-md w-14 h-14 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 flex items-center justify-center mb-3.5 shadow-md group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                    <LogoComponent className="w-9 h-9" />
                  </div>
                  <h3 className="depth-sm text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-tight">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 mt-1 leading-tight font-medium">
                    {tool.role}
                  </span>
                </TiltCard3D>
              );
            })}
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}
