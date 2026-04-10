---
description: "Generate a git commit message from staged changes following the project commit format"
agent: "ask"
tools: [get_changed_files]
---

Generate a concise git commit message for the staged changes.

## Format

```
type: Subject
```

- **type** — one of: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`
- **subject** — short imperative sentence, **starts with a capital letter**, no period, max 72 chars

## Type guide

| Type | Use for |
|------|---------|
| `feat` | New user-visible feature or behaviour |
| `fix` | Bug fix |
| `docs` | README, comments, copilot instructions only |
| `style` | CSS / formatting changes with no logic change |
| `refactor` | Code restructure with no behaviour change |
| `chore` | Build, config, deps, tooling |

## Rules

- One line only — no body, no footer
- Do NOT include a scope in parentheses
- Subject **must start with a capital letter** (e.g. `docs: Add rules section`)
- Describe *what* changed, not *how*
- If multiple types apply, pick the most significant one

## Output

Reply with **only** the commit message — no explanation, no quotes, no markdown.

## Context

Use `#get_changed_files` to inspect the staged diff before writing the message.