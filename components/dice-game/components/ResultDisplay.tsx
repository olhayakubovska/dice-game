'use client';

import { Grow, Paper, Typography } from '@mui/material';

const RESULT_DISPLAY_WIDTH = 320;
const RESULT_DISPLAY_HEIGHT = 200;
const RESULT_FONT_SIZE = 96;
const RESULT_FONT_WEIGHT = 300;
const RESULT_FONT_LINE_HEIGHT = '117%';
const RESULT_FONT_LETTER_SPACING = '-1.5px';

interface Props {
  value: number;
}

export default function ResultDisplay({ value }: Props) {
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
      <Grow key={value} in timeout={300}>
        <Typography
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
      </Grow>
    </Paper>
  );
}
