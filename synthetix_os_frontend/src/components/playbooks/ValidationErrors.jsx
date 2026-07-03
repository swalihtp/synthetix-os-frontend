export default function ValidationErrors ({ errors = [] }) {
  if (!errors.length) return null

  return (
    <div className='rounded-xl border border-red-500/20 bg-red-500/10 p-4'>
      <div className='mb-3 font-medium text-red-400'>
        Missing Required Fields
      </div>

      <div className='space-y-2'>
        {errors.map(error => (
          <div key={error} className='text-sm text-red-300'>
            • {error}
          </div>
        ))}
      </div>
    </div>
  )
}
