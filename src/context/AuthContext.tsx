import { createContext, useMemo, useState, type ReactNode } from 'react'
import { mockAccounts } from '../data/mock'
import type { Role, User } from '../types'

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => string | null
  loginAs: (role: Role) => void
  logout: () => void
}

const STORAGE_KEY = 'zentry-user'
export const AuthContext = createContext<AuthContextValue | null>(null)

function readUser(): User | null {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readUser())

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, password) => {
        const account = mockAccounts.find(
          (item) =>
            item.email.toLowerCase() === email.trim().toLowerCase() &&
            item.password === password,
        )
        if (!account) return 'Those mock credentials are not recognized.'
        const next: User = {
          email: account.email,
          role: account.role,
          employeeId: account.employeeId,
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setUser(next)
        return null
      },
      loginAs: (role) => {
        const account = mockAccounts.find((item) => item.role === role)
        if (!account) return
        const next: User = {
          email: account.email,
          role: account.role,
          employeeId: account.employeeId,
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setUser(next)
      },
      logout: () => {
        sessionStorage.removeItem(STORAGE_KEY)
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
