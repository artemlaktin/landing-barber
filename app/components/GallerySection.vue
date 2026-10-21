<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import SectionHeading from "@components/ui/SectionHeading.vue"

const { t } = useI18n()

interface Handle {
  label: string
  href: string
}

const handles: Handle[] = [
  { label: '@grizzly_szczecin_',   href: 'https://www.instagram.com/grizzly_szczecin_/' },
  { label: '@grizzly_mickiewicza', href: 'https://www.instagram.com/grizzly_mickiewicza/' },
  { label: '@grizzly_niebuszewo', href: 'https://www.instagram.com/grizzly_niebuszewo' },
]

const photos: string[] = [
  '/img/gallery/full-grizzly.webp',
  '/img/gallery/total-look.webp',
  '/img/gallery/beard-boom.webp',
  '/img/gallery/face-ritual.webp',
  '/img/gallery/hot-wax.webp',
  '/img/gallery/long-mane.webp',
]
</script>

<template>
  <section id="gallery" class="gallery">
    <div class="gallery__header">
      <div class="gallery__heading-group">
        <SectionHeading :label="t('instagram.label')" :title="t('instagram.inside')" />
        <h2 class="gallery__title title">
          {{ t('instagram.title') }} <span>{{ t('instagram.title_accent') }}</span>
        </h2>
      </div>
      <div class="gallery__handles">
        <a
          v-for="handle in handles"
          :key="handle.label"
          :href="handle.href"
          class="gallery__handle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="gallery__handle-icon">
            <use href="#instagram"></use>
          </svg>
          {{ handle.label }}
        </a>
      </div>
    </div>

    <div class="gallery__carousel">
      <Swiper
        class="gallery__swiper"
        :modules="[Autoplay]"
        :slides-per-view="1"
        :space-between="12"
        :breakpoints="{ 640: { slidesPerView: 3, spaceBetween: 12 }, 1280: { slidesPerView: 5, spaceBetween: 12 } }"
        :rewind="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }"
      >
        <SwiperSlide v-for="(photo, i) in photos" :key="i">
          <div class="gallery__slide">
            <img
              :src="photo"
              :alt="t('instagram.post_alt')"
              class="gallery__img"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.gallery {
  background: #0C2319;
  color: #fff;
  overflow: hidden;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;

    @media (min-width: 1280px) {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 40px;
    }
  }

  &__heading-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
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

  &__handles {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 1280px) {
      flex-direction: row;
      align-items: center;
      gap: 28px;
      padding-bottom: 6px;
    }
  }

  &__handle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #C5A367;
    }
  }

  &__handle-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: inherit;
  }

  // Carousel
  &__carousel {
    @media (max-width: 1279px) {
      margin: 0 -16px;
      overflow: hidden;
    }
  }

  &__swiper {
    width: 100%;
  }

  &__slide {
    overflow: hidden;
    border-radius: 8px;

    @media (min-width: 1280px) {
      border-radius: 4px;
    }
  }

  &__img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: block;
    background: #132D21;
  }
}
</style>
