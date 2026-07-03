function ActionItem ({ icon: Icon, label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-xl px-3 py-2.5
        text-sm text-zinc-300 transition-colors
        hover:bg-zinc-800
        ${className}
      `}
    >
      <Icon className='h-4 w-4' />
      <span>{label}</span>
    </button>
  )
}

export default ActionItem