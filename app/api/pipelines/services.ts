export interface Service {
  id: string
  slug: string
  category: string
  durationMin: number
  price: number
  priceMax: number | null
}

export interface Master {
  id: string
  name: string
  photo: string
  locationIds: string[]
}

export const useServicesApi = () => {
  const { $api } = useNuxtApp()

  return {
    getAll: () =>
      $api<Service[]>('/services'),

    getMasters: (locationId?: string) =>
      $api<Master[]>('/masters', {
        query: locationId ? { locationId } : undefined,
      }),
  }
}
