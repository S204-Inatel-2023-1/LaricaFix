import { LightTheme, DarkTheme } from './themes'
import { ThemeProvider } from "@mui/material"
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QuotaProvider } from './contexts'

function App() {
  const theme = LightTheme
  return (
    <ThemeProvider theme={theme}>
      <QuotaProvider>
          <RouterProvider router={router} />
      </QuotaProvider>
    </ThemeProvider>
  )
}

export default App
