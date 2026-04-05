# Yahtzee Score Table Application - Implementation Plan

## Context
Building a single-page Next.js application to help players track and calculate Yahtzee scores. The app will display:
1. A collapsible rules reference showing all valid dice combinations and their point values
2. An interactive scoring table for a single player with all 13 Yahtzee categories
3. Automatic bonus calculations for upper section bonus (35 pts if ≥63) and Yahtzee bonuses (100 pts each after first)
4. **Language**: Bilingual support (Ukrainian default, English available with switcher)

## Requirements
- **Framework**: Next.js (React-based SPA)
- **Categories**: All 13 standard Yahtzee categories (6 upper + 7 lower)
- **Interactions**: Click cells to edit scores, auto-calculate bonuses and totals
- **Bonuses**: Upper section (35+), Yahtzee bonus (100+), total score

## Implementation Approach

### 1. Project Setup
- Initialize Next.js project with TypeScript
- Install dependencies: none required for MVP (use built-in React state)
- Basic project structure ready

### 2. Component Structure
```
/app
  /layout.tsx              (main layout)
  /page.tsx              (main page)
  /components
    /LanguageSwitcher.tsx (language toggle button)
    /RulesReference.tsx   (collapsible rules table)
    /ScoreTable.tsx       (main Yahtzee scoring table)
    /ScoreCell.tsx        (editable cell component)
  /i18n.ts               (translations object)
```

### 3. Data Model
```typescript
- Categories (upper): Одиниці, Двійки, Трійки, Четвірки, П'ятірки, Шістки
- Categories (lower): 3 однакові, 4 однакові, Фул-хаус, Мала стріт,
  Велика стріт, Яцци, Шанс
- State: { category: string, score: number | null }[]
```

### 4. Features
- **LanguageSwitcher**: Button in top-right, toggles between Ukrainian (default) and English
- **I18n System**:
  - Single `/app/i18n.ts` file with translations object
  - Structure: `{ uk: { labels, rules, categories }, en: { labels, rules, categories } }`
  - App state tracks current language (useState)
- **RulesReference**: Toggle visibility, display dice combinations & point rules
- **ScoreTable**:
  - 13 rows (categories) + subtotals + bonuses + total
  - Click-to-edit cells with number input
  - Real-time calculations
- **Calculations**:
  - Upper subtotal (sum of Ones-Sixes)
  - Upper bonus: +35 if upper total ≥ 63
  - Lower subtotal (sum of lower categories)
  - Yahtzee bonus: +100 for each Yahtzee after the first
  - Grand total: upper + lower + bonuses

### 5. Styling
- Simple, clean design (flexbox-based table)
- Responsive desktop-first layout
- Highlight editable cells and totals

## Files to Create
- `/app/layout.tsx`
- `/app/page.tsx`
- `/app/components/LanguageSwitcher.tsx`
- `/app/components/RulesReference.tsx`
- `/app/components/ScoreTable.tsx`
- `/app/components/ScoreCell.tsx`
- `/app/i18n.ts` (translations for Ukrainian and English)
- `/app/globals.css` (minimal styling)
- `package.json` (Next.js defaults)
- `next.config.ts` (Next.js defaults)
- `tsconfig.json` (TypeScript config)

## Verification
1. Run `npm run dev` and verify app loads at localhost:3000 with Ukrainian UI (default)
2. Click language switcher button and verify UI changes to English
3. Click language switcher again and verify UI returns to Ukrainian
4. Check rules table toggle (hide/show) in both languages
5. Click cells and enter scores
6. Verify upper section bonus calculates when total ≥ 63
7. Verify Yahtzee bonus adds 100 points for each score after first
8. Verify grand total updates correctly
9. Verify language preference persists when switching between sections
