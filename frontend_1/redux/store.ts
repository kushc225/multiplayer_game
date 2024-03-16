import {configureStore} from '@reduxjs/toolkit'
import userSlices from './userSlices'

import socketSlice from './socketSlice'
export const store = configureStore({

    reducer : {
        userSlices,
        socketSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

