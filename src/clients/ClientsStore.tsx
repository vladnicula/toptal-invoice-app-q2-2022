import { AxiosError } from "axios"
import produce from "immer"
import create from "zustand"
import { ClientsApiResponse, ClientsDTO, fetchClients, FetchClientsParams } from "../api/base"

type ClientStoreType = {
    clientsList: {
        clients: null | ClientsDTO[]
        total: number | null
        fetchStatus: "error" | "idle" | "pending" | "success"
        error: null | string
    }
    addClient: Function
    fetchClisntsList: (params: FetchClientsParams) => Promise<ClientsApiResponse>
}

export const useClientsStore = create<ClientStoreType>(set => ({
    clientsList: {
        clients: [],
        total: null,
        fetchStatus: 'idle',
        error: null,
    },

    addClient: () => {},

    fetchClisntsList: async (params: FetchClientsParams) => {
    
        set(produce((state: ClientStoreType) => {
            const { clientsList } = state;
            clientsList.fetchStatus = 'pending'
            clientsList.clients = null
            clientsList.total = null
            clientsList.error = null
        }))

        try {
            const clientsResponse = await fetchClients(params)
            set(produce((state: ClientStoreType) => {
                const { clientsList } = state;
                clientsList.fetchStatus = 'success'
                clientsList.clients = clientsResponse.data.clients
                clientsList.total = clientsResponse.data.total
            }))

            return clientsResponse.data
        } catch (error) {
            if ( error instanceof AxiosError ) {
                const errorString = error.response?.data;
                set(state => {
                    return {
                        ...state,
                        error: errorString
                    }
                })
                return Promise.reject(errorString)
            } else {
                set(state => {
                    return {
                        ...state,
                        error: "Unkown Error"
                    }
                })
                return Promise.reject("Unkown Error")
            }

            
        }
    },
}))