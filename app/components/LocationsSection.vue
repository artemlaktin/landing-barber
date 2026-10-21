<script setup lang="ts">
import SectionHeading from "@components/ui/SectionHeading.vue"

const { t } = useI18n()

interface Location {
  key: string
  phone: string
  mapsUrl: string
}

const locations: Location[] = [
  { key: 'mickiewicza', phone: '+48 536 338 445', mapsUrl: 'https://maps.app.goo.gl/6e3tguV3tt41nw3s7' },
  { key: 'piastow',    phone: '+48 530 463 556', mapsUrl: 'https://maps.app.goo.gl/mpeXZpsmxRoHm5rb9' },
  { key: 'warcisaw',   phone: '+48 530 892 003', mapsUrl: 'https://maps.app.goo.gl/PREAnsSgxQJrJZjv8' },
]
</script>

<template>
  <section id="contacts" class="locations">
    <div class="locations__header">
      <SectionHeading :label="t('locations.label')" :title="t('locations.find_us')" />
      <h2 class="locations__title title">
        {{ t('locations.title') }} <span>{{ t('locations.title_accent') }}</span>
      </h2>
      <p class="locations__subtitle">{{ t('locations.subtitle') }}</p>
    </div>

    <div class="locations__grid">
      <div v-for="loc in locations" :key="loc.key" class="locations__card">
        <div class="locations__card-top">
          <p class="locations__name">{{ t(`locations.items.${loc.key}.name`) }}</p>
          <p class="locations__address">{{ t(`locations.items.${loc.key}.address`) }}</p>
        </div>

        <div class="locations__fields">
          <div class="locations__field">
            <p class="locations__field-label">{{ t('locations.phone_label') }}</p>
            <p class="locations__field-value">
              <svg class="locations__icon"><use href="#phone"></use></svg>
              {{ loc.phone }}
            </p>
          </div>
          <div class="locations__field">
            <p class="locations__field-label">{{ t('locations.hours_label') }}</p>
            <p class="locations__field-value">
              <svg class="locations__icon"><use href="#clock"></use></svg>
              {{ t(`locations.items.${loc.key}.hours`) }}
            </p>
          </div>
        </div>

        <a
          :href="loc.mapsUrl"
          class="locations__maps-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="locations__maps-icon"><use href="#location"></use></svg>
          {{ t('locations.maps_btn') }}
          <span class="locations__maps-arrow">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.locations {
  background: #0C2319;
  color: #fff;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 40px;

    @media (min-width: 1280px) {
      margin-bottom: 48px;
      max-width: 680px;
    }
  }

  &__title {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    color: #fff;

    span {
      color: #C5A367;
      font-style: italic;
    }
  }

  &__subtitle {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.55);
    max-width: 560px;
  }

  // Grid
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // Card
  &__card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
  }

  &__card-top {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__name {
    font-size: 17px;
    font-weight: 600;
    color: #fff;
  }

  &__address {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__field-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  &__field-value {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
  }

  &__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #C5A367;
  }

  // Google Maps button
  &__maps-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: border-color 0.2s ease, color 0.2s ease;

    &:hover {
      border-color: #C5A367;
      color: #C5A367;
    }
  }

  &__maps-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: inherit;
  }

  &__maps-arrow {
    margin-left: auto;
    font-size: 13px;
    opacity: 0.7;
  }
}
</style>
