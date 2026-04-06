# Yahtzee Scorer

A modern, responsive Yahtzee scoring table generator built with Next.js, TypeScript, and React. Supports both Ukrainian and English languages with mobile-optimized interface.

## Features

- **Bilingual Support**: Ukrainian and English language options
- **Mobile Responsive**: Optimized for mobile devices with horizontal scrolling tables
- **Fixed-Point Categories**: Dropdown selections for Full House (25), Small Straight (30), Large Straight (40), and Yahtzee (50)
- **Player Management**: Save and edit player names
- **Rules Reference**: Built-in Yahtzee rules and scoring guide
- **Automatic Calculations**: Real-time score calculations with bonuses
- **TypeScript**: Fully typed for better development experience

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **React 18** - UI library
- **CSS Grid** - Responsive layouts
- **Mobile-first design** - Responsive breakpoints

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yahtzee
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build       # Creates an optimized production build
pnpm start       # Starts the production server locally
```

**When to use:**
- `pnpm run dev` - During development with hot reload and faster feedback
- `pnpm build && pnpm start` - To test the production build locally before deploying
- `pnpm build` alone - When deploying to a hosting service (Vercel, etc.) that runs `pnpm start` automatically

## Usage

1. **Language Selection**: Choose between Ukrainian (Укр) or English (Eng) using the language switcher
2. **Player Name**: Enter and save your player name
3. **Scoring**: Click on score cells to enter points for each round and category
4. **Fixed Categories**: For Full House, Small Straight, Large Straight, and Yahtzee, select from dropdown options
5. **Rules**: Use the Rules Reference section to check scoring combinations

## Yahtzee Rules

### Upper Section (Sum of dice values)
- Ones, Twos, Threes, Fours, Fives, Sixes
- Bonus: 35 points if upper section total ≥ 63

### Lower Section (Fixed point values)
- Three of a Kind: Sum of all dice
- Four of a Kind: Sum of all dice
- Full House: 25 points
- Small Straight: 30 points
- Large Straight: 40 points
- Yahtzee: 50 points
- Chance: Sum of all dice
- Yahtzee Bonus: 100 points for each additional Yahtzee

## Mobile Features

- Horizontal scrolling tables for full score visibility
- Touch-friendly interface
- Optimized layouts for portrait and landscape orientations
- Fixed language switcher positioning
