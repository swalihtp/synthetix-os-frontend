import { Loader2, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export default function ProfileForm () {
  const user = useSelector(state => state.auth.user)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: user
  })

  const onSubmit = async values => {
    // PUT /profile
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-8 backdrop-blur-xl'
    >
      <div className='flex items-start gap-4'>
        <div className='rounded-2xl border border-zinc-800 bg-zinc-900 p-3'>
          <User className='h-5 w-5 text-violet-400' />
        </div>

        <div>
          <h2 className='text-xl font-semibold tracking-tight text-zinc-100'>
            Personal Information
          </h2>

          <p className='mt-1 text-sm text-zinc-500'>
            Update your account details and contact information.
          </p>
        </div>
      </div>

      <div className='mt-8 grid gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-zinc-400'>Full Name</label>

          <input
            {...register('full_name')}
            placeholder='Enter your full name'
            className='w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-zinc-400'>
            Email Address
          </label>

          <input
            disabled
            value={user.email}
            className='w-full cursor-not-allowed rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-500 opacity-70'
          />
        </div>

        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-medium text-zinc-400'>
            Phone Number
          </label>

          <input
            {...register('phone_number')}
            placeholder='+91 98765 43210'
            className='w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10'
          />
        </div>
      </div>

      <div className='mt-8 flex items-center justify-between border-t border-zinc-800 pt-6'>
        <p className='text-xs text-zinc-600'>
          Changes are saved securely to your account.
        </p>

        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex items-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}

          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
