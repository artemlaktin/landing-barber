<script setup lang="ts">
import LogoContainer from "@components/ui/LogoContainer.vue"
import {BOOKSY_LINKS, INSTAGRAM, FACEBOOK, THREADS} from "@helpers/contacts"

const {t, locale} = useI18n()
const switchLocalePath = useSwitchLocalePath()

const year = new Date().getFullYear()

const instagramLinks = INSTAGRAM
const facebookLinks = FACEBOOK
const threadsLinks = THREADS.map(l => ({...l, label: l.handle}))

const bookingLocations = Object.keys(BOOKSY_LINKS)

function openBooksy(location: string) {
  const url = BOOKSY_LINKS[location]
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const langs = [
  {code: 'en' as const, label: 'EN'},
  {code: 'pl' as const, label: 'PL'},
  {code: 'uk' as const, label: 'UA'},
  {code: 'ru' as const, label: 'RU'},
]
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer__top">
      <div class="footer__col">
        <h3 class="footer__heading">{{ t('footer.follow_us') }}</h3>
        <div class="footer__divider"/>

        <div class="footer__row">
          <svg class="footer__icon">
            <use href="#instagram"/>
          </svg>
          <div class="footer__row-body">
            <span class="footer__row-label">INSTAGRAM</span>
            <div class="footer__row-links">
              <template v-for="(l, i) in instagramLinks" :key="l.label">
                <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.label }}</a>
                <span v-if="i < instagramLinks.length - 1" class="footer__dot">·</span>
              </template>
            </div>
          </div>
        </div>

        <div class="footer__row">
          <svg class="footer__icon">
            <use href="#facebook"/>
          </svg>
          <div class="footer__row-body">
            <span class="footer__row-label">FACEBOOK</span>
            <div class="footer__row-links">
              <a v-for="l in facebookLinks" :key="l.label" :href="l.href" target="_blank" rel="noopener noreferrer">
                {{ l.label }}
              </a>
            </div>
          </div>
        </div>

        <div class="footer__row">
          <svg class="footer__icon">
            <use href="#threads"/>
          </svg>
          <div class="footer__row-body">
            <span class="footer__row-label">THREADS</span>
            <div class="footer__row-links">
              <template v-for="(l, i) in threadsLinks" :key="l.label">
                <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.label }}</a>
                <span v-if="i < threadsLinks.length - 1" class="footer__dot">·</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__logo">
        <LogoContainer/>
      </div>

      <div class="footer__col footer__col--right">
        <h3 class="footer__heading">{{ t('footer.claim') }}</h3>
        <div class="footer__divider"/>

        <div class="footer__row footer__row--right">
          <svg class="footer__icon">
            <use href="#booksy"/>
          </svg>
          <div class="footer__row-body">
            <span class="footer__row-label">BOOKSY</span>
            <div class="footer__row-links">
              <template v-for="(loc, i) in bookingLocations" :key="loc">
                <button type="button" class="footer__link-btn" @click="openBooksy(loc)">{{ loc }}</button>
                <span v-if="i < bookingLocations.length - 1" class="footer__dot">·</span>
              </template>
            </div>
          </div>
        </div>

        <div class="footer__row footer__row--right">
          <svg class="footer__icon">
            <use href="#lang"/>
          </svg>
          <div class="footer__row-body">
            <span class="footer__row-label">{{ t('footer.languages') }}</span>
            <div class="footer__row-links">
              <template v-for="(lang, i) in langs" :key="lang.code">
                <a
                    class="footer__lang"
                    :class="{ 'footer__lang--active': locale === lang.code }"
                    :href="switchLocalePath(lang.code)"
                    @click.prevent="navigateTo(switchLocalePath(lang.code))"
                >{{ lang.label }}</a>
                <span v-if="i < langs.length - 1" class="footer__dot">·</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__divider footer__divider--full"/>

    <div class="footer__bottom">
      <span class="footer__copy">© {{ year }} Grizzly Barbershop. {{ t('footer.rights') }}</span>
      <div class="footer__legal">
        <a href="#">{{ t('footer.privacy') }}</a>
        <a href="#">{{ t('footer.terms') }}</a>
        <a href="#">{{ t('footer.cookies') }}</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: #0C2319;
  color: #fff;
  padding: 48px 16px 24px;

  @media (min-width: 1280px) {
    padding: 64px 80px 24px;
  }

  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin-bottom: 32px;

    @media (min-width: 1280px) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    @media (min-width: 1280px) {
      width: 320px;
      flex-shrink: 0;
    }

    &--right {
      @media (min-width: 1280px) {
        align-items: flex-end;
      }
    }
  }

  &__heading {
    font-size: 18px;
    font-weight: 700;
    color: #C5A367;
  }

  &__col--right &__heading {
    @media (min-width: 1280px) {
      text-align: right;
    }
  }

  &__divider {
    height: 1px;
    background: #ffffff26;
    width: 100%;

    &--full {
      margin-bottom: 24px;
    }
  }

  &__logo {
    flex-shrink: 0;
    width: 140px;

    @media (min-width: 1280px) {
      width: 280px;
    }

    :deep(svg) {
      width: 100%;
      height: auto;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    &--right {
      width: 100%;
      align-items: center;
      text-align: right;
    }
  }

  &__row-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__row--right &__row-body {
    flex: 1;
    align-items: flex-end;
  }

  &__row-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #ffffff80;
  }

  &__row-links {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
  }

  &__row-links a,
  &__link-btn,
  &__lang {
    color: #ECEEED;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    transition: color .2s ease;
    background: transparent;
    border: none;
    padding: 0;
    font: inherit;

    &:hover {
      color: #C5A367;
    }
  }

  &__lang--active {
    color: #C5A367;
  }

  &__dot {
    color: #ffffff4d;
  }

  &__icon {
    position: relative;
    top: 10px;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    color: #C5A367;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;

    @media (min-width: 1280px) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  &__copy {
    font-size: 13px;
    color: #ffffff80;
  }

  &__legal {
    display: flex;
    gap: 16px;
    font-size: 13px;
    color: #ffffff80;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #C5A367;
      }
    }
  }
}
</style>
