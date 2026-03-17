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
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          Powerful AI Automation, Simplified
        </h2>

        <p className="text-gray-400 mt-4">
          Everything you need to build, run, and scale intelligent workflows.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 border border-gray-800 p-6 rounded-2xl"
            >
              <feature.icon className="text-purple-400 mb-4" size={28} />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}