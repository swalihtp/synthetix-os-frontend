import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'

import SkeletonCard from './SkeltonCard'

export default function DashboardSkeleton () {
  return (
    <>
      <div className='relative flex min-h-screen overflow-hidden bg-[#09090b]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_24%)]' />

        <Sidebar />

        <div className='relative z-10 flex flex-1 flex-col'>
          <Topbar />

          <main className='mx-auto w-full max-w-[1400px] space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
            {/* Hero */}
            <SkeletonCard className='h-[460px] rounded-[1.75rem]' />

            {/* Overview Cards */}
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} className='h-40 rounded-[1.5rem]' />
              ))}
            </div>

            {/* Continue Working + Applications */}
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-12 lg:col-span-8'>
                <SkeletonCard className='h-[360px] rounded-[1.5rem]' />
              </div>

              <div className='col-span-12 lg:col-span-4'>
                <SkeletonCard className='h-[360px] rounded-[1.5rem]' />
              </div>
            </div>

            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-12 lg:col-span-8'>
                <SkeletonCard className='h-[520px] rounded-[1.5rem]' />
              </div>

              <div className='col-span-12 lg:col-span-4'>
                <SkeletonCard className='h-[520px] rounded-[1.5rem]' />
              </div>
            </div>

            <SkeletonCard className='h-[320px] rounded-[1.5rem]' />
          </main>
        </div>
      </div>
    </>
  )
}
