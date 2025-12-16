import Link from "next/link";
import Image from "next/image";
import { Flame, Upload, Type, Download, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-ember selection:text-white">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ash/50 border border-ash text-xs font-mono text-ember-glow mb-4">
              <Flame size={12} />
              <span>v1.0 Public Beta</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.1]">
              Bake captions into your <span className="text-ember">final render</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-balance">
              Multi-video subtitle editing and baked-in export — all in the browser.
              No expensive software required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/editor"
                className="h-12 px-8 rounded-lg bg-ember hover:bg-orange-600 text-white font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_-5px_var(--color-ember)] hover:scale-105"
              >
                Start Baking <ChevronRight size={18} />
              </Link>
              <Link
                href="/demo"
                className="h-12 px-8 rounded-lg bg-ash hover:bg-ash-light border border-white/5 text-white font-medium flex items-center gap-2 transition-all"
              >
                Try Demo Workspace
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-ash/20 border-t border-ash">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Upload className="text-ember" />}
                title="Load multiple videos"
                desc="Visualize overlapping dialogue by loading multiple videos comfortably in one workspace."
              />
              <FeatureCard
                icon={<Type className="text-ember" />}
                title="Edit with precision"
                desc="Adjust timing on a unified timeline. Auto-snap to speech patterns for perfect sync."
              />
              <FeatureCard
                icon={<Download className="text-ember" />}
                title="Bake & export"
                desc="Render the final video with 'burned-in' subtitles directly from your browser. No watermark for Pro."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-ash/30 border border-white/5 hover:border-ember/30 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-kiln-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
