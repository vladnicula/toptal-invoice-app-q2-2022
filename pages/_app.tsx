import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext, AuthContextProvider } from '../src/auth/AuthContext';
import { useContext } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#104bdc',
    },
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
