import { ThemeProvider } from "./context/ThemeContext.js"
import { LanguageProvider } from "./context/LanguageProvider.jsx"
import Navbar from "./layout/Navbar.jsx"
import AppRoutes from "./routes/AppRoutes.jsx"

function App() {

  return(
    <>
    <ThemeProvider>
       <LanguageProvider>
  <Navbar/>
  <AppRoutes/>
  </LanguageProvider>
    </ThemeProvider>
  </>
  )
}

export default App
