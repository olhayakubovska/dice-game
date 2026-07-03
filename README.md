# Dice Game

A casino-style dice game built with Next.js, TypeScript, and Material UI.

## How it works

- Pick a threshold (1–99) and choose whether the roll should land **Under** or **Over** it.
- Click **Play** to roll — the result (1–100) is generated server-side via `crypto.createHash('sha256')` on a random server seed, so it can't be manipulated from the browser.
- A result equal to the threshold satisfies neither condition and counts as a loss.
- The last 10 rolls are kept in a history list.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/api/play/route.ts` — server-side roll endpoint
- `hooks/useDiceGame.ts` — game state and API calls
- `components/` — `DiceGame`, `ResultAlert`, `HistoryTable`
- `lib/constants.ts` — shared threshold/history bounds
- `types/game.ts` — request/response types
