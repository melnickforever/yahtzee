# GitHub Copilot Instructions — Yahtzee Score Table

## Project Overview

Single-page Next.js 14 app for generating Yahtzee score tables. Bilingual (Ukrainian default, English). Deployed to Vercel via GitHub Actions. Licensed GPL v3.

## Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript 5
- **Package manager**: pnpm
- **Styling**: Single global CSS file (`app/globals.css`) — no Tailwind, no CSS modules, no CSS-in-JS
- **State**: React `useState` only — no context, no Redux, no external state libraries
- **Dependencies**: Zero external libraries beyond next/react/react-dom
- **Deployment**: Vercel via `.github/workflows/deploy.yml` on push to `main`

## File Structure

```
app/
  layout.tsx              — Root layout (only server component, exports Metadata/Viewport)
  page.tsx                — Main page (client component, owns language + playerName state)
  i18n.ts                 — Bilingual translations (uk/en), exports Language type + translations object
  globals.css             — All styles (CSS Grid layout, responsive breakpoints at 768px)
  components/
    LanguageSwitcher.tsx   — <select> dropdown toggling uk/en
    RulesReference.tsx     — Collapsible rules table (upper/lower sections + Joker Rule)
    ScoreCell.tsx          — Editable cell (text input or <select> for fixed-value categories)
    ScoreTable.tsx         — Main scoring grid (13 categories, single score column per category)
```

## Architecture Rules

- **All components are client components** (`'use client'`). Only `layout.tsx` is a server component.
- **State flows downward only** via props. `page.tsx` passes `language` to all children. `ScoreTable` owns its own `scores` state internally.
- **No memoization** — derived values (totals, bonuses) are computed inline. Don't add `useMemo`/`useCallback` unless there's a measured perf problem.
- **Path alias**: Use `@/app/...` for imports (configured in tsconfig.json as `@/* → ./*`).

## i18n System

- `i18n.ts` exports `type Language = 'uk' | 'en'` and a `translations` object with identical shapes for both languages.
- Components receive `language` as a prop and do `const t = translations[language]` to access strings.
- **Default language is Ukrainian (`'uk'`)**.
- All user-facing text must come from `translations`. Never hardcode UI strings.
- When adding new text, add to BOTH `uk` and `en` sections in `i18n.ts`.
- Known typo in keys: `yatzheeBonusDesc` / `yatzheeBonusPoints` — these are referenced in components, so keep consistent until a coordinated rename.

## Styling Conventions

- Add all styles to `app/globals.css` using class selectors.
- Layout uses **CSS Grid** (`display: grid` with `display: contents` for row children).
- Score grid columns: `grid-template-columns: 1fr 120px` (category name + score).
- Rules grid columns: `grid-template-columns: 1fr 2fr 1fr`.
- Inline styles are acceptable only for simple conditional values (opacity, cursor).
- Responsive design uses `@media (max-width: 768px)` breakpoint.

## Scoring Logic (ScoreTable.tsx)

- **13 categories**: 6 upper (ones–sixes) + 7 lower (threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee, chance).
- **Fixed-value categories**: `fullHouse: 25`, `smallStraight: 30`, `largeStraight: 40`, `yahtzee: 50`. These render as `<select>` dropdowns (0 or fixed value).
- **Upper bonus**: +35 automatically if upper section total ≥ 63.
- **Yahtzee bonus**: +100 per additional Yahtzee — editable by user (not auto-calculated).
- **Single score per category**: Each category has one score value (`number | null`), no rounds/columns.
- **Table layout**: 2-column grid (Category | Score). Each category filled once per game.

## Yahtzee Rules (for context)

- **Objective**: Score the most points by rolling five dice to create specific combinations across 13 categories.
- **Turn structure**: Roll up to 3 times per turn. Set aside dice to keep between rolls. After the third roll (or earlier), record a score in exactly one category. A filled category cannot be reused.
- **Upper section**: Sum of the specified die face (ones–sixes). Bonus +35 automatically if upper total ≥ 63.
- **Lower section**: 3-of-a-Kind (sum all), 4-of-a-Kind (sum all), Full House (25), Small Straight (30), Large Straight (40), Yahtzee (50), Chance (sum all).
- **Yahtzee Bonus**: +100 per additional Yahtzee after the first. Only applies if Yahtzee was scored 50 (not 0).
- **Joker Rule**: If Yahtzee is already filled, first try the matching upper category. If that is also filled, use the roll as a joker in any free lower section category at full value.
- **Zero Rule**: If no free category fits the roll, choose one and record 0.
- **Game end**: All 13 categories filled → count grand total; highest score wins.

> **README sync**: When any rule changes (scoring values, bonus conditions, Joker Rule logic, etc.), update the `### Rules` section in `README.md` to match.

## Code Conventions

- TypeScript strict mode enabled (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`).
- No ESLint/Prettier config — rely on TypeScript compiler checks.
- No test framework configured.
- Keep it simple — no unnecessary abstractions, helpers, or over-engineering.
- Prefer editing existing files over creating new ones.
