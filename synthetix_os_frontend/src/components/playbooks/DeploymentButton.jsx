import { Loader2, Rocket } from 'lucide-react'

export default function DeploymentButton ({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className='flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 font-medium text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500'
    >
      {loading ? (
        <>
          <Loader2 size={18} className='animate-spin' />
          Creating Automation...
        </>
      ) : (
        <>
          <Rocket size={18} />
          Deploy Automation
        </>
      )}
    </button>
  )
}
