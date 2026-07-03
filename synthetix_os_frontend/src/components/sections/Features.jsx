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
    <section className="bg-[#050505] text-zinc-400 py-32 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="space-y-4">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em]">Capabilities_Registry</span>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Power_Automation.</h2>
          </div>
          <p className="text-zinc-600 text-xs max-w-xs font-mono lowercase">
            Everything required to build, deploy, and scale high-bandwidth intelligent workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          {features.map((feature, index) => (
            <div key={index} className="bg-zinc-900/20 border border-zinc-800 p-10 hover:bg-zinc-900/40 transition-all group">
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