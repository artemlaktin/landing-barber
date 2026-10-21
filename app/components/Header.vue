<script lang="ts" setup>
import {scrollToElement} from "@helpers/scroll";

const {t, locale} = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isMenuOpen = ref(false)

const navItems = [
  {id: 'about', label: 'nav.about'},
  {id: 'services', label: 'nav.services'},
  {id: 'masters', label: 'nav.masters'},
  {id: 'gallery', label: 'nav.gallery'},
  {id: 'contacts', label: 'nav.contacts'},
]

const langs = [
  {code: 'pl' as const, label: 'PL'},
  {code: 'en' as const, label: 'EN'},
  {code: 'uk' as const, label: 'UA'},
  {code: 'ru' as const, label: 'RU'},
]

function selectNav(id: string) {
  isMenuOpen.value = false
  scrollToElement(id)
}

function selectLang(code: typeof langs[number]['code']) {
  isMenuOpen.value = false
  navigateTo(switchLocalePath(code))
}
</script>

<template>
  <header class="main-header">
    <div class="main-header__logo">
      <span>GRIZZLY</span>
    </div>
    <button
        type="button"
        class="main-header__hamburger"
        :aria-label="isMenuOpen ? t('masters.close') : t('nav.menu')"
        @click="isMenuOpen = !isMenuOpen"
    >
      <svg v-if="!isMenuOpen" fill="none" height="18" viewBox="0 0 24 18" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9H22.3333M1 1H22.3333M1 17H22.3333" stroke="#ECEEED" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2"/>
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6l12 12M18 6L6 18" stroke="#ECEEED" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </header>

  <Teleport to="body">
    <div v-if="isMenuOpen" class="mobile-menu" @click.self="isMenuOpen = false">
      <nav class="mobile-menu__nav">
        <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            class="mobile-menu__nav-item"
            @click="selectNav(item.id)"
        >
          {{ t(item.label) }}
        </button>
      </nav>
      <div class="mobile-menu__langs">
        <a
            v-for="lang in langs"
            :key="lang.code"
            class="mobile-menu__lang-item"
            :class="{ 'mobile-menu__lang-item--active': locale === lang.code }"
            :href="switchLocalePath(lang.code)"
            @click.prevent="selectLang(lang.code)"
        >
          {{ lang.label }}
        </a>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.main-header {
  display: flex;
  background: var(--main-color);
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  &__logo {
    color: #FEE7C6C8;
    font-family: 'Furius', sans-serif;
    font-size: 45px;
    line-height: 1;
  }

  &__hamburger {
    background: transparent;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 980px) {
    display: none;
  }
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background: #002616F5;
  padding: 24px;

  @media (min-width: 980px) {
    display: none;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  &__nav-item {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #ECEEED;
    font-size: 22px;
    font-weight: 500;

    &:hover {
      color: #C5A367;
    }
  }

  &__langs {
    display: flex;
    color: #FFFCF4AF;
    gap: 4px;
    user-select: none;
  }

  &__lang-item {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    padding: 0 8px;
    border-right: 2px solid #FFFAED2D;
    transition: color .3s ease;

    &:hover {
      color: #FFFCF4;
    }

    &--active {
      color: #FFFCF4;
    }

    &:last-child {
      padding-right: 0;
      border-right: none;
    }
  }
}
</style>
