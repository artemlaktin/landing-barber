// Service menu: prices in zł, duration in minutes.
// Title and description live in i18n `services.items.<key>`, image in public/img/service-img/<image>.webp.
// span: 2 — wide card, 1 — narrow. hidden: true — not shown on the site.

export const SERVICE_TABS = ['all', 'combo', 'hair', 'beard', 'special'] as const
export type ServiceTab = typeof SERVICE_TABS[number]
export type ServiceCategory = Exclude<ServiceTab, 'all'>

export interface Service {
  key: string
  category: ServiceCategory
  priceMin: number
  priceMax: number
  durationMin: number
  durationMax: number
  span: 1 | 2
  image: string
  hidden?: boolean
}

export const SERVICES: Service[] = [
  {key: 'full_grizzly', category: 'combo', priceMin: 120, priceMax: 150, durationMin: 60, durationMax: 90, span: 2, image: 'full-grizzly'},
  {key: 'total_look', category: 'combo', priceMin: 160, priceMax: 220, durationMin: 90, durationMax: 120, span: 2, image: 'total-look'},
  {key: 'cut', category: 'hair', priceMin: 60, priceMax: 100, durationMin: 40, durationMax: 60, span: 1, image: 'cut'},
  {key: 'long_mane', category: 'hair', priceMin: 120, priceMax: 140, durationMin: 60, durationMax: 80, span: 1, image: 'long-mane'},
  {key: 'grey_stealth', category: 'hair', priceMin: 120, priceMax: 130, durationMin: 70, durationMax: 70, span: 1, image: 'grey-stealth', hidden: true},
  {key: 'beard_boom', category: 'beard', priceMin: 60, priceMax: 100, durationMin: 40, durationMax: 60, span: 1, image: 'beard-boom'},
  {key: 'smooth_sharp', category: 'beard', priceMin: 70, priceMax: 80, durationMin: 35, durationMax: 35, span: 1, image: 'smooth-sharp', hidden: true},
  {key: 'face_ritual', category: 'special', priceMin: 50, priceMax: 50, durationMin: 20, durationMax: 30, span: 2, image: 'face-ritual'},
  {key: 'hot_wax', category: 'special', priceMin: 30, priceMax: 30, durationMin: 15, durationMax: 20, span: 2, image: 'hot-wax'},
]
