# Text-driven World Simulator

This project is a complete, deterministic world simulator with 7 continent AIs. The simulation core is authoritative; agents only emit JSON actions that are validated against a strict schema. If AI output is invalid, the system falls back to heuristic behavior.

## Quick download

Use **one** of these:

**Option A: Download ZIP**
1. Click the green **Code** button on GitHub.
2. Choose **Download ZIP**.
3. Extract it on your PC.

**Option B: Git clone**
```bash
git clone <repo-url>
cd NotZADX.github.io
```

## Requirements
- Node.js 20+

## Install
```bash
npm install
```

## Run the CLI
```bash
npm start
```

## OpenRouter setup (optional)
Set environment variables to enable agent decisions and narration:
```bash
export OPENROUTER_API_KEY="your-key"
export OPENROUTER_MODEL="openai/gpt-4o-mini"
```
If `OPENROUTER_API_KEY` is not set, the simulation uses the heuristic AI.

## Gameplay
- Turn = 1 month.
- Commands examples:
  - `set tax vat 12`
  - `increase education 5`
  - `build port`
  - `propose trade with europe`
  - `next`

## Project layout
```
src/
  simcore/
    models/
    actions/
    systems/
    events/
    ai/
    persistence/
  agents/
  client-cli/
```

## Tests
```bash
npm test
```

## Determinism
- Seeded RNG.
- Fixed monthly ticks.
- Save/load preserves state for identical outcomes.
