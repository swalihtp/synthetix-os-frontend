export default function MetricCard ({ label, value, sub }) {
  return (
    <div className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm'>
      <p className='mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500'>
        {label}
      </p>

      <h3 className='text-3xl font-bold text-white'>{value}</h3>

      {sub && <p className='mt-2 text-xs text-emerald-400'>{sub}</p>}
    </div>
  )
}
