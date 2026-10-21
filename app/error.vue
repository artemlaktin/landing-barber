<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const SUPPORTED = ['pl', 'en', 'uk', 'ru'] as const
type Loc = (typeof SUPPORTED)[number]

const route = useRoute()
const seg = route.path.split('/')[1]
const loc: Loc = (SUPPORTED as readonly string[]).includes(seg) ? (seg as Loc) : 'pl'

const is404 = computed(() => props.error?.statusCode === 404)

const COPY: Record<Loc, { title404: string; text404: string; title: string; text: string; back: string }> = {
  pl: {
    title404: 'Nie znaleziono strony',
    text404: 'Wygląda na to, że ta nora jest pusta. Strona, której szukasz, nie istnieje lub została przeniesiona.',
    title: 'Coś poszło nie tak',
    text: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.',
    back: 'Wróć na stronę główną',
  },
  en: {
    title404: 'Page not found',
    text404: 'Looks like this den is empty. The page you are looking for does not exist or has moved.',
    title: 'Something went wrong',
    text: 'An unexpected error occurred. Please try again in a moment.',
    back: 'Back to homepage',
  },
  uk: {
    title404: 'Сторінку не знайдено',
    text404: 'Схоже, це лігво порожнє. Сторінка, яку ви шукаєте, не існує або була переміщена.',
    title: 'Щось пішло не так',
    text: 'Сталася неочікувана помилка. Спробуйте ще раз за мить.',
    back: 'Повернутися на головну',
  },
  ru: {
    title404: 'Страница не найдена',
    text404: 'Похоже, это логово пустует. Страница, которую вы ищете, не существует или была перемещена.',
    title: 'Что-то пошло не так',
    text: 'Произошла непредвиденная ошибка. Попробуйте ещё раз через мгновение.',
    back: 'Вернуться на главную',
  },
}

const c = COPY[loc]

useHead({
  title: () => (is404.value ? `404 — ${c.title404}` : c.title),
  htmlAttrs: { lang: loc },
  meta: [{ name: 'robots', content: 'noindex' }],
})

function goHome() {
  clearError({ redirect: `/${loc}` })
}
</script>

<template>
  <div class="error-page">
    <div class="error-page__inner">
      <p class="error-page__code">{{ error?.statusCode || 500 }}</p>
      <h1 class="error-page__title">{{ is404 ? c.title404 : c.title }}</h1>
      <p class="error-page__text">{{ is404 ? c.text404 : c.text }}</p>
      <button type="button" class="error-page__btn" @click="goHome">{{ c.back }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #0C2319;
  color: #ECEEED;
  font-family: 'Onest', sans-serif;

  &__inner {
    max-width: 520px;
    text-align: center;
  }

  &__code {
    font-size: clamp(64px, 14vw, 120px);
    font-weight: 700;
    line-height: 1;
    color: #C5A367;
  }

  &__title {
    margin-top: 16px;
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  &__text {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.6;
    color: #ffffffb2;
  }

  &__btn {
    margin-top: 28px;
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
}
</style>
