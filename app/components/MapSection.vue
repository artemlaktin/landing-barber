<script setup lang="ts">
import SectionHeading from "@components/ui/SectionHeading.vue"

const {t} = useI18n()

interface Pin {
  key: string
  x: number
  y: number
}

// Positions in % relative to /img/map-full.webp (1120×697)
const pins: Pin[] = [
  {key: 'niebuszewo', x: 51.6, y: 20.5},
  {key: 'mickiewicza', x: 30.5, y: 66.1},
  {key: 'piastow', x: 38.4, y: 85.2},
]
</script>

<template>
  <section id="map" class="map-section">
    <SectionHeading :label="t('map.label')" :title="t('map.title')"/>

    <div class="map-section__frame">
      <img class="map-section__img" src="/img/map-full.webp" :alt="t('map.img_alt')" loading="lazy"/>

      <div
          v-for="pin in pins"
          :key="pin.key"
          class="map-section__pin"
          :style="{ left: pin.x + '%', top: pin.y + '%' }"
      >
        <svg class="map-section__pin-icon" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="6" r="2.4" stroke="#fff" stroke-width="1.6"/>
          <circle cx="7" cy="18" r="2.4" stroke="#fff" stroke-width="1.6"/>
          <path d="M8.7 7.6L19 18M19 6L8.7 16.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.map-section {
  background: #0C2319;

  &__frame {
    position: relative;
    margin-top: 24px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #ffffff26;

    @media (min-width: 1280px) {
      margin-top: 32px;
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
  }

  &__pin {
    position: absolute;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -100%) rotate(-45deg);
    transform-origin: bottom center;
    background: #E43D3D;
    border: 3px solid #fff;
    border-radius: 50% 50% 50% 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__pin-icon {
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
  }
}
</style>
