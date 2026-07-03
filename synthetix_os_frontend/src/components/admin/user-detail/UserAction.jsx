import { useEffect, useRef, useState } from 'react'
import { MoreVertical, UserX, Trash2, UserCheck } from 'lucide-react'
import ActionItem from './ActionItem'
import API from '../../../api/auth'
import { useNavigate } from 'react-router-dom'

function UserActions ({ user }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const navigate = useNavigate()
   const blockUser = id => {
    API.patch(`system-admin/users/${id}/block/`)
    navigate('/admin/user-registry')
    return
  }

   const activateUser = id =>{
    API.patch(`system-admin/users/${id}/activate/`)
    navigate(`/admin/user-registry`)
    return 
   }

   const deleteUser = id => {
    API.delete(`system-admin/users/${id}/delete/`)
    navigate('/admin/user-registry')
    return
  }

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:bg-zinc-800'
      >
        <MoreVertical className='h-4 w-4 text-zinc-400' />
      </button>

      {open && (
        <div className='absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95 p-1 backdrop-blur-xl'>
          <div className='my-1 border-t border-zinc-800' />

          {!user.is_active ? (
            <ActionItem
              icon={UserCheck}
              label='Activate User'
              className='text-emerald-400'
              onClick={() => {
                activateUser(user.id)
                setOpen(false)
              }}
            />
          ) : (
            <ActionItem
              icon={UserX}
              label='Block User'
              className='text-amber-400'
              onClick={() => {
                blockUser(user.id)
                setOpen(false)
              }}
            />
          )}

          <div className='my-1 border-t border-zinc-800' />


        </div>
      )}
    </div>
  )
}

export default UserActions
