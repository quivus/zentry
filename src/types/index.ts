export type Role = 'hr' | 'guest'
export type Theme = 'light' | 'dark'
export type EmployeeStatus = 'active' | 'on leave' | 'probation'
export type LeaveStatus = 'pending' | 'approved' | 'denied'
export type BookingStatus = 'confirmed' | 'pending'
export type EmploymentType = 'Full-time' | 'Contract'

export type Employee = {
  id: string
  name: string
  email: string
  role: string
  department: string
  country: string
  city: string
  status: EmployeeStatus
  startDate: string
  salary: number
  employmentType: EmploymentType
}

export type User = {
  email: string
  role: Role
  employeeId: string
}

export type MockAccount = {
  email: string
  password: string
  role: Role
  employeeId: string
  label: string
}

export type Booking = {
  id: string
  title: string
  room: string
  date: string
  start: string
  end: string
  hostId: string
  attendees: number
  status: BookingStatus
}

export type LeaveRequest = {
  id: string
  employeeId: string
  type: string
  from: string
  to: string
  days: number
  status: LeaveStatus
  note: string
  declineReason?: string
  decidedAt?: string
}

export type AppNotification = {
  id: string
  audience: Role
  employeeId?: string
  title: string
  message: string
  reason?: string
  decision?: Exclude<LeaveStatus, 'pending'>
  decidedAt?: string
}

export type PayrollRow = {
  employeeId: string
  gross: number
  deductions: number
  net: number
  status: 'processed' | 'queued'
}

export type NewBooking = {
  title: string
  room: string
  date: string
  start: string
  end: string
  attendees: number
}
