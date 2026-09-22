import { useData } from '../../hooks/useData'
import type { Role } from '../../types'
import { DecisionAt } from './DecisionAt'

type NotificationsProps = {
  audience: Role
  employeeId?: string
}

export function Notifications({ audience, employeeId }: NotificationsProps) {
  const { notifications, dismissNotification } = useData()
  const items = notifications.filter(
    (item) => item.audience === audience && (audience === 'hr' || item.employeeId === employeeId),
  )

  if (items.length === 0) return null

  return (
    <div className="notification-list">
      {items.map((item) => (
        <article key={item.id} className="notification">
          <header>
            <p className="kicker">Received</p>
            <button type="button" className="btn btn-ghost" onClick={() => dismissNotification(item.id)}>
              Dismiss
            </button>
          </header>
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          {item.decision ? <DecisionAt status={item.decision} at={item.decidedAt} /> : null}
          {item.reason ? (
            <p className="reason-note">
              <span>Reason</span>
              {item.reason}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  )
}
