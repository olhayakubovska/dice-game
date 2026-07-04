'use client';

import { forwardRef } from 'react';
import { CircularProgress, Grow, Paper, Typography } from '@mui/material';

const RESULT_DISPLAY_WIDTH = 320;
const RESULT_DISPLAY_HEIGHT = 200;
const RESULT_FONT_SIZE = 96;
const RESULT_FONT_WEIGHT = 300;
const RESULT_FONT_LINE_HEIGHT = '117%';
const RESULT_FONT_LETTER_SPACING = '-1.5px';
const START_HINT_FONT_SIZE = 24;

interface Props {
  value: number | null;
  loading: boolean;
}

const ResultContent = forwardRef<HTMLSpanElement, { value: number | null }>(
  function ResultContent({ value }, ref) {
    if (value === null) {
      return (
        <Typography
          ref={ref}
          variant="h6"
          sx={{ fontSize: START_HINT_FONT_SIZE, color: 'text.secondary' }}
        >
          Start playing
        </Typography>
      );
    }

    return (
      <Typography
        ref={ref}
        variant="h1"
        sx={{
          fontSize: RESULT_FONT_SIZE,
          fontWeight: RESULT_FONT_WEIGHT,
          lineHeight: RESULT_FONT_LINE_HEIGHT,
          letterSpacing: RESULT_FONT_LETTER_SPACING,
          color: 'text.primary',
        }}
      >
        {value}
      </Typography>
    );
  },
);

export default function ResultDisplay({ value, loading }: Props) {
  return (
    <Paper
      elevation={0}
      aria-live="polite"
      sx={{
        width: RESULT_DISPLAY_WIDTH,
        height: RESULT_DISPLAY_HEIGHT,
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
          <ResultContent value={value} />
        </Grow>
      )}
    </Paper>
  );
}
