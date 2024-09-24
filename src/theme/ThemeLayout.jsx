import { createTheme } from "@mui/material"
import { AuthProvider } from "../context/AuthContext"
import { Outlet } from "react-router"

const ThemeLayout = () => {
  const theme = createTheme({
    
  })

  return (
    <>
      <AuthProvider>
        <Outlet/>
      </AuthProvider>
    </>
  )
}

export default ThemeLayout