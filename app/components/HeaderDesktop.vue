<script lang="ts" setup>
import {scrollToElement} from "@helpers/scroll";
import LogoText from "@components/ui/LogoText.vue";

const {t, locale} = useI18n()
const switchLocalePath = useSwitchLocalePath()

const langs = [
  {code: 'pl' as const, label: 'PL'},
  {code: 'en' as const, label: 'EN'},
  {code: 'uk' as const, label: 'UA'},
  {code: 'ru' as const, label: 'RU'},
]
</script>

<template>
  <header class="header">
    <div class="header__container-top">
      <div class="header__top-line">
        <div class="header__lang-action">
          <a
              v-for="lang in langs"
              :key="lang.code"
              class="header__lang-item"
              :class="{ 'header__lang-item--active': locale === lang.code }"
              :href="switchLocalePath(lang.code)"
              @click.prevent="navigateTo(switchLocalePath(lang.code))"
          >
            {{ lang.label }}
          </a>
        </div>
      </div>
    </div>
    <div class="header__container-bottom">
      <nav class="header__main-nav">
        <div class="header__nav-item" @click="scrollToElement('about')">{{ t('nav.about') }}</div>
        <div class="header__nav-item" @click="scrollToElement('services')">{{ t('nav.services') }}</div>
        <div class="header__nav-item" @click="scrollToElement('masters')">{{ t('nav.masters') }}</div>
        <div class="header__nav-item header__nav-logo">
          <span>
            GRIZZLY
          </span>
        </div>
        <div class="header__nav-item" @click="scrollToElement('gallery')">{{ t('nav.gallery') }}</div>
        <div class="header__nav-item" @click="scrollToElement('contacts')">{{ t('nav.contacts') }}</div>
      </nav>
    </div>

  </header>
</template>

<style lang="scss" scoped>
.header {
  display: none;
  @media (min-width: 980px) {
    display: block;
  }

  &__container-top {
    background: #132D21;
  }

  &__container-bottom {
    background: #002616E6;
  }

  &__main-nav {
    display: flex;
    padding: 20px 100px;
    margin: 0 auto;
    justify-content: space-between;
    font-size: 18px;
    color: #ECEEED;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__nav-logo {
    width: 184px;
    margin: 0 64px;
    font-family: 'Furius', sans-serif;
    position: relative;
    overflow: hidden;
    height: 45px;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 52px;
    }

    :deep(svg) {
      width: 184px;
    }
  }

  &__lang-action {
    display: flex;
    color: #FFFCF4AF;
    gap: 4px;

    user-select: none;
  }

  &__lang-item {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    padding-right: 8px;
    padding-left: 8px;
    border-right: 2px solid #FFFAED2D;
    position: relative;
    transition: color .3s ease;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      background: #C5A367;
      bottom: -1px;
      left: 0;
      opacity: 0;
      transition: all .3s ease;
    }

    &:hover {
      &::before {
        opacity: 1;
        width: 85%;
      }

      color: #FFFCF4;
    }

    &--active {
      color: #FFFCF4;

      &::before {
        opacity: 1;
        width: 85%;
      }
    }

    &:last-child {
      padding-right: 0;
      border-right: none;
    }


  }

  &__top-line {
    padding: 0 100px;

    display: flex;
    align-items: center;
    height: 48px;
    justify-content: flex-end;
  }
}
</style>