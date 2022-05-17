import { UserAPI } from "../api/base"
import { useAsync } from "../utils/useAsync"
import { useAuthContext } from "./AuthContext"
import { LoginForm } from "./LoginForm"

export const LoginFormContainer = () => {
    const { login } = useAuthContext()
    const { execute, error, status } = useAsync(UserAPI.login)

    console.log(login)
    
    return (
        <LoginForm 
            onLoginRequest={(value) => {
                console.log("should handle login here", value)
                execute(value)
            }}
        />
    )
}