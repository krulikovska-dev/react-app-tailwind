import { ThemeProvider } from "./context/ThemeContext.js"
import Navbar from "./layout/Navbar.jsx"
import AppRoutes from "./routes/AppRoutes.jsx"

function App() {

  return(
    <>
    <ThemeProvider>
  <Navbar/>
  <AppRoutes/>
    </ThemeProvider>
  </>
  )
}

export default App
