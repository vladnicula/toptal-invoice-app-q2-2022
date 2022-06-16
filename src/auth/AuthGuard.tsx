import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { userStoreInstance } from "./AuthContext";

export const AuthGuard = observer((props: { children: ReactNode }) => {
    const router = useRouter();
    const { userToken, initialised } = userStoreInstance;
    
    useEffect(() => {
        if  ( !initialised ) {
            return
        }
        if ( !userToken ) {
            console.log("redirect to login")
            router.push('/login')
        }
    }, [userToken, router, initialised])

    console.log(`AuthGuard`, userToken, router.isReady)

    if ( !userToken ) {
        return null;
    }

    return <>{props.children}</>
})
