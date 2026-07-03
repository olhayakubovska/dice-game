import { alpha, SxProps, Theme } from '@mui/material/styles';

export const MARK_SIZE = 6;
const THUMB_SIZE = 12;
const THUMB_GLOW_SPREAD = 10;
const THUMB_GLOW_OPACITY = 0.16;

export const diceSliderSx: SxProps<Theme> = {
  height: 4,
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: 'secondary.light',
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-mark': {
    width: MARK_SIZE,
    height: MARK_SIZE,
    borderRadius: '50%',
    backgroundColor: 'secondary.main',
    opacity: 0.6,
  },
  '& .MuiSlider-markActive': {
    opacity: 1,
    backgroundColor: 'common.white',
  },
  '& .MuiSlider-thumb': {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: 'secondary.main',
    boxShadow: (theme) =>
      `0 0 0 ${THUMB_GLOW_SPREAD}px ${alpha(theme.palette.secondary.main, THUMB_GLOW_OPACITY)}`,
  },
  '& .MuiSlider-valueLabel': {
    width: 41,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey.600',
    borderRadius: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '157%',
    letterSpacing: '0.1px',
    verticalAlign: 'middle',
  },
};

export const diceSliderMarks = [
  { value: 0 },
  { value: 16.67 },
  { value: 33.33 },
  { value: 50 },
  { value: 66.67 },
  { value: 83.33 },
  { value: 100 },
];
