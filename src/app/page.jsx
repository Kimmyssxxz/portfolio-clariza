import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ToolsPlatforms from "@/components/ToolsPlatforms";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import SampleWork from "@/components/SampleWork";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-teal-700 selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <ToolsPlatforms />
        <Skills />
        <Services />
        <SampleWork />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
