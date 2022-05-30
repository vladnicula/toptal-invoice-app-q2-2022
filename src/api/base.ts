import axios, { AxiosError } from "axios";

export const invoiceBackendAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}` : "http://localhost:3139/",
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


export const fetchClients = async (params: {
    page: number, sort: string, sortBy: string | null
}) => {
    return await invoiceBackendAPI.get<ClientsApiResponse>(`/clients`)
}


export const UserAPI = {

    _reqRef: NaN,
    _responseRef: NaN,

    initApiToken (token: string, handleTokenExpired: () => unknown) {
        invoiceBackendAPI.interceptors.request.eject(this._reqRef)
        invoiceBackendAPI.interceptors.request.use((req) => {
            if ( !req.headers ) {
                req.headers = {}
            }
            req.headers["x-access-token"] = token
            console.log('req.headers', req.headers, token)
            return req;
        })

        invoiceBackendAPI.interceptors.response.eject(this._responseRef)
        this._responseRef = invoiceBackendAPI.interceptors.response.use((res) => {
            return res
        }, (error) => {
            if ( error instanceof AxiosError ) {
                if ( error && error.response?.data === "Invalid Token" ) {
                    handleTokenExpired()
                }
            }
        })
    },

    login: async (params: {email: string, password: string}) => {
        
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const loginResponse = await invoiceBackendAPI.post<{
                token: string
            }>('/login', {
                email: params.email,
                password: params.password
            })
            
            return loginResponse.data
        } catch ( error ) {
            if ( error instanceof AxiosError ) {
                return Promise.reject(error.response?.data)
            }

            return Promise.reject("Unkown Error")
        }
        
    }
}

UserAPI.initApiToken.bind(UserAPI)
