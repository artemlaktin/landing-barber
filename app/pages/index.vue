<script setup lang="ts">
import MastersSection from "@components/MastersSection.vue"
import ReviewsSection from "@components/ReviewsSection.vue"
import GallerySection from "@components/GallerySection.vue"
import LocationsSection from "@components/LocationsSection.vue"
import MapSection from "@components/MapSection.vue"
import FooterSection from "@components/FooterSection.vue"

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
  telephone: '+48535109480',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Szczecin',
    addressCountry: 'PL',
  },
  areaServed: 'Szczecin',
  sameAs: [
    'https://www.instagram.com/grizzly_szczecin_/',
    'https://www.instagram.com/grizzly_mickiewicza/',
    'https://www.instagram.com/grizzly_niebuszewo',
    'https://www.threads.com/@grizzly_mickiewicza',
  ],
  department: [
    {
      '@type': 'HairSalon',
      name: 'Grizzly · Mickiewicza',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Adama Mickiewicza 36a',
        addressLocality: 'Szczecin',
        addressCountry: 'PL',
      },
      telephone: '+48535109480',
      openingHours: 'Mo-Su 09:30-19:00',
    },
    {
      '@type': 'HairSalon',
      name: 'Grizzly · Piastów',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'al. Piastów 10',
        addressLocality: 'Szczecin',
        addressCountry: 'PL',
      },
      telephone: '+48535109480',
      openingHours: 'Mo-Su 11:00-19:00',
    },
    {
      '@type': 'HairSalon',
      name: 'Grizzly · Niebuszewo',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Księcia Warcisława I 27B',
        addressLocality: 'Szczecin',
        addressCountry: 'PL',
      },
      telephone: '+48535109481',
      openingHours: 'Mo-Su 09:00-20:00',
    },
  ],
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
    <ReviewsSection/>
    <GallerySection/>
    <LocationsSection/>
    <MapSection/>
    <FooterSection/>
  </main>
</template>
