import { useEffect } from "react"
import { UserAPI } from "../api/base"
import { useAsync } from "../utils/useAsync"
import { useAuthContext } from "./AuthContext"
import { LoginForm } from "./LoginForm"

export const LoginFormContainer = () => {
    const { setAuthToken } = useAuthContext()    

    const { execute, value: loginSuccessValue } = useAsync(UserAPI.login)

    useEffect(() => {
        if ( loginSuccessValue ) {
            console.log("should probably persist the token", loginSuccessValue.token)
            setAuthToken(loginSuccessValue.token)
        }
    }, [loginSuccessValue])

    return (
        <LoginForm 
            onLoginRequest={execute}
        />
    )
}