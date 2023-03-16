import { ThemeProvider, useTheme } from 'styled-components'
import { LightTheme, DarkTheme } from './themes'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

function App() {
  const theme = LightTheme
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
