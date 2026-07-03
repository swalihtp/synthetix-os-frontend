import { useEffect, useState } from 'react'
import { CheckCircle2, Link2, Loader2, PlugZap } from 'lucide-react'

import API from '@/api/auth'
import { getGmailConnectUrl } from '@/api/integrations'

export default function IntegrationsSection ({ agent, integrations = [] }) {
  const [status, setStatus] = useState({})
  const [loadingIntegration, setLoadingIntegration] = useState(null)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const res = await API.get('/integrations/status/')

      setStatus(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleConnect = async integrationName => {
    try {
      setLoadingIntegration(integrationName)

      switch (integrationName) {
        case 'gmail': {
          const res = await getGmailConnectUrl({
            agent_id: agent.id
          })

          window.location.href = res.data.authorization_url

          break
        }

        default:
          console.warn(`${integrationName} not implemented`)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingIntegration(null)
    }
  }

  if (!integrations.length) {
    return (
      <section className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
        <h2 className='mb-2 text-lg font-semibold text-white'>Integrations</h2>

        <p className='text-sm text-zinc-500'>
          No integrations are required for this automation.
        </p>
      </section>
    )
  }

  return (
    <section className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
      <div className='mb-6'>
        <h2 className='text-lg font-semibold text-white'>Integrations</h2>

        <p className='mt-1 text-sm text-zinc-500'>
          Connect the required services before deploying this automation.
        </p>
      </div>

      <div className='space-y-3'>
        {integrations.map(integration => {
          const connected = status[integration.name]

          const loading = loadingIntegration === integration.name

          return (
            <button
              key={integration.name}
              disabled={connected || loading}
              onClick={() => !connected && handleConnect(integration.name)}
              className={`
                w-full
                rounded-xl
                border
                p-4
                transition-all
                duration-200
                flex
                items-center
                justify-between

                ${
                  connected
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-zinc-800 bg-zinc-900 hover:border-emerald-500/40'
                }
              `}
            >
              <div className='flex items-center gap-4'>
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-lg

                    ${connected ? 'bg-emerald-500/10' : 'bg-zinc-800'}
                  `}
                >
                  {connected ? (
                    <CheckCircle2 size={18} className='text-emerald-400' />
                  ) : (
                    <PlugZap size={18} className='text-zinc-400' />
                  )}
                </div>

                <div className='text-left'>
                  <div className='font-medium text-white'>
                    {integration.label}
                  </div>

                  <div
                    className={`
                      text-xs

                      ${connected ? 'text-emerald-400' : 'text-zinc-500'}
                    `}
                  >
                    {connected ? 'Connected' : 'Authorization Required'}
                  </div>
                </div>
              </div>

              {loading ? (
                <Loader2 size={18} className='animate-spin text-zinc-400' />
              ) : !connected ? (
                <Link2 size={18} className='text-zinc-500' />
              ) : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}
