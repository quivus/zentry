import { useState } from 'react'
import { AppShell } from '../../../components/layout/AppShell'
import { Notifications } from '../../../components/ui/Notifications'
import { useAuth } from '../../../hooks/useAuth'
import { useData } from '../../../hooks/useData'
import { BookRoomPanel } from '../panels/BookRoomPanel'
import { DirectoryPanel } from '../panels/DirectoryPanel'
import { HomePanel } from '../panels/HomePanel'
import { LeavePanel } from '../panels/LeavePanel'
import { PayslipPanel } from '../panels/PayslipPanel'

const nav = [
  { id: 'home', label: 'Home' },
  { id: 'book', label: 'Book a room' },
  { id: 'payslip', label: 'Payslip' },
  { id: 'directory', label: 'Directory' },
  { id: 'leave', label: 'Time off' },
]

export function GuestPortal() {
  const { user } = useAuth()
  const { employees } = useData()
  const [tab, setTab] = useState('home')
  const [notice, setNotice] = useState<string | null>(null)
  const me = employees.find((item) => item.id === user?.employeeId)

  if (!me) return null

  return (
    <AppShell eyebrow="Guest portal" items={nav} active={tab} onChange={setTab}>
      {notice ? (
        <article className="notification">
          <header>
            <p className="kicker">Sent</p>
            <button type="button" className="btn btn-ghost" onClick={() => setNotice(null)}>
              Dismiss
            </button>
          </header>
          <h3>{notice}</h3>
        </article>
      ) : null}
      <Notifications audience="guest" employeeId={user?.employeeId} />

      {tab === 'home' ? <HomePanel me={me} /> : null}
      {tab === 'book' ? (
        <BookRoomPanel
          onBooked={() => {
            setNotice('Booking submitted. HR can see it in the console.')
            setTab('home')
          }}
        />
      ) : null}
      {tab === 'payslip' ? <PayslipPanel me={me} /> : null}
      {tab === 'directory' ? <DirectoryPanel /> : null}
      {tab === 'leave' ? (
        <LeavePanel
          onSubmitted={() => {
            setNotice('Leave request sent to HR.')
            setTab('leave')
          }}
        />
      ) : null}
    </AppShell>
  )
}
