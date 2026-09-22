import type { Booking } from '../types'

export function roomClash(booking: Booking, bookings: Booking[]) {
  return bookings.some(
    (other) =>
      other.id !== booking.id &&
      other.date === booking.date &&
      other.room === booking.room &&
      other.start < booking.end &&
      booking.start < other.end,
  )
}
