import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { AuthProvider } from "../context/AuthContext"
import { Outlet } from "react-router"

const ThemeLayout = () => {
  const theme = createTheme({
    
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
  })

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>

          <Outlet/>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default ThemeLayout