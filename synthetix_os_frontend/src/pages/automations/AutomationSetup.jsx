import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";



export default function AutomationSetup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const automation = automationTemplates.find((a) => a.id === id);

  const [prompt, setPrompt] = useState(
    "Reply politely and professionally to all emails."
  );

  if (!automation) {
    return (
      <div className="p-6 text-white">
        <h2 className="text-xl font-semibold">Automation not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 hover:text-white mb-4"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
        <h1 className="text-2xl font-bold">{automation.title}</h1>
        <p className="text-gray-400 mt-2">{automation.description}</p>
      </div>

      {/* Steps */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Workflow Steps</h2>

        <div className="space-y-3">
          {automation.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl"
            >
              <div className="text-sm text-purple-400 font-semibold">
                {step.type}
              </div>
              <div className="text-gray-200">{step.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Config */}
      <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Customize AI Behavior</h2>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full mt-3 p-3 rounded-lg bg-black/40 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
        />
      </div>

      {/* Integration Notice */}
      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-sm text-yellow-300">
        ⚠️ You need to connect Gmail before activating this automation.
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-linear-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition"
          onClick={() => alert("Automation Activated (hook backend here)")}
        >
          Activate Automation
        </button>
      </div>
    </div>
  );
}