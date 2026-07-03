import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'
import AuthInitializer from './components/AuthInitializer'

// Auth Pages
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import RecoverPassword from './pages/auth/RecoverPassword'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyMFA from './pages/auth/VerifyMFA'
import MFASetup from './pages/auth/MFASetup'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import AcceptInvitationPage from './pages/AcceptInvitationPage'

// Public Pages
import Home from './pages/Home'

// Dashboard Pages (Protected)
import Dashboard from './pages/dashboard/Dashboard'
import Workflows from './pages/dashboard/Workflows'
import Agents from './pages/dashboard/Agents'
import AgentDetail from './pages/dashboard/AgentDetail'
import Integrations from './pages/dashboard/Integrations'
import Persona from './pages/dashboard/Persona'
import EmailExecutionDetail from './pages/dashboard/AgentDetailPages/EmailExecutionDetail'
import ProfilePage from './pages/profile/ProfilePage'
import MeetingNotesGenerator from './pages/NoteGeneratorAgent/MeetingNotesGeneratorAgent'
import MeetingNotesGeneratorDetail from './pages/MeetingNotesGeneratorDetail/MeetingNotesGeneratorDetail'
import ResumeAnalyzer from './pages/ResumeAnalyzerAgent/ResumeAnalyzerAgent'
import ResumeAnalyzerDetail from './pages/ResumeAnalyzerDetail/ResumeAnalyzerDetail'
import SystemAgents from './pages/SystemAgents/SystemAgents'


// Test/Dev Components
import AutomationSetup from './pages/automations/AutomationSetup'
import PlaybookDetail from './pages/dashboard/PlaybookDetail'
import LoadingGateway from './components/ui/LoadingGateway'
import EmailAgent from './pages/dashboard/AgentDetailPages/EmailAgent'

import AdminDashboard from './pages/admin/AdminDashboard'
import UserRegistryDashboard from './pages/admin/UserRegistryDashboard'
import BuiltInAgentTableDashboard from './pages/admin/BuiltInAgentDashboard'
import AdminUserDetail from'./pages/admin/AdminUserDetail'
import AdminProfilePage from './pages/admin/AdminProfilePage'
import DashboardNeo from './pages/dashboard/DashboardNeo'

function App () {
  return (
    <Provider store={store}>
      {/* PersistGate delays rendering until persisted state is retrieved */}
      <PersistGate loading={<LoadingGateway/>} persistor={persistor}>
      <AuthInitializer>
        <Routes>

          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/recover-password' element={<RecoverPassword />} />
          <Route path='/reset-password/:uid/:token' element={<ResetPassword />} />
          <Route path='/verify-mfa' element={<VerifyMFA />} />
          <Route path='/mfa-setup' element={<MFASetup />} />
          <Route path='/testing-page' element={<LoadingGateway/>}/>
          <Route path='/verify-email' element={<VerifyEmailPage/>}/>
          <Route path='/accept-invite' element={<AcceptInvitationPage/>}/>



          {/* Protected Dashboard Routes */}
          <Route path='/test' element={<ProtectedRoute><RoleRoute allowedRoles={['user']}><DashboardNeo /></RoleRoute></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}>< ProfilePage/></RoleRoute></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><Dashboard /></RoleRoute></ProtectedRoute>}/>
          <Route path='/automations/:id' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><AutomationSetup /></RoleRoute></ProtectedRoute>} />
          <Route path='/system-agents' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><SystemAgents/></RoleRoute></ProtectedRoute>}/>
          <Route path='/system-agents/:id' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><PlaybookDetail/></RoleRoute></ProtectedRoute>}/>
          <Route path='/agents' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><Agents/></RoleRoute></ProtectedRoute>}/>
          <Route path="/agents/:id" element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><AgentDetail /></RoleRoute></ProtectedRoute>} />
          <Route path="/email-agents/:id" element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><EmailAgent/></RoleRoute></ProtectedRoute>} />
          <Route path="/meeting-notes-generator/:id" element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><MeetingNotesGenerator/></RoleRoute></ProtectedRoute>} />
          <Route path="/meeting-notes-generator/executions/:id" element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><MeetingNotesGeneratorDetail/></RoleRoute></ProtectedRoute>} />
          <Route path="/resume-analyzer/:id" element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><ResumeAnalyzer/></RoleRoute></ProtectedRoute>} />
          <Route path="/resume-analyzer/executions/:id" element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><ResumeAnalyzerDetail/></RoleRoute></ProtectedRoute>} />
          <Route path="/dashboard/email-executions/:executionId"element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><EmailExecutionDetail /></RoleRoute></ProtectedRoute>} />
          <Route path='/workflows' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><Workflows/></RoleRoute></ProtectedRoute>} />
          <Route path='/playbooks/:id' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><PlaybookDetail/></RoleRoute></ProtectedRoute>}/>
          <Route path='/integrations' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><Integrations/></RoleRoute></ProtectedRoute>}/>
          <Route path='/persona' element={<ProtectedRoute><RoleRoute  allowedRoles={['user']}><Persona/></RoleRoute></ProtectedRoute>}/>

          <Route path='/admin' element={<ProtectedRoute><RoleRoute  allowedRoles={['system_admin']}><AdminDashboard/></RoleRoute></ProtectedRoute>}/>
          <Route path='/admin/user-registry' element={<ProtectedRoute><RoleRoute  allowedRoles={['system_admin']}></RoleRoute><UserRegistryDashboard/></ProtectedRoute>}/>
          <Route path='/admin/user-registry/:id' element={<ProtectedRoute><RoleRoute  allowedRoles={['system_admin']}><AdminUserDetail/></RoleRoute></ProtectedRoute>}/>
          <Route path='/admin/built-in-agents' element={<ProtectedRoute><RoleRoute  allowedRoles={['system_admin']}><BuiltInAgentTableDashboard/></RoleRoute></ProtectedRoute>}/>
          <Route path='/admin/profile' element={<ProtectedRoute><RoleRoute  allowedRoles={['system_admin']}><AdminProfilePage/></RoleRoute></ProtectedRoute>}/>



          {/* Add more protected routes for workflows, integrations, etc. */}

          {/* 404 - Redirect to home */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        </AuthInitializer>
      </PersistGate>
    </Provider>
  )
}

export default App
