import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { googleLogin } from '../../api/auth'

function GoogleLoginButton () {
  const handleSuccess = async credentialResponse => {
    const token = credentialResponse.credential

    const data = { token: token }
    try {
      const response = await googleLogin(data)
      console.log(response)
      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)
    } catch (error) {
      console.error(error)
    }
  }

  const handleError = () => {
    console.log('Login Failed')
  }

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
}

export default GoogleLoginButton
