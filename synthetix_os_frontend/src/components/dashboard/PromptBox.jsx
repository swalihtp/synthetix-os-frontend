import { useState } from "react";
import { Sparkles, Terminal, ChevronRight, Loader2 } from "lucide-react";
// import API from "../../api/client";

export default function PromptBox({ className }) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      // const res = await API.post("/agents/generate/", { prompt });
      // console.log(res.data);
      
      // Simulating a delay for the terminal feel
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`bg-zinc-900/20 border border-zinc-800 p-6 relative overflow-hidden group ${className}`}>
      {/* Decorative Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

      <div className="relative z-10 space-y-4">
        {/* Header Label */}
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-2">
            <Terminal size={12} className="text-emerald-500" />
            Neural_Workflow_Generator
          </h2>
          <span className="text-[9px] text-zinc-700 font-mono">v1.0.4_stable</span>
        </div>

        {/* Input Area */}
        <div className="relative">
          <div className="absolute top-3 left-3 text-emerald-500/50">
            <ChevronRight size={16} />
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-zinc-950/50 border border-zinc-800 p-3 pl-8 min-h-[120px] text-zinc-300 font-mono text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-zinc-800 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
            placeholder="Input_Automation_Parameters..."
          />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-zinc-600 uppercase tracking-tighter font-bold">Kernel_Ready</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                <span className="text-[9px] text-zinc-600 uppercase tracking-tighter font-bold">GPU_Idle</span>
             </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`flex items-center gap-2 px-6 py-2 border transition-all text-[11px] font-black uppercase tracking-widest ${
              isGenerating || !prompt
                ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                : "border-emerald-500/50 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500 hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Compiling...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate_Workflow
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}