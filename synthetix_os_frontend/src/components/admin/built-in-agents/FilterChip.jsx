function FilterChip ({ label, value, onChange }) {
  const next = {
    any: 'yes',
    yes: 'no',
    no: 'any'
  }

  const text = {
    any: 'Any',
    yes: 'Has',
    no: 'None'
  }

  const styles = {
    any: 'border-white/10 bg-white/[0.02] text-zinc-400',
    yes: 'border-violet-500/20 bg-violet-500/10 text-violet-300',
    no: 'border-red-500/20 bg-red-500/10 text-red-300'
  }

  return (
    <button
      type='button'
      onClick={() => onChange(next[value])}
      className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/[0.04] ${styles[value]}`}
    >
      <span className='text-zinc-500'>{label}:</span> {text[value]}
    </button>
  )
}

export default FilterChip
