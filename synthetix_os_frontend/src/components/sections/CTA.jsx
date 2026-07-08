export default function CTA() {
  return (
    <section className="bg-emerald-600 px-4 py-20 text-center sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-black uppercase leading-tight tracking-tighter text-black sm:text-4xl md:text-5xl">
          Ready to deploy <br /> your digital workforce?
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row">
          <button className="bg-black px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-transform hover:scale-105 sm:w-auto">
            Start_Deployment
          </button>
          <button className="border-2 border-black px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white sm:w-auto">
            Access_Terminal
          </button>
        </div>
      </div>
    </section>
  );
}
