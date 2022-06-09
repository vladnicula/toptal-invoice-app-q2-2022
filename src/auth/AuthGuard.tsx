import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { userStoreInstance } from "./AuthContext";

export const AuthGuard = observer((props: { children: ReactNode }) => {
    const router = useRouter();
    const { userToken } = userStoreInstance;
    
    useEffect(() => {
        if ( !userToken ) {
            router.push('/login')
        }
    }, [userToken, router])

    if ( !userToken ) {
        return null;
    }

    return <>{props.children}</>
})
