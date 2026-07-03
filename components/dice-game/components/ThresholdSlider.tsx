'use client';

import { Box, Slider, Typography } from '@mui/material';
import { diceSliderMarks, diceSliderSx, MARK_SIZE } from '@/lib/diceSliderSx';

const CONTENT_WIDTH = 320;
const SLIDER_TOP_SPACING = 37;
const SLIDER_BLOCK_HEIGHT = 42;

interface Props {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export default function ThresholdSlider({ value, onChange, min, max }: Props) {
  return (
    <Box sx={{ width: CONTENT_WIDTH, mx: 'auto', mb: 3 }}>
      <Box
        sx={{
          height: SLIDER_BLOCK_HEIGHT,
          mt: `${SLIDER_TOP_SPACING}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Slider
          value={value}
          onChange={(_, newValue) => {
            if (typeof newValue === 'number') onChange(newValue);
          }}
          min={min}
          max={max}
          step={1}
          marks={diceSliderMarks}
          valueLabelDisplay="on"
          color="secondary"
          sx={{
            ...diceSliderSx,
            width: `calc(100% - ${MARK_SIZE}px)`,
            mx: `${MARK_SIZE / 2}px`,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="caption" color="text.secondary">{min}</Typography>
          <Typography variant="caption" color="text.secondary">{max}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
