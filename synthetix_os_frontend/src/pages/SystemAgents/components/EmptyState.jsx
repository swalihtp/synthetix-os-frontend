import { Bot } from "lucide-react";

export default function EmptyState() {
  return (
    <div
      className="
        border
        border-zinc-800
        bg-zinc-900/40
        py-24
        text-center
      "
    >
      <Bot
        size={60}
        className="mx-auto text-zinc-700"
      />

      <h2 className="text-white text-2xl font-bold mt-6">
        No Agents Found
      </h2>

      <p className="text-zinc-500 mt-2">
        Try searching with another keyword.
      </p>
    </div>
  );
}