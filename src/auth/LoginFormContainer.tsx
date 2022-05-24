import { Alert } from "@mui/material"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { UserAPI } from "../api/base"
import { useAsync } from "../utils/useAsync"
import { useAuthContext } from "./AuthContext"
import { LoginForm } from "./LoginForm"

export const LoginFormContainer = () => {
    const { setAuthToken } = useAuthContext()    

    const { execute, value: loginSuccessValue, status, error } = useAsync(UserAPI.login)

    useEffect(() => {
        if ( loginSuccessValue ) {
            setAuthToken(loginSuccessValue.token)
        }
    }, [loginSuccessValue, setAuthToken])

    console.log(error)



    return (
        <LoginForm 
            genericMessage={
                error === 'Invalid Credentials'
                    ? (
                        <Alert severity="error">Invalid user credentials!</Alert>
                    )
                    : null
            }
            disabled={status === 'pending'}
            onLoginRequest={execute}
        />
    )
}