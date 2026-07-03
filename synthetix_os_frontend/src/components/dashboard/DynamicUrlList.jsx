import { Plus, Trash2 } from 'lucide-react'

export default function DynamicUrlList ({ field, value, onChange }) {
  const updateItem = (index, newValue) => {
    const updated = [...value]

    updated[index] = newValue

    onChange(field.name, updated)
  }

  const addItem = () => {
    onChange(field.name, [...value, ''])
  }

  const removeItem = index => {
    const updated = value.filter((_, i) => i !== index)

    onChange(field.name, updated)
  }

  return (
    <div className='space-y-3'>
      {value.map((item, index) => (
        <div key={index} className='flex gap-2'>
          <input
            type='url'
            value={item}
            placeholder='https://competitor.com'
            onChange={e => updateItem(index, e.target.value)}
            className='flex-1 bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500'
          />

          {value.length > 1 && (
            <button
              type='button'
              onClick={() => removeItem(index)}
              className='border border-zinc-800 px-3 hover:border-red-500 hover:text-red-500 transition-all'
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}

      <button
        type='button'
        onClick={addItem}
        className='flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-500 hover:text-emerald-400'
      >
        <Plus size={14} />
        Add Competitor
      </button>
    </div>
  )
}
