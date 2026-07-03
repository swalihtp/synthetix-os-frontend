export default function AuthLayout({ children, image }) {
  return (
    <div className="min-h-screen bg-[#050505] flex font-mono">
      {/* Left: Tactical Side Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden border-r border-zinc-900">
        <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000" alt="Auth Visual" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 z-10">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Secure_Link_Established</span>
          </div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Synthetix_OS // Auth_Gateway_v4.0</p>
        </div>
      </div>

      {/* Right: The Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}