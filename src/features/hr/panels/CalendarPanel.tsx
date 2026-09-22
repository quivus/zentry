import { useMemo, useState } from 'react'
import { useData } from '../../../hooks/useData'
import { dateFmt, todayIso } from '../../../services/format'
import { roomClash } from '../../../services/schedule'
import type { Booking } from '../../../types'
import { statusTone } from '../../../components/ui/StatusTag'

type Span = 'week' | 'month' | 'year'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function parseIso(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toIso(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function addDays(date: Date, count: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + count)
  return next
}

function startOfWeek(date: Date) {
  return addDays(date, -((date.getDay() + 6) % 7))
}

export function CalendarPanel() {
  const { employees, bookings } = useData()
  const today = todayIso()
  const [span, setSpan] = useState<Span>('week')
  const [cursor, setCursor] = useState(() => parseIso(today))
  const [selected, setSelected] = useState(today)

  const clashes = useMemo(
    () => new Set(bookings.filter((item) => roomClash(item, bookings)).map((item) => item.id)),
    [bookings],
  )

  function personName(id: string) {
    return employees.find((item) => item.id === id)?.name ?? 'Unknown'
  }

  function bookingsOn(iso: string) {
    return bookings
      .filter((item) => item.date === iso)
      .slice()
      .sort((a, b) => a.start.localeCompare(b.start))
  }

  function shift(direction: -1 | 1) {
    const next = new Date(cursor)
    if (span === 'week') next.setDate(next.getDate() + direction * 7)
    if (span === 'month') next.setMonth(next.getMonth() + direction)
    if (span === 'year') next.setFullYear(next.getFullYear() + direction)
    setCursor(next)
  }

  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(cursor), index))
  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
  const monthDays = Array.from({ length: 42 }, (_, index) => addDays(startOfWeek(monthStart), index))

  const heading =
    span === 'week'
      ? `${dateFmt(toIso(weekDays[0]))} – ${dateFmt(toIso(weekDays[6]))}`
      : span === 'month'
        ? cursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
        : String(cursor.getFullYear())

  return (
    <section className="panel calendar-panel">
      <header className="cal-toolbar">
        <div className="cal-switch" role="tablist" aria-label="Calendar range">
          {(['week', 'month', 'year'] as const).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={span === item}
              className={span === item ? 'is-active' : undefined}
              onClick={() => setSpan(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <h2>{heading}</h2>
        <div className="cal-nav">
          <button type="button" className="btn btn-ghost" onClick={() => shift(-1)}>
            Previous
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setCursor(parseIso(today))
              setSelected(today)
            }}
          >
            Today
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => shift(1)}>
            Next
          </button>
        </div>
      </header>
      <p className="cal-legend">
        <span>
          <i className="swatch swatch-approved" /> Confirmed
        </span>
        <span>
          <i className="swatch swatch-pending" /> Pending
        </span>
        <span>
          <i className="swatch swatch-denied" /> Room already booked
        </span>
      </p>

      {span === 'week' ? (
        <div className="cal-board">
        <div className="cal-week">
          {weekDays.map((day) => {
            const iso = toIso(day)
            const items = bookingsOn(iso)
            return (
              <article
                key={iso}
                className={`cal-day${iso === today ? ' is-today' : ''}${items.length ? ' is-booked' : ''}`}
              >
                <header>
                  <span>{WEEKDAYS[(day.getDay() + 6) % 7]}</span>
                  <strong>{day.getDate()}</strong>
                </header>
                {items.length === 0 ? (
                  <p className="muted">Open</p>
                ) : (
                  <ul>
                    {items.map((item) => (
                      <EventCard
                        key={item.id}
                        item={item}
                        host={personName(item.hostId)}
                        clash={clashes.has(item.id)}
                      />
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>
        </div>
      ) : null}

      {span === 'month' ? (
        <>
          <div className="cal-board">
          <div className="cal-weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="cal-month">
            {monthDays.map((day) => {
              const iso = toIso(day)
              const items = bookingsOn(iso)
              const outside = day.getMonth() !== cursor.getMonth()
              return (
                <button
                  key={iso}
                  type="button"
                  className={`cal-cell${outside ? ' is-outside' : ''}${iso === today ? ' is-today' : ''}${iso === selected ? ' is-selected' : ''}`}
                  onClick={() => setSelected(iso)}
                >
                  <strong>{day.getDate()}</strong>
                  {items.slice(0, 2).map((item) => (
                    <span
                      key={item.id}
                      className={`cal-chip cal-event-${statusTone(item.status)}${clashes.has(item.id) ? ' is-clash' : ''}`}
                    >
                      {item.start} {item.room}
                    </span>
                  ))}
                  {items.length > 2 ? <span className="muted">+{items.length - 2}</span> : null}
                </button>
              )
            })}
          </div>
          </div>
          <DayDetail
            iso={selected}
            items={bookingsOn(selected)}
            personName={personName}
            clashes={clashes}
          />
        </>
      ) : null}

      {span === 'year' ? (
        <div className="cal-year">
          {Array.from({ length: 12 }, (_, month) => {
            const first = new Date(cursor.getFullYear(), month, 1)
            const days = Array.from({ length: 42 }, (_, index) => addDays(startOfWeek(first), index))
            const monthBookings = bookings.filter((item) => {
              const date = parseIso(item.date)
              return date.getFullYear() === cursor.getFullYear() && date.getMonth() === month
            })
            return (
              <article key={month} className="cal-month-card">
                <button
                  type="button"
                  className="cal-month-title"
                  onClick={() => {
                    setCursor(first)
                    setSelected(toIso(first))
                    setSpan('month')
                  }}
                >
                  {first.toLocaleDateString('en-GB', { month: 'long' })}
                  <span>{monthBookings.length === 0 ? 'Open' : `${monthBookings.length} booked`}</span>
                </button>
                <div className="cal-mini" aria-hidden="true">
                  {days.map((day) => {
                    const iso = toIso(day)
                    const inMonth = day.getMonth() === month
                    const items = inMonth ? bookingsOn(iso) : []
                    const tone = items.some((item) => clashes.has(item.id))
                      ? 'denied'
                      : items.some((item) => statusTone(item.status) === 'pending')
                        ? 'pending'
                        : items.length
                          ? 'approved'
                          : ''
                    return (
                      <span
                        key={`${month}-${iso}`}
                        className={`cal-dot${inMonth ? '' : ' is-outside'}${tone ? ` is-${tone}` : ''}${iso === today ? ' is-today' : ''}`}
                      />
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}

function EventCard({ item, host, clash }: { item: Booking; host: string; clash: boolean }) {
  return (
    <li className={`cal-event cal-event-${statusTone(item.status)}${clash ? ' is-clash' : ''}`}>
      <strong>
        {item.start}–{item.end}
      </strong>
      <span>{item.room}</span>
      <span>{item.title}</span>
      <span>{host}</span>
      {clash ? <em>Room already booked</em> : null}
    </li>
  )
}

function DayDetail({
  iso,
  items,
  personName,
  clashes,
}: {
  iso: string
  items: Booking[]
  personName: (id: string) => string
  clashes: Set<string>
}) {
  return (
    <div className="cal-detail">
      <h3>{dateFmt(iso)}</h3>
      {items.length === 0 ? (
        <p className="muted">No rooms booked.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <EventCard
              key={item.id}
              item={item}
              host={personName(item.hostId)}
              clash={clashes.has(item.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
