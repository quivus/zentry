import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { employees } from '../../data/mock'
import { useAuth } from '../../hooks/useAuth'
import { Logo } from '../ui/Logo'
import { ThemeToggle } from '../ui/ThemeToggle'

type NavItem = {
  id: string
  label: string
}

type AppShellProps = {
  eyebrow: string
  items: NavItem[]
  active: string
  onChange: (id: string) => void
  children: ReactNode
}

export function AppShell({ eyebrow, items, active, onChange, children }: AppShellProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const person = employees.find((item) => item.id === user?.employeeId)

  return (
    <div className="shell">
      <aside className="shell-side">
        <Link to="/" className="shell-brand">
          <Logo size="sm" />
        </Link>
        <p className="shell-eyebrow">{eyebrow}</p>
        <nav className="shell-nav" aria-label="Workspace">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === active ? 'is-active' : undefined}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="shell-user">
          <div className="shell-user-id">
            <strong>{person?.name ?? 'Zentry'}</strong>
            <span>{person?.role}</span>
          </div>
          <button
            type="button"
            className="btn btn-ghost shell-signout"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="shell-main">
        <header className="shell-top">
          <div>
            <p className="kicker">Mock workspace</p>
            <h1>{items.find((item) => item.id === active)?.label}</h1>
          </div>
          <div className="shell-top-actions">
            <ThemeToggle />
          </div>
        </header>
        <div className="shell-body">{children}</div>
      </div>
    </div>
  )
}
