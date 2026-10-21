<script setup lang="ts">
import MastersSection from "@components/MastersSection.vue"
import GallerySection from "@components/GallerySection.vue"
import LocationsSection from "@components/LocationsSection.vue"
import MapSection from "@components/MapSection.vue"
import FooterSection from "@components/FooterSection.vue"
import {LOCATIONS, MAIN_GOOGLE_PHONE, WORK_DAYS_SCHEMA, INSTAGRAM, THREADS, FACEBOOK} from "@helpers/contacts"

const { t, locale } = useI18n()

const SITE_URL = 'https://grizzlybarber.pl'
const OG_IMAGE = `${SITE_URL}/img/brand/grizzlybarber-og.jpg`

const OG_LOCALES: Record<string, string> = {
  pl: 'pl_PL',
  en: 'en_US',
  uk: 'uk_UA',
  ru: 'ru_RU',
}

const ogLocale = computed(() => OG_LOCALES[locale.value] ?? 'pl_PL')
const canonicalUrl = computed(() => `${SITE_URL}/${locale.value}`)

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogType: 'website',
  ogSiteName: 'Grizzly Barber Shop',
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogUrl: () => canonicalUrl.value,
  ogImage: OG_IMAGE,
  ogImageWidth: 1536,
  ogImageHeight: 1024,
  ogImageType: 'image/jpeg',
  ogImageAlt: 'Grizzly Barber Shop',
  ogLocale: () => ogLocale.value,
  ogLocaleAlternate: () => Object.values(OG_LOCALES).filter(l => l !== ogLocale.value),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: OG_IMAGE,
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  '@id': `${SITE_URL}/#business`,
  name: 'Grizzly Barber Shop',
  description: t('seo.description'),
  url: canonicalUrl.value,
  image: OG_IMAGE,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  priceRange: '$$',
  currenciesAccepted: 'PLN',
  telephone: MAIN_GOOGLE_PHONE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Szczecin',
    addressCountry: 'PL',
  },
  areaServed: 'Szczecin',
  sameAs: [...INSTAGRAM, ...THREADS, ...FACEBOOK]
    .map(l => l.href)
    .filter(href => href.startsWith('https://')),
  department: LOCATIONS.map(l => ({
    '@type': 'HairSalon',
    name: `Grizzly · ${l.title}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: l.address,
      addressLocality: 'Szczecin',
      addressCountry: 'PL',
    },
    telephone: l.googlePhone,
    openingHours: `${WORK_DAYS_SCHEMA[l.days]} ${l.open}-${l.close}`,
  })),
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(structuredData.value),
    },
  ],
})
</script>

<template>
  <main class="main">
    <Header/>
    <HeaderDesktop/>
    <HeroSection/>
    <AboutUs/>
    <ServicesSection/>
    <MastersSection/>
    <GallerySection/>
    <LocationsSection/>
    <MapSection/>
    <FooterSection/>
  </main>
</template>
