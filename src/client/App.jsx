import { ThemeProvider } from 'styled-components'
import { LightTheme, DarkTheme } from './themes'
function App() {
  const [theme, setTheme] = useState(LightTheme)

  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

export default App
