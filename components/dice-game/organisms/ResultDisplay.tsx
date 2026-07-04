'use client';

import { CircularProgress, Grow, Paper } from '@mui/material';
import ResultNumber from '../atoms/ResultNumber';
import StartHint from '../atoms/StartHint';

const RESULT_DISPLAY_WIDTH = 320;
const RESULT_DISPLAY_HEIGHT = 200;

interface Props {
  value: number | null;
  loading: boolean;
}

export default function ResultDisplay({ value, loading }: Props) {
  return (
    <Paper
      elevation={0}
      aria-live="polite"
      sx={{
        width: RESULT_DISPLAY_WIDTH,
        height: RESULT_DISPLAY_HEIGHT,
        mx: 'auto',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        borderRadius: 2,
      }}
    >
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Grow key={value ?? 'start'} in timeout={300}>
          {value !== null ? <ResultNumber value={value} /> : <StartHint />}
        </Grow>
      )}
    </Paper>
  );
}
