import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { 
  Link2, 
  Unlink, 
  Shield, 
  Mail, 
  Calendar, 
  Slack, 
  Send, 
  Wifi, 
  WifiOff,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import axios from "axios"; // or your API utility
import { getIntegrationStatus } from "@/api/integrations";

export default function Integrations() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const providers = [
    { id: 'gmail', name: 'Gmail_Protocol', icon: Mail, color: 'text-red-500', desc: 'Read/Send neural transmissions via SMTP' },
    { id: 'google_calendar', name: 'Calendar_Schedule', icon: Calendar, color: 'text-blue-500', desc: 'Sync temporal events & deadline markers' },
    { id: 'slack', name: 'Slack_Relay', icon: Slack, color: 'text-purple-500', desc: 'Push notifications to external workspace nodes' },
    { id: 'telegram', name: 'Telegram_Link', icon: Send, color: 'text-sky-500', desc: 'End-to-end encrypted command uplink' },
  ];

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await getIntegrationStatus()
      setStatus(res.data);
    } catch (err) {
      console.error("Link_Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (providerId) => {
    try {
      // Step 1: Request Auth URL from your Django backend
      const res = await axios.post(`/api/integrations/${providerId}/connect/`, {
        agent_id: "system_root" // or specific context
      });
      // Step 2: Redirect to Google/Provider OAuth
      window.location.href = res.data.authorization_url || res.data.auth_url;
    } catch (err) {
      alert("HANDSHAKE_ERROR: Check system logs");
    }
  };

  return (
    <div className="flex bg-[#030303] min-h-screen font-mono text-zinc-500 uppercase">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 lg:p-12 max-w-6xl mx-auto w-full space-y-12">
          
          {/* 1. SIGNAL STATUS HEADER */}
          <header className="flex justify-between items-center border-b border-zinc-900 pb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-white tracking-tighter">
                SIGNAL_BRIDGE<span className="text-emerald-500">.v2</span>
              </h1>
              <p className="text-[10px] tracking-[0.4em] text-zinc-600 flex items-center gap-2">
                <Shield size={12} /> Encrypted Handshake Protocol Active
              </p>
            </div>

            <button 
              onClick={fetchStatus}
              className="p-3 border border-zinc-800 hover:border-emerald-500 hover:text-emerald-500 transition-all"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </header>

          {/* 2. CONNECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
            {providers.map((provider) => {
              const isConnected = status[provider.id];
              return (
                <div 
                  key={provider.id} 
                  className="bg-[#050505] p-8 group hover:bg-zinc-900/40 transition-all relative overflow-hidden"
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${isConnected ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-zinc-800'}`} />

                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 bg-zinc-950 border border-zinc-800 ${provider.color} group-hover:scale-110 transition-transform`}>
                      <provider.icon size={32} />
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center justify-end gap-2 text-[10px]">
                        {isConnected ? (
                          <>
                            <span className="text-emerald-500 font-bold tracking-widest">LINK_ACTIVE</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          </>
                        ) : (
                          <>
                            <span className="text-zinc-700 font-bold tracking-widest">DISCONNECTED</span>
                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                          </>
                        )}
                      </div>
                      <p className="text-[9px] text-zinc-700">SRV_ID: {provider.id}_V.02</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{provider.name}</h3>
                  <p className="text-xs text-zinc-600 mb-8 lowercase leading-relaxed">
                    {provider.desc}
                  </p>

                  <div className="flex items-center gap-4">
                    {isConnected ? (
                      <>
                        <button className="flex-1 py-3 bg-zinc-900 text-red-500 text-[10px] font-black border border-zinc-800 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                          <Unlink size={14} /> TERMINATE_LINK
                        </button>
                        <button className="p-3 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleConnect(provider.id)}
                        className="flex-1 py-3 bg-zinc-100 text-black text-[10px] font-black hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                      >
                        <Link2 size={14} /> ESTABLISH_HANDSHAKE
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. TERMINAL LOG RECAP */}
          <footer className="bg-zinc-900/20 border border-zinc-900 p-6 rounded">
            <div className="flex items-center gap-2 text-zinc-600 text-[10px] mb-4">
              <ChevronRight size={14} /> <span>SYSTEM_LOG_OUTPUT:</span>
            </div>
            <div className="space-y-2 text-[11px] font-mono lowercase">
              <p className="text-zinc-500 tracking-tighter">[14:02:01] initialized signal bridge v.2.0.4...</p>
              <p className="text-zinc-500 tracking-tighter">[14:02:02] polling integration registry status...</p>
              {Object.keys(status).map(key => (
                <p key={key} className={status[key] ? "text-emerald-800" : "text-zinc-800"}>
                  {`> node_${key}: ${status[key] ? 'operational' : 'offline'}`}
                </p>
              ))}
              <p className="text-emerald-500 animate-pulse tracking-tighter">{">"} awaiting user command_</p>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}