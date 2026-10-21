<script lang="ts" setup>
import SectionHeading from "@components/ui/SectionHeading.vue"
import {masters, type Master} from "@helpers/masters"
import {BOOKSY_LINKS} from "@helpers/contacts"

const {t, locale} = useI18n()

const ROLE_KEYS: Record<string, string> = {
  'Senior Barber': 'senior',
  'Barber': 'barber',
  'Junior Barber': 'junior',
  'Manager': 'manager',
}

function roleLabel(role: string): string {
  const slug = ROLE_KEYS[role]
  return slug ? t(`masters.roles.${slug}`) : role
}

function resolveBio(master: Master): string {
  if (typeof master.bio === 'string') return master.bio
  return master.bio[locale.value as 'pl' | 'en' | 'uk' | 'ru'] ?? master.bio.ru ?? ''
}

const VISIBLE_STEP = 8
const visibleCount = ref(VISIBLE_STEP)
const visibleMasters = computed(() => masters.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < masters.length)

function showMore() {
  visibleCount.value += VISIBLE_STEP
}

const activeMaster = ref<Master | null>(null)

let lockedScrollY = 0

watch(activeMaster, (master) => {
  if (master) {
    lockedScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${lockedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    window.scrollTo(0, lockedScrollY)
  }
})

function openMaster(master: Master) {
  activeMaster.value = master
}

function closeMaster() {
  activeMaster.value = null
}

function bookSession() {
  const url = activeMaster.value ? BOOKSY_LINKS[activeMaster.value.location] : undefined
  closeMaster()
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <section id="masters" class="masters">
    <div class="masters__heading-group">
      <SectionHeading :label="t('masters.label')" :title="t('nav.masters')"/>
      <h2 class="masters__title title">
        {{ t('masters.title') }} <span>{{ t('masters.title_accent') }}</span>
      </h2>
      <p class="masters__subtitle">{{ t('masters.subtitle') }}</p>
    </div>

    <div class="masters__grid">
      <button
          v-for="master in visibleMasters"
          :key="master.name"
          type="button"
          class="masters__card"
          @click="openMaster(master)"
      >
        <span class="masters__photo-wrap">
          <img
              v-if="master.photo"
              :src="master.photo"
              :alt="master.name"
              class="masters__photo"
              loading="lazy"
          />
          <span v-else class="masters__photo-placeholder">
            <svg><use href="#avatar"/></svg>
          </span>
          <span class="masters__photo-watermark" aria-hidden="true">GRIZZLY BARBER SHOP · GRIZZLY BARBER SHOP</span>
          <span class="masters__photo-shade" aria-hidden="true"></span>
          <span class="masters__caption">
            <span v-if="master.bio" class="masters__bio-teaser">{{ resolveBio(master) }}</span>
            <span class="masters__role">{{ roleLabel(master.role) }}</span>
            <span class="masters__name">{{ master.name }}</span>
          </span>
        </span>
      </button>
    </div>

    <div v-if="hasMore" class="masters__more">
      <button type="button" class="masters__more-btn" @click="showMore">
        {{ t('masters.show_more') }}
      </button>
    </div>

    <Teleport to="body">
      <div v-if="activeMaster" class="masters-modal" @click.self="closeMaster">
        <div class="masters-modal__panel">
          <div class="masters-modal__header">
            <button type="button" class="masters-modal__close" :aria-label="t('masters.close')" @click="closeMaster">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="masters-modal__divider"></div>

          <div class="masters-modal__body">
            <span class="masters-modal__photo-wrap">
              <img
                  v-if="activeMaster.photo"
                  :src="activeMaster.photo"
                  :alt="activeMaster.name"
                  class="masters-modal__photo"
              />
              <span v-else class="masters-modal__photo-placeholder">
                <svg><use href="#avatar"/></svg>
              </span>

              <span
                  v-if="activeMaster.instagram || activeMaster.facebook"
                  class="masters-modal__social"
              >
                <span class="masters-modal__social-label">— {{ t('masters.follow_work') }}</span>
                <span class="masters-modal__social-icons">
                  <a
                      v-if="activeMaster.instagram"
                      :href="activeMaster.instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="masters-modal__social-icon"
                      aria-label="Instagram"
                  >
                    <svg><use href="#instagram"/></svg>
                  </a>
                  <a
                      v-if="activeMaster.facebook"
                      :href="activeMaster.facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="masters-modal__social-icon"
                      aria-label="Facebook"
                  >
                    <svg><use href="#facebook"/></svg>
                  </a>
                </span>
              </span>
            </span>

            <div class="masters-modal__content">
              <span class="masters-modal__role">{{ roleLabel(activeMaster.role) }}</span>
              <h3 class="masters-modal__name title">{{ activeMaster.name }}</h3>
              <p class="masters-modal__bio">{{ resolveBio(activeMaster) || t('masters.no_bio') }}</p>
            </div>
          </div>

          <div class="masters-modal__footer">
            <button type="button" class="masters-modal__cta" @click="bookSession">
              <span class="masters-modal__cta-icon">+</span>
              {{ t('masters.cta') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.masters {
  --section-heading-color: #7A5824;

  &__heading-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;

    @media (min-width: 1280px) {
      margin-bottom: 48px;
    }
  }

  &__title {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;

    span {
      color: #7A5824;
      font-style: italic;
    }
  }

  &__subtitle {
    max-width: 560px;
    color: #0E1512B2;
    font-size: 15px;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (min-width: 1280px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    font: inherit;
    color: inherit;
  }

  &__photo-wrap {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 4px;
    overflow: hidden;
    background: #1a1a1a;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(1) contrast(1.1) brightness(0.95);
    transition: transform 0.3s ease, filter 0.3s ease;

    .masters__card:hover &,
    .masters__card:active &,
    .masters__card:focus-visible & {
      transform: scale(1.04);
      filter: grayscale(0) contrast(1.1) brightness(1);
    }
  }

  &__photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2b2b2b;

    svg {
      width: 40%;
      height: 40%;
      color: #ffffff66;
    }
  }

  &__photo-watermark {
    position: absolute;
    top: 0;
    right: 6px;
    bottom: 0;
    display: flex;
    align-items: center;
    writing-mode: vertical-rl;
    letter-spacing: 0.15em;
    font-size: 10px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.35);
    mix-blend-mode: overlay;
    pointer-events: none;
    white-space: nowrap;
  }

  &__photo-shade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(19, 27, 23, 0) -5.86%, rgba(0, 0, 0, 0.8) 82.76%);
    transition: background .3s ease;
  }

  &__card:hover &__photo-shade {
    background: linear-gradient(180deg, rgba(19, 27, 23, 0) -5.86%, rgba(0, 0, 0, 0.92) 55%);
  }

  &__caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  &__bio-teaser {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 12px;
    line-height: 1.45;
    color: #ffffffcc;
    max-height: 0;
    opacity: 0;
    margin-bottom: 0;
    transition: max-height .3s ease, opacity .3s ease, margin-bottom .3s ease;

    @media (min-width: 640px) {
      font-size: 14px;
      -webkit-line-clamp: 4;
    }
  }

  &__card:hover &__bio-teaser {
    max-height: 70px;
    opacity: 1;
    margin-bottom: 10px;

    @media (min-width: 640px) {
      max-height: 110px;
    }
  }

  &__role {
    font-size: 12px;
    font-weight: 500;
    color: #C5A367;
    margin-bottom: 2px;

    @media (min-width: 640px) {
      font-size: 18px;
    }
  }

  &__name {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #ECEEED;
    text-transform: uppercase;
    line-height: 1.1;

    @media (min-width: 640px) {
      font-size: 32px;
    }
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: 32px;

    @media (min-width: 1280px) {
      margin-top: 40px;
    }
  }

  &__more-btn {
    padding: 12px 28px;
    border-radius: 999px;
    border: 1px solid #0E151233;
    background: transparent;
    color: #0E1512;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
      border-color: #C5A367;
      background: #C5A3671A;
    }
  }
}

