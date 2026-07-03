import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Brain, Bot, Play, Activity } from "lucide-react";
import { motion } from "framer-motion";

const automations = [
  {
    title: "Autonomous Email Negotiation Agent",
    description: "Reads incoming emails, understands meeting requests, and finalizes meetings automatically via secure calendar uplink.",
    icon: Mail,
    status: "Active",
    runs: 128,
  },
  {
    title: "AI Daily Operations Manager",
    description: "Analyzes calendar events and pending tasks to generate a daily productivity summary and node notifications.",
    icon: Brain,
    status: "Active",
    runs: 64,
  },
  {
    title: "Meeting Intelligence Agent",
    description: "Processes transcripts, summarizes discussions, extracts action items, and stores insights in long-term memory.",
    icon: Calendar,
    status: "Paused",
    runs: 41,
  },
  {
    title: "Autonomous Workflow Agent",
    description: "Acts as a digital employee orchestrating multiple tools and workflows automatically based on context and goals.",
    icon: Bot,
    status: "Active",
    runs: 93,
  },
];

export default function AutomationCards() {
  return (
    <div className="min-h-screen bg-[#050505] p-10 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 space-y-2 border-l-2 border-emerald-500 pl-6">
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.4em]">
            Deployment_Registry
          </span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Automation_Agents
          </h1>
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            AI powered digital employees running inside Synthetix_OS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((automation, index) => {
            const Icon = automation.icon;
            const isActive = automation.status === "Active";

            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="bg-zinc-900/20 border border-zinc-800 rounded-none transition-all group-hover:border-zinc-600 group-hover:bg-zinc-900/40 relative overflow-hidden">
                  {/* Decorative Corner Accent */}
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r transition-colors ${isActive ? 'border-emerald-500/20' : 'border-zinc-800'}`} />

                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 border ${isActive ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
                        <Icon size={20} />
                      </div>
                      <div className="space-y-1">
                         <CardTitle className="text-[11px] font-black text-white uppercase tracking-wider leading-tight">
                          {automation.title.replace(/ /g, "_")}
                        </CardTitle>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-tighter ${isActive ? 'text-emerald-500/70' : 'text-zinc-600'}`}>
                            {automation.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-[11px] text-zinc-500 leading-relaxed min-h-[44px] lowercase">
                      {automation.description}
                    </p>

                    {/* Telemetry Data */}
                    <div className="py-3 border-y border-zinc-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[9px] text-zinc-600 uppercase tracking-widest">
                        <Activity size={10} />
                        Cycle_Count
                      </div>
                      <span className="text-[11px] font-bold text-zinc-400">
                        {automation.runs.toString().padStart(3, '0')}
                      </span>
                    </div>

                    <Button 
                      className={`w-full rounded-none border text-[10px] font-black uppercase tracking-[0.2em] h-11 transition-all ${
                        isActive 
                        ? "bg-emerald-600/10 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-black" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-600 hover:bg-zinc-800"
                      }`}
                    >
                      <Play size={12} className="mr-2" />
                      Execute_Protocol
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}