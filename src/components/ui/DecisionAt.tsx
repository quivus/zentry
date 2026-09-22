import { decisionAt } from '../../services/format'
import type { LeaveStatus } from '../../types'

type DecisionAtProps = {
  status: Exclude<LeaveStatus, 'pending'>
  at?: string
}

export function DecisionAt({ status, at }: DecisionAtProps) {
  const label = status === 'approved' ? 'Approved' : 'Declined'
  return (
    <p className={`decision-at is-${status}`}>
      {at ? decisionAt(status, at) : label}
    </p>
  )
}
