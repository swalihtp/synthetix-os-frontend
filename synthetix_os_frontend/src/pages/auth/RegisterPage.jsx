import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { registerUser } from '../../api/auth'
import logo from '../../assets/gemini-svg.svg'

export default function RegisterPage () {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await registerUser(formData)

      setSuccess(response.data.message)
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex h-screen w-full overflow-hidden bg-[#0e150e] text-[#dce5d9]'>
      {/* Left panel — brand */}
      <section className='relative hidden lg:flex flex-1 flex-col justify-center px-16 bg-[#091009] overflow-hidden'>
        <div className='relative z-10 max-w-xl'>
          <div className='mb-12 flex items-center gap-4'>
            <img src={logo} alt='Logo' className='h-14 w-14' />
            <span className='text-2xl font-bold text-emerald-500 tracking-tight'>
              Synthetix OS
            </span>
          </div>

          <h1 className='text-5xl font-semibold mb-6 leading-tight'>
            Create Your Account
          </h1>
          <p className='text-base text-[#bccbb9]/80 mb-12 max-w-md leading-relaxed'>
            Sign up to access your dashboard and start building your AI
            workforce.
          </p>

          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#242c24]/50 border border-[#3d4a3d]/30 backdrop-blur-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4be277] opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-[#4be277]' />
              </span>
              <span className='text-[11px] uppercase tracking-widest text-[#bccbb9]'>
                System Ready
              </span>
            </div>
            <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#242c24]/50 border border-[#3d4a3d]/30 backdrop-blur-sm'>
              <ShieldCheck size={16} className='text-[#4be277]' />
              <span className='text-[11px] uppercase tracking-widest text-[#bccbb9]'>
                256-bit Encrypted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Right panel — form */}
      <section className='flex flex-1 items-center justify-center bg-[#0e150e] px-6 lg:px-0 relative'>
        {/* Mobile logo */}
        <div className='lg:hidden absolute top-8 left-8 flex items-center gap-3'>
          <img src={logo} alt='Logo' className='h-8 w-8' />
          <span className='text-lg font-bold text-emerald-500'>
            Synthetix OS
          </span>
        </div>

        <div className='w-full max-w-md rounded-[20px] p-10 flex flex-col gap-8 bg-[#1a221a]/70 backdrop-blur-2xl border border-[#869585]/20 shadow-[0_0_40px_rgba(0,0,0,0.4)]'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-[#dce5d9]'>
              Create Account
            </h2>
            <p className='text-sm text-[#bccbb9]'>
              Start building your AI workforce
            </p>
          </div>

          {success && (
            <div className='p-3 rounded-xl border border-emerald-900/50 bg-emerald-950/20 text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-3'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-400' />
              </span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Full Name */}
            <div className='space-y-2'>
              <label className='text-[11px] font-semibold uppercase tracking-widest text-[#bccbb9] ml-1'>
                Full Name
              </label>
              <input
                name='full_name'
                value={formData.full_name}
                onChange={handleChange}
                placeholder='John Doe'
                required
                className='w-full bg-[#161d16] border border-[#3d4a3d] rounded-xl px-4 py-3.5 text-[#dce5d9] placeholder:text-[#869585]/50 outline-none transition-all focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(74,225,118,0.4)]'
              />
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <label className='text-[11px] font-semibold uppercase tracking-widest text-[#bccbb9] ml-1'>
                Work Email
              </label>
              <input
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='name@organization.com'
                required
                className='w-full bg-[#161d16] border border-[#3d4a3d] rounded-xl px-4 py-3.5 text-[#dce5d9] placeholder:text-[#869585]/50 outline-none transition-all focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(74,225,118,0.4)]'
              />
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <label className='text-[11px] font-semibold uppercase tracking-widest text-[#bccbb9] ml-1'>
                Create Protocol Pass
              </label>
              <div className='relative'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••••••'
                  required
                  className='w-full bg-[#161d16] border border-[#3d4a3d] rounded-xl px-4 py-3.5 pr-12 text-[#dce5d9] placeholder:text-[#869585]/50 outline-none transition-all focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(74,225,118,0.4)]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-[#869585] hover:text-emerald-500 transition-colors'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='group w-full bg-emerald-500 hover:bg-emerald-400 text-[#003915] font-medium text-base py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-[0_0_15px_rgba(74,225,118,0.3)] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'INITIALIZING_ACCOUNT...' : 'Deploy Terminal'}
              {!loading && (
                <ArrowRight
                  size={18}
                  className='transition-transform group-hover:translate-x-1'
                />
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-sm text-[#bccbb9]'>
              Already have an identity?{' '}
              <Link
                to='/login'
                className='text-[#04bb38] font-semibold hover:underline decoration-[#4be277]/30 underline-offset-4 ml-1'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
