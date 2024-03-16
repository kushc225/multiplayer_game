'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import SocketProivder from '@/context/ContextProvoider'

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {

    return (

        <Provider store={store}>
            <SocketProivder>
                {children}
            </SocketProivder>
        </Provider>
    )
}

export default ReduxProvider