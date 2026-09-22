import { rooms } from '../../../data/mock'
import { useData } from '../../../hooks/useData'
import { dateFmt, money, todayIso } from '../../../services/format'
import { roomClash } from '../../../services/schedule'
import { StatusTag } from '../../../components/ui/StatusTag'

export function OverviewPanel() {
  const { employees, bookings, leaves, payroll } = useData()
  const today = todayIso()
  const monthlyPayroll = payroll.reduce((sum, row) => sum + row.net, 0)
  const pendingLeave = leaves.filter((item) => item.status === 'pending').length
  const todayBookings = bookings
    .filter((item) => item.date === today)
    .slice()
    .sort((a, b) => a.start.localeCompare(b.start))
  const bookedRooms = new Set(todayBookings.map((item) => item.room)).size

  function personName(id: string) {
    return employees.find((item) => item.id === id)?.name ?? 'Unknown'
  }

  return (
    <div className="stack">
      <section className="kpi-grid">
        <article className="kpi">
          <span>Headcount</span>
          <strong>{employees.length}</strong>
        </article>
        <article className="kpi">
          <span>Net payroll / month</span>
          <strong className="money">{money(monthlyPayroll)}</strong>
        </article>
        <article className="kpi">
          <span>Bookings today</span>
          <strong>{todayBookings.length}</strong>
        </article>
        <article className="kpi">
          <span>Leave pending</span>
          <strong>{pendingLeave}</strong>
        </article>
      </section>
      <section className="panel">
        <header className="panel-head">
          <h2>Today in rooms</h2>
          <p>
            {dateFmt(today)} · {bookedRooms} booked · {rooms.length - bookedRooms} open
          </p>
        </header>
        {todayBookings.length === 0 ? (
          <p className="muted">No rooms are booked today.</p>
        ) : (
          <ul className="room-schedule">
            {todayBookings.map((item) => {
              const clash = roomClash(item, bookings)
              return (
                <li key={item.id} className={clash ? 'is-clash' : undefined}>
                  <time>
                    {item.start}
                    <span>{item.end}</span>
                  </time>
                  <div>
                    <strong>{item.title}</strong>
                    <span>
                      {item.room} · {personName(item.hostId)}
                    </span>
                    {clash ? <em>This room is already booked in this window.</em> : null}
                  </div>
                  <StatusTag status={item.status} />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
