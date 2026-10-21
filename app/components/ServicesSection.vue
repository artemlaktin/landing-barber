<script setup lang="ts">
import SectionHeading from "@components/ui/SectionHeading.vue";
import LocationModal from "@components/ui/LocationModal.vue";

const {t} = useI18n()

const showLocationModal = ref(false)

const tabs = ['all', 'combo', 'hair', 'beard', 'special'] as const
type Tab = typeof tabs[number]
type ServiceCategory = Exclude<Tab, 'all'>

interface Service {
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

const activeTab = ref<Tab>('all')

const services: Service[] = [
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

const filtered = computed(() =>
    services.filter(s => !s.hidden && (activeTab.value === 'all' || s.category === activeTab.value))
)

const onEnter = (el: Element, done: () => void) => {
  const index = Array.from(el.parentElement!.children).indexOf(el)
  ;(el as HTMLElement).style.transitionDelay = `${index * 30}ms`
  el.addEventListener('transitionend', done, {once: true})
}
</script>

<template>
  <section id="services" class="services">
    <div class="services__header">
      <SectionHeading :label="t('services.label')" :title="t('services.menu')"/>
      <h2 class="services__title title">
        {{ t('services.title') }} <span>{{ t('services.title_accent') }}</span>
      </h2>
      <p class="services__subtitle">{{ t('services.subtitle') }}</p>
      <div class="services__tabs">
        <button
            v-for="tab in tabs"
            :key="tab"
            class="services__tab"
            :class="{ 'services__tab--active': activeTab === tab }"
            @click="activeTab = tab"
        >
          {{ t(`services.tabs.${tab}`) }}
        </button>
      </div>
    </div>
    <TransitionGroup name="card" tag="div" class="services__grid" @enter="onEnter">
      <div
          v-for="service in filtered"
          :key="`${activeTab}-${service.key}`"
          class="services__card"
          :data-span="service.span"
      >
        <img
            class="services__card-img"
            :src="`/img/service-img/${service.image}.webp`"
            :alt="t(`services.items.${service.key}.title`)"
            loading="lazy"
        />
        <div class="services__card-overlay"/>
        <div class="services__card-content">
          <div class="services__card-top">
            <button
                type="button"
                class="services__icon-arrow"
                :aria-label="t('services.book_cta')"
                @click="showLocationModal = true"
            >
              <svg class="services__card-arrow" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="services__card-bottom">
            <div class="services__card-body">
              <span class="services__card-category">{{ t(`services.tabs.${service.category}`) }}</span>
              <p class="services__card-title">{{ t(`services.items.${service.key}.title`) }}</p>
              <p class="services__card-desc">{{ t(`services.items.${service.key}.desc`) }}</p>
            </div>
            <div class="services__card-footer">
              <span class="services__card-duration">
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
                <template v-if="service.durationMin === service.durationMax">{{ service.durationMin }}</template>
                <template v-else>{{ service.durationMin }} – {{ service.durationMax }}</template>
                {{ t('services.time_label') }}
              </span>
              <span class="services__card-price">
                <template v-if="service.priceMin === service.priceMax">{{ service.priceMin }}</template>
                <template v-else>{{ service.priceMin }} – {{ service.priceMax }}</template>
                {{ t('services.price_label') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <LocationModal :show="showLocationModal" @close="showLocationModal = false"/>
  </section>
</template>

<style lang="scss" scoped>
.services {
  --section-heading-color: #7A5824;

  background: #6B4E0024;
  color: #0E1512;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  &__title {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    color: #0E1512;

    span {
      color: #7A5824;
      font-style: italic;
    }
  }

  &__icon-arrow {
    width: 48px;
    height: 48px;
    border: 1px solid #FFFAED2D;
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    cursor: pointer;
    transition: border-color .2s ease;

    &:hover {
      border-color: #C5A367;
    }
  }

  &__subtitle {
    font-size: 16px;
    color: #0E1512B3;
    max-width: 280px;
    line-height: 1.5;
  }

  &__tabs {
    display: flex;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1280px) {
      flex-wrap: wrap;
      overflow-x: visible;
      justify-content: flex-end;
    }
  }

  &__tab {
    padding: 7px 16px;
    border-radius: 100px;
    border: 1px solid #7A5824;
    color: #7A5824;
    cursor: pointer;
    transition: all .2s ease;
    white-space: nowrap;
    flex-shrink: 0;

    &--active {
      background: #C5A367;
      border-color: #C5A367;
      color: #132D21;
      font-size: 18px;
      font-weight: 500;
    }

    &:hover:not(&--active) {
      border-color: #C5A367;
      color: #0E1512;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    max-width: 1280px;
    margin: 0 auto;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    height: 378px;
    grid-column: 1 / -1;

    @media (min-width: 640px) {
      grid-column: span 1;
    }

    &[data-span="2"] {
      grid-column: 1 / -1;

      @media (min-width: 640px) {
        grid-column: span 2;
      }

      @media (min-width: 1280px) {
        grid-column: span 3;
      }
    }

    &[data-span="1"] {
      @media (min-width: 1280px) {
        grid-column: span 2;
      }
    }

    &:hover .services__card-img {
      transform: scale(1.15);
    }
  }

  &__card-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    background: #131B17B2;
  }

  &__card-content {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__card-top {
    display: flex;
    justify-content: flex-end;
  }

  &__card-category {
    display: block;
    font-size: 14px;
    font-weight: 400;

    text-transform: uppercase;
    color: #C5A367;
    margin-bottom: 6px;
  }

  &__card-arrow {
    width: 16px;
    height: 16px;
    color: #ECEEED80;
    flex-shrink: 0;
  }

  &__card-bottom {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__card-title {
    font-size: 24px;
    font-weight: 600;
    color: #ECEEED;
    margin-bottom: 12px;
    line-height: 1.25;

  }

  &__card-desc {
    font-size: 16px;
    color: #FFFCF4AF;
    line-height: 1.5;
  }

  &__card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #DAD9D6;
  }

  &__card-duration {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #ECEEEDAF;

    svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  }

  &__card-price {
    font-size: 14px;
    font-weight: 600;
    color: #C5A367;
  }
}

.card-enter-active {
  transition: opacity .5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform .5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-leave-active {
  display: none;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
