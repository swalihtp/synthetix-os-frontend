import CountBadge from './CountBadge'
import IdCell from './IdCell'

function BuiltInAgentRow ({ agent }) {
  return (
    <tr className='group border-b border-white/5 transition-colors duration-200 hover:bg-white/[0.02]'>
      <td className='px-6 py-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium text-zinc-100'>
            {agent.name}
          </span>
        </div>
      </td>

      <td className='max-w-md px-6 py-4'>
        <p
          className='line-clamp-2 text-sm leading-6 text-zinc-500'
          title={agent.description}
        >
          {agent.description}
        </p>
      </td>

      <td className='px-6 py-4 align-middle'>
        <CountBadge count={agent.tools?.length || 0} kind='tools' />
      </td>

      <td className='px-6 py-4 align-middle'>
        <CountBadge
          count={agent.required_integrations?.length || 0}
          kind='integrations'
        />
      </td>

      <td className='px-6 py-4 align-middle'>
        <IdCell id={agent.id} />
      </td>
    </tr>
  )
}

export default BuiltInAgentRow
