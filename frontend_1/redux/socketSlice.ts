import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket, io } from 'socket.io-client';
interface MySocket extends Socket {}


const initialState = {
    socket : null,
    list : [],
}

const socketSlice = createSlice({
    name :" socket Slice",
    initialState,
    reducers : {
        createSocket : (state, action ) => {
           return {...state, ...action.payload};
        },
        setUserList : (state, action) => {
            return {...state, list : action.payload};
        }
    }
})


export const {createSocket, setUserList} = socketSlice.actions;

export default socketSlice.reducer;