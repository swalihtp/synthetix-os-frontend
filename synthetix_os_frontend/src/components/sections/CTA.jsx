export default function CTA() {
  return (
    <section className="bg-emerald-600 py-24 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-5xl font-black text-black tracking-tighter uppercase leading-none">
          Ready to deploy <br /> your digital workforce?
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform">
            Start_Deployment
          </button>
          <button className="border-2 border-black text-black px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
            Access_Terminal
          </button>
        </div>
      </div>
    </section>
  );
}