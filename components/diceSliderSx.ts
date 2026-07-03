import { alpha, SxProps, Theme } from '@mui/material/styles';

const MARK_SIZE = 6;
const THUMB_SIZE = 22;
const THUMB_GLOW_SPREAD = 10;
const THUMB_ACTIVE_GLOW_SPREAD = 14;
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
    '&:hover, &.Mui-focusVisible': {
      boxShadow: (theme) =>
        `0 0 0 ${THUMB_GLOW_SPREAD}px ${alpha(theme.palette.secondary.main, THUMB_GLOW_OPACITY)}`,
    },
    '&.Mui-active': {
      boxShadow: (theme) =>
        `0 0 0 ${THUMB_ACTIVE_GLOW_SPREAD}px ${alpha(theme.palette.secondary.main, THUMB_GLOW_OPACITY)}`,
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: 'grey.700',
    borderRadius: 1,
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

/* Під час реалізації зіткнулася з математичною невідповідністю в макеті: вказано 7 точок на шкалі від 0 до 100 з рівними проміжками між ними, при цьому перша точка повинна починатися зі значення більше 20.

Розрахунки показують, що це неможливо поєднати. Якщо рівномірно розподілити точоки у діапазоні 0–100, перша точка опиниться на значенні ≈17 — нижче вимоги в 20.

Варіанти рішення:

1. Зробити рівно 7 точок з однаковими проміжками — у цьому випадку перша точка буде приблизно на значенні 16–17, і вигляд не буде як у макетi .

2. Або реалізувати варіант ідентично макету: відрізок від 0 до першої точки буде більшим за 20, а всі наступні інтервали будуть підлаштовуватися відносно цього стартового зміщення. Тобто візуально точки виглядають рівномірно розподіленими (як у макеті), але фактичні gap між ними буде різним. 

Я обрала 1

*/

