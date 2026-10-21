<script setup lang="ts">
import {BOOKSY_LINKS} from "@helpers/masters";

defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: [] }>()

const {t} = useI18n()

const locationList = Object.keys(BOOKSY_LINKS)

function openBooksy(location: string) {
  const url = BOOKSY_LINKS[location]
  emit('close')
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="location-modal" @click.self="emit('close')">
      <div class="location-modal__panel">
        <div class="location-modal__header">
          <button type="button" class="location-modal__close" :aria-label="t('masters.close')" @click="emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <h3 class="location-modal__title">{{ t('location_modal.title') }}</h3>
        <p class="location-modal__subtitle">{{ t('location_modal.subtitle') }}</p>
        <div class="location-modal__locations">
          <button
              v-for="location in locationList"
              :key="location"
              type="button"
              class="location-modal__location-btn"
              @click="openBooksy(location)"
          >
            {{ location }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.location-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(6, 12, 9, 0.75);

  &__panel {
    position: relative;
    width: 100%;
    max-width: 360px;
    background: #132D21;
    border: 1px solid #ffffff26;
    border-radius: 4px;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    justify-content: flex-end;
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

  &__title {
    font-size: 22px;
    font-weight: 700;
    color: #ECEEED;
    text-align: center;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 14px;
    color: #FFFCF4AF;
    text-align: center;
    margin-bottom: 24px;
  }

  &__locations {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__location-btn {
    padding: 14px 20px;
    border-radius: 8px;
    border: 1px solid #C5A367;
    background: transparent;
    color: #C5A367;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
      background: #C5A367;
      color: #132D21;
    }
  }
}
</style>
