import { useState, type FormEvent } from 'react'
import { DecisionAt } from '../../../components/ui/DecisionAt'
import { useData } from '../../../hooks/useData'
import { dateFmt } from '../../../services/format'

type LeavePanelProps = {
  onNotice: (message: string) => void
}

export function LeavePanel({ onNotice }: LeavePanelProps) {
  const { employees, leaves, setLeaveStatus } = useData()
  const [decliningId, setDecliningId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [reasonMissing, setReasonMissing] = useState(false)

  function decide(id: string, status: 'approved') {
    setLeaveStatus(id, status)
    onNotice('Leave request accepted.')
  }

  function startDecline(id: string) {
    setDecliningId(id)
    setReason('')
    setReasonMissing(false)
  }

  function confirmDecline(event: FormEvent, id: string) {
    event.preventDefault()
    if (reason.trim() === '') {
      setReasonMissing(true)
      return
    }
    setLeaveStatus(id, 'denied', reason.trim())
    onNotice('Leave request declined.')
    setDecliningId(null)
    setReason('')
    setReasonMissing(false)
  }

  return (
    <section className="panel">
      <header className="panel-head">
        <h2>Leave requests</h2>
        <p>Approve or decline from the console</p>
      </header>
      <ul className="request-list">
        {leaves.map((item) => {
          const person = employees.find((entry) => entry.id === item.employeeId)
          const declining = decliningId === item.id
          const declined = item.status === 'denied'
          const decided = item.status !== 'pending'
          return (
            <li
              key={item.id}
              className={`request-card${declining ? ' is-declining' : ''}${decided ? ' is-record' : ''}`}
            >
              <div>
                <div className="record-heading">
                  <h3>{person?.name}</h3>
                  {item.status === 'approved' || item.status === 'denied' ? (
                    <DecisionAt status={item.status} at={item.decidedAt} />
                  ) : null}
                </div>
                <p>
                  {item.type} · {dateFmt(item.from)} – {dateFmt(item.to)} · {item.days}{' '}
                  {item.days === 1 ? 'day' : 'days'}
                </p>
                <p className="muted">{item.note}</p>
                {declined && item.declineReason ? (
                  <p className="reason-note">
                    <span>Reason</span>
                    {item.declineReason}
                  </p>
                ) : null}
              </div>
              {decided ? null : declining ? (
                <form className="decline-box" onSubmit={(event) => confirmDecline(event, item.id)}>
                  <p>Are you sure you want to decline this request? This cannot be undone.</p>
                  <label>
                    Reason for declining
                    <textarea
                      value={reason}
                      onChange={(event) => {
                        setReason(event.target.value)
                        if (event.target.value.trim()) setReasonMissing(false)
                      }}
                      className={reasonMissing ? 'is-invalid' : undefined}
                      aria-invalid={reasonMissing || undefined}
                    />
                  </label>
                  <div className="request-actions">
                    <button type="submit" className="status-action status-denied">
                      Decline
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => {
                        setDecliningId(null)
                        setReason('')
                        setReasonMissing(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="request-actions">
                  <button
                    type="button"
                    className="status-action status-approved"
                    onClick={() => decide(item.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="status-action status-denied"
                    onClick={() => startDecline(item.id)}
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
