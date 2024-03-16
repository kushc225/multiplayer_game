'use client'
import { io } from 'socket.io-client'
import React, { useEffect, useRef, useState } from "react";
import UserContext from "./socketContext";

const UserContextProivder = ({ children }: { children: React.ReactNode }) => {
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
    const socket = useRef<any>(null);

    const socketConnection = () => {
        socket.current = io('ws://localhost:9000', { transports: ['websocket'] })
        socket.current.on('connect', () => {
            setIsSocketConnected(true);
        })
        socket?.current.on('disconnect', () => {
            setIsSocketConnected(false);
        })
    }



    return <UserContext.Provider value={{ socket, socketConnection, isSocketConnected, setIsSocketConnected }}>
        {children}
    </UserContext.Provider>
}
export default UserContextProivder;