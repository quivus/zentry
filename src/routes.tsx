import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Landing } from './components/layout/Landing'
import { Login } from './components/layout/Login'
import { GuestPortal } from './features/guest/pages/GuestPortal'
import { HrDashboard } from './features/hr/pages/HrDashboard'
import { useAuth } from './hooks/useAuth'
import type { Role } from './types'

function RequireRole({ role, children }: { role: Role; children: ReactElement }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) {
    return <Navigate to={user.role === 'hr' ? '/hr' : '/guest'} replace />
  }
  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/hr"
        element={
          <RequireRole role="hr">
            <HrDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/guest"
        element={
          <RequireRole role="guest">
            <GuestPortal />
          </RequireRole>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
