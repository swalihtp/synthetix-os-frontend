import { KeyRound, ShieldCheck, ShieldAlert, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SecurityCard () {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  console.log(user);
  

  return (
    <div className='rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-6 backdrop-blur-xl transition-colors hover:border-zinc-700'>
      <div className='flex items-start gap-4'>
        <div className='rounded-2xl border border-zinc-800 bg-zinc-900 p-3'>
          <KeyRound className='h-5 w-5 text-violet-400' />
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h3 className='text-base font-semibold text-zinc-100'>
                Multi-factor Authentication
              </h3>

              <p className='mt-2 text-sm leading-relaxed text-zinc-500'>
                Add an extra layer of protection to your account by requiring a
                verification step during sign-in.
              </p>
            </div>

            {user.mfa_enabled ? (
              <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'>
                <ShieldCheck className='h-3.5 w-3.5' />
                Enabled
              </span>
            ) : (
              <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400'>
                <ShieldAlert className='h-3.5 w-3.5' />
                Disabled
              </span>
            )}
          </div>

          <div className='mt-6 border-t border-zinc-800 pt-5'>
            {user.mfa_enabled ? (
              <button className='inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200'>
                Manage MFA
                <ChevronRight className='h-4 w-4' />
              </button>
            ) : (
              <button className='inline-flex items-center gap-2 rounded-2xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-violet-400'
              onClick={()=>navigate('/mfa-setup')}
              >
                Enable MFA
                <ChevronRight className='h-4 w-4' />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
