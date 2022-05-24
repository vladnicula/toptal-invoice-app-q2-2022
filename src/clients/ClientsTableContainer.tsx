import { useEffect } from "react"
import { fetchClients } from "../api/base"
import { useAsync } from "../utils/useAsync"
import { ClientsTable, SortingProps } from "./ClientsTable"

export type ClientsTableContainerProps = {
    page?: number;
    sort?: string;
    sortBy?: string | null;
} & SortingProps

export const ClientsTableContainer = (props: ClientsTableContainerProps) => {
    const { page = 1, sort = "ASC", sortBy = null, ...rest } = props;
    const { status, value, error, execute } = useAsync(fetchClients)

    useEffect(() => {
        execute({page, sort, sortBy})
    }, [execute, page, sort, sortBy])

    if ( status === 'idle' || status === 'pending' ) {
        // loading idicator
        return <div>Loading</div>;
    }

    if ( status === 'error' ) {
        // error indicator
        console.log(error)
        return <div>Error</div>
    }

    if ( !value ) {
        return null
    }
    
    return (
        <ClientsTable 
            {...value.data}  
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