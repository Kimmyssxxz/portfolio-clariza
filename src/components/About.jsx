"use client";

import { portfolioData } from "@/data/portfolioData";
import TiltCard3D from "@/components/TiltCard3D";
import Reveal3D from "@/components/Reveal3D";
import {
  CheckCircle2,
  GraduationCap,
  Globe,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function About() {
  const { about, education } = portfolioData;

  return (
    <section id="about" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal3D>
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Work With Clariza</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Careful, Organized &{" "}
              <span className="font-editorial italic font-normal text-teal-700">
                Dependable.
              </span>
            </h2>
          </div>

          {/* 3D Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 perspective-1000">
            {/* Main About Card */}
            <TiltCard3D
              maxTilt={5}
              scale={1.015}
              className="md:col-span-7 exec-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-2">
                  About Me
                </span>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  {about.summary}
                </p>
              </div>

              <div className="depth-sm flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {about.workStyle.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    {trait}
                  </span>
                ))}
              </div>
            </TiltCard3D>

            {/* Right Stacked 3D Bento Cards */}
            <div className="md:col-span-5 flex flex-col gap-5">
              <TiltCard3D
                maxTilt={7}
                scale={1.02}
                className="exec-card rounded-3xl p-6 flex items-start gap-4"
              >
                <div className="depth-sm w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Communication Foundation
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {education.degree}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700">
                    {education.institution}
                  </p>
                </div>
              </TiltCard3D>

              <div className="grid grid-cols-2 gap-4 flex-1">
                <TiltCard3D
                  maxTilt={10}
                  scale={1.03}
                  className="exec-card rounded-3xl p-5 flex flex-col justify-between bg-slate-900 text-white border-slate-800"
                >
                  <Globe className="depth-sm w-6 h-6 text-teal-400 mb-3" />
                  <div>
                    <span className="text-sm font-bold block text-white">
                      Remote Ready
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Local & International
                    </span>
                  </div>
                </TiltCard3D>

                <TiltCard3D
                  maxTilt={10}
                  scale={1.03}
                  className="exec-card rounded-3xl p-5 flex flex-col justify-between bg-amber-50/70 border-amber-200/70"
                >
                  <ShieldCheck className="depth-sm w-6 h-6 text-amber-700 mb-3" />
                  <div>
                    <span className="text-sm font-bold block text-slate-900">
                      Confidential
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Careful Info Handling
                    </span>
                  </div>
                </TiltCard3D>
              </div>
            </div>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}
