import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff8a80',
    },
    secondary: {
      main: '#d8ad52',
    },
    background: {
      default: '#d9d9d9',
      paper: '#f0f0f0',
    },
  },
});