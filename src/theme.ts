import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    link: Palette['primary']
  }
  interface PaletteOptions {
    link: PaletteOptions['primary']
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    link: true
  }
}

const makeTheme = (mode: 'light' | 'dark') => {
  let theme = responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: ['"Manrope"', '"Segoe UI"', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
        h1: {
          fontFamily: ['"Space Grotesk"', '"Manrope"', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
          fontWeight: 600,
          letterSpacing: '-0.02em',
        },
        h2: {
          fontFamily: ['"Space Grotesk"', '"Manrope"', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
          fontWeight: 600,
          letterSpacing: '-0.015em',
        },
        h3: {
          fontFamily: ['"Space Grotesk"', '"Manrope"', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
          fontWeight: 600,
        },
        h4: {
          fontFamily: ['"Space Grotesk"', '"Manrope"', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
          fontWeight: 600,
        },
        button: {
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: '0.01em',
        },
      },
      shape: {
        borderRadius: 18,
      },

      palette:
        mode === 'light'
          ? {
              mode: 'light',
              primary: {
                main: '#2f49d1',
              },
              secondary: {
                main: '#0f172a',
                dark: '#1e293b',
              },
              background: {
                default: '#f5f7fb',
                paper: 'rgba(255, 255, 255, 0.5)',
              },
              text: {
                primary: '#0f172a',
                secondary: '#475569',
              },
              divider: 'rgba(15, 23, 42, 0.12)',
              link: {
                main: '#2f49d1',
                dark: '#1f35a0',
                light: '#4c63df',
                contrastText: '#ffffff',
              },
            }
          : {
              mode: 'dark',
              primary: {
                main: '#5b7cff',
              },
              secondary: {
                main: '#e2e8f5',
                dark: '#a6b1c8',
              },
              background: {
                default: '#0b0f1a',
                paper: 'rgba(25, 29, 41, 0.5)',
              },
              text: {
                primary: '#e7ecf8',
                secondary: '#a6b1c8',
              },
              divider: 'rgba(226, 232, 245, 0.12)',
              link: {
                main: '#5b7cff',
                dark: '#3f58c8',
                light: '#7a95ff',
                contrastText: '#0b0f1a',
              },
            },
    }),
  )

  const isDark = theme.palette.mode === 'dark'
  const containedGradient = isDark
    ? 'linear-gradient(180deg, #465670 0%, #344158 100%)'
    : 'linear-gradient(180deg, #edf1f9 0%, #d5dceb 100%)'
  const containedHoverGradient = isDark
    ? 'linear-gradient(180deg, #4f617e 0%, #3a4864 100%)'
    : 'linear-gradient(180deg, #f2f5fb 0%, #c6d0e5 100%)'
  const containedBorderColor = isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.14)'
  const containedTextColor = isDark ? '#f8fafc' : '#1f2a44'
  const outlinedBackground = isDark ? '#5c606a' : '#e2e7f2'
  const outlinedHoverBackground = isDark ? '#676c77' : '#d6dde9'
  const outlinedBorderColor = isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(15, 23, 42, 0.2)'
  const outlinedTextColor = isDark ? '#f1f5f9' : '#2a364b'

  theme = createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
          *::selection { background: ${theme.palette.link.main}; }
          html {
            scroll-behavior: smooth;
          }
          body {
            background: ${theme.palette.background.default};
            color: ${theme.palette.text.primary};
            letter-spacing: -0.01em;
          }
          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }
          }
          em {
            color: ${theme.palette.secondary.dark};
            font-weight: 600;
            font-style: normal;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        `,
      },
      MuiTypography: {
        styleOverrides: {
          h2: {
            marginBottom: theme.spacing(5),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: Number(theme.shape.borderRadius) * 1.2,
          },
          outlined: {
            borderColor: alpha(theme.palette.text.primary, 0.12),
            backdropFilter: 'blur(16px)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            borderColor: alpha(theme.palette.text.primary, 0.12),
            backdropFilter: 'blur(16px)',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: theme.spacing(2.5),
            paddingBlock: theme.spacing(1),
          },
          contained: {
            background: containedGradient,
            border: `1px solid ${containedBorderColor}`,
            color: containedTextColor,
            '&:hover': {
              background: containedHoverGradient,
            },
          },
          outlined: {
            backgroundColor: outlinedBackground,
            borderColor: outlinedBorderColor,
            color: outlinedTextColor,
            '&:hover': {
              borderColor: outlinedBorderColor,
              backgroundColor: outlinedHoverBackground,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            border: `1px solid ${alpha(theme.palette.text.primary, 0.16)}`,
            backgroundColor: alpha(theme.palette.text.primary, 0.08),
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.primary, 0.15),
            },
          },
        },
      },
    },
  })
  return theme
}

export default makeTheme
