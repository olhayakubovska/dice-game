import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { GuessType, PlayResponse } from '@/types/game';
import { DICE_ROLL_MAX, DICE_ROLL_MIN, THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';

function isValidGuess(guess: unknown): guess is GuessType {
  return guess === 'under' || guess === 'over';
}

function isValidThreshold(threshold: unknown): threshold is number {
  return (
    typeof threshold === 'number' &&
    Number.isFinite(threshold) &&
    threshold >= THRESHOLD_MIN &&
    threshold <= THRESHOLD_MAX
  );
}

function rollDice(): number {
  return crypto.randomInt(DICE_ROLL_MIN, DICE_ROLL_MAX + 1);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { threshold, guess } = body as { threshold: unknown; guess: unknown };

    if (!isValidGuess(guess)) {
      return NextResponse.json({ error: 'Guess must be "under" or "over"' }, { status: 400 });
    }

    if (!isValidThreshold(threshold)) {
      return NextResponse.json(
        { error: `Threshold must be a number between ${THRESHOLD_MIN} and ${THRESHOLD_MAX}` },
        { status: 400 },
      );
    }

    const result = rollDice();
    const isWin = guess === 'under' ? result < threshold : result > threshold;

    console.info(`[dice] result=${result} threshold=${threshold} guess=${guess} isWin=${isWin}`);

    const response: PlayResponse = { result, isWin };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
