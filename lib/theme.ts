'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#9C27B0',
      light: '#e1bee7',
    },
    success: {
      main: '#2E7D32',
    },
    error: {
      main: '#D32F2C',
    },
  },
});

export default theme;
