import { useEffect, useState } from 'react'
import { enableMFA } from '../../api/auth'
import QRCode from 'react-qr-code'
import VerifyMFA from './VerifyMFA'
import { ShieldCheck } from 'lucide-react'

function MFASetup () {
  const [qr, setQr] = useState(null)

  useEffect(() => {
    enableMFA().then(res => {
      setQr(res.data.qr_uri)
    })
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050505] font-mono p-6'>
      <div className='w-full max-w-md border border-zinc-900 bg-zinc-900/10 p-10 text-center'>
        <ShieldCheck className='mx-auto text-emerald-500 mb-4' size={32} />
        <h2 className='text-lg font-black text-white uppercase tracking-tighter'>
          MFA_Uplink_Required
        </h2>
        <p className='text-zinc-500 text-[10px] uppercase tracking-widest mt-2'>
          Scan secure manifest to sync device
        </p>

        <div className='mt-8 flex justify-center bg-white p-6 border-4 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]'>
          {qr ? (
            <QRCode value={qr} size={180} />
          ) : (
            <div className='animate-pulse text-black text-[10px] font-bold'>
              ENCRYPTING...
            </div>
          )}
        </div>

        <div className='my-8 border-t border-zinc-900' />

        <div className='text-left'>
          <VerifyMFA />
        </div>
      </div>
    </div>
  )
}

export default MFASetup
