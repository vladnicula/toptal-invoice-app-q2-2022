import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

export const NonAuthGuard = (props: { children: ReactNode }) => {
    const { userToken } = useAuthContext()
    const router = useRouter();
    
    useEffect(() => {
        if ( userToken ) {
            router.push('/')
        }
    }, [userToken])

    if ( userToken ) {
        return null;
    }

    return <>{props.children}</>
}
