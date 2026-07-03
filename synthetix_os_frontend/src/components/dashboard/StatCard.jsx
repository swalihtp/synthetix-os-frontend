export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-neutral-200">
      <p className="text-neutral-500 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
  );
}