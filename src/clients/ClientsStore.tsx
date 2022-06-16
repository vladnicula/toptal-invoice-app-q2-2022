import { AxiosError } from "axios"
import produce from "immer"
import { resolve } from "path"
import create from "zustand"
import { ClientsRestApiResponse, ClientsDTO, fetchClients, FetchClientsParams, fetchGraphQLClients } from "../api/base"

type ClientStoreType = {
    clientsList: {
        clients: null | ClientsDTO[]
        total: number | null
        fetchStatus: "error" | "idle" | "pending" | "success"
        error: null | string
    }
    addClient: Function
    fetchClisntsList: (params: FetchClientsParams) => Promise<ClientsRestApiResponse>
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
            console.log('fetchGraphQLClients starts')
            const clientsResponse = await fetchGraphQLClients(params)

            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log('fetchGraphQLClients ends')

            set(produce((state: ClientStoreType) => {
                const { clientsList } = state;
                clientsList.fetchStatus = 'success'
                clientsList.clients = clientsResponse.clients
                clientsList.total = clientsResponse.total
            }))

            return clientsResponse
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
                        error: "Unknown Error"
                    }
                })
                return Promise.reject(`Unknown Error: ${error}`)
            }
        }
    },
}))