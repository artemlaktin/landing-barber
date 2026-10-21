// Single source of truth for location contacts and social links.
// Change a phone / address / hours here — Hero, Locations, Footer, booking modal and Google data update together.

// Label comes from i18n `locations.days.<value>`, Google format from WORK_DAYS_SCHEMA
export type WorkDays = 'everyday' | 'mon_sat' | 'mon_fri'

export const WORK_DAYS_SCHEMA: Record<WorkDays, string> = {
  everyday: 'Mo-Su',
  mon_sat: 'Mo-Sa',
  mon_fri: 'Mo-Fr',
}

export interface Location {
  key: 'mickiewicza' | 'piastow' | 'warcisaw'
  title: string
  name: string
  address: string
  phone: string
  googlePhone: string
  days: WorkDays
  open: string
  close: string
  mapsUrl: string
  booksyUrl: string
}

export const LOCATIONS: Location[] = [
  {
    key: 'mickiewicza',
    title: 'Mickiewicza',
    name: 'Grizzly · Mickiewicza',
    address: 'Adama Mickiewicza 36a',
    phone: '+48 536 338 445',
    googlePhone: '+48535109480',
    days: 'everyday',
    open: '09:30',
    close: '19:00',
    mapsUrl: 'https://maps.app.goo.gl/6e3tguV3tt41nw3s7',
    booksyUrl: 'https://booksy.com/pl-pl/263864_grizzly-barbershop-mickiewicza_barber-shop_18078_szczecin?do=invite#ba_s=dl_1',
  },
  {
    key: 'piastow',
    title: 'Piastów',
    name: 'Grizzly · Piastów',
    address: 'al. Piastów 10',
    phone: '+48 530 463 556',
    googlePhone: '+48535109480',
    days: 'everyday',
    open: '11:00',
    close: '19:00',
    mapsUrl: 'https://maps.app.goo.gl/mpeXZpsmxRoHm5rb9',
    booksyUrl: 'https://booksy.com/pl-pl/115246_grizzly-barber-shop_barber-shop_18078_szczecin?do=invite&_branch_match_id=1614269025715788005',
  },
  {
    key: 'warcisaw',
    title: 'Niebuszewo',
    name: 'Grizzly · Warcisława',
    address: 'Księcia Warcisława I 27B',
    phone: '+48 530 892 003',
    googlePhone: '+48535109481',
    days: 'everyday',
    open: '09:00',
    close: '20:00',
    mapsUrl: 'https://maps.app.goo.gl/PREAnsSgxQJrJZjv8',
    booksyUrl: 'https://booksy.com/pl-pl/220732_grizzly-barber-shop-niebuszewo_barber-shop_18078_szczecin?do=invite&_branch_match_id=1614269025715788005',
  },
]

// Phone shown to Google as the main business number
export const MAIN_GOOGLE_PHONE = '+48535109480'

export const BOOKSY_LINKS: Record<string, string> = Object.fromEntries(
  LOCATIONS.map(l => [l.title, l.booksyUrl]),
)

export interface SocialLink {
  label: string
  handle: string
  href: string
}

export const INSTAGRAM: SocialLink[] = [
  {label: 'SZCZECIN', handle: '@grizzly_szczecin_', href: 'https://www.instagram.com/grizzly_szczecin_/'},
  {label: 'MICKIEWICZ', handle: '@grizzly_mickiewicza', href: 'https://www.instagram.com/grizzly_mickiewicza/'},
  {label: 'NIEBUSZEWO', handle: '@grizzly_niebuszewo', href: 'https://www.instagram.com/grizzly_niebuszewo'},
]

export const THREADS: SocialLink[] = [
  {label: 'MICKIEWICZ', handle: '@grizzly_mickiewicza', href: 'https://www.threads.com/@grizzly_mickiewicza'},
  {label: 'NIEBUSZEWO', handle: '@grizzly_niebuszewo', href: 'https://www.threads.com/@grizzly_niebuszewo_'},
]

// TODO: no real Facebook link yet — placeholder until supplied
export const FACEBOOK: SocialLink[] = [
  {label: 'NIEBUSZEWO', handle: 'NIEBUSZEWO', href: '#'},
]
