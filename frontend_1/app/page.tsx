'use client'
import ChoosePerson from "@/components/ChoosePerson/ChoosePerson";
import Login from "@/components/Login/Login";
import TicTokToe from "@/components/TicTokToe";
import socketContext from "@/context/socketContext";
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpponentInfo, setSign } from "@/redux/userSlices";


export default function Home() {

  const dispatch = useDispatch();
  const [oppositeUser, setOppositeUser] = useState<any>()
  const { id, email, name, opponentInfo } = useSelector((state: any) => state.userSlices)
  const { list } = useSelector((state: any) => state.socketSlice)
  const makeRequest = (socketId: string, oppsiteUserId: string) => {
    console.log({ socketId })
    socket.current.off('sendRequest')
    socket.current.emit('sendRequest', { senderSocketId: socket.current.id, socketId, id, email, username: name })
    socket.current.off('sendRequest')
    setOppositeUser(socketId)
    const asyncOperation = new Promise((resolve, reject) => {
      socket.current.on('isRequestAccepted', (data: any) => {
        const { username, id, email = "sdlfj", socketId } = data;
        if (data.flag) {
          resolve("")
          dispatch(setSign('X'))
          const ans = list.find((ele: any) => ele.id === oppsiteUserId)
          dispatch(setOpponentInfo(ans));
        } else {
          reject("")
        }
      })
    });
    toast.promise(
      asyncOperation,
      {
        pending: 'Sending Request...',
        success: 'Request Accepted...',
        error: 'Request Rejected...',
      },
    );

  }
  const { socket, isSocketConnected } = useContext(socketContext) as any;
  useEffect(() => {
    if (isSocketConnected) {
      socket.current.on('receiveRequest', (data: any) => {
        const { senderSocketId, username, id } = data;
        if (confirm(username + ' Wants to play with you')) {
          dispatch(setSign('0'))
          socket.current.emit('isRequestAccepted', { id, flag: true, senderSocketId, username: name })
          dispatch(setOpponentInfo({ name: username, email: "hjh", id, socketId: senderSocketId }))
        } else {
          socket.current.emit('isRequestAccepted', { id, flag: false, senderSocketId, username: name })
        }
      })


    }
  }, [name, isSocketConnected]);
  if (!id) {
    return <>
      <ToastContainer />
      <h1 className='text-yellow-500 font-bold text-4xl underline text-center mt-10 md:text-5xl'>Tic Tok Toi😏</h1>
      <div className="">
        <Login />
      </div>
    </>
  }
  else if (id && !opponentInfo.name) {
    return <>
      <ToastContainer />
      <h1 className='text-yellow-500 font-bold text-4xl underline text-center mt-10 md:text-5xl'>Tic Tok Toi😏</h1>
      <div className="">
        <ChoosePerson makeRequest={makeRequest} />
      </div>
    </>
  }
  return (
    <>
      <ToastContainer />
      <h1 className='text-yellow-500 font-bold text-4xl underline text-center mt-10 md:text-5xl'>Tic Tok Toi😏</h1>
      <div className="">
        <TicTokToe />
      </div>
    </>
  );
}
