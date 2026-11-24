"use client";

import { portfolioData } from "@/data/portfolioData";
import Image from "next/image";
import TiltCard3D from "@/components/TiltCard3D";
import Floating3DShapes from "@/components/Floating3DShapes";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 overflow-hidden bg-dot-pattern"
    >
      {/* Floating 3D Geometric Cubes & Orbital Ring */}
      <Floating3DShapes />

      {/* Soft warm radial accents */}
      <div className="absolute -top-24 right-0 w-[480px] h-[480px] bg-teal-200/35 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-[420px] h-[420px] bg-amber-200/30 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-8">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Availability Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personal.status}</span>
              <span className="text-slate-300">•</span>
              <span className="text-teal-700 font-semibold">Remote Worldwide</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4">
              Organized Support That Keeps Your Business{" "}
              <span className="font-editorial italic font-normal text-teal-700">
                Running Smoothly.
              </span>
            </h1>

            {/* Identity Subline */}
            <p className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
              {personal.name} —{" "}
              <span className="text-teal-700">{personal.title}</span>
            </p>

            {/* Concise Value Prop */}
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-xl leading-relaxed">
              {personal.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-teal-700 text-white font-semibold text-sm shadow-lg shadow-slate-900/15 hover:shadow-teal-900/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Hire Clariza</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#samples"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm hover:border-teal-600/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Explore Interactive Samples</span>
              </a>
            </div>

            {/* Direct Contact Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-600 pt-5 border-t border-slate-200/80 w-full max-w-xl">
              <a
                href={personal.social.email}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 hover:border-teal-600/40 hover:text-teal-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-medium">{personal.email}</span>
              </a>
              <a
                href={personal.social.phone}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 hover:border-teal-600/40 hover:text-teal-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-medium">{personal.phone}</span>
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-medium">Philippines</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Parallax Portrait Card */}
          <div className="lg:col-span-5 flex justify-center relative perspective-1400">
            <TiltCard3D
              maxTilt={11}
              scale={1.03}
              glare={true}
              className="w-72 sm:w-80 md:w-[370px] rounded-[2rem]"
            >
              {/* 3D Back Offset Shadow Layer */}
              <div
                style={{ transform: "translateZ(-22px) rotate(-3deg)" }}
                className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-tr from-teal-700/20 via-amber-500/15 to-slate-900/15 pointer-events-none"
              />

              {/* Main Portrait Card */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-900/15 bg-slate-100">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/clariza.jpg"
                    alt="Clariza Diaz Merza - Administrative Virtual Assistant"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Caption bar */}
                <div className="bg-slate-900/95 backdrop-blur-md px-5 py-3.5 text-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm block">{personal.name}</span>
                    <span className="text-[11px] text-teal-300 font-medium">
                      Admin • Documentation • Invoicing
                    </span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                </div>
              </div>

              {/* 3D Pop-Out Floating Card 1: Education */}
              <div className="animate-float-3d absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-2.5 z-30">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    AB English Language
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Mindoro State University
                  </span>
                </div>
              </div>

              {/* 3D Pop-Out Floating Card 2: Hubstaff */}
              <div className="animate-float-3d-delayed absolute bottom-16 -left-4 sm:-left-7 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-2.5 z-30">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Hubstaff Tracked
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Transparent Hours
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </div>
    </section>
  );
}
