import React, { PropsWithChildren } from 'react'
import makeTheme from 'theme'
import { ThemeProvider } from '@mui/material/styles'

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

export const useColorMode = () => React.useContext(ColorModeContext)

export default function ToggleColorMode(props: PropsWithChildren<unknown>) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(() => makeTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
