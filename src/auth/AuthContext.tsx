import { getCookie, setCookies, removeCookies } from "cookies-next"
import { makeAutoObservable } from "mobx"

export const USER_TOKEN_KEY = 'user_token'

class UserStore {
    userToken: string | null = null

    constructor () {
        makeAutoObservable(this)
    }

    init () {
        const cookieToken = getCookie(USER_TOKEN_KEY)?.toString()
        if (cookieToken) {
            this.userToken = cookieToken
        }
    }

    setAuthToken (token: string) {
        this.userToken = token
        setCookies(USER_TOKEN_KEY, token)
    }

    logout = () => {
        this.userToken = null
        removeCookies(USER_TOKEN_KEY)
    }
}

export const userStoreInstance = new UserStore()
