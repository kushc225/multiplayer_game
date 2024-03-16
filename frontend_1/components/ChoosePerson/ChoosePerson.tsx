'use client'
import React, { useContext, useEffect, useState } from 'react'
import socketContext from '@/context/socketContext'
import { useDispatch, useSelector } from 'react-redux'
import { setUserList } from '@/redux/socketSlice'

type ChoosePersonType = {
    makeRequest: any
}
const ChoosePerson: React.FC<ChoosePersonType> = ({ makeRequest }) => {
    const dispatch = useDispatch();
    const { list } = useSelector((state: any) => state.socketSlice)
    const { socket, isSocketConnected } = useContext(socketContext) as any;
    const { id, email, name } = useSelector((state: any) => state.userSlices)
    useEffect(() => {
        if (isSocketConnected) {
            socket.current.on('userList', (data: any) => {
                dispatch(setUserList(data));
            })
        }
    }, [isSocketConnected])


    return (
        <div className='mx-2 mt-10'>
            <h1 className='text-white/80 text-2xl font-bold underline'>Select One🤩</h1>
            {list?.map((ele: any, idx: number) => {
                if (id !== ele.id) {
                    console.log({ ele })
                    return <div key={idx} className='flex  justify-between items-center px-2 mt-5'>
                        <p className='text-white/90 uppercase '>{ele.name}</p>
                        <button onClick={() => makeRequest(ele.socketId, ele.id)} className='text-white font-bold py-2 px-4 rounded-xl bg-blue-400/20'>Request🙇🏽 </button>
                    </div>
                } else {
                    return <></>
                }
            })}
        </div>
    )
}

export default ChoosePerson