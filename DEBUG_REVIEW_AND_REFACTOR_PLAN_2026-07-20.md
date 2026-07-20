# Debug review и план обновления проекта

**Дата:** 20 июля 2026
**Проект:** Evgenii Rubin — Frontend Portfolio
**Текущий стек:** Next.js 16.2.10 (Pages Router), React 19.2.4, TypeScript 5.9.3, Tailwind CSS 3.4.19
**Цель:** сначала вернуть проект в безопасное и воспроизводимое состояние, затем исправить runtime-дефекты и только после этого проводить рефакторинг и крупные миграции.

> **Статус P0 на 20 июля 2026:** закрыт. Next.js и `eslint-config-next` обновлены до 16.2.10, PostCSS — до 8.5.20. Для вложенной зависимости Next.js добавлен узкий npm override на прямую исправленную версию PostCSS. Чистый `npm ci`, полный `npm audit` и `npm audit --omit=dev` подтверждают 0 уязвимостей; lint, typecheck и production build проходят.

> **Статус runtime P1 на 20 июля 2026:** закрыт. `ThemeToggle` переведён на SSR-safe external-store snapshot, а Geist Sans/Mono подключены через `_app` согласно контракту Pages Router. Light/dark reload и переключение темы проходят без hydration errors; computed font — Geist Sans, обе font variables определены.

> **Статус SEO P1 и metadata-части P2 на 20 июля 2026:** закрыты. Sitemap/robots стали детерминированными build artifacts вне Git, project slugs вынесены в общий источник, URL валидируется, XML экранируется и генератор покрыт тестами. About получил уникальный title, главная — корректный 1200×630 OG asset и размеры.

> **Статус P2 на 20 июля 2026:** закрыт. Node.js закреплён на линии 22.13+, `@types/node` согласован с runtime major, добавлены `typecheck`/`test`/`check` scripts и GitHub Actions gate: clean install, lint, typecheck, tests, production audit и build. README, CHECKLIST, PLAN и исторический REVIEW синхронизированы с текущим состоянием.

> **Статус P3 на 21 июля 2026:** закрыт, включая production verification. Для Kanban demo явно указано требование входа до перехода по ссылке. Production отдаёт тестируемую catch-all политику `nosniff`, Referrer/Permissions Policy и защиту от framing; HSTS от Vercel сохранён, `X-Powered-By` отсутствует.

## 1. Краткий итог

Проект небольшой и в целом хорошо структурирован: страницы статически генерируются, данные проектов типизированы, базовые SEO- и accessibility-механизмы присутствуют. После чистой установки зависимостей проходят ESLint, TypeScript и production build.

На момент первичного ревью релиз нельзя было считать здоровым по трём причинам:

1. В production-дереве остаётся уязвимый `next@16.1.6`; полный `npm audit` показывает 8 уязвимостей, а `npm audit --omit=dev` — 2 production-уязвимости (1 high, 1 moderate).
2. В тёмной системной теме на каждой странице воспроизводится React hydration mismatch в `ThemeToggle`.
3. Geist фактически не загружается: CSS-переменные шрифта пустые, вычисленный шрифт страницы — `Times`.

P0, P1, P2 и P3 закрыты, включая production verification. Следующий блок — контролируемый content/refactoring pass. Миграции Tailwind 4, ESLint 10 и TypeScript 7 не следует смешивать с ним в одном изменении.

## 2. Что проверено

### Автоматические проверки

| Проверка | Результат | Комментарий |
|---|---:|---|
| `npm ci` | PASS | Чисто установлено 381 пакет; до установки `node_modules` отсутствовал. |
| `npm run lint` | PASS | Ошибок и предупреждений нет. |
| `npx tsc --noEmit` | PASS | TypeScript-ошибок нет. |
| `npm run build` | PASS | Успешно сгенерировано 10 статических страниц. |
| `npm audit` | FAIL | 8 уязвимостей: 3 high, 4 moderate, 1 low. |
| `npm audit --omit=dev` | FAIL | 2 production-уязвимости: `next` (high) и его `postcss` (moderate). |
| `npm outdated` | INFO | Безопасная текущая линия Next.js — 16.2.10; доступны отдельные новые major-версии инструментов. |

