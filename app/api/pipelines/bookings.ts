export interface TimeSlot {
  time: string
  available: boolean
}

export interface Booking {
  id: string
  locationId: string
  masterId: string
  serviceId: string
  date: string
  time: string
  clientName: string
  clientPhone: string
}

export interface CreateBookingDto {
  locationId: string
  masterId: string
  serviceId: string
  date: string
  time: string
  clientName: string
  clientPhone: string
}

export const useBookingsApi = () => {
  const { $api } = useNuxtApp()

  return {
    getSlots: (locationId: string, masterId: string, date: string) =>
      $api<TimeSlot[]>('/bookings/slots', {
        query: { locationId, masterId, date },
      }),

    create: (dto: CreateBookingDto) =>
      $api<Booking>('/bookings', {
        method: 'POST',
        body: dto,
      }),

    cancel: (id: string) =>
      $api<void>(`/bookings/${id}`, {
        method: 'DELETE',
      }),
  }
}
