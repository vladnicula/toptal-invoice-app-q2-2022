import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { userStoreInstance } from "./AuthContext";

export const NonAuthGuard = observer((props: { children: ReactNode }) => {
    const router = useRouter();
    const { userToken } = userStoreInstance;

    useEffect(() => {
        if ( userToken ) {
            router.push('/')
        }
    }, [userToken, router])

    if ( userToken ) {
        return null;
    }

    return <>{props.children}</>
})
