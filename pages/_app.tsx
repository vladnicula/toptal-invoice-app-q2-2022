import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContextProvider } from '../src/auth/AuthContext';

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
