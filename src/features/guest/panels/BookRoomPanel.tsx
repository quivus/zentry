import { useState, type FormEvent } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useData } from '../../../hooks/useData'
import { rooms } from '../../../data/mock'

type BookRoomPanelProps = {
  onBooked: () => void
}

export function BookRoomPanel({ onBooked }: BookRoomPanelProps) {
  const { user } = useAuth()
  const { addBooking } = useData()
  const [title, setTitle] = useState('Design working session')
  const [room, setRoom] = useState<string>(rooms[4])
  const [date, setDate] = useState('2026-09-28')
  const [start, setStart] = useState('14:00')
  const [end, setEnd] = useState('15:30')
  const [missing, setMissing] = useState({ title: false, date: false, start: false, end: false })

  function submitBooking(event: FormEvent) {
    event.preventDefault()
    const next = {
      title: title.trim() === '',
      date: date.trim() === '',
      start: start.trim() === '',
      end: end.trim() === '',
    }
    setMissing(next)
    if (!user || next.title || next.date || next.start || next.end) return
    addBooking(user.employeeId, {
      title,
      room,
      date,
      start,
      end,
      attendees: 4,
    })
    onBooked()
  }

  return (
    <section className="panel">
      <header className="panel-head">
        <h2>Reserve a space</h2>
        <p>Pending until the room is confirmed</p>
      </header>
      <form className="form-grid" onSubmit={submitBooking} noValidate>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (event.target.value.trim()) setMissing((current) => ({ ...current, title: false }))
            }}
            className={missing.title ? 'is-invalid' : undefined}
            aria-invalid={missing.title || undefined}
          />
        </label>
        <label>
          Room
          <select value={room} onChange={(event) => setRoom(event.target.value)}>
            {rooms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value)
              if (event.target.value.trim()) setMissing((current) => ({ ...current, date: false }))
            }}
            className={missing.date ? 'is-invalid' : undefined}
            aria-invalid={missing.date || undefined}
          />
        </label>
        <label>
          Start
          <input
            type="time"
            value={start}
            onChange={(event) => {
              setStart(event.target.value)
              if (event.target.value.trim()) setMissing((current) => ({ ...current, start: false }))
            }}
            className={missing.start ? 'is-invalid' : undefined}
            aria-invalid={missing.start || undefined}
          />
        </label>
        <label>
          End
          <input
            type="time"
            value={end}
            onChange={(event) => {
              setEnd(event.target.value)
              if (event.target.value.trim()) setMissing((current) => ({ ...current, end: false }))
            }}
            className={missing.end ? 'is-invalid' : undefined}
            aria-invalid={missing.end || undefined}
          />
        </label>
        <button type="submit" className="btn btn-solid">
          Submit booking
        </button>
      </form>
    </section>
  )
}
