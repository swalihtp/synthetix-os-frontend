import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Brain, Bot, Play } from "lucide-react";
import { motion } from "framer-motion";

const automations = [
  {
    title: "Autonomous Email Negotiation Agent",
    description:
      "Reads incoming emails, understands meeting requests, checks calendar availability, proposes time slots, and finalizes meetings automatically with a generated meeting link.",
    icon: Mail,
    status: "Active",
    runs: 128,
  },
  {
    title: "AI Daily Operations Manager",
    description:
      "Analyzes today's calendar events, important emails, and pending tasks to generate a daily productivity summary and send notifications.",
    icon: Brain,
    status: "Active",
    runs: 64,
  },
  {
    title: "Meeting Intelligence Agent",
    description:
      "Processes meeting transcripts, summarizes discussions, extracts action items, assigns tasks, and stores insights for later retrieval.",
    icon: Calendar,
    status: "Paused",
    runs: 41,
  },
  {
    title: "Autonomous Workflow Agent",
    description:
      "Acts as a digital employee orchestrating multiple tools and workflows automatically based on context and goals.",
    icon: Bot,
    status: "Active",
    runs: 93,
  },
];

export default function AutomationCards() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Automation Agents</h1>
          <p className="text-gray-600 mt-2">
            AI powered digital employees running inside Synthetix OS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automations.map((automation, index) => {
            const Icon = automation.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="rounded-2xl shadow-md hover:shadow-2xl transition-all border-0">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gray-100">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">
                        {automation.title}
                      </CardTitle>
                    </div>

                    <Badge
                      variant={
                        automation.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {automation.status}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {automation.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Runs</span>
                      <span className="font-semibold">{automation.runs}</span>
                    </div>

                    <Button className="w-full flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Run Automation
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