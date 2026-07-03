function InfoItem ({ icon: Icon, label, value }) {
  return (
    <div className='flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4'>
      <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-2'>
        <Icon className='h-4 w-4 text-zinc-400' />
      </div>

      <div>
        <p className='text-sm text-zinc-500'>{label}</p>

        <p className='mt-1 font-medium text-zinc-200'>{value}</p>
      </div>
    </div>
  )
}

export default InfoItem
