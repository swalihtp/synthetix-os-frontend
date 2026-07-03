import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import Footer from '@/components/layout/Footer'

import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileForm from '../../components/profile/ProfileForm'
import SecurityCard from '../../components/profile/SecurityCard'
import AdminCard from '../../components/profile/AdminCard'

export default function ProfilePage () {
  return (
    <>
      <div className='flex min-h-screen bg-[#050505] font-mono text-zinc-400 selection:bg-emerald-500 selection:text-black'>
        <Sidebar />

        <div className='flex flex-1 flex-col'>
          <Topbar />

          <main className='relative flex-1 overflow-y-auto'>
            {/* Ambient background glow */}
            <div className='pointer-events-none absolute inset-0 -z-10'>
              <div className='absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-3xl' />

              <div className='absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl' />
            </div>

            <div className='mx-auto max-w-7xl space-y-8 px-6 py-8 lg:px-10'>
              <div>
                <h1 className='text-3xl font-semibold tracking-tight text-zinc-100'>
                  Profile Settings
                </h1>

                <p className='mt-2 max-w-2xl text-sm text-zinc-500'>
                  Manage your personal information, account preferences, and
                  security settings.
                </p>
              </div>

              <ProfileHeader />

              <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]'>
                <div className='min-w-0'>
                  <ProfileForm />
                </div>

                <div className='space-y-8'>
                  <SecurityCard />
                  <AdminCard />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}
