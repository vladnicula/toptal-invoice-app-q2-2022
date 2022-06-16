import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { userStoreInstance } from "./AuthContext";

export const NonAuthGuard = observer((props: { children: ReactNode }) => {
    const router = useRouter();
    const { userToken, initialised } = userStoreInstance;

    useEffect(() => {
        if ( !initialised ) {
            return;
        }
        if ( userToken ) {
            console.log("redirect to homepage")
            router.push('/')
        }
    }, [userToken, initialised, router])

    if ( userToken ) {
        return null;
    }

    return <>{props.children}</>
})
