# Ревью после security-патчей и план исправлений (2026-10-26)

Дата проверки: 26 октября 2026.
Ветка: `main` @ `b191131` (merge Dependabot PR #18).
Окружение проверки: macOS, Node 24.18.0 (локально нет пиновой 22.23.3), npm 12.0.2, чистый `npm ci`.

## 1. Краткий итог

- **Прод жив, но на старом билде.** `https://evgenii-rubin.vercel.app` отдаёт деплой коммита `39e650d` (Next 16.4.2 + Tailwind 3). Production-деплой `b191131` на Vercel упал, Vercel оставил предыдущий успешный. Любой следующий пуш в `main` тоже упадёт, пока не починить сборку.
- **Сборка сломана Dependabot PR #18.** Чтобы убрать уязвимый `postcss-selector-parser@6`, Dependabot поднял `tailwindcss` с `3.4.19` до `4.3.3` (мажор). Проект остался сконфигурирован под v3: `postcss.config.js` подключает `tailwindcss` как PostCSS-плагин, `globals.css` использует `@tailwind base/components/utilities`, `tailwind.config.js` в формате v3. `next build` падает на каждом CSS-файле: «The PostCSS plugin has moved to a separate package… install `@tailwindcss/postcss`».
- **CI красный по другой причине.** Шаг `npm audit --audit-level=high` падает на `zod@4.6.5` (high, GHSA-mrhx-c7xc-m3w5). Это транзитивная dev-зависимость: `eslint-config-next → eslint-plugin-react-hooks → zod-validation-error → zod`. Фикс есть: `zod@4.6.7`, совместим с peer-диапазоном `^3.25.0 || ^4.0.0`.
- **Сами тесты проходят.** `npm run lint`, `npm run typecheck`, `npm test` (5 + 3 теста) зелёные и локально, и в CI. Проблема «с тестами» на самом деле: красный audit-шаг в CI плюс упавший билд на Vercel. CI до шага `Build` просто не доходит, поэтому поломка Tailwind в Actions не видна.
- Production-граф зависимостей чистый: `npm audit --omit=dev` → 0 уязвимостей. Прикладной код замечаний по безопасности не имеет (статический сайт без API-роутов и пользовательского ввода, CSP с хэшем, `rel="noopener noreferrer"` на внешних ссылках).

## 2. Что проверено

| Проверка | Команда | Результат |
| --- | --- | --- |
| Установка | `npm ci` | OK, 360 пакетов; предупреждение о заблокированном postinstall `unrs-resolver` (ожидаемо) |
| Lint | `npm run lint` | OK, 0 ошибок |
| Типы | `npm run typecheck` | OK |
| Тесты | `npm test` | OK: 5 SEO-тестов, 3 теста security-заголовков |
| Audit (всё) | `npm audit --audit-level=high` | **FAIL**: 1 high (`zod <4.6.6`) |
| Audit (prod) | `npm audit --omit=dev` | OK, 0 уязвимостей |
| Сборка | `NEXT_PUBLIC_SITE_URL=… VERCEL_ENV=production npm run build` | **FAIL**: Tailwind v4 как PostCSS-плагин |
| CI | `gh run view 40229724748 --log-failed` | Упал шаг `Audit all dependencies` (zod), до `Build` не дошёл |
| Vercel | GitHub Deployments API | `b191131` production → `failure`; `39e650d` и `00e6ef7` → `success` |
| Прод | `curl -I https://evgenii-rubin.vercel.app/` | 200, CSP с хэшем, HSTS, `X-Frame-Options: DENY`; robots указывает на правильный sitemap |
| Устаревшие пакеты | `npm outdated` | Минорные: next 16.4.3, eslint-config-next 16.4.3, react 19.3.1, geist 1.8.2, postcss 8.5.31. Мажоры: eslint 10.13, typescript 7.0.2, @types/node 26 |

## 3. Findings

### P0 — `main` не собирается (Tailwind 4 при конфигурации v3)

- Источник: Dependabot PR #18 (`chore(deps): bump the npm_and_yarn group…`). Формально PR про `source-map-js` и `postcss-selector-parser`, но единственный способ убрать `postcss-selector-parser@6` из графа — снять `tailwindcss@3`, поэтому Dependabot поднял мажор.
- Симптом: `next build` падает на `src/styles/globals.css` и на CSS-модулях шрифтов `geist`. Vercel production deploy `b191131` → failure.
- Затронутые файлы: `package.json`, `package-lock.json`, `postcss.config.js`, `src/styles/globals.css`, `tailwind.config.js`.
- Два пути закрытия, см. Этап 2. Рекомендуемый: довести миграцию на v4 (поверхность маленькая: 1 CSS-файл, 1 конфиг, ~20 компонентов). Запасной: откат на `tailwindcss@3.4.19` с правилом ignore для Dependabot.

### P0 — CI падает на `npm audit --audit-level=high` (zod)

- `zod@4.6.5` через `eslint-config-next@16.3.7`. Только dev-граф, в прод не попадает.
- Закрывается обновлением lockfile: `npm update zod` (или `npm audit fix`) → `zod@4.6.7`. Заодно стоит поднять `eslint-config-next` до `16.4.3`, чтобы он совпадал с `next@16.4.x`.

### P1 — CI не покрывает сборку, если упал audit

- В `quality.yml` порядок: `check → audit all → audit prod → build`. Любое high-advisory в dev-зависимости скрывает поломку билда. Именно так PR #18 был смержен с красным CI, а поломка Tailwind обнаружилась только на Vercel.
- Нужно: `build` раньше audit-шагов (или отдельным job), чтобы сборочные ошибки были видны всегда.

### P1 — Локальная среда не соответствует пину

- `.nvmrc` = `22.23.3`, в `nvm` установлены только `22.9.0` и `24.18.0`. `npm ci` молча прошёл под Node 24, потому что `engines` не enforced (нет `engine-strict`).
- Нужно: `nvm install` (поставит 22.23.3) и `.npmrc` с `engine-strict=true`, чтобы расхождение падало сразу.

### P2 — Нет `.github/dependabot.yml`

- Работают только GitHub-овские grouped security updates по умолчанию. Они без предупреждения тянут мажоры (кейс Tailwind). Нужен явный конфиг: недельное расписание, группы `minor-and-patch` и отдельные PR на мажоры, при необходимости `ignore` на `tailwindcss` major до завершения миграции.

### P2 — Тесты не проверяют рендер и стили

- Текущие тесты: генератор SEO и конфиг заголовков. Ни один тест не запускает сборку или страницу. Регрессии вёрстки (а миграция Tailwind — это именно они) ловятся только глазами. В `output/playwright/` есть скриншоты прошлых аудитов, но Playwright в зависимостях отсутствует.
- Минимально достаточный вариант: smoke-тест на Playwright (3–4 маршрута, проверка заголовков ответа, скриншоты light/dark на 1280/375) как отдельный job в CI после `build`.

### P2 — ESLint 9 после EOL (6 августа 2026)

- README фиксирует, что попытка перехода на ESLint 10 раньше падала. Сейчас `eslint-config-next@16.4.3` объявляет peer `eslint >=9`, `eslint-plugin-react-hooks@7.1.1` поддерживает `^10.0.0`. Миграция, скорее всего, уже проходит. Отдельный PR.

### P3 — Документация расходится с кодом

- README ссылается на `src/data/projectDetails.ts`, файл называется `src/data/project-case-studies.ts`.
- README и CHECKLIST описывают стек «Tailwind CSS + tailwind.config.js»: после миграции на v4 нужно обновить раздел Styling (CSS-first `@theme`, `@tailwindcss/postcss`).
- `security_best_practices_report.md` и `security_remediation_report.md` датированы 30 сентября; после закрытия P0 стоит добавить evidence за 26 октября в `output/security-audit/2026-10-26/` по той же схеме.

### P3 — Паритет dev/prod

- `npm run dev` принудительно использует webpack (`--webpack`), а `next build` в Next 16 собирает Turbopack. После перехода на `@tailwindcss/postcss` оснований держать `--webpack` нет; стоит убрать флаг и проверить dev на Turbopack.

### P3 — Мелочи контента и гигиены

- Главная и `/projects` используют OG-картинку проекта Kanban. Для сайта нужен собственный OG (1200×630) с именем и ролью.
- `output/` (5.6 MB скриншотов аудитов) отслеживается в git. Для пет-проекта допустимо, но новые серии лучше класть в `output/.../<дата>/` и держать объём под контролем.

## 4. Поэтапный план

Каждый этап — отдельная ветка и PR, CI зелёный перед мержем. Оценки — чистое время работы.

### Этап 0 — Baseline локальной среды (15 минут)

1. `nvm install` → Node 22.23.3, `nvm use`, `node -v`.
2. `npm ci` заново под правильной Node.
3. Зафиксировать стартовое состояние: `npm run check` (зелёный), `npm run build` (красный), `npm audit --audit-level=high` (красный). Сохранить вывод audit в `output/security-audit/2026-10-26/before/`.

**Статус: выполнено 26.10.2026.**

- Node 22.23.3 (npm 10.9.9) установлена через `nvm install`. Дефолт nvm остался 24.18.0: в каждом новом терминале нужен `nvm use`.
- `npm ci` под 22.23.3 прошёл. Результаты: `check` зелёный, `build` красный (Turbopack: 3 ошибки PostCSS/Tailwind), `audit --audit-level=high` красный (zod 4.6.5), `audit --omit=dev` чистый.
- Evidence: `output/security-audit/2026-10-26/before/` (`npm-audit.json`, `npm-audit-production.json`, `npm-outdated.json`, `build.txt`).
- Визуальный эталон: прод `39e650d` отличается от `main` только `package.json`/lockfile, то есть это текущий код на Tailwind 3. Снят в `output/playwright/design-audit/before-2026-10-26/`: 9 маршрутов × 1280/768/390/375/320 × light/dark, 90 full-page PNG, 19 MB. Серия в `.gitignore`. Повторная съёмка: `output/playwright/design-audit/capture.sh <base-url> <out-dir>` (Playwright CLI 1.64.1 через npx, браузеры уже в кэше).
- Pre-flight Этапа 1: `npm update zod --dry-run` и `npm install -D eslint-config-next@16.4.3 --dry-run` резолвятся без конфликтов, zod 4.6.7 укладывается в peer `^3.25.0 || ^4.0.0`.
- Vercel CLI/MCP для старта не нужны: статусы деплоев читаются через `gh api repos/stupidkubik/my-website/deployments/<id>/statuses`, ошибка сборки воспроизводится локально.

Блокеры, найденные при подготовке:

- `npx @tailwindcss/upgrade` выходит с ошибкой при любом выводе `git status --porcelain`, включая неотслеживаемые файлы. Перед Этапом 2 дерево должно быть чистым. `--force` лучше не использовать: тогда дифф утилиты смешается с посторонними изменениями.
- `next-env.d.ts` всегда modified: Next 16.4 дописывает `import "./.next/types/root-params.d.ts"`. Документация Next 16 (`02-typescript.md`) требует не хранить файл в git. `tsc --noEmit` без него проходит, то есть файл можно снять с трекинга без правки скрипта `typecheck`. Закрывается в Этапе 1.

### Этап 1 — PR «ci: закрыть zod advisory» (15 минут)

1. `npm update zod` (ожидаемо только `package-lock.json`, zod → 4.6.7).
2. Параллельно `npm install -D eslint-config-next@16.4.3` и `npm install next@16.4.3 react@19.3.1 react-dom@19.3.1 geist@1.8.2` — минорные обновления в пределах текущих мажоров.
3. `next-env.d.ts` добавить в `.gitignore` и выполнить `git rm --cached next-env.d.ts` (по документации Next 16).
4. Проверка: `npm audit --audit-level=high` → 0; `npm run check` → зелёный.
5. DoD: в CI шаги `check` и оба `audit` зелёные. `Build` всё ещё красный — это ожидаемо и закрывается Этапом 2. Мержить можно: прод от этого не меняется (деплой `main` и так падает).

Альтернатива: объединить Этапы 1 и 2 в один PR, если хочется зелёного `main` сразу. Лучше раздельно: так история показывает, что именно починило билд.

### Этап 2 — PR «build: миграция на Tailwind CSS v4» (2–4 часа, включая визуальную QA)

Основной путь:

1. `npx @tailwindcss/upgrade` в ветке, от `main` с уже смерженным Этапом 1. Перед запуском `git status --porcelain` должен быть пустым. Утилита сама ставит `@tailwindcss/postcss`, переписывает `postcss.config.js`, заменяет `@tailwind` на `@import "tailwindcss"`, переносит `theme.extend` в `@theme`, переименовывает устаревшие утилиты.
2. Проверить вручную то, что утилита переносит плохо:
   - `theme.container` (`center`, `padding`, `screens`) в v4 удалён. Заменить на `@utility container { margin-inline: auto; padding-inline: 1rem; … }` с медиа-запросами под `xs`/`sm`/`lg`/`xl` из текущего конфига.
   - Кастомные брейкпоинты `xxs: { max: 375px }` и `xs: 376px`. В v4: `--breakpoint-xs: 376px` в `@theme`, а `xxs:` заменить на `max-xs:` (встроенные `max-*` варианты).
   - Токены цветов уже названы `--color-bg`, `--color-fg` и т.д. В v4 достаточно объявить их в `@theme` — утилиты `bg-bg`, `text-fg`, `ring-fg/30` сгенерируются автоматически. Переменные тёмной темы (`html[data-theme="dark"]`) остаются обычным CSS.
   - `outline-none` → `outline-hidden` (в `a:focus-visible` в `globals.css`).
   - `@apply` внутри `@layer base` работает, но проверить `font-sans` с переменными Geist (`--font-geist-sans`).
   - Дефолт `border-color` в v4 — `currentColor`, а не серый. Все места с `border` без цвета: `Button` (`border px-4 …` — цвет задаётся вариантом, OK), `ProjectCard`, `Section` — пройти grep по `border ` и `border-y`/`border-t`.
   - `hover:` в v4 работает только на устройствах с hover. Это ожидаемое поведение, но проверить на мобильном эмуляторе карточки проектов.
   - `autoprefixer` в v4 не нужен — удалить из `postcss.config.js` и devDependencies.
3. `tsconfig`/`eslint` не трогаются. `tailwind.config.js` удалить после переноса (или оставить через `@config`, если переносить лень — но тогда container всё равно надо делать руками).
4. Визуальная QA: `npm run build && npm run start`, затем `output/playwright/design-audit/capture.sh http://localhost:3000 output/playwright/design-audit/after-2026-10-26` и попарное сравнение с `before-2026-10-26/` (имена файлов совпадают). Skip-link и фокус проверить вручную: `capture.sh` их не снимает.
5. Убрать `--webpack` из `dev`, проверить `npm run dev` на Turbopack.
6. DoD: `npm run check`, `npm run build` зелёные; CI зелёный; Vercel preview-деплой PR успешен; визуально паритет с эталонами; `README` раздел Styling обновлён.

Запасной путь (если миграция забуксовала, 15 минут):

1. `npm install -D tailwindcss@3.4.19` (вернёт `postcss-selector-parser@6.1.x`; его advisory — medium и low, `--audit-level=high` не падает).
2. Добавить `.github/dependabot.yml` с `ignore: tailwindcss, update-types: version-update:semver-major`, иначе Dependabot переоткроет тот же PR.
3. Записать в PLAN.md, что миграция на v4 — отдельная задача.

### Этап 3 — PR «ci: порядок шагов, строгие engines, Dependabot» (1 час)

1. `quality.yml`: переставить `Build` сразу после `Lint, typecheck, and test`, audit-шаги последними. Опционально вынести audit в отдельный job, чтобы оба статуса были видны независимо.
2. `.npmrc` с `engine-strict=true`. Проверить, что `npm ci` под Node 24 теперь падает.
3. `.github/dependabot.yml`: `package-ecosystem: npm`, `schedule: weekly`, группы `production-minor-patch` и `dev-minor-patch`, мажоры отдельными PR; `github-actions` ecosystem для пинов экшенов.
4. Обновить `CHECKLIST.md`: пункт «CI билдит до audit».

### Этап 4 — PR «test: smoke-тест рендера на Playwright» (2–3 часа)

1. `npm i -D @playwright/test`, конфиг с `webServer: npm run start` после `npm run build`.
2. Тесты: `/`, `/projects`, `/projects/kanban-board`, `/contact`, `/404`: статус 200/404, `<main id="main-content">` присутствует, нет console errors, заголовки `Content-Security-Policy` и `X-Frame-Options` в ответе (переиспользовать ожидания из `scripts/security-headers.test.mjs`).
3. Скриншоты light/dark на 1280 и 375 как артефакты CI (не в git; `output/playwright/` можно будет перестать коммитить).
4. Отдельный job `e2e` в `quality.yml` с кэшем браузеров.

### Этап 5 — PR «chore: ESLint 10» (1 час, может не пройти)

1. `npm i -D eslint@10 eslint-config-next@16.4.3`, `npm run lint`.
2. Если плагины падают — откат и запись в README с датой попытки. Если проходит — обновить «Known Technical Notes».

### Этап 6 — Документация и evidence (30 минут)

1. README: имя файла кейсов, раздел Styling под v4, упоминание Playwright и порядка CI.
2. PLAN.md: добавить блок «Remediation 2026-10-26» со ссылками на PR.
3. `output/security-audit/2026-10-26/after/`: `npm audit --json`, `npm audit --omit=dev --json`, `npm outdated --json`.
4. Короткий апдейт `security_remediation_report.md` (что изменилось относительно 30 сентября).

### Этап 7 — По желанию

- Собственная OG-картинка сайта для `/`, `/about`, `/projects`, `/contact`.
- Проверить, что `public/media/resume/evgenii-rubin-cv.pdf` соответствует последней версии CV в корне (в корне лежат файлы от 02.2026 и 08.2026).
- Поднять `@types/node` до 22.x latest (не 26), оставаясь в линии runtime.

## 5. Порядок мержа и ожидаемое состояние

| После этапа | CI | Vercel production | Комментарий |
| --- | --- | --- | --- |
| 1 | check/audit зелёные, build красный | по-прежнему `39e650d` | прод не трогаем |
| 2 | зелёный | новый успешный деплой `main` | главная цель |
| 3 | зелёный, порядок шагов исправлен | — | защита от повторения |
| 4 | зелёный + e2e | — | регрессии вёрстки ловятся автоматически |

## 6. Definition of Done

- `npm run check`, `npm run build`, `npm audit --audit-level=high`, `npm audit --omit=dev` зелёные локально под Node 22.23.3 и в CI.
- Production-деплой Vercel с текущего `main` в статусе `success`, `curl -I` возвращает прежний набор заголовков (CSP с хэшем, HSTS, nosniff, DENY).
- Визуальный паритет со скриншотами `after-2026-08-02` на desktop/375/320, light/dark.
- Dependabot сконфигурирован явно; мажорные обновления приходят отдельными PR.
- README/CHECKLIST/PLAN соответствуют коду.

## 7. Инструменты и скиллы для этой работы

Что есть в текущем окружении Claude Code и пригодится:

- `/code-review` — на каждый PR из плана, особенно на Этап 2 (диффы CSS и конфигов).
- `/security-review` — на Этапы 2 и 3 (меняются PostCSS-пайплайн, CI, Dependabot).
- `/simplify` — после миграции Tailwind, чтобы убрать дубли в утилитных классах.
- `/run` — поднять `npm run dev`/`npm run start` и снять скриншоты для визуальной QA.
- `design:accessibility-review` и `design:design-critique` — прогон после Этапа 2 по ключевым экранам (фокус, контраст в dark, skip-link).
- `/update-config` или `/fewer-permission-prompts` — разрешить `npm`, `gh`, `npx playwright` без лишних подтверждений.
- `gh` CLI уже авторизован: им читаем логи Actions (`gh run view --log-failed`) и статусы деплоев Vercel через GitHub Deployments API.

Чего нет и что стоит добавить:

- **Vercel.** Отдельного Vercel-скилла в окружении нет, Vercel CLI локально не установлен (`vercel: command not found`). Деплой идёт через GitHub-интеграцию, так что CLI нужен только для диагностики. Варианты:
  - `npm i -g vercel && vercel link`, затем `vercel inspect <url> --logs` для чтения логов упавшего билда и `vercel env ls` для проверки `NEXT_PUBLIC_SITE_URL`.
  - Подключить Vercel MCP в Claude Code (`claude mcp add --transport http vercel https://mcp.vercel.com`), тогда логи и статусы деплоев читаются прямо из сессии без CLI.
- **Playwright** (Этап 4): ставится как devDependency проекта, скилл не нужен.
- Не нужны: скиллы Playbox/Cocos/playable, docs/pptx и прочие офисные.
