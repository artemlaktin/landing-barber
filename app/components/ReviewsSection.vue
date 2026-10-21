<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'
import SectionHeading from "@components/ui/SectionHeading.vue"

const { t, locale } = useI18n()

interface Review {
  id: number
  name: string
  platform: 'google'
  avatar: string
  text: string
}

const { data: reviews } = await useFetch<Review[]>('/api/reviews', {
  query: { locale },
  default: () => [] as Review[],
})

const brokenAvatars = ref(new Set<number>())

function onAvatarError(id: number) {
  brokenAvatars.value = new Set(brokenAvatars.value).add(id)
}

const swiperInstance = ref<SwiperInstance | null>(null)

function onSwiper(instance: SwiperInstance) {
  swiperInstance.value = instance
}
</script>

<template>
  <section id="reviews" class="reviews">
    <div class="reviews__header">
      <div class="reviews__heading-group">
        <SectionHeading :label="t('reviews.label')" :title="t('reviews.voices')" />
        <h2 class="reviews__title title">
          {{ t('reviews.title') }} <span>{{ t('reviews.title_accent') }}</span>
        </h2>
      </div>
      <div class="reviews__rating">
        <div class="reviews__rating-top">
          <span class="reviews__score title">5.0</span>
          <div class="reviews__stars">
            <span v-for="i in 5" :key="i" class="reviews__star">★</span>
          </div>
        </div>
        <p class="reviews__rating-label">{{ t('reviews.rating_label') }}</p>
      </div>
    </div>

    <div class="reviews__carousel">
      <button
        class="reviews__nav reviews__nav--prev"
        :aria-label="t('reviews.prev')"
        @click="swiperInstance?.slidePrev()"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <Swiper
        class="reviews__swiper"
        :slides-per-view="1.1"
        :space-between="16"
        :breakpoints="{ 1280: { slidesPerView: 3, spaceBetween: 16 } }"
        loop
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="review in reviews" :key="review.id">
          <article class="reviews__card">
            <div class="reviews__card-header">
              <img
                v-if="review.avatar && !brokenAvatars.has(review.id)"
                :src="review.avatar"
                :alt="review.name"
                class="reviews__avatar"
                loading="lazy"
                @error="onAvatarError(review.id)"
              />
              <div v-else class="reviews__avatar-placeholder">
                <svg><use href="#avatar" /></svg>
              </div>
              <div class="reviews__card-meta">
                <p class="reviews__card-name">{{ review.name }}</p>
                <div class="reviews__card-stars">
                  <span v-for="i in 5" :key="i">★</span>
                </div>
              </div>
              <div class="reviews__platform">
                <img src="/img/brand/google.svg" alt="Google" class="reviews__platform-img" />
              </div>
            </div>
            <p class="reviews__card-text">{{ review.text }}</p>
          </article>
        </SwiperSlide>
      </Swiper>

      <button
        class="reviews__nav reviews__nav--next"
        :aria-label="t('reviews.next')"
        @click="swiperInstance?.slideNext()"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.reviews {
  background: #0C2319;
  color: #fff;
  overflow: hidden;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    @media (min-width: 1280px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 48px;
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

  &__rating {
    display: flex;
    flex-direction: column;
    gap: 6px;

    @media (min-width: 1280px) {
      align-items: flex-end;
    }
  }

  &__rating-top {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__score {
    font-size: clamp(48px, 6vw, 68px);
    font-weight: 600;
    color: #C5A367;
    line-height: 1;
  }

  &__stars {
    display: flex;
    gap: 4px;
  }

  &__star {
    font-size: 20px;
    color: #C5A367;
  }

  &__rating-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
  }

  // Carousel
  &__carousel {
    @media (max-width: 1279px) {
      // extend swiper to full viewport width past section padding
      margin: 0 -16px;
      overflow: hidden;
    }

    @media (min-width: 1280px) {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &__swiper {
    flex: 1;
    min-width: 0;
  }

  // Card
  &__card {
    background: #fff;
    color: #0E1512;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 234px;
    box-sizing: border-box;
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__avatar-placeholder {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #D9D9D9;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
      color: #000;
    }
  }

  &__card-meta {
    flex: 1;
    min-width: 0;
  }

  &__card-name {
    font-size: 15px;
    font-weight: 600;
    color: #0E1512;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__card-stars {
    font-size: 13px;
    color: #C5A367;
    letter-spacing: 1px;
  }

  &__platform {
    flex-shrink: 0;
  }

  &__platform-img {
    width: 32px;
    height: 32px;
    display: block;
  }

  &__platform-svg {
    width: 32px;
    height: 32px;
    display: block;
    color: #1A9E86;
  }

  &__card-text {
    font-size: 14px;
    line-height: 1.65;
    color: rgba(14, 21, 18, 0.7);
  }

  // Nav arrows — desktop only
  &__nav {
    display: none;

    @media (min-width: 1280px) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.2s ease, border-color 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.45);
      }
    }
  }
}
</style>