Локальная среда во время ревью: Node.js 22.13.1, npm 11.11.1. Next.js 16 требует Node.js `>=20.9.0`, поэтому текущий runtime совместим.

### Runtime smoke test

Проверены `/`, `/about`, `/contact`, `/projects`, один project detail, `/resume` и `/404`.

- На всех проверенных маршрутах есть один `h1`, отсутствует горизонтальный overflow при обычной ширине.
- На 375 px основные элементы шапки помещаются; на 320 px документ не получает горизонтальный скролл.
- Canonical формируется на индексируемых страницах; у 404 canonical отсутствует и есть `noindex, nofollow`.
- PDF-ссылка содержит атрибут `download`.
- Иконки, OG-изображения, project covers и PDF существуют и имеют корректные форматы.
- Все три GitHub-репозитория и три demo URL отвечают. Kanban demo перенаправляет незалогиненного посетителя на `/sign-in`.
- В тёмной теме каждая загрузка маршрута создаёт hydration error из `ThemeToggle`.
- Вычисленный основной шрифт — `Times`; переменные `--font-geist-sans` и `--font-geist-mono` не определены.

## 3. Findings

### P0 — уязвимая production-версия Next.js — закрыто 20 июля 2026

**Где:** `package.json:16`, `package-lock.json`.

`next@16.1.6` затронут актуальными advisory. Не все сценарии применимы к статическому Pages Router-сайту, но уязвимый пакет работает в production и должен быть обновлён. `npm audit fix --dry-run` предлагает `next@16.2.10` и обновление исправленных транзитивных пакетов без перехода на новый major.

**Решение:** обновить Next.js и `eslint-config-next` вместе до 16.2.10, обновить React/React DOM в пределах 19.2.x и PostCSS в пределах 8.5.x, внимательно проверить lockfile, затем повторить весь gate. Не применять `npm audit fix` вслепую.

**Выполнено:** Next.js и `eslint-config-next` обновлены до 16.2.10, PostCSS — до 8.5.20. Из-за жёсткой зависимости Next.js на уязвимый `postcss@8.4.31` добавлен `overrides.postcss = "$postcss"`, который согласует дерево на проверенной прямой версии 8.5.20. Обычный `npm audit fix` без `--force` обновил оставшиеся транзитивные пакеты. Итог: 0 production и 0 total vulnerabilities.

### P1 — hydration mismatch в тёмной теме — закрыто 20 июля 2026

**Где:** `src/components/ThemeToggle.tsx:8-11`, `src/pages/_document.tsx:5-16`.

Сервер всегда рендерит кнопку как `Light`, а клиентский initializer до hydration читает уже установленный `data-theme="dark"` и рендерит `Dark`. React заменяет дерево на клиенте. Ошибка воспроизводится на всех маршрутах при системной или сохранённой тёмной теме.

**Решение:** сделать первый React-render детерминированным для сервера и клиента, а синхронизацию состояния кнопки с `documentElement.dataset.theme` выполнить после mount. Ранний inline-скрипт можно оставить для предотвращения мигания фона.

**Критерий готовности:** перезагрузка в light и dark не создаёт hydration warning; label, `aria-label` и `aria-pressed` соответствуют теме после mount.

**Выполнено:** тема читается через `useSyncExternalStore` с детерминированным server snapshot. После hydration клиент синхронизируется с `data-theme`, а переключение публикует локальное событие изменения store. В браузере проверены dark → light → reload и light → dark → reload; console errors отсутствуют, label и ARIA-состояния корректны.

### P1 — Geist не применяется — закрыто 20 июля 2026

**Где:** `src/pages/_document.tsx:2-3,21`, `tailwind.config.js`, `src/styles/globals.css`.

На `<html>` видны сгенерированные class names, но CSS-правила, объявляющие font variables, отсутствуют. Из-за неопределённого `var(--font-geist-sans)` декларация `font-family` становится невалидной и браузер откатывается в `Times`.

