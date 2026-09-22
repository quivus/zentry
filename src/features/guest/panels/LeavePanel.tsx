import { useState, type FormEvent } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useData } from '../../../hooks/useData'
import { dateFmt } from '../../../services/format'
import { DecisionAt } from '../../../components/ui/DecisionAt'
import { StatusTag } from '../../../components/ui/StatusTag'

type LeavePanelProps = {
  onSubmitted: () => void
}

export function LeavePanel({ onSubmitted }: LeavePanelProps) {
  const { user } = useAuth()
  const { leaves, addLeave } = useData()
  const myLeave = leaves.filter((item) => item.employeeId === user?.employeeId)
  const [leaveType, setLeaveType] = useState('Annual leave')
  const [leaveFrom, setLeaveFrom] = useState('2026-10-20')
  const [leaveTo, setLeaveTo] = useState('2026-10-21')
  const [leaveNote, setLeaveNote] = useState('Personal travel.')

  function submitLeave(event: FormEvent) {
    event.preventDefault()
    if (!user) return
    addLeave({
      employeeId: user.employeeId,
      type: leaveType,
      from: leaveFrom,
      to: leaveTo,
      days: 2,
      note: leaveNote,
    })
    onSubmitted()
  }

  return (
    <div className="stack">
      <section className="panel">
        <header className="panel-head">
          <h2>Request time off</h2>
        </header>
        <form className="form-grid" onSubmit={submitLeave}>
          <label>
            Type
            <select value={leaveType} onChange={(event) => setLeaveType(event.target.value)}>
              <option>Annual leave</option>
              <option>Sick leave</option>
              <option>Personal leave</option>
            </select>
          </label>
          <label>
            From
            <input type="date" value={leaveFrom} onChange={(event) => setLeaveFrom(event.target.value)} />
          </label>
          <label>
            To
            <input type="date" value={leaveTo} onChange={(event) => setLeaveTo(event.target.value)} />
          </label>
          <label className="span-2">
            Note
            <input value={leaveNote} onChange={(event) => setLeaveNote(event.target.value)} />
          </label>
          <button type="submit" className="btn btn-solid">
            Send to HR
          </button>
        </form>
      </section>
      <section className="panel">
        <header className="panel-head">
          <h2>Your requests</h2>
        </header>
        <ul className="feed">
          {myLeave.map((item) => (
            <li key={item.id} className="feed-row">
              <div>
                <div className="record-heading">
                  <strong>{item.type}</strong>
                  {item.status !== 'pending' ? (
                    <DecisionAt status={item.status} at={item.decidedAt} />
                  ) : null}
                </div>
                <span>
                  {dateFmt(item.from)} – {dateFmt(item.to)}
                </span>
                {item.note ? <span className="muted">{item.note}</span> : null}
                {item.declineReason ? (
                  <p className="reason-note">
                    <span>Reason</span>
                    {item.declineReason}
                  </p>
                ) : null}
              </div>
              {item.status === 'pending' ? <StatusTag status={item.status} /> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
