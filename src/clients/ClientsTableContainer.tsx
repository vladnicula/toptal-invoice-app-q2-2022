import { fetchClients } from "../api/base"
import { useAsync, UseAsyncClass } from "../utils/useAsync";
import { ClientsTable } from "./ClientsTable";

export const ClientsTableContainer = () => {

    const {status, value, error } = useAsync(fetchClients, true)

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
        <ClientsTable {...value.data} />
    )
}


export const ClientsTableContainerWithAsyncClass = () => {
    return (
        <UseAsyncClass
            asyncFunction={fetchClients}
            immediate
        >
            {
                ({status, error, value}) => {
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
                        <ClientsTable {...value.data} />
                    )
                }
            }
        </UseAsyncClass>    
    )
}