# Исправления после аудита

Дата: 30 сентября 2026, Europe/Belgrade. Репозиторий: `stupidkubik/my-website`. Ветка: `codex/security-dependency-maintenance`, исходный коммит: `7e2e34e`.

Выполнены пять последовательных этапов субагентами **gpt-6-luna**, reasoning `medium`. После каждого этапа основной агент проверял изменения и результаты. Известная уязвимость зависимостей устранена; полный и production npm audit возвращают **0**. Остаётся проблема поддержки ESLint 9, описанная ниже.

## Что изменено

1. Исправлен уязвимый `brace-expansion` в lockfile. Первоначальные версии `1.1.16` и `2.1.2` заменены исправленными; после общего обновления в дереве используются `1.1.21` и `5.0.12`.
2. Node.js обновлён до **22.23.3** в `.nvmrc`; `engines` в манифесте и lockfile согласованы: `>=22.23.3 <23`. CI дополнен полным `npm audit --audit-level=high`, production-проверка сохранена. Checkout v7.0.1 и setup-node v7.0.0 закреплены полными SHA, проверенными через GitHub API.
3. Зависимости обновлены в разрешённых диапазонах. Итоговые версии в lockfile приведены ниже. Чистая установка воспроизводится через `npm ci`.
4. В production CSP добавлены `default-src 'self'`, ограничения источников скриптов и запрет inline-обработчиков. Единственный исполняемый inline-скрипт инициализации темы разрешён по SHA-256; его строка вынесена в общий модуль `src/security/theme-init-script.cjs`, используемый страницей и конфигурацией. Скрипты не получают `unsafe-inline` или `unsafe-eval`. Стили сохраняют `unsafe-inline`, необходимый текущему интерфейсу. SSG сохранён; для development оставлена прежняя политика, совместимая с инструментами Next.js.
5. Проверен переход на ESLint 10.11.0. Он отменён после несовместимости плагинов и ошибки lint; восстановлен ESLint 9.39.5 без принудительного обхода peer-зависимостей.

| Зависимость | Итоговая версия |
| --- | --- |
| next / eslint-config-next | 16.3.7 |
| react / react-dom | 19.3.0 |
| geist | 1.7.2 |
| @types/node | 22.20.4 |
| @types/react / @types/react-dom | 19.3.0 |
| autoprefixer | 10.6.1 |
| postcss | 8.5.28 |
| eslint | 9.39.5 |
| tailwindcss | 3.4.19 |
| typescript | 5.9.3 |

## Проверки основного агента

- Node.js **22.23.3**: `npm ci --ignore-scripts` и `npm ls --all` завершились успешно; ошибок дерева или peer-зависимостей после отката ESLint нет. Lifecycle-скрипты при чистой установке не запускались; проверки и сборка запущены отдельно.
- `npm run check`: lint, TypeScript и **8 тестов** прошли, включая ограничения production CSP, хеш темы и development-политику.
- Полный `npm audit --json` и `npm audit --omit=dev --json`: **0 известных уязвимостей** всех уровней.
- `npm run build -- --webpack` на Next.js 16.3.7: успешно, **10 статических/SSG страниц**. Проверено, что байты inline-скрипта в собранном HTML совпадают с общим модулем и хешем CSP: `bavMCejAWGlcQ++Q7+IX9UtgGn9eiu3TGPAKtRgBRlM=`.
- В локальном production-сервере через Playwright проверены 8 страниц и неизвестный маршрут с HTTP 404: ответы, заголовки, содержимое, отсутствие неожиданных CSP-нарушений и ошибок браузера. Проверены переключение и сохранение темы, клиентская навигация, отклонение некорректной сохранённой темы, ширина 375 px без горизонтального переполнения. Дополнительно проверен desktop 1440 px.
- Тестовый посторонний inline-скрипт заблокирован браузером: зафиксирован `securitypolicyviolation`, скрипт не выполнился. Ожидаемые ошибки для этого теста и маршрута 404 отделены от ошибок интерфейса.
- YAML CI разобран; `git diff --check` выполнен. Сам workflow на GitHub ещё не запускался.

## Оставшиеся ограничения

**ESLint 9 требует отдельной миграции.** Согласно [официальной таблице поддержки](https://eslint.org/version-support/), ветка 9 завершила поддержку 6 августа 2026. Текущие `eslint-plugin-react`, `eslint-plugin-import` и `eslint-plugin-jsx-a11y` объявляют совместимость только до ESLint 9; при пробном переходе правило `react/display-name` упало с `contextOrFilename.getFilename is not a function`. Нужны совместимые версии/замена плагинов и последующая проверка lint. Нулевой npm audit не означает, что поддержка ESLint восстановлена.

`npm outdated` показывает только более новые major-ветки: ESLint 10.11.0, Tailwind 4.3.3, TypeScript 7.0.2 и `@types/node` 26.6.3. В разрешённых диапазонах `current = wanted`. Tailwind и TypeScript требуют самостоятельной миграции; `@types/node` оставлен в ветке 22 в соответствии с runtime проекта.

Обычная Turbopack-сборка ранее упала в локальной среде с ограничением открытия порта (`Operation not permitted`); подтверждена сборка с Webpack. Workflow по-прежнему использует обычный `npm run build`, поэтому результат Turbopack на GitHub требует проверки после публикации ветки. Настройки runtime Vercel и действующий deployment не изменялись и не проверялись в этом этапе.

## Артефакты

- [Исходный аудит](security_best_practices_report.md).
- [Полный audit](output/security-audit/2026-09-30/remediation/npm-audit.json), [production audit](output/security-audit/2026-09-30/remediation/npm-audit-production.json), [outdated](output/security-audit/2026-09-30/remediation/npm-outdated.json).
- [Результаты браузерной проверки](output/security-audit/2026-09-30/remediation/browser-results.json), [проверка блокировки inline-скрипта](output/security-audit/2026-09-30/remediation/browser-proof.txt), [сценарий браузерной проверки](output/security-audit/2026-09-30/remediation/browser-check.txt).
- [Desktop, тёмная тема](output/playwright/security-remediation/home-desktop-dark.png), [мобильная страница проекта](output/playwright/security-remediation/case-study-mobile-light.png).

Изменения сгруппированы в отдельные коммиты: зависимости/runtime/CI, production CSP с тестами, документация аудита с артефактами проверок. Ветка для публикации: `codex/security-dependency-maintenance`. Deployment не выполнялся. Существующие локальные коммиты сохранены.
