export default function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/40 ${className}`}
    />
  )
}