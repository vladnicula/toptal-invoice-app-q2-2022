import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


type ClientsTableProps = {
    clients: Array<{
        companyDetails: {
            address: string;
            name: string;
            regNumber: string;
            vatNumber: string;
        };
        email: string;
        id: string;
        invoicesCount: number;
        name: string;
        totalBilled: number;
        user_id: string;
    }>,
    total: number
}

const columns: GridColDef[] = [
    {
        field: 'companyDetails',
        headerName: 'Company name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.companyDetails.name}`,
    },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'totalBilled', headerName: 'Total Billed', width: 120 },
   
];

export const ClientsTable = (props: ClientsTableProps) => {
    return (
        <div style={{ height: 70 * props.clients.length, width: '100%' }}>
            <DataGrid
                rows={props.clients}
                columns={columns}
                hideFooter
            />
            </div>
    )
}