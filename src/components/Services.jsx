"use client";

import { portfolioData } from "@/data/portfolioData";
import TiltCard3D from "@/components/TiltCard3D";
import Reveal3D from "@/components/Reveal3D";
import {
  FileText,
  Table,
  FolderKanban,
  Mail,
  Receipt,
  ClipboardCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const { services } = portfolioData;

  const iconMap = {
    FileText,
    Table,
    FolderKanban,
    Mail,
    Receipt,
    ClipboardCheck,
    Clock,
  };

  const workflowSteps = [
    {
      step: "01",
      title: "Share Your Task",
      desc: "Send your instructions, templates, and deadlines.",
    },
    {
      step: "02",
      title: "Organized Execution",
      desc: "Accurate work with Hubstaff time tracking & double-checking.",
    },
    {
      step: "03",
      title: "Clear Delivery",
      desc: "Files neatly saved in Drive & prompt status update sent.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#FAF9F6] border-t border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal3D>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Administrative Support</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Services I Can{" "}
              <span className="font-editorial italic font-normal text-teal-700">
                Support.
              </span>
            </h2>
          </div>

          {/* 3D Services Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 perspective-1000">
            {services.map((service) => {
              const Icon = iconMap[service.iconName] || FileText;
              return (
                <TiltCard3D
                  key={service.id}
                  maxTilt={8}
                  scale={1.025}
                  className="exec-card rounded-2xl p-6 flex items-start gap-4 group"
                >
                  <div className="depth-sm w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-teal-700 border border-teal-200/80 group-hover:border-teal-700 flex items-center justify-center text-teal-700 group-hover:text-white transition-colors duration-300 shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </TiltCard3D>
              );
            })}

            {/* 3D CTA Tile */}
            <TiltCard3D
              maxTilt={8}
              scale={1.03}
              className="rounded-2xl bg-slate-900 hover:bg-teal-800 text-white shadow-lg transition-colors duration-300 group"
            >
              <a
                href="#contact"
                className="p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-teal-300">
                    Custom Support
                  </span>
                  <h3 className="depth-sm text-lg font-bold text-white mt-1">
                    Need help with daily admin?
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-300 group-hover:text-white mt-4">
                  <span>Let&apos;s discuss your workflow</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </TiltCard3D>
          </div>
        </Reveal3D>

        {/* 3-Step Client Onboarding Strip */}
        <Reveal3D delay={120}>
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Simple Process
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                How We Work Together
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workflowSteps.map((item) => (
                <TiltCard3D
                  key={item.step}
                  maxTilt={7}
                  scale={1.02}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/70"
                >
                  <span className="depth-sm text-lg font-extrabold text-teal-700 font-editorial italic shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}
