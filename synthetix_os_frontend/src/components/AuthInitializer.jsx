import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchUserProfile,
  selectIsAuthenticated,
  selectUser
} from '@/store/slices/authSlice'

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  const { mfaRequired } = useSelector(state => state.auth)

  useEffect(() => {
    if (mfaRequired) return

    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, isAuthenticated, user, mfaRequired])

  return children
}

export default AuthInitializer
