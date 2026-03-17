import React from 'react'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import { Routes,Route } from 'react-router-dom'
import RecoverPassword from './pages/auth/RecoverPassword'
import ResetPassword   from './pages/auth/ResetPassword'
import Home from './pages/Home'
import VerifyMFA from './pages/auth/VerifyMFA'
import MFASetup from './pages/auth/MFASetup'
import AutomationCards from './components/ui/AutomationCards'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/recover-password' element={<RecoverPassword/>} />
      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
      <Route path="/verify-mfa" element={<VerifyMFA />} />
      <Route path="/mfa-setup" element={<MFASetup />} />
      <Route path="/test" element={<AutomationCards/>} />
    </Routes>
    </>
  )
}

export default App
