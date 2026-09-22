export type StatusTone = 'pending' | 'approved' | 'denied'

export function statusTone(status: string): StatusTone {
  const key = status.toLowerCase()
  if (key === 'pending' || key === 'queued' || key === 'probation') return 'pending'
  if (key === 'denied' || key === 'declined' || key === 'on leave') return 'denied'
  return 'approved'
}

export function statusLabel(status: string) {
  if (status.toLowerCase() === 'approved') return 'Accepted'
  if (status.toLowerCase() === 'denied') return 'Declined'
  return status.replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function StatusTag({ status }: { status: string }) {
  const tone = statusTone(status)
  return (
    <span className={`status-tag status-${tone}`}>
      <span className="status-dot" aria-hidden="true" />
      {statusLabel(status)}
    </span>
  )
}
