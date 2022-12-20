import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import {createTheme, ThemeProvider} from "@mui/material"


function MyApp({ Component, pageProps, session }) {

  const themeOptions = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#d93c3c',
      },
      tertiary: {
        main: '#FFFFFF'
      }
    },
  });
  return (
  <SessionProvider session={session}>
    <ThemeProvider theme={themeOptions}>
      <Component {...pageProps}  />
    </ThemeProvider>
    
  </SessionProvider>
  
  
  )
}

export default MyApp