import { Upload } from 'lucide-react'
import DynamicUrlList from './DynamicUrlList'

export default function DynamicField ({ field, value, error = [], onChange }) {
  const baseInputClass =
    'w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-all'

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'url':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={e => onChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            className={baseInputClass}
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={e => onChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            className={`${baseInputClass} min-h-32 resize-none leading-relaxed`}
          />
        )

      case 'dynamic_url_list':
        return (
          <DynamicUrlList
            field={field}
            value={value || ['']}
            onChange={onChange}
          />
        )

      case 'array':
        return (
          <textarea
            value={Array.isArray(value) ? value.join('\n') : ''}
            onChange={e =>
              onChange(
                field.name,
                e.target.value
                  .split('\n')
                  .map(item => item.trim())
                  .filter(Boolean)
              )
            }
            placeholder={field.placeholder || 'One item per line'}
            className={`${baseInputClass} min-h-32 resize-none leading-relaxed`}
          />
        )

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={e => onChange(field.name, e.target.value)}
            className={baseInputClass}
          >
            <option value=''>Select option</option>

            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'boolean':
        return (
          <label className='flex items-center gap-3 text-sm text-zinc-300 border border-zinc-800 bg-zinc-950 px-4 py-3'>
            <input
              type='checkbox'
              checked={value || false}
              onChange={e => onChange(field.name, e.target.checked)}
              className='accent-emerald-500'
            />
            Enable
          </label>
        )

      case 'multi_select':
        return (
          <div className='grid grid-cols-2 gap-3'>
            {field.options?.map(option => {
              const selected = value?.includes(option)

              return (
                <button
                  type='button'
                  key={option}
                  onClick={() => {
                    const current = value || []

                    if (selected) {
                      onChange(
                        field.name,
                        current.filter(v => v !== option)
                      )
                    } else {
                      onChange(field.name, [...current, option])
                    }
                  }}
                  className={`
                    border p-3 text-xs uppercase tracking-wide transition-all
                    ${
                      selected
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700'
                    }
                  `}
                >
                  {option}
                </button>
              )
            })}
          </div>
        )

      case 'file_upload':
        return (
          <div className='border border-dashed border-zinc-700 bg-zinc-950 p-6 space-y-4'>
            <label className='flex flex-col items-center justify-center gap-3 cursor-pointer'>
              <Upload size={18} className='text-emerald-500' />

              <span className='text-xs text-zinc-500 uppercase tracking-widest text-center'>
                Upload Files
              </span>

              <input
                type='file'
                multiple={field.multiple || false}
                accept={field.accepted_formats?.join(',')}
                className='hidden'
                onChange={e => {
                  const files = Array.from(e.target.files || [])

                  const maxFiles = field.max_files || 1

                  const limitedFiles = files.slice(0, maxFiles)

                  onChange(field.name, limitedFiles)
                }}
              />
            </label>

            {Array.isArray(value) && value.length > 0 && (
              <div className='space-y-2'>
                {value.map((file, index) => (
                  <div
                    key={index}
                    className='text-xs text-zinc-400 border border-zinc-800 px-3 py-2'
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <label className='text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold'>
          {field.label || field.name}
        </label>

        {field.required && (
          <span className='text-[9px] text-red-500 uppercase'>Required</span>
        )}
      </div>

      {field.help_text && (
        <p className='text-xs text-zinc-500'>{field.help_text}</p>
      )}

      {field.warning && (
        <div className='rounded border border-yellow-700 bg-yellow-500/10 p-3 text-xs text-yellow-400'>
          {field.warning}
        </div>
      )}

      {renderField()}

      {field.max_length && typeof value === 'string' && (
        <div className='text-right text-xs text-zinc-600'>
          {value.length}/{field.max_length}
        </div>
      )}

      {Array.isArray(error) &&
        error.map((msg, index) => (
          <p key={index} className='text-xs text-red-500'>
            {msg}
          </p>
        ))}
    </div>
  )
}
