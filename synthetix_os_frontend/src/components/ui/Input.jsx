export default function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-4 py-2 bg-black/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white"
      />
    </div>
  );
}