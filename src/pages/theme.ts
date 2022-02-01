import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#222222',
      main: '#000000',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#dddddd',
      contrastText: '#000',
    },
  },
})

export default theme
