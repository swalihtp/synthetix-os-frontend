import DynamicField from '@/components/dashboard/DynamicField'

export default function ConfigurationSection ({
  fields,
  formData,
  validationErrors,
  onChange
}) {
  if (!fields.length) return null

  return (
    <section className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
      <div className='mb-6'>
        <h2 className='text-lg font-semibold text-white'>Configuration</h2>

        <p className='mt-1 text-sm text-zinc-500'>
          Configure how this automation should behave.
        </p>
      </div>

      <div className='space-y-6'>
        {fields.map(field => (
          <DynamicField
            key={field.name}
            field={field}
            value={formData[field.name]}
            error={validationErrors[field.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  )
}
