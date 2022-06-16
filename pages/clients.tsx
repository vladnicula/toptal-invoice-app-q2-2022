import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AuthGuard } from "../src/auth/AuthGuard"
import { ClientsTableContainer } from "../src/clients/ClientsTableContainer"

const usePageQueryParams = () => {
    const router = useRouter()
    const [queryParams, setQueryParams] = useState({
        initialised: false,
        page: 1,
        sort: "ASC",
        sortBy: null as null | string
    })

    useEffect(() => {
        console.log('running query sideeffect', router.isReady, router.query.sortBy)
        if ( router.isReady ) {
            const page = parseInt(router.query.page 
                ? Array.isArray(router.query.page) 
                    ? router.query.page[0] 
                    : router.query.page : "1", 10);

            const sortBy = router.query.sortBy 
                ? Array.isArray(router.query.sortBy) 
                    ? router.query.sortBy[0] 
                    : router.query.sortBy : null;
            
            const sort = router.query.sort 
                ? Array.isArray(router.query.sort) 
                    ? router.query.sort[0] 
                    : router.query.sort : "ASC";    
                    
            setQueryParams({
                page, sortBy, sort, initialised: true
            })
        }
    }, [
        router.query,
        router.isReady,
        router.query.page,
        router.query.sortBy,
        router.query.sort,
    ])

    return queryParams
}

export default function ClientsPage () {
    const router = useRouter()
    const queryParams = usePageQueryParams();

    if ( !queryParams.initialised ) {
        // pretty loading state
        return null; 
    }
    
    return (
        <AuthGuard>
            <ClientsTableContainer 
                {...queryParams}
                sortModel={queryParams.sortBy ? [{
                    field: queryParams.sortBy,
                    sort: queryParams.sort.toLowerCase() as 'asc' | 'desc'
                }]: []}
                onSortModelChange={(models) => {
                    const { initialised, ...rest } = queryParams;

                    if ( models.length === 0 ) {
                        const { sortBy, ...ninjaSort } = rest
                        router.push({
                            pathname: '/clients',
                            query: {
                                ...ninjaSort,
                                sort: 'asc'
                            }
                        })
                        return;
                    }
                    
                    router.push({
                        pathname: '/clients',
                        query: {
                            ...rest,
                            sortBy: models[0].field,
                            sort: models[0].sort
                        }
                    })
                }}
            />
        </AuthGuard>
    )
}
