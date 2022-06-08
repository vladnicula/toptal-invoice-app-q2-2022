import { useEffect } from "react"
import { ClientsTable, SortingProps } from "./ClientsTable"
import { useClientsStore } from "./ClientsStore"

export type ClientsTableContainerProps = {
    page?: number;
    sort?: string;
    sortBy?: string | null;
} & SortingProps

export const ClientsTableContainer = (props: ClientsTableContainerProps) => {
    const { page = 1, sort = "ASC", sortBy = null, ...rest } = props

    const { clients, total, fetchStatus, error } = useClientsStore((state) => state.clientsList)
    const fetchClisntsList = useClientsStore((state) => state.fetchClisntsList)

    useEffect(() => {
        fetchClisntsList({page, sort, sortBy})
    }, [fetchClisntsList, page, sort, sortBy])

    if ( fetchStatus === 'idle' || fetchStatus === 'pending' ) {
        // loading idicator
        return <div>Loading</div>;
    }

    if ( fetchStatus === 'error' ) {
        // error indicator
        console.log(error)
        return <div>Error</div>
    }

    if ( !clients || !total ) {
        return null
    }
    
    return (
        <ClientsTable 
            clients={clients}
            total={total}
            {...rest}
        />
    )
}


// export const ClientsTableContainerWithAsyncClass = () => {
//     return (
//         <UseAsyncClass
//             asyncFunction={fetchClients}
//             immediate
//         >
//             {
//                 ({status, error, value}) => {
//                     if ( status === 'idle' || status === 'pending' ) {
//                         // loading idicator
//                         return <div>Loading</div>;
//                     }
                
//                     if ( status === 'error' ) {
//                         // error indicator
//                         console.log(error)
//                         return <div>Error</div>
//                     }
                
//                     if ( !value ) {
//                         return null
//                     }
//                     return (
//                         <ClientsTable {...value.data} />
//                     )
//                 }
//             }
//         </UseAsyncClass>    
//     )
// }