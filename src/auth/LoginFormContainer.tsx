import { Alert } from "@mui/material"
import { useEffect } from "react"
import { UserAPI } from "../api/base"
import { useAsync } from "../utils/useAsync"
import { userStoreInstance } from "./AuthContext"
import { LoginForm } from "./LoginForm"

export const LoginFormContainer = () => {

    const { execute, value: loginSuccessValue, status, error } = useAsync(UserAPI.login)

    useEffect(() => {
        if ( loginSuccessValue ) {
            userStoreInstance.setAuthToken(loginSuccessValue.token)
        }
    }, [loginSuccessValue])

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