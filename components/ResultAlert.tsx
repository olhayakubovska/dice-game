'use client';

import { Alert, AlertTitle } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { PlayResponse, GuessType } from '@/types/game';

interface Props {
  result: PlayResponse;
  threshold: number;
  guess: GuessType;
}

export default function ResultAlert({ result, threshold, guess }: Props) {
  const comparison = guess === 'under' ? 'less than' : 'greater than';

  return (
    <Alert
      severity={result.isWin ? 'success' : 'error'}
      icon={result.isWin ? <CheckCircleIcon /> : <ErrorIcon />}
      sx={{ mb: 2 }}
    >
      <AlertTitle>{result.isWin ? 'You won' : 'You lost'}</AlertTitle>
      {`Number was ${result.result} — expected ${comparison} ${threshold}`}
    </Alert>
  );
}
