export default function AgentBadge({ type, value }) {
  const styles = {
    status:
      value === "ACTIVE"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
        : "border-red-500/30 bg-red-500/10 text-red-400",

    category:
      "border-blue-500/30 bg-blue-500/10 text-blue-400",

    version:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  };

  return (
    <span
      className={`px-2 py-1 text-[10px] uppercase border ${styles[type]}`}
    >
      {value}
    </span>
  );
}