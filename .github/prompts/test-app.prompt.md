---
description: "Run full browser test suite for Yahtzee app using Playwright MCP"
agent: "ask"
---

# Yahtzee App — Full Browser Test Suite

Run all test cases below against `http://localhost:3000` using Playwright MCP tools.
Report each test as PASS or FAIL with details. Stop and report immediately on any failure.

## Prerequisites

- Dev server must be running (`npm run dev`)
- Navigate to `http://localhost:3000` before starting
- Check console for errors after each major test group

---

## Test 1: Console Errors

- Load the page and check browser console for errors
- Only `favicon.ico 404` is acceptable — any other error is a FAIL

## Test 2: Language Switcher

- Default language should be Ukrainian (Укр)
- Switch to English — verify:
  - Page title remains "Yahtzee"
  - Score table title changes to "Score Table"
  - Upper section header changes to "Upper Section"
- Switch back to Ukrainian — verify all text reverts

## Test 3: Player Name

- Save button should be **disabled** when name input is empty
- Type a name (e.g. "Test Player") — save button should become **enabled**
- Click save — input should be replaced with a display showing the name
- An edit button should appear to re-edit the name

## Test 4: Rules Panel

- Click "Show/Показати" — rules panel should expand
- Verify all 5 section headings exist:
  1. Objective / Мета гри
  2. Gameplay / Хід гри
  3. Special Rules / Особливі правила
  4. Key Point / Ключовий момент
  5. End of Game / Кінець гри
- Verify rules table has **15 rows** (13 categories + 2 bonuses)
- Click "Hide/Приховати" — rules panel should collapse

## Test 5: Score Table — Upper Section

- Click a score cell (e.g. Ones) — a text **input** should appear
- Type a number and press Enter — value should be saved and displayed
- Fill all 6 upper cells with values totaling **≥ 63**
- Verify:
  - Upper subtotal computes correctly (sum of all 6)
  - Upper bonus shows **35** (triggered at ≥ 63)
- Change a value to make total **< 63** — bonus should revert to **0**

## Test 6: Score Table — Lower Section (Fixed Value Categories)

- Click Full House cell — a **select dropdown** should appear with options: —, 0, 25
- Click Small Straight — options: —, 0, 30
- Click Large Straight — options: —, 0, 40
- Click Yahtzee — options: —, 0, 50
- For non-fixed categories (3-of-a-Kind, 4-of-a-Kind, Chance) — text **input** should appear
- Verify lower subtotal computes correctly

## Test 7: Yahtzee Bonus Lock

- Set Yahtzee score to **0**:
  - Yahtzee Bonus cell should show **0**
  - Yahtzee Bonus cell should have class `score-cell-locked`
  - Clicking Yahtzee Bonus should **not** open a dropdown
- Change Yahtzee to **50**:
  - Yahtzee Bonus cell should become clickable again (no `score-cell-locked` class)
  - Clicking it should open a select with options 0, 100, 200, ... 1000
- Change Yahtzee back to **—** (null):
  - Yahtzee Bonus should remain accessible (not locked)

## Test 8: Grand Total

- Fill several cells across upper and lower sections
- Verify grand total = upper total + lower total + upper bonus + yahtzee bonus

## Test 9: Clear Scores (Broom Sweep)

- Click the broom icon (🧹) near "Score Table" heading
- Confirm bar should **fade in** with label + Yes/No buttons
- Verify Yes and No buttons have **identical dimensions** (width and height)
- Click **No**:
  - Confirm bar should fade out
  - All scores should be **preserved** (unchanged)
- Click broom again, then click **Yes**:
  - All 13 score cells should reset to **—**
  - Yahtzee Bonus should reset to **0**
  - Grand total should be **0**
  - Confirm bar should fade out

## Test 10: Dice Game — Basic Flow

- Click the dice logo to start the game
- Verify initial state:
  - Roll counter shows "Roll 1 of 3" / "Кидок 1 з 3"
  - 5 dice visible in free area
  - Kept area shows empty message
- Click a die — it should move to the kept area
- Click "Roll/Кинути" — roll counter increments, kept dice preserved, free dice re-rolled
- After 3rd roll — Roll button should be **disabled** with text "No rolls left" / "Кидків більше немає"

## Test 11: Dice Game — Keep/Unkeep

- Keep a die (click in free area) — moves to kept area
- Unkeep a die (click in kept area) — moves back to free area
- After all rolls used, keeping/unkeeping should still work (no errors)

## Test 12: Dice Game — All Dice Kept

- Keep all 5 dice (click one at a time, always clicking the first free die)
- Verify:
  - Free area shows **"All dice kept"** / **"Всі кістки відкладено"** (NOT "No rolls left")
  - Roll button shows **"All dice kept"** / **"Всі кістки відкладено"** and is disabled
  - Roll counter still shows the current roll number (not max)

## Test 13: Dice Game — New Turn

- Click "New Turn" / "Новий хід"
- Verify:
  - Roll counter resets to "Roll 1 of 3"
  - Kept area is empty
  - 5 new dice appear in free area

## Test 14: Dice Game — Exit

- Click "Exit" / "Вихід"
- Game panel should disappear
- Dice logo should reappear in its original position

## Test 15: Dice Game — Language Switch Mid-Game

- Start the dice game
- Switch language (UK → EN or EN → UK)
- Verify all game UI text updates to the new language without breaking state

## Test 16: Save Game

- Click "Save Game" / "Зберегти гру"
- A file download should trigger
- Filename format: `yahtzee-YYYY-MM-DD_HH-MM-SS.html`

## Test 17: Mobile Responsiveness (390×844)

- Resize viewport to 390×844
- Verify:
  - No horizontal overflow on any section
  - Score table fits within viewport width
  - Yes/No confirm buttons are **equal size**
  - Dice game controls fit in one row without wrapping issues
  - All buttons remain tappable (adequate touch target size)

---

## Output Format

After running all tests, produce a summary table:

```
| # | Test | Status | Notes |
|---|------|--------|-------|
| 1 | Console Errors | PASS/FAIL | ... |
| 2 | Language Switcher | PASS/FAIL | ... |
...
```

If any test FAILs, describe the failure in detail including:
- What was expected vs what happened
- Console errors if any
- Screenshot if relevant
