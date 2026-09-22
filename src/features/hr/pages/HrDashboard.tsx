import { useState } from 'react'
import { AppShell } from '../../../components/layout/AppShell'
import { Notifications } from '../../../components/ui/Notifications'
import { BookingsPanel } from '../panels/BookingsPanel'
import { CalendarPanel } from '../panels/CalendarPanel'
import { LeavePanel } from '../panels/LeavePanel'
import { OverviewPanel } from '../panels/OverviewPanel'
import { PayrollPanel } from '../panels/PayrollPanel'
import { PeoplePanel } from '../panels/PeoplePanel'

const nav = [
  { id: 'overview', label: 'Overview' },
  { id: 'people', label: 'People' },
  { id: 'leave', label: 'Time Off' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'bookings', label: 'Bookings' },
]

export function HrDashboard() {
  const [tab, setTab] = useState('overview')
  const [notice, setNotice] = useState<string | null>(null)

  return (
    <AppShell eyebrow="HR console" items={nav} active={tab} onChange={setTab}>
      {notice ? <p className="notice">{notice}</p> : null}
      <Notifications audience="hr" />

      {tab === 'overview' ? <OverviewPanel /> : null}
      {tab === 'people' ? <PeoplePanel /> : null}
      {tab === 'leave' ? <LeavePanel onNotice={setNotice} /> : null}
      {tab === 'payroll' ? <PayrollPanel /> : null}
      {tab === 'calendar' ? <CalendarPanel /> : null}
      {tab === 'bookings' ? <BookingsPanel /> : null}
    </AppShell>
  )
}
