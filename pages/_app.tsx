import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userStoreInstance } from '../src/auth/AuthContext';
import { useEffect } from 'react';
import { UserAPI } from '../src/api/base';
import { autorun } from 'mobx';

const theme = createTheme({
    palette: {
        primary: {
            main: '#104bdc',
        },
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    
    console.log(`MyApp`)

    useEffect(() => {
        autorun(() => {
            if ( userStoreInstance.userToken ) {
                UserAPI.initApiToken(userStoreInstance.userToken, userStoreInstance.logout)
            }
        })
        userStoreInstance.init()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
