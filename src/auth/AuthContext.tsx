import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { UserAPI } from "../api/base";

export const AuthContext = createContext<null | {
    userToken: null | string,
    setAuthToken: (token: string) => unknown,
    logout: () => unknown
}>(null)

const USER_TOKEN_KEY = 'user_token'

export const AuthContextProvider = (props: { children: ReactNode }) => {
    const [ userToken, setAuthToken ] = useState<string | null>(null)
    const [ isContextInitialised, setInitialised ] = useState(false);

    const persistToken = useCallback((token: string) => {
        setAuthToken(token)
        setCookies(USER_TOKEN_KEY, token)
    }, [])

    const handleLogout = useCallback(() => {
        setAuthToken(null)
        removeCookies(USER_TOKEN_KEY)
    }, [])

    useEffect(() => {
        if (userToken) {
            UserAPI.initApiToken(userToken, handleLogout)
            setInitialised(true)
        }
    }, [userToken])

    // onMount
    useEffect(() => {
        const cookieToken = getCookie(USER_TOKEN_KEY)?.toString()
        if (cookieToken) {
            setAuthToken(cookieToken)
        } else {
            setInitialised(true)
        }
    }, [])

    const contextValue = useMemo(() => ({
        userToken,
        setAuthToken: persistToken,
        logout: handleLogout
    }), [userToken]);

    if ( !isContextInitialised ) {
        // global loading indicator
        return null;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if ( context === null ) {
        throw new Error(`Attempted to read context value outside of provider`)
    }

    return context;
}
