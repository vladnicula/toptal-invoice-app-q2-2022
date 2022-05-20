import { LoginFormContainer } from "../src/auth/LoginFormContainer";
import { NonAuthGuard } from "../src/auth/NonAuthGuard";

export default function Login () {
    return (
        <NonAuthGuard>
            <LoginFormContainer />
        </NonAuthGuard>
    )
}
