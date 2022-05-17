import axios from "axios";

export const invoiceBackendAPI = axios.create({
    baseURL: 'http://localhost:3139',
    headers: {
        "x-access-token": "111"
    }
});

type ClientsApiResponse = {
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


export const fetchClients = async () => {
    return await invoiceBackendAPI.get<ClientsApiResponse>(`/clients`)
}


export const UserAPI = {
    login: async (params: {email: string, password: string}) => {
        const loginResponse = await invoiceBackendAPI.post('/login', {
            email: params.email,
            password: params.password
        })

        console.log("loginResponse", loginResponse)
    }
}
