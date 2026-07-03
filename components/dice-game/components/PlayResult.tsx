'use client';

import { Alert, Box } from '@mui/material';
import { GuessType, PlayResponse } from '@/types/game';
import ResultAlert from './ResultAlert';
import ResultDisplay from './ResultDisplay';

interface Props {
  threshold: number;
  guess: GuessType;
  lastResult: PlayResponse | null;
  error: string | null;
}

export default function PlayResult({ threshold, guess, lastResult, error }: Props) {
  return (
    <>
      <Box sx={{ display: 'grid', pb: 1 }}>
        <Box sx={{ gridArea: '1 / 1', visibility: 'hidden' }} aria-hidden>
          <ResultAlert result={{ result: 0, isWin: true }} threshold={threshold} guess={guess} />
        </Box>

        <Box sx={{ gridArea: '1 / 1' }}>
          {error && <Alert severity="error">{error}</Alert>}
          {lastResult && (
            <ResultAlert result={lastResult} threshold={threshold} guess={guess} />
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ResultDisplay value={lastResult ? lastResult.result : threshold} />
      </Box>
    </>
  );
}
