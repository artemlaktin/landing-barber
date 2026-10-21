<script setup lang="ts">
import SectionHeading from "@components/ui/SectionHeading.vue";

const {t, tm, rt} = useI18n()

const icons = ['edge', 'team', 'atmosphere_grizzly', 'gift'] as const

const cards = computed(() =>
    Object.values(tm('about.cards') as Record<string, any>).map((card, i) => ({
      title: rt(card.title),
      desc: rt(card.desc),
      icon: icons[i],
    }))
)
</script>

<template>
  <section id="about" class="about-us">
    <img class="about-us__image" src="/img/brand/about-us.jpg" :alt="t('about.img_alt')" loading="lazy"/>
    <div class="about-us__content">
      <SectionHeading :label="t('about.label')" :title="t('about.title')" class="about-us__heading"/>
      <h2 class="about-us__title title">
        {{ t('about.hero_title') }} <span>{{ t('about.hero_accent') }}</span>
      </h2>
      <p class="about-us__description">{{ t('about.desc_1') }}</p>
      <p class="about-us__description mb24">{{ t('about.desc_2') }}</p>
      <div class="about-us__grid">
        <div v-for="card in cards" :key="card.title" class="about-us__card">
          <svg class="about-us__card-icon">
            <use :xlink:href="`#${card.icon}`"></use>
          </svg>
          <p class="about-us__card-title">{{ card.title }}</p>
          <p class="about-us__card-desc">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-us {
  --section-heading-color: #7A5824;

  display: flex;
  gap: 24px;
  flex-direction: column;
  @media (min-width: 1280px) {
    flex-direction: row;
  }

  &__title {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 24px;

    span {
      color: #7A5824;
      font-weight: 700;
    }
  }

  &__content {
    @media (min-width: 1280px) {
      display: flex;
      flex-direction: column;
    }
  }

  &__heading {
    margin-bottom: 12px;
  }

  &__description {
    margin-bottom: 10px;
    font-weight: 400;

  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #0E151220;

    @media (min-width: 1280px) {
      grid-template-columns: 1fr 1fr;
      margin-top: auto;
    }
  }

  &__card {
    padding: 20px 16px;
    border-bottom: 1px solid #0E151220;

    @media (min-width: 1280px) {
      padding: 32px;

      &:nth-child(odd) {
        border-right: 1px solid #0E151220;
      }

      &:nth-last-child(-n+2) {
        border-bottom: none;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__card-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
    color: #132D21;

  }

  &__card-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    color: #0E1512;
  }

  &__card-desc {
    font-size: 14px;
    font-weight: 400;
    color: #0E1512B2;
    line-height: 1.5;
  }

  &__image {
    max-width: 100%;
    width: 100%;
    object-fit: contain;
    height: auto;
    @media (min-width: 1280px) {
      max-width: calc(50% - 24px);
      width: 100%;
      max-height: 730px;
      height: auto;
      object-fit: cover;
    }
  }
}
</style>
