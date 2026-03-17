export default function AuthLayout({ children, image }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-black text-white">

      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
          {children}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block relative">
        <img
          src={image}
          alt="visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 to-blue-900/40" />
      </div>
    </div>
  );
}