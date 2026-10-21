# Rules for Claude — Jojo Frontend

## Project Context

- **Project:** Landing для барбершопа
- **Stack:** Nuxt 4 + Vue 3 (Composition API, `<script setup>`)
- **srcDir:** `app/` — весь код приложения внутри этой папки

---

## Security

- Never read, write, or reference `.env` files
- Never expose or log API keys, secrets, environment variables
- `runtimeConfig` значения считать приватными — не выводить в шаблоны напрямую

---

## File Structure Rules

| Что                   | Где                                                                                            |
|-----------------------|------------------------------------------------------------------------------------------------|
| Страницы              | `app/pages/`                                                                                   |
| Компоненты UI         | `app/components/ui/`                                                                           |
| Page-level компоненты | `app/components/<PageName>/`                                                                   |
| Stores (Pinia)        | `app/stores/`                                                                                  |
| Composables           | `app/composables/`                                                                             |
| API-слой              | `app/api/pipelines/`                                                                           |
| SVG-иконки (спрайт)   | `assets/img/svg/`                                                                              |
| Статичные изображения | `public/image/`                                                                                |
| Скриншоты для Claude  | `/desktop/claudeScreen/` (не в проекте)                                                        |
| i18n-переводы         | `i18n/locales/pl.json`, `i18n/locales/en.json`, `i18n/locales/uk.json`, `i18n/locales/ru.json` |

---

## Icons

- SVG-иконки кладутся в `assets/img/svg/` — они подхватываются vite-plugin-svg-icons
- Использование в шаблоне: `<svg class="svg"><use href="#icon-name"></use></svg>`
- Все цвета SVG автоматически заменяются на `currentColor` через svgo-плагин — не прописывать цвета внутри SVG вручную
- Логотип, иллюстрации, декоративные SVG — в `assets/img/svg/` с префиксом по смыслу

---

## Vue / Nuxt Conventions

- `<script setup>` — всегда, Options API не использовать
- Composition API composables из `app/composables/`
- `useSafeAsyncData` вместо голого `useAsyncData` для защиты от ошибок
- HTTP-запросы через `$api` (plugin `app/plugins/api.js`), не через axios напрямую
- Responsive-логика через `useMedia` composable + `<ClientOnly>` для desktop/mobile компонентов
- `useNotyf()` для уведомлений

## Code Style

- Не добавлять лишние комментарии, docstrings, type annotations там, где код очевиден
- Не создавать файлы без необходимости — предпочитать редактирование существующих
- Не добавлять функционал сверх того, что просит задача
- Не создавать абстракции для одноразового использования
- Валидация — только на границах системы (ввод пользователя, внешние API)
- Если не знаешь как писать код смотри паттерн в JoJo_Frontend
- Добавляй импорты компонента

---

## Aliases (nuxt.config.js)

```js
'@components' → '/components'   // от srcDir (app/)
'@helpers'    → '/helpers-constans'
'@api'        → '/api'
'@assets'     → 'assets/'       // корень проекта
```

---

## Do NOT

- Читать или изменять `.env` файлы
- Использовать `axios` напрямую (только `$api`)
- Создавать SVG-иконки вне `assets/img/svg/`
- Писать строки без i18n-ключа
- Удалять моки без замены на API