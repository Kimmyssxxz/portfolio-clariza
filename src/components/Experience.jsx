"use client";

import { portfolioData } from "@/data/portfolioData";
import TiltCard3D from "@/components/TiltCard3D";
import Reveal3D from "@/components/Reveal3D";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileCheck,
  Sparkles,
} from "lucide-react";

export default function Experience() {
  const { experience, education } = portfolioData;

  return (
    <section
      id="experience"
      className="py-20 bg-[#F3F0EA]/70 border-y border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal3D>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-teal-800 text-xs font-semibold shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Background</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Experience &{" "}
              <span className="font-editorial italic font-normal text-teal-700">
                Education.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-5 text-slate-900 font-bold text-base">
                <Briefcase className="w-5 h-5 text-teal-700" />
                <h3>Professional Experience</h3>
              </div>

              <div className="relative border-l-2 border-teal-700/25 ml-3 pl-6 space-y-5">
                {experience.map((item, idx) => (
                  <Reveal3D key={idx} delay={idx * 90}>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-teal-700 border-4 border-[#F3F0EA]" />

                      <TiltCard3D
                        maxTilt={4}
                        scale={1.015}
                        className="exec-card rounded-2xl p-6"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-base sm:text-lg font-bold text-slate-900">
                            {item.role}
                          </h4>
                          <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.period}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-teal-700 font-semibold mb-3">
                          {item.company}
                        </p>

                        <div className="space-y-2 mb-4">
                          {item.achievements.map((ach, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-slate-600"
                            >
                              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF9F6] border border-slate-200 text-slate-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </TiltCard3D>
                    </div>
                  </Reveal3D>
                ))}
              </div>
            </div>

            {/* Education & References */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-5 text-slate-900 font-bold text-base">
                  <GraduationCap className="w-5 h-5 text-teal-700" />
                  <h3>Education</h3>
                </div>

                <TiltCard3D
                  maxTilt={7}
                  scale={1.02}
                  className="exec-card rounded-2xl p-6"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold mb-3">
                    Degree
                  </span>
                  <h4 className="depth-sm text-base font-bold text-slate-900 mb-1">
                    {education.degree}
                  </h4>
                  <p className="text-sm text-teal-700 font-semibold mb-3">
                    {education.institution}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {education.note}
                  </p>
                </TiltCard3D>
              </div>

              <TiltCard3D
                maxTilt={7}
                scale={1.02}
                className="exec-card rounded-2xl p-5 flex items-center gap-3.5"
              >
                <div className="depth-sm w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">References</h4>
                  <p className="text-xs text-slate-600">Available upon request.</p>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}
