import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { AuthProvider } from "../context/AuthContext"
import { Outlet } from "react-router"
import { useState } from "react"
import { ThemeContext } from "@emotion/react"

const ThemeLayout = () => {
  const [mode, setMode] = useState('light')

  const theme = createTheme({
    palette : {
      mode,
      ...(mode === "light"
        ? {
            card: '#FFFFFF',
            border: '#A4A4A6',
            primary: {
              main: "#16CB49",
              light: "#74E092",
              dark: "#007120",
            },
            link: {
              main: '#1B1B1B'
            },
            background: {
              default: "#F1F1F1",
              secondary: '#EBEBEB',
              paper: "#FFFFFF",
            },
            text: {
              primary: "rgb(0, 0, 0)",
            },
          }
        : {
            card: '#242424',
            border: '#515151',
            primary: {
              main: "#45D56E",
              light: "#74E092",
              dark: "#007120",
            },
            link: {
              main: '#D5D6D8',
            },
            background: {
              default: "#1C1C1C",
              secondary: '#1E1E1E',
              paper: "#1C1C1C",
            },
            text: {
              primary: "rgb(200, 200, 200)",
            },
            action: {
              hover: 'rgba(255, 255, 255, 0.1)'
            }
          }),
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
  })

  return (
    <>
      <AuthProvider>
        <ThemeContext.Provider value={{mode, setMode}}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Outlet/>
          </ThemeProvider>
        </ThemeContext.Provider>
      </AuthProvider>
    </>
  )
}

export default ThemeLayout