**Решение:** перенести подключение `geist/font/*` в поддерживаемую для Pages Router точку (`_app`/общий app wrapper) и применить `className` или variables на элементе, где font-family реально вычисляется. Проверять не только наличие class name, но и computed font.

**Критерий готовности:** computed `font-family` начинается с Geist Sans; mono-стили используют Geist Mono; production build не запрашивает отсутствующие font assets.

**Выполнено:** импорты Geist перенесены из `_document` в `_app`, а font variables и `font-sans` применены на общем app wrapper. Runtime-проверка подтверждает `GeistSans, "GeistSans Fallback", ...` для контента и определённые `--font-geist-sans`/`--font-geist-mono`; production build проходит.

### P1 — SEO-генерация создаёт грязный и потенциально неверный артефакт — закрыто 20 июля 2026

**Где:** `scripts/generate-static-seo.mjs:17-20,41-45`, `public/sitemap.xml`, `public/robots.txt`.

- В репозитории закоммичены sitemap и robots с `http://localhost:3000`.
- Любой `dev` или `build` меняет `lastmod` на текущее время, поэтому чистая проверка делает worktree грязным без изменения контента.
- Slug-и проектов повторно захардкожены в скрипте и в `src/data/projects.ts`.
- README описывает старую runtime-генерацию, хотя сейчас файлы генерируются до dev/build.

**Решение:** выбрать один воспроизводимый режим: генерировать файлы только как build artifacts и не хранить их в Git либо коммитить детерминированные production-файлы. `lastmod` брать из реальной даты изменения контента или не выводить. Маршруты/slug-и читать из общего источника. Валидировать `NEXT_PUBLIC_SITE_URL` и экранировать XML.

**Выполнено:** `public/sitemap.xml` и `public/robots.txt` исключены из Git и генерируются перед dev/build. Временной `lastmod` удалён, XML форматируется детерминированно, URL нормализуется и валидируется, а production-сборка отклоняет localhost. Slug-и импортируются из общего `src/data/project-slugs.mjs`. Добавлены Node.js-тесты на маршруты, XML escaping, детерминизм, robots и production URL.

### P2 — отсутствует постоянный quality gate — закрыто 20 июля 2026

**Где:** `package.json:5-12`; `.github/workflows` отсутствует.

Нет `typecheck`, `test` и объединённого `check` script; нет CI. Поэтому security-only обновление может пройти Dependabot, не доказав, что проект собирается и не имеет runtime-регрессий.

**Решение:** добавить scripts и GitHub Actions для clean install, lint, typecheck, tests, production audit и build. Для build задавать явный тестовый `NEXT_PUBLIC_SITE_URL`.

**Выполнено:** добавлены `typecheck`, `test` и объединённый `check`; workflow `.github/workflows/quality.yml` запускает `npm ci`, полный локальный gate, production audit и build с явным публичным тестовым URL. Browserslist database обновлена; production build проходит без предупреждения об устаревшем `caniuse-lite`.

### P2 — версия среды не закреплена, типы Node не соответствуют runtime — закрыто 20 июля 2026

**Где:** `package.json:21`; отсутствуют `engines`, `.nvmrc`/`.node-version`.

Проект запускается на Node 22, но использует `@types/node@25`. Это может разрешить API, которых нет в production runtime. Новый разработчик также может случайно собирать проект на другой major-версии Node.

**Решение:** выбрать Node 22 LTS как baseline, добавить `engines` и файл версии, согласовать `@types/node` с runtime major.

**Выполнено:** добавлен `.nvmrc` с Node 22.13.1 и диапазон `engines.node >=22.13.0 <23`; `@types/node` переведён с major 25 на совместимую линию 22.

### P2 — неполные SEO-метаданные отдельных страниц — закрыто 20 июля 2026

**Где:** `src/pages/about.tsx:11-14`, `src/pages/index.tsx`.

About не передаёт `title`, поэтому получает title главной страницы. На главной OG image задан без размеров и использует project cover с нестандартным для social preview соотношением.

**Решение:** добавить `title="About"`; для главной использовать отдельный 1200×630 OG asset либо передать корректные размеры текущего изображения.

**Выполнено:** About передаёт уникальный `title="About"`; главная использует `/og/kanban-board.webp` и явно задаёт размеры 1200×630.

