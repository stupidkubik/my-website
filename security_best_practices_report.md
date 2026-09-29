# Аудит безопасности и актуальности зависимостей

Исторический снимок до исправлений. Итоговые изменения и повторные проверки описаны в [отчёте об исправлениях](security_remediation_report.md).

Дата: 30 сентября 2026, Europe/Belgrade.
Репозиторий: `stupidkubik/my-website`, ветка `main`, проверяемый коммит `7e2e34e`.

## Результат

Изменения `origin/main` до `275eb99` объединены с семью локальными коммитами без конфликтов. Создан merge-коммит `7e2e34e`; локальная ветка опережает GitHub на восемь коммитов. Зависимости установлены через `npm ci` из полученного lockfile.

Полный `npm audit` обнаружил один уязвимый пакет высокой серьёзности, `brace-expansion`, в двух версиях из dev-зависимостей. `npm audit --omit=dev` обнаружил **0 известных уязвимостей**. Отдельно обнаружены устаревший Node.js в CI и неполная CSP. Подтверждённого пути эксплуатации через пользовательский ввод в прикладном коде сайта не найдено.

Аудит выполнен по официальному навыку [security-best-practices](https://github.com/openai/skills/blob/main/skills/.curated/security-best-practices/SKILL.md), с рекомендациями для [Next.js](https://github.com/openai/skills/blob/main/skills/.curated/security-best-practices/references/javascript-typescript-nextjs-web-server-security.md), [React](https://github.com/openai/skills/blob/main/skills/.curated/security-best-practices/references/javascript-typescript-react-web-frontend-security.md) и [браузерного JavaScript](https://github.com/openai/skills/blob/main/skills/.curated/security-best-practices/references/javascript-general-web-frontend-security.md). Это аудит текущего проекта и реестра npm; выводы о runtime Node.js основаны на отдельных официальных advisories.

## Высокая серьёзность

### 1. Уязвимые версии brace-expansion в инструментах разработки

- Правило: `REACT-SUPPLY-001`.
- Места: `package-lock.json:1610` — `2.1.2`; `package-lock.json:2343` — `1.1.16`.
- Доказательство: `npm audit --json` возвращает `high: 1`, `critical: 0`, `fixAvailable: true`. `npm ls brace-expansion --all` подтверждает цепочки:

```text
eslint@9.39.2 → minimatch@3.1.5 → brace-expansion@1.1.16
eslint-config-next@16.2.10 → typescript-eslint@8.54.0
  → @typescript-eslint/typescript-estree@8.54.0
  → minimatch@9.0.9 → brace-expansion@2.1.2
```

Пакет затронут [CVE-2026-14257](https://github.com/advisories/GHSA-mh99-v99m-4gvg) и [CVE-2026-69152](https://github.com/advisories/GHSA-rgw5-rvv9-x895): обработка специально составленных brace-patterns может истощать память или блокировать процесс. Второе исправление требует как минимум `1.1.18` и `2.1.4` для используемых здесь веток.

**Применимость:** обе цепочки относятся к lint/type tooling. Зависимость не обнаружена в production-графе. В коде сайта отсутствуют обработчики, передающие запросы посетителей в brace-expansion. Серьёзность advisory высокая; удалённая атака на этот сайт через данный пакет не подтверждена. Риск остаётся для инструментов, обрабатывающих недоверенные шаблоны.

**Исправление:** обновить lockfile. Пробный `npm audit fix --dry-run --ignore-scripts --json` предложил ровно две замены: `1.1.16 → 1.1.21` и `2.1.2 → 2.1.7`, без major-обновления прямых зависимостей. После применения проверить итоговый diff, повторить полный audit и `npm run check`. Пробный запуск сам по себе не подтверждает отсутствие уязвимостей в исправленном дереве.

**Временная мера:** не передавать недоверенные glob/brace-patterns инструментам разработки. Исправления в рамках этого аудита не применялись.

### 2. CI закреплён на старом Node.js 22.13.1

- Правило: поддержание безопасного runtime / `NEXT-SUPPLY-001` по смыслу управления обновлениями.
- Места: `.nvmrc:1`, `.github/workflows/quality.yml:30`, `package.json:6`.
- Доказательство: `.nvmrc` содержит `22.13.1`; setup-node использует этот файл. `engines.node` допускает `>=22.13.0 <23`.

Node.js 22.13.1 предшествует последующим security-релизам. Например, [мартовский релиз 2026](https://nodejs.org/en/blog/vulnerability/march-2026-security-releases) исправляет проблемы HTTP, HMAC и V8 в ветке 22.x; [июльский security-релиз](https://nodejs.org/en/blog/vulnerability/july-2026-security-releases) включает исправления HTTP/2 в 22.23.2. Актуальная версия ветки 22 по npm и [официальному списку релизов](https://nodejs.org/en/blog/release) — **22.23.3**.

**Применимость:** старый runtime в CI подтверждён. Конкретная эксплуатация каждой Node.js CVE зависит от используемых API; собственных HTTP/2, TLS и HMAC обработчиков в проекте не найдено. Версия runtime действующего Vercel deployment не проверялась. Эти риски не входят в результат `npm audit`.

**Исправление:** обновить `.nvmrc` до текущего исправленного Node.js 22.x, согласовать нижнюю границу `engines`, окружение CI и настройки Vercel. Миграция на Node.js 24 требует отдельно пересмотреть ограничение `<23` и `@types/node`.

**Временная мера:** выполнять рабочие сборки на исправленном 22.x. Локальная оболочка использовала Node.js 24.18.0 и npm 12.0.2; Node.js 24 не соответствует engines проекта. Для проверок был временно загружен Node.js 22.13.1 из `.nvmrc`. npm 12.0.2 предупреждает о несовместимости с этим старым patch-релизом (требует минимум 22.22.2 в ветке 22); команды проверки завершились успешно, но инструментарий следует согласовать.

## Средняя серьёзность: усиление защиты

### 3. CSP не ограничивает выполнение скриптов

- Правила: `NEXT-CSP-001`, `REACT-CSP-001`, `JS-CSP-001`.
- Место: `next.config.js:12`.
- Доказательство: `base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'`.

В политике отсутствуют `script-src` и резервный `default-src`. Такая CSP защищает от встраивания страницы, изменения base URL и object/embed, но не ограничивает источники скриптов и inline JavaScript. При появлении HTML-инъекции этот защитный слой не заблокирует выполнение скриптов. Действующая XSS-инъекция в коде не обнаружена.

**Исправление:** спроектировать политику скриптов, совместимую с Pages Router и SSG, сначала проверить её в report-only. Inline-скрипт темы (`src/pages/_document.tsx:3–21`) и служебные скрипты Next.js требуют разрешения по хешам или другой проверенной схемы. Не включать nonce, требующий динамического рендера, без оценки влияния на SSG; не добавлять широкие `unsafe-inline`/`unsafe-eval` для обхода ошибок.

**Ограничение:** на CDN может быть дополнительная CSP; production-заголовки не проверялись. Текущий тест `scripts/security-headers.test.mjs:22` проверяет frame-ancestors, но не ограничения скриптов. Это рекомендация защиты в глубину, а не доказанная эксплуатация.

## Низкая серьёзность: процесс обновлений

### 4. CI проверяет только production-граф и использует старые GitHub Actions

- Правило: `REACT-SUPPLY-001`.
- Места: `.github/workflows/quality.yml:25`, `:28`, `:40`.
- Доказательство: `actions/checkout@v4`, `actions/setup-node@v4`, `npm audit --omit=dev`.

Текущая dev-уязвимость не приводит к падению шага production-audit. Добавить проверку полного графа как отдельный шаг, например `npm audit --audit-level=high`, и оставить production-проверку для отдельной видимости runtime-рисков.

По GitHub Releases API актуальны [checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) и [setup-node v7.0.0](https://github.com/actions/setup-node/releases/tag/v7.0.0). Старый major сам по себе не доказывает уязвимость. Обновлять Actions после проверки требований к runner и миграционных заметок; закрепление на проверенном полном commit SHA дополнительно уменьшает риск изменения тега.

## Актуальность прямых зависимостей

Значения получены через `npm outdated --json` после `npm ci`. «В диапазоне» означает максимальную версию, разрешённую текущим package.json; это не гарантия отсутствия регрессий.

| Пакет | Установлено / lockfile | В диапазоне | Последняя версия |
| --- | --- | --- | --- |
| next | 16.3.4 | 16.3.7 | 16.3.7 |
| eslint-config-next | 16.2.10 | 16.3.7 | 16.3.7 |
| react | 19.2.4 | 19.3.0 | 19.3.0 |
| react-dom | 19.2.4 | 19.3.0 | 19.3.0 |
| geist | 1.7.0 | 1.7.2 | 1.7.2 |
| @types/node | 22.20.1 | 22.20.4 | 26.6.3 |
| @types/react | 19.2.13 | 19.3.0 | 19.3.0 |
| @types/react-dom | 19.2.3 | 19.3.0 | 19.3.0 |
| autoprefixer | 10.4.24 | 10.6.1 | 10.6.1 |
| eslint | 9.39.2 | 9.39.5 | 10.11.0 |
| postcss | 8.5.28 | 8.5.28 | 8.5.28 |
| tailwindcss | 3.4.19 | 3.4.19 | 4.3.3 |
| typescript | 5.9.3 | 5.9.3 | 7.0.2 |

Для 10 из 13 прямых зависимостей доступны обновления в текущих диапазонах. Ещё Tailwind и TypeScript имеют новые major; PostCSS актуален. Next.js и eslint-config-next сейчас разных minor: при обновлении разумно привести их к 16.3.7. React и react-dom обновлять вместе, затем проверить типы.

Рекомендуемый порядок: исправить brace-expansion и Node.js; обновить разрешённые patch/minor версии; затем отдельно рассмотреть ESLint 10, Tailwind 4 и TypeScript 7. `@types/node` следует оставлять в ветке используемого runtime 22, а не механически обновлять до latest 26. Новые major требуют миграционных проверок и визуального QA. Версии из таблицы зафиксированы на дату аудита.

## Проверенный прикладной код

Проект использует Next.js Pages Router, React, TypeScript и Tailwind; данные проектов хранятся в локальных модулях. Проверены маршруты, конфигурация, SSG, URL-ссылки, HTML/DOM sinks, storage, переменные окружения, скрипты сборки и CI.

- API routes, Server Actions, auth/cookies, база данных, upload endpoints и исходящие fetch-запросы в приложении не обнаружены; соответствующие классы атак не применимы к текущему прикладному коду.
- Единственный `dangerouslySetInnerHTML` вставляет фиксированный скрипт темы; сохранённая тема ограничивается значениями light/dark. Недоверенная строка не вставляется в HTML.
- `localStorage` хранит только тему. Признаков хранения токенов или паролей не найдено.
- Ссылки проектов берутся из статических модулей. Новые вкладки получают `noopener noreferrer` по умолчанию.
- Динамический slug проверяется через allowlist; `fallback: false`. SSG публикует открытые данные портфолио.
- В отслеживаемых `.env*` есть только `.env.example` с публичным URL. `.gitignore` исключает рабочие env-файлы. Поиск в исходниках не выявил явных секретов; полный аудит истории Git и специализированный secret scan не проводились.
- Базовые заголовки nosniff, frame-ancestors, X-Frame-Options, Referrer-Policy и Permissions-Policy присутствуют в конфигурации.

## Проверки и ограничения

Исходные результаты: [полный audit](output/security-audit/2026-09-30/npm-audit.json), [production audit](output/security-audit/2026-09-30/npm-audit-production.json), [устаревшие версии](output/security-audit/2026-09-30/npm-outdated.json), [пробный расчёт исправлений](output/security-audit/2026-09-30/npm-audit-fix-dry-run.txt).

- `npm ci`: успешно, манифест и lockfile согласованы. Установочные скрипты fsevents и unrs-resolver заблокированы локальной политикой npm; lint, typecheck, тесты и Webpack-сборка после установки прошли.
- `npm run check` на Node.js 22.13.1: успешно — ESLint, TypeScript и 6 существующих тестов (5 SEO, 1 security headers).
- `npm audit --json`: одна high dev-зависимость, ноль critical.
- `npm audit --omit=dev --json`: ноль известных уязвимостей.
- `npm outdated --json`: таблица выше; код завершения 1 ожидаем при наличии обновлений.
- `npm audit fix --dry-run --ignore-scripts --json`: рассчитаны две замены brace-expansion, реальные исправления не выполнены.
- Стандартный `npm run build` (Turbopack): не прошёл из-за `binding to a port: Operation not permitted` при обработке CSS; повтор с разрешённым запуском дал тот же результат. Это ограничение текущей среды, успешность канонической сборки не подтверждена.
- `npm run build -- --webpack` на Node.js 22.13.1: успешно, сгенерированы все 10 страниц. Использован тестовый публичный origin `https://portfolio.example.com` и `VERCEL_ENV=production`, как в CI; deployment не выполнялся. Проверка через альтернативный bundler не подтверждает работоспособность Turbopack в другом окружении.
- `git diff --check`: успешно.

Production deployment, его runtime, CDN/WAF, заголовки HTTP в работающем сайте, сторонние демонстрационные проекты и GitHub secret scanning в объём этой проверки не входили. Отсутствие записей в npm audit означает отсутствие известных реестру проблем, а не доказательство отсутствия любых уязвимостей.

Обновления сверх полученных из GitHub, security-fixes, push и deployment не выполнялись. Прикладные файлы не редактировались; автоматически сгенерированное при сборке изменение next-env.d.ts убрано после проверок.
