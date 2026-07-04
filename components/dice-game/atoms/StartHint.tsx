'use client';

import { forwardRef } from 'react';
import { Typography } from '@mui/material';

const START_HINT_FONT_SIZE = 24;

const StartHint = forwardRef<HTMLSpanElement>(function StartHint(_props, ref) {
  return (
    <Typography ref={ref} variant="h6" sx={{ fontSize: START_HINT_FONT_SIZE, color: 'text.secondary' }}>
      Start playing
    </Typography>
  );
});

export default StartHint;