### P2 — документация и фактическое состояние расходятся — закрыто 20 июля 2026

**Где:** `README.md`, `PLAN.md`, `REVIEW.md`.

README всё ещё говорит о runtime sitemap/robots и дублировании project data, хотя архитектура уже изменилась. PLAN содержит незакрытые пункты, которые фактически выполнены. Старый REVIEW содержит устранённые findings. Это затрудняет возвращение к проекту после паузы.

**Решение:** после исправлений обновить README и CHECKLIST, архивировать или явно пометить исторические REVIEW/PLAN. Существующий `SECURITY_REVIEW_2026-07-11.md` сохранить как отдельный audit snapshot.

**Выполнено:** README и CHECKLIST описывают актуальные runtime, scripts и SEO pipeline; PLAN синхронизирован с выполненными пунктами; REVIEW явно помечен как исторический snapshot и ссылается на актуальный debug-план.

### P3 — demo Kanban начинается с экрана входа — закрыто 21 июля 2026

Ссылка работает, но рекрутер не видит продукт без дополнительного действия. Лучше добавить read-only demo account, публичную demo board или рядом со ссылкой указать, что требуется вход.

**Выполнено:** live URL повторно проверен и возвращает `307` на `/sign-in`. В списке проектов и case study CTA помечен как `Live Demo (sign-in)`, рядом показано пояснение об отсутствии публичной demo board.

### P3 — security headers — закрыто 21 июля 2026

В `next.config.js` нет repository-level политики security headers. Это уже подробно зафиксировано в `SECURITY_REVIEW_2026-07-11.md`. Сначала нужно проверить реальные headers production-домена, затем добавить минимум `nosniff`, `Referrer-Policy`, `Permissions-Policy` и защиту от framing. Строгий CSP потребует hash/nonce для inline theme script.

**Выполнено:** до изменения effective production headers проверены на `https://evgenii-rubin.vercel.app/`: Vercel отдавал только HSTS из требуемого набора. В `next.config.js` добавлена catch-all policy с `Content-Security-Policy` для `base-uri`, `form-action`, `object-src` и `frame-ancestors`, а также `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options` и legacy `X-Frame-Options`. Политика покрыта автоматическим тестом. После deploy повторная проверка подтвердила все перечисленные headers, сохранённый HSTS и отсутствие `X-Powered-By`. Полный `script-src` намеренно отложен до nonce/hash для inline theme script.

## 4. Поэтапный план

### Этап 0 — зафиксировать baseline (30–60 минут)

- Создать отдельную ветку `codex/project-refresh` или аналогичную.
- Зафиксировать Node 22 и production URL, не копируя секреты в репозиторий.
- Добавить исключение `!.env.example` после `.env.*` и подготовить безопасный `.env.example`.
- Записать baseline-команды: `npm ci`, lint, typecheck, build, оба audit.
- Не смешивать изменения контента с dependency update.

**Выход:** воспроизводимая исходная точка и понятный rollback.

### Этап 1 — security patch в пределах текущих major (0.5 дня)

- Обновить `next` и `eslint-config-next` с 16.1.6 до 16.2.10.
- Обновить React/React DOM с 19.2.4 до 19.2.7.
- Обновить PostCSS с 8.5.6 до 8.5.20, Autoprefixer и Geist до последних совместимых patch/minor.
- Просмотреть изменения `package-lock.json`; не добавлять overrides, если цепочка исправляется обновлением владельца зависимости.
- Выполнить `npm audit` и `npm audit --omit=dev`, затем lint, typecheck и build.
- Закоммитить dependency patch отдельно.

**Не включать:** Tailwind 4, ESLint 10, TypeScript 7, переход на App Router.

**Выход:** 0 production vulnerabilities; желательно 0 total vulnerabilities; все существующие проверки зелёные.

### Этап 2 — исправить runtime P1 (0.5–1 день)

- Исправить SSR/client контракт `ThemeToggle`.
- Исправить подключение Geist Sans/Mono.
- Добавить минимальные regression tests для theme initialization и toggle state.
- Проверить light/dark reload, keyboard focus и `prefers-reduced-motion` в браузере.
- Проверить computed fonts в dev и production.

