import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const AuthGuard = (props: { children: ReactNode }) => {
    const { userToken } = useAuthContext()
    const router = useRouter();
    
    useEffect(() => {
        if ( !userToken ) {
            router.push('/login')
        }
    }, [userToken, router])

    if ( !userToken ) {
        return null;
    }

    return <>{props.children}</>
}
