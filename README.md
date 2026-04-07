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
- **Rules Reference**: Collapsible section with full gameplay summary, scoring table, Joker Rule, and special rules
- **Player Name**: Save and edit player name
- **Save Game**: Download the current scorecard as a self-contained HTML file (with all styles inlined) — works offline
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

### Special Rules
- **Joker Rule**: If Yahtzee is already filled and the matching upper category is also filled, the roll can be used as a joker in any lower section category.

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

- **Next.js 14** — App Router, single-page client app
- **React 18** — UI with `useState` hooks only
- **TypeScript 5** — Strict mode
- **CSS Grid** — Global stylesheet, no external CSS libraries
- **pnpm** — Package manager
- **Vercel** — Deployment via GitHub Actions

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