.masters-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(6, 12, 9, 0.75);

  &__panel {
    position: relative;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    background: #132D21;
    border: 1px solid #ffffff26;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      width: 40vw;
      height: 60vh;
      min-height: 500px;
      overflow: hidden;
    }
  }

  &__header {
    display: flex;
    justify-content: flex-end;
    padding: 16px 16px 12px;
  }

  &__close {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #ffffff40;
    background: transparent;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: #fff;
    }
  }

  &__divider {
    height: 1px;
    background: #ffffff26;
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: 24px;
    margin-bottom: 32px;
    gap: 24px;

    @media (min-width: 640px) {
      flex-direction: row;
    }

    @media (min-width: 768px) {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
  }

  &__footer {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    padding: 0 24px 24px;
  }

  &__photo-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-shrink: 0;

    @media (min-width: 640px) {
      width: 204px;
    }
  }

  &__photo {
    width: 100%;
    height: auto;
    display: block;
  }

  &__photo-placeholder {
    width: 100%;
    aspect-ratio: 3 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2b2b2b;

    svg {
      width: 30%;
      height: 30%;
      color: #ffffff66;
    }
  }

  &__social {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 12px;
  }

  &__social-label {
    font-size: 13px;
    color: #ffffffb2;
  }

  &__social-icons {
    display: flex;
    gap: 8px;
  }

  &__social-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #ffffff40;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: #C5A367;
      color: #C5A367;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  &__role {
    font-size: 12px;
    font-weight: 400;
    color: #C5A367;
    margin-bottom: 6px;

    @media (min-width: 640px) {
      font-size: 18px;
    }
  }

  &__name {
    font-size: 18px;
    font-weight: 700;
    color: #ECEEED;
    text-transform: uppercase;
    margin-bottom: 16px;

    @media (min-width: 640px) {
      font-size: 32px;
    }
  }

  &__bio {
    font-family: 'Onest', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0;
    color: #ffffffcc;
    white-space: pre-line;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 999px;
    border: none;
    background: #C5A367;
    color: #132D21;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #d4b479;
    }
  }

  &__cta-icon {
    font-size: 18px;
    line-height: 1;
  }
}
</style>
