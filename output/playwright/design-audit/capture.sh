#!/usr/bin/env bash
# Full-page screenshots of every route at the breakpoints that matter for the
# Tailwind container/xs/xxs settings, in light and dark themes.
#
# Usage: output/playwright/design-audit/capture.sh <base-url> <out-dir>
#   baseline: capture.sh https://evgenii-rubin.vercel.app output/playwright/design-audit/before-2026-10-26
#   after:    npm run build && npm run start, then
#             capture.sh http://localhost:3000 output/playwright/design-audit/after-2026-10-26
set -euo pipefail

BASE_URL="${1:?base url required}"
OUT_DIR="${2:?output dir required}"
PLAYWRIGHT="${PLAYWRIGHT:-npx -y playwright@1.64.1}"

ROUTES=(
  "home:/"
  "about:/about"
  "projects:/projects"
  "case-kanban-board:/projects/kanban-board"
  "case-stripe-mini-app:/projects/stripe-mini-app"
  "case-admin-dashboard:/projects/admin-dashboard"
  "resume:/resume"
  "contact:/contact"
  "404:/this-page-does-not-exist"
)
VIEWPORTS=("1280,800" "768,1024" "390,844" "375,812" "320,568")
THEMES=(light dark)

mkdir -p "$OUT_DIR"

for route in "${ROUTES[@]}"; do
  for viewport in "${VIEWPORTS[@]}"; do
    for theme in "${THEMES[@]}"; do
      printf '%s\t%s\t%s\n' "$route" "$viewport" "$theme"
    done
  done
done | while IFS=$'\t' read -r route viewport theme; do
  name="${route%%:*}"
  path="${route#*:}"
  file="$OUT_DIR/${name}-${viewport%%,*}-${theme}.png"
  $PLAYWRIGHT screenshot --full-page --wait-for-timeout 1000 \
    --viewport-size "$viewport" --color-scheme "$theme" \
    "${BASE_URL%/}${path}" "$file" >/dev/null
  echo "$file"
done
