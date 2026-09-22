import { createContext, useMemo, useState, type ReactNode } from 'react'
import {
  employees,
  initialBookings,
  initialLeaves,
  payroll,
} from '../data/mock'
import type { AppNotification, Booking, LeaveRequest, LeaveStatus, NewBooking } from '../types'
import { dateFmt } from '../services/format'

type DataContextValue = {
  employees: typeof employees
  bookings: Booking[]
  leaves: LeaveRequest[]
  payroll: typeof payroll
  addBooking: (hostId: string, input: NewBooking) => void
  setLeaveStatus: (
    id: string,
    status: Exclude<LeaveStatus, 'pending'>,
    declineReason?: string,
  ) => void
  addLeave: (request: Omit<LeaveRequest, 'id' | 'status'>) => void
  notifications: AppNotification[]
  dismissNotification: (id: string) => void
}

export const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves)
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  const value = useMemo<DataContextValue>(
    () => ({
      employees,
      bookings,
      leaves,
      payroll,
      notifications,
      dismissNotification: (id) => {
        setNotifications((current) => current.filter((item) => item.id !== id))
      },
      addBooking: (hostId, input) => {
        const person = employees.find((item) => item.id === hostId)
        setBookings((current) => [
          {
            id: `b${Date.now()}`,
            hostId,
            status: 'pending',
            ...input,
          },
          ...current,
        ])
        setNotifications((current) => [
          {
            id: `n${Date.now()}`,
            audience: 'hr',
            title: 'Booking received',
            message: `${person?.name ?? 'A guest'} requested ${input.title} in ${input.room} on ${dateFmt(input.date)}, ${input.start}–${input.end}.`,
          },
          ...current,
        ])
      },
      setLeaveStatus: (id, status, declineReason) => {
        const item = leaves.find((entry) => entry.id === id)
        const decidedAt = new Date().toISOString()
        setLeaves((current) =>
          current.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  status,
                  declineReason: declineReason ?? entry.declineReason,
                  decidedAt,
                }
              : entry,
          ),
        )
        if (!item) return
        setNotifications((current) => [
          {
            id: `n${Date.now()}`,
            audience: 'guest',
            employeeId: item.employeeId,
            title: status === 'approved' ? 'Leave request accepted' : 'Leave request declined',
            message: `${item.type}, ${dateFmt(item.from)} – ${dateFmt(item.to)}.`,
            reason: status === 'denied' ? declineReason : undefined,
            decision: status,
            decidedAt,
          },
          ...current,
        ])
      },
      addLeave: (request) => {
        const person = employees.find((item) => item.id === request.employeeId)
        setLeaves((current) => [
          {
            id: `l${Date.now()}`,
            status: 'pending',
            ...request,
          },
          ...current,
        ])
        setNotifications((current) => [
          {
            id: `n${Date.now()}`,
            audience: 'hr',
            title: 'Leave request received',
            message: `${person?.name ?? 'An employee'} sent ${request.type} for ${dateFmt(request.from)} – ${dateFmt(request.to)}.`,
          },
          ...current,
        ])
      },
    }),
    [bookings, leaves, notifications],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
