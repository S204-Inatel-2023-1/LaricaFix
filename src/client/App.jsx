import { LightTheme, DarkTheme } from './themes'
import { ThemeProvider } from "@mui/material"
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QuotaProvider, UserProvider } from './contexts'

function App() {
  const theme = LightTheme
  return (
    <ThemeProvider theme={theme}>
      <QuotaProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </QuotaProvider>
    </ThemeProvider>
  )
}

export default App
