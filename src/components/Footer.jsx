"use client";

import { portfolioData } from "@/data/portfolioData";
import { ArrowUp, Mail, Phone } from "lucide-react";

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="text-center md:text-left">
            <a href="#hero" className="font-bold text-lg text-white">
              {personal.name}
            </a>
            <p className="text-xs text-slate-400 mt-0.5">
              {personal.title} • {personal.tagline}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs sm:text-sm font-medium">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#samples" className="hover:text-white transition-colors">Sample Work</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personal.social.email}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-slate-800 hover:bg-teal-700 text-slate-200 hover:text-white transition-colors shrink-0"
              aria-label="Email"
              title={personal.email}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personal.social.phone}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-slate-800 hover:bg-teal-700 text-slate-200 hover:text-white transition-colors shrink-0"
              aria-label="Phone"
              title={personal.phone}
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              type="button"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 {personal.name}. All rights reserved.</p>
          <p>
            {personal.email} | {personal.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}
