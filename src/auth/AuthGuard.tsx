import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

export const AuthGuard = (props: { children: ReactNode }) => {
    const { userToken } = useAuthContext()
    const router = useRouter();
    
    useEffect(() => {
        if ( !userToken ) {
            router.push('/login')
        }
    }, [userToken])

    if ( !userToken ) {
        return null;
    }

    return <>{props.children}</>
}
