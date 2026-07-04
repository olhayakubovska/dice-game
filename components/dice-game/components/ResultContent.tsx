'use client';

import { forwardRef } from 'react';
import { Typography } from '@mui/material';

const RESULT_FONT_SIZE = 96;
const RESULT_FONT_WEIGHT = 300;
const RESULT_FONT_LINE_HEIGHT = '117%';
const RESULT_FONT_LETTER_SPACING = '-1.5px';
const START_HINT_FONT_SIZE = 24;

interface Props {
  value: number | null;
}

const ResultContent = forwardRef<HTMLSpanElement, Props>(
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

export default ResultContent;
