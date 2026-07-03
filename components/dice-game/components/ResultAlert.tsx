'use client';

import { Alert, AlertTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
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
      variant="filled"
      severity={result.isWin ? 'success' : 'error'}
      icon={result.isWin ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}
      sx={{ mb: 2 }}
    >
      <AlertTitle>{result.isWin ? 'You won' : 'You lost'}</AlertTitle>
      {`Number was ${result.result} — expected ${comparison} ${threshold}`}
    </Alert>
  );
}
