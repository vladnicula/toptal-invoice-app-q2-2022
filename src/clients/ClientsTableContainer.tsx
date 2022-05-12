import { fetchClients } from "../api/base"
import { useAsync } from "../utils/useAsync";
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
        <>
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
            <ClientsTable 
                {...value.data}
            />
            </div>
        </div>
        </>
    )
}
