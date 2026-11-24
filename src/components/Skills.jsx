import { portfolioData } from "@/data/portfolioData";
import { CheckCircle2 } from "lucide-react";

export default function Skills() {
  const { coreSkills } = portfolioData;

  return (
    <section id="skills" className="py-16 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
            Core Skills
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Strengths You Can Count On
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {coreSkills.map((skill, idx) => (
            <div
              key={idx}
              className="exec-card rounded-full px-4 py-2.5 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
