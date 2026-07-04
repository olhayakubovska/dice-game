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
  let content = <StartHint />;
  if (value !== null) content = <ResultNumber value={value} />;
  if (loading) content = <CircularProgress color="secondary" />;

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
      {loading ? content : <Grow key={value ?? 'start'} in timeout={300}>{content}</Grow>}
    </Paper>
  );
}
