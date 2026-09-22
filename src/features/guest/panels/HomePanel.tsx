import { useAuth } from '../../../hooks/useAuth'
import { useData } from '../../../hooks/useData'
import { payrollPeriod } from '../../../data/mock'
import { dateFmt } from '../../../services/format'
import type { Employee } from '../../../types'
import { StatusTag } from '../../../components/ui/StatusTag'

type HomePanelProps = {
  me: Employee
}

export function HomePanel({ me }: HomePanelProps) {
  const { user } = useAuth()
  const { bookings, leaves } = useData()
  const myBookings = bookings.filter((item) => item.hostId === user?.employeeId)
  const myLeave = leaves.filter((item) => item.employeeId === user?.employeeId)

  return (
    <div className="stack">
      <section className="welcome">
        <p className="kicker place">
          <svg className="location-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
            />
          </svg>
          {me.city} · {me.country}
        </p>
        <h2>Good day, {me.name.split(' ')[0]}.</h2>
        <p className="lede">
          This guest view is for booking rooms, reading your payslip, and requesting time off. HR still owns
          payroll and approvals.
        </p>
      </section>
      <section className="kpi-grid">
        <article className="kpi">
          <span>Your bookings</span>
          <strong>{myBookings.length}</strong>
        </article>
        <article className="kpi">
          <span>Next pay date</span>
          <strong>{dateFmt(payrollPeriod.payDate)}</strong>
        </article>
        <article className="kpi">
          <span>Leave on file</span>
          <strong>{myLeave.length}</strong>
        </article>
      </section>
      <section className="panel">
        <header className="panel-head">
          <h2>Your rooms</h2>
        </header>
        {myBookings.length === 0 ? (
          <p className="muted">No bookings yet.</p>
        ) : (
          <ul className="feed">
            {myBookings.map((item) => (
              <li key={item.id} className="feed-row">
                <div>
                  <strong>{item.title}</strong>
                  <span>
                    {item.room} · {dateFmt(item.date)} · {item.start}–{item.end}
                  </span>
                </div>
                <StatusTag status={item.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
