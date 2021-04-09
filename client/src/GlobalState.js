import React, { createContext, useEffect, useState } from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accessToken)
    }
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) refreshToken()
    }, [])

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}