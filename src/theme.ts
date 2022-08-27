import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const makeTheme = (mode: 'light' | 'dark') => {
  let theme = responsiveFontSizes(
    createTheme({
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

      palette:
        mode === 'light'
          ? {
              mode: 'light',
              primary: {
                main: '#ffffff',
              },
              secondary: {
                main: '#000000',
              },
              background: {
                default: '#fafafa',
                paper: '#ffffff',
              },
            }
          : {
              mode: 'dark',
              primary: {
                main: '#000000',
              },
              secondary: {
                main: '#ffffff',
              },
              background: {
                default: '#1a1a1a',
                paper: '#000000',
              },
            },
    }),
  )

  theme = createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          em: {
            color: theme.palette.secondary.dark,
            fontWeight: 'bold',
            fontStyle: 'normal',
          },
          h2: {
            '&::first-letter': {
              textTransform: 'capitalize',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h2: {
            marginBottom: theme.spacing(5),
          },
        },
      },
    },
  })
  return theme
}

export default makeTheme
