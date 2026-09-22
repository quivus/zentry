import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { employees, mockAccounts } from '../../data/mock'
import { useAuth } from '../../hooks/useAuth'
import { Navbar } from './Navbar'

export function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [missing, setMissing] = useState({ email: false, password: false })

  if (user) {
    return <Navigate to={user.role === 'hr' ? '/hr' : '/guest'} replace />
  }

  function fill(accountEmail: string, accountPassword: string) {
    setEmail(accountEmail)
    setPassword(accountPassword)
    setError(null)
    setMissing({ email: false, password: false })
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const emailMissing = email.trim() === ''
    const passwordMissing = password.trim() === ''
    setMissing({ email: emailMissing, password: passwordMissing })
    if (emailMissing || passwordMissing) return
    const message = login(email, password)
    if (message) {
      setError(message)
      return
    }
    const account = mockAccounts.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
    )
    navigate(account?.role === 'hr' ? '/hr' : '/guest')
  }

  return (
    <div className="page login-page">
      <Navbar variant="plain" />
      <main className="login-layout">
        <section className="login-copy">
          <p className="kicker">Access</p>
          <h1>Sign in to the ledger.</h1>
          <p className="lede">
            Use a mock HR or guest account. Nothing is stored on a server —
            this is a local demonstration of the two Zentry views.
          </p>
        </section>
        <section className="login-panel">
          <form className="login-form" onSubmit={onSubmit} noValidate>
            <label>
              Email
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (event.target.value.trim()) setMissing((current) => ({ ...current, email: false }))
                }}
                placeholder="name@zentry.com"
                className={missing.email ? 'is-invalid' : undefined}
                aria-invalid={missing.email || undefined}
              />
            </label>
            <label>
              Password
              <input
                type="text"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (event.target.value.trim()) setMissing((current) => ({ ...current, password: false }))
                }}
                placeholder="zentry password"
                className={missing.password ? 'is-invalid' : undefined}
                aria-invalid={missing.password || undefined}
              />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button type="submit" className="btn btn-solid btn-lg">
              Sign in
            </button>
          </form>
          <div className="account-grid">
            {mockAccounts.map((account) => {
              const person = employees.find((item) => item.id === account.employeeId)
              if (!person) return null
              return (
                <article key={account.email} className="account-card">
                  <p className="kicker">{account.label}</p>
                  <h2>{person.name}</h2>
                  <p>
                    {person.role} · {person.city}
                  </p>
                  <p className="account-creds">
                    {account.email}
                    <br />
                    password: {account.password}
                  </p>
                  <div className="account-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => fill(account.email, account.password)}
                    >
                      Autofill
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
