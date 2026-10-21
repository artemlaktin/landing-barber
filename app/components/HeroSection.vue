<script setup lang="ts">
import LogoContainer from "@components/ui/LogoContainer.vue";
import LocationModal from "@components/ui/LocationModal.vue";
import {LOCATIONS} from "@helpers/contacts";

const {t} = useI18n()

const showLocationModal = ref(false)

const locations = LOCATIONS.map(l => ({
  name: l.address,
  workTime: `${l.open} – ${l.close}`,
  phoneNumber: l.phone,
}))
</script>
<template>
  <div class="hero">
    <h1 class="hero__visually-hidden">{{ t('seo.title') }}</h1>
    <div class="hero__logo">
      <LogoContainer/>
    </div>
    <div class="hero__actions">
      <div class="hero__phone-btn">
        <svg>
          <use xlink:href="#phone"></use>
        </svg>
      </div>
      <button type="button" class="hero__btn-recording" @click="showLocationModal = true">
        {{ t('header.booking') }}
      </button>
    </div>
    <video class="hero__video" poster="/video/poster.jpg" autoplay muted loop playsinline fetchpriority="high">
      <source src="/video/bg.webm" type="video/webm">
      <source src="/video/bg.mp4" type="video/mp4">
    </video>
    <div class="hero__overlay"></div>
    <div class="hero__animate-arrow">
      <svg>
        <use xlink:href="#arrow_animate"></use>
      </svg>
    </div>
    <div class="hero__location-info">
      <div v-for="{name, workTime, phoneNumber} in locations" class="hero__location-item">
        <p class="hero__locations-text">
          <svg>
            <use xlink:href="#barber"></use>
          </svg>
          {{ name }}
        </p>
        <p class="hero__locations-text">
          <svg>
            <use xlink:href="#clock"></use>
          </svg>
          {{ workTime }}
        </p>
        <p class="hero__locations-text">
          <svg>
            <use xlink:href="#phone"></use>
          </svg>
          {{ phoneNumber }}
        </p>
      </div>
    </div>
    <LocationModal :show="showLocationModal" @close="showLocationModal = false"/>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  min-height: 100dvh;
  @media (min-width: 1280px) {
    min-height: max(100dvh, 800px);
  }
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;

  &__visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  &__locations-text {
    display: none;
    align-items: center;
    gap: 9px;
    @media (min-width: 1280px) {
      display: flex;
    }
  }

  &__location-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 20px;
    line-height: 150%;

    svg {
      width: 20px;
      height: 20px;
    }

    &:not(:first-child) {
      border-top: 1px solid #FFFAED2D;
      padding-top: 10px;
    }
  }

  &__location-info {
    position: absolute;
    z-index: 3;
    left: 100px;
    top: 50%;
    transform: translateY(-50%);
    color: #CBB99F;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__animate-arrow {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    color: #fff;
    animation: arrow-bounce 1s ease-in-out infinite;
    @media (min-width: 980px) {
      bottom: 30%;
    }

    svg {
      width: 24px;
      height: 12px;
    }
  }

  @keyframes arrow-bounce {
    0% {
      bottom: 10%;
      color: #fff;
    }
    50% {
      bottom: 4%;
      color: #C5A367;
    }
    100% {
      bottom: 10%;
      color: #fff;
    }
  }

  &__actions {
    z-index: 3;
    display: flex;
    gap: 10px;
    @media (min-width: 980px) {
      display: none;
    }
  }

  &__btn-recording {
    background: #008F4ACF;
    border-radius: 35px;
    width: 292px;
    padding: 12.5px 0;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
  }

  &__phone-btn {
    width: 48px;
    height: 48px;
    background: #C5A367;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;


    svg {
      width: 17px;
      height: 17px;
    }
  }

  &__logo {
    position: relative;
    z-index: 3;

    :deep(svg) {
      width: clamp(375px, 210px + 34.375vw, 650px);
      height: clamp(375px, 210px + 34.375vw, 650px);
    }

  }

  &__video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
  }

  &__overlay {
    position: absolute;
    width: 100%;
    min-height: 100dvh;
    top: 0;
    left: 0;
    background: #020D09E0;
    z-index: 2;
    @media (min-width: 1280px) {
      min-height: max(100dvh, 800px);
    }
  }
}
</style>
