<script setup lang="ts">
import SectionHeading from "@components/ui/SectionHeading.vue"
import { LOYALTY_URL } from "@helpers/contacts"

const { t } = useI18n()
</script>

<template>
  <section id="loyalty" class="loyalty">
    <div class="loyalty__inner">
      <div class="loyalty__text">
        <SectionHeading :label="t('loyalty.label')" :title="t('loyalty.card')" />
        <h2 class="loyalty__title title">
          {{ t('loyalty.title') }} <span>{{ t('loyalty.title_accent') }}</span>
        </h2>
        <p class="loyalty__subtitle">{{ t('loyalty.subtitle') }}</p>

        <ul class="loyalty__steps">
          <li v-for="i in 3" :key="i" class="loyalty__step">
            <span class="loyalty__step-num">{{ i }}</span>
            {{ t(`loyalty.steps.${i}`) }}
          </li>
        </ul>

        <a
          :href="LOYALTY_URL"
          class="loyalty__btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('loyalty.btn') }}
        </a>
        <p class="loyalty__note">{{ t('loyalty.note') }}</p>
      </div>

      <img
        class="loyalty__card"
        src="/img/brand/loyalty-card.webp"
        :alt="t('loyalty.card_alt')"
        width="510"
        height="960"
        loading="lazy"
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
.loyalty {
  background: #0A1C14;
  color: #fff;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media (min-width: 1280px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 64px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 1280px) {
      max-width: 560px;
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
  }

  &__steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 8px 0;
  }

  &__step {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
  }

  &__step-num {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border: 1px solid #C5A367;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #C5A367;
  }

  &__btn {
    align-self: stretch;
    text-align: center;
    background: #008F4ACF;
    border-radius: 35px;
    padding: 14px 32px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    text-decoration: none;
    transition: background 0.2s ease;

    @media (min-width: 1280px) {
      align-self: flex-start;
    }

    &:hover {
      background: #008F4A;
    }
  }

  &__note {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
  }

  &__card {
    width: 100%;
    max-width: 320px;
    height: auto;
    align-self: center;

    @media (min-width: 1280px) {
      max-width: 380px;
      margin-right: 80px;
    }
  }
}
</style>