**Выход:** нет hydration errors; нет font fallback; визуальный дизайн соответствует Systematic Minimalist.

### Этап 3 — стабилизировать SEO pipeline (0.5–1 день)

- Убрать localhost-артефакты из публикуемого результата.
- Сделать generator детерминированным и тестируемым.
- Убрать дублирование project slugs между `scripts/` и `src/data/`, сохранив текущий полезный split list/case-study data.
- Добавить `.env.example` и документировать build-time generation.
- Исправить title About и OG metadata главной.
- Добавить тесты на список URL, XML escaping и отсутствие localhost в production output.

**Выход:** повторный build без изменения контента не создаёт неожиданный Git diff; sitemap/robots содержат production URL и все маршруты.

### Этап 4 — quality gate и CI (1 день)

- Добавить scripts: `typecheck`, `test`, `check`.
- Закрепить Node 22 через `engines` и `.nvmrc`/`.node-version`; выровнять `@types/node`.
- Добавить GitHub Actions: `npm ci` → lint → typecheck → tests → production audit → build.
- Добавить lightweight browser smoke tests для основных маршрутов, title/canonical, 404, PDF download attribute, темы и отсутствия overflow на 375 px.
- Обновить Browserslist data отдельным техническим коммитом.

**Выход:** PR нельзя слить при регрессии сборки, типов, безопасности или ключевого runtime-поведения.

### Этап 5 — контролируемый рефакторинг и content refresh (1–2 дня)

- Вынести повторяющиеся resume/contact данные в типизированный content module только там, где это действительно сокращает расхождения.
- Унифицировать повторяющиеся heading/typography patterns без создания новых абстракций для одноразовой разметки.
- Проверить актуальность `2.5+ years`, Open to Work, work permit, дат опыта, PDF и контактных данных.
- Улучшить Kanban demo entry point для публичного просмотра.
- Проверить production security headers и добавить согласованную политику.
- Обновить README, CHECKLIST и статус исторических PLAN/REVIEW.

**Выход:** один актуальный источник правды для архитектуры и контента; старые документы не выдают выполненные задачи за активные.

### Этап 6 — отдельные major migrations (опционально, по одной на PR)

1. Tailwind CSS 3 → 4.
2. ESLint 9 → 10 после подтверждения совместимости `eslint-config-next` и plugins.
3. TypeScript 5.9 → 7 после подтверждения поддержки Next.js и редактора.

После каждого major: clean install, lint, typecheck, tests, build и визуальная проверка. Если нет конкретной продуктовой причины, Pages Router пока оставить: он соответствует принятому решению проекта и не является источником найденных дефектов.

## 5. Рекомендуемые границы PR/коммитов

1. `chore(deps): patch Next and audited dependencies`
2. `fix(theme): make hydration deterministic`
3. `fix(fonts): restore Geist loading in Pages Router`
4. `refactor(seo): make static metadata generation deterministic`
5. `ci: add reproducible quality gates`
6. `refactor(content): consolidate shared portfolio content`
7. Отдельный PR на каждую major migration.

Такой порядок упрощает review, откат и поиск регрессии.

## 6. Финальный Definition of Done

- `npm ci`, lint, typecheck, tests и build проходят на чистом checkout.
- `npm audit --omit=dev` не сообщает production vulnerabilities.
- В браузерной консоли нет hydration errors на light/dark reload.
- Computed font — Geist Sans/Mono, а не Times/system fallback.
- Sitemap и robots используют production URL и не создают случайный diff после каждой сборки.
- Все индексируемые страницы имеют уникальные title, canonical и корректные OG metadata.
- 404 остаётся `noindex` без canonical.
- CI воспроизводит локальный gate на Node 22.
- README, CHECKLIST и активный план соответствуют фактической архитектуре.

## 7. Оценка объёма

Обязательная часть (этапы 0–5): ориентировочно **3–5 рабочих дней** с тестами и review. Major migrations следует оценивать отдельно после стабилизации baseline; они не блокируют безопасный релиз текущего сайта.
