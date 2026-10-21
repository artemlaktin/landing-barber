# Технические правила — Grizzly Landing

## Стек

- Nuxt 4 + Vue 3 (Composition API, `<script setup lang="ts">`)
- srcDir: `app/` — весь код приложения внутри этой папки
- i18n: `@nuxtjs/i18n`, стратегия `prefix` (`/pl`, `/en`, `/uk`, `/ru`), язык по умолчанию — `pl`
- Стили: SCSS, общий файл `app/assets/main.scss`
- Слайдеры: Swiper

## Команды

- `npm run dev` — локальный сервер на http://localhost:3000 (открывать `/pl`)
- `npm run build` — сборка; обязательная проверка после любых изменений

## Структура

| Что | Где |
|---|---|
| Страница | `app/pages/index.vue` (+ SEO-мета и JSON-LD) |
| Секции страницы | `app/components/*Section.vue` |
| UI-компоненты | `app/components/ui/` |
| Контент-данные | `app/constants-and-helpers/` — `masters.ts`, `services.ts` (цены), `contacts.ts` (точки, Booksy, соцсети) |
| Composables | `app/composables/` |
| API-слой | `app/api/pipelines/` |
| Серверные эндпоинты | `server/api/` (отзывы Google через SerpAPI) |
| SVG-иконки (спрайт) | `assets/img/svg/` |
| Картинки для сайта | `public/img/` (webp) |
| Исходники фото | `assets/photo`, `assets/landing_bio`, `assets/gallery` — не трогать |
| Переводы | `i18n/locales/{pl,en,uk,ru}.json` |

## Алиасы

```
@components → app/components
@helpers    → app/constants-and-helpers
@api        → app/api
@assets     → assets
@appTypes   → app/types
```

## Иконки

- SVG кладутся в `assets/img/svg/`, подхватываются vite-plugin-svg-icons, id = имя файла
- Использование: `<svg class="svg"><use href="#icon-name"></use></svg>`
- Цвета автоматически заменяются на `currentColor` — не прописывать цвета внутри SVG

## Данные

- Контакты точек, Booksy, соцсети — только из `@helpers/contacts`; цены услуг — только из `@helpers/services`.
  Не дублировать эти значения в компонентах, json или JSON-LD в `index.vue` — брать из этих файлов.

## i18n

- Никаких строк в шаблонах без i18n-ключа
- Новый ключ добавляется сразу во все 4 файла, в то же место структуры
- После правки json проверять валидность: `node -e "['pl','en','uk','ru'].forEach(l=>JSON.parse(require('fs').readFileSync('i18n/locales/'+l+'.json','utf8')))"`
- Проверять, что набор ключей во всех 4 файлах совпадает

## Vue / Nuxt

- Только `<script setup>`, без Options API
- `useSafeAsyncData` вместо голого `useAsyncData`
- HTTP-запросы через `$api` (`app/plugins/api.ts`), не axios
- Явно импортировать используемые компоненты (как в `app/pages/index.vue`)

## Стиль кода

- Не добавлять лишние комментарии и абстракции
- Не создавать файлы без необходимости — предпочитать редактирование существующих
- Не добавлять функционал сверх задачи
- Повторять паттерны соседнего кода

## Нельзя

- Читать или изменять `.env`; выводить `runtimeConfig` в шаблоны
- Использовать `axios` напрямую
- Класть SVG-иконки вне `assets/img/svg/`
- Удалять моки без замены на API
