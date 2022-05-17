import { createContext, ReactNode, useContext } from "react"

type Loginparams = {
    email: string
    password: string
}

export const AuthContext = createContext<null | {
    userToken: null | string,
    login: (params: Loginparams) => unknown,
    logout: () => unknown
}>(null)

export const AuthContextProvider = (props: { children: ReactNode }) => {
    // const [loginApi, setLoginApi] 

    // setLoginApi()
    
    return (
        <AuthContext.Provider
            value={{
                userToken: null,
                login: (params: Loginparams) => {
                    console.log('AuthContext.Provider should do login')
                },
                logout: () => {
                    console.log('should do logout')
                }
            }}
        >
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
