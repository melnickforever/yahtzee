# Yahtzee Score Table Generator

A board-game-styled Yahtzee scoring table built with Next.js, TypeScript, and React. Supports Ukrainian and English with a warm, classic design.

**Live Demo**: [yahtzee-red.vercel.app](https://yahtzee-red.vercel.app/)

## Features

- **Bilingual Support**: Ukrainian (default) and English
- **Board Game Design**: Warm parchment, wood, and felt-green color palette
- **Single Scorecard**: One score per category — fill each category once per game
- **Fixed-Point Dropdowns**: Inline listbox for Full House (25), Small Straight (30), Large Straight (40), and Yahtzee (50) with a 0 option
- **Yahtzee Bonus**: Editable dropdown (0–1000 in steps of 100)
- **Automatic Calculations**: Upper section bonus (+35 if total ≥ 63) and grand total
- **Clear Score**: Broom button in the score table header resets all scores and bonuses; requires confirmation before clearing
- **Auto-Save**: Game state (scores, bonuses, player name, language) is automatically saved to browser localStorage on every change with a 1-day sliding expiry. Data persists across page reloads.
- **Save Game**: Download the current scorecard as a JSON file (`yahtzee-YYYY-MM-DD_HH-MM-SS.json`). Uses native "Save As" dialog (Chrome/Edge) or automatic download (Firefox/Safari).
- **Open Game**: Load a previously saved JSON game file. Validates file structure and shows an error message for invalid files.
- **Player Name**: Save and edit player name
- **Rules Reference**: Collapsible section with full gameplay summary, scoring table, Joker Rule, and special rules
- **Dice Game Mode**: Built-in dice roller — tap the logo to enter game mode, roll up to 3 times per turn, keep/release dice between rolls
- **Mobile Responsive**: Optimized for phones in portrait and landscape

## Yahtzee Rules

### Gameplay
- Each player rolls five dice, up to three times per turn
- Set aside dice to keep and re-roll the others
- Fill one scorecard category per turn — once filled, it cannot be reused

### Upper Section
| Category | Points |
|----------|--------|
| Ones through Sixes | Sum of matching dice |
| **Bonus** | +35 if upper total ≥ 63 |

### Lower Section
| Category | Points |
|----------|--------|
| Three of a Kind | Sum of all dice |
| Four of a Kind | Sum of all dice |
| Full House | 25 |
| Small Straight | 30 |
| Large Straight | 40 |
| Yahtzee | 50 |
| Chance | Sum of all dice |
| **Yahtzee Bonus** | +100 per additional Yahtzee |

### Rules
- **Objective**: Score the most points by rolling five dice to create specific combinations across 13 categories.
- **Turn structure**: Roll up to three times per turn. Set aside dice to keep between rolls. After the third roll (or earlier), record a score in exactly one category.
- **One category per turn**: Only one category may be filled per turn. A filled category cannot be reused for the rest of the game.
- **Yahtzee Bonus**: If an additional Yahtzee is rolled after the first, score +100 per extra Yahtzee. The bonus only applies if the Yahtzee category was scored 50 (not 0); if you scored 0 there, no bonus is awarded but the roll must still be placed according to the Joker Rule.
- **Joker Rule**: Triggered when Yahtzee is already filled. First try to score in the matching upper category. If that is also filled, you may use the roll as a joker in any free lower section category at full value (Full House = 25, Small Straight = 30, Large Straight = 40, or sum of all dice for others).
- **Zero Rule**: If no free category matches your roll, you must choose one and record 0. Deciding which category to sacrifice is part of the strategy.
- **Game end**: The game ends when all 13 categories are filled. The player with the highest grand total wins.

## Dice Game Mode

Tap the dice logo at the top of the page to enter game mode. A dice roller panel appears between the Rules and Score Table sections.

1. **Initial roll** — all 5 dice roll automatically on entry
2. **Keep dice** — tap a die in the roll area to move it to the "Kept" area
3. **Return dice** — tap a kept die to move it back to the roll area
4. **Re-roll** — press the Roll button to re-roll only the free (un-kept) dice
5. **3 rolls per turn** — the roll counter tracks usage (Roll 1/3, 2/3, 3/3)
6. **New Turn** — resets all dice and the roll counter
7. **Exit** — closes game mode and returns to the logo view

## Tech Stack

- **Next.js** — App Router, single-page client app
- **React** — UI with `useState` hooks only; no external state libraries
- **TypeScript** — Strict mode (`noUnusedLocals`, `noUnusedParameters`)
- **CSS** — Single global stylesheet (`app/globals.css`), CSS Grid layout; no Tailwind, no CSS modules
- **Zero runtime dependencies** — no libraries beyond next / react / react-dom
- **pnpm** — Package manager
- **Vercel** — Deployment via GitHub Actions on push to `main`

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
git clone <repository-url>
cd yahtzee
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
pnpm build
pnpm start
```

## License

GPL v3
