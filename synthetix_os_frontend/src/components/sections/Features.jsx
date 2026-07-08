import { motion } from "framer-motion";
import { Brain, Workflow, Database, Zap, Clock, Plug } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Agents",
    desc: "Create digital employees that understand context and make decisions autonomously."
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Design intelligent workflows that adapt and execute tasks without manual rules."
  },
  {
    icon: Database,
    title: "Contextual Memory",
    desc: "Leverage RAG to give your agents knowledge and long-term memory."
  },
  {
    icon: Clock,
    title: "Background Processing",
    desc: "Run heavy tasks asynchronously with reliable queue systems."
  },
  {
    icon: Zap,
    title: "Real-Time Execution",
    desc: "Instant responses and event-driven automation."
  },
  {
    icon: Plug,
    title: "API Integrations",
    desc: "Connect with external apps and services seamlessly."
  }
];

export default function Features() {
  return (
    <section className="border-t border-zinc-900 bg-[#050505] px-4 py-20 text-zinc-400 sm:px-6 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div className="space-y-4">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em]">Capabilities_Registry</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:text-5xl">Power_Automation.</h2>
          </div>
          <p className="text-zinc-600 text-xs max-w-xs font-mono lowercase">
            Everything required to build, deploy, and scale high-bandwidth intelligent workflows.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-1">
          {features.map((feature, index) => (
            <div key={index} className="group border border-zinc-800 bg-zinc-900/20 p-6 transition-all hover:bg-zinc-900/40 sm:p-8 lg:p-10">
              <feature.icon className="text-zinc-700 group-hover:text-emerald-500 mb-6 transition-colors" size={24} />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">{feature.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed lowercase">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
