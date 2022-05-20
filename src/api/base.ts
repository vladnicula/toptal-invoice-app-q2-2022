import axios, { AxiosError } from "axios";

export const invoiceBackendAPI = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    // headers: {
    //     "x-access-token": "111"
    // }
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

    initApiToken: (token: string, handleTokenExpired: () => unknown) => {
        invoiceBackendAPI.interceptors.request.use((req) => {
            if ( !req.headers ) {
                req.headers = {}
            }
            req.headers["x-access-token"] = token
            console.log('req.headers', req.headers, token)
            return req;
        })

        invoiceBackendAPI.interceptors.response.use((res) => {
            return res
        }, (error) => {
            console.log("react to erorr", error)
            if ( error instanceof AxiosError ) {
                if ( error && error.response?.data === "Invalid Token" ) {
                    handleTokenExpired()
                }
            }
        })
    },

    login: async (params: {email: string, password: string}) => {
        const loginResponse = await invoiceBackendAPI.post<{
            token: string
        }>('/login', {
            email: params.email,
            password: params.password
        })

        return loginResponse.data
    }
}
