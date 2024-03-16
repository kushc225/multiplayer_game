'use client'
import socketContext from '@/context/socketContext'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SingleDiv from './SingleDiv/SingleDiv';
import { findWinner } from '@/utils/winnerChecker';

const TicTokToe = () => {
    const { socket } = useContext(socketContext) as any;
    const { opponentInfo } = useSelector((state: any) => state.userSlices)
    const { sign } = useSelector((state: any) => state.userSlices)
    const [grid, setGrid] = useState<string[]>(['', '', '', '', '', '', '', '', '',])

    const clickHanlder = (id: number) => {
        socket.current.emit("move", { senderSocketId: opponentInfo.socketId, boxClicked: id - 1, sign })
        const temp = grid.slice(0);
        temp[id - 1] = sign;
        const flag = findWinner(temp);

        if (flag !== null) {
            if (flag === sign) {
                socket.current.emit('youarelooser', ({ socketId: opponentInfo.socketId }));
                alert("You are winner")
            } else if (flag === "DRAW") {
                socket.current.emit('youarelooser', ({ socketId: opponentInfo.socketId }));
                alert("Match is Draw...")
            }
            setGrid(['', '', '', '', '', '', '', '', '',])
            return;
        }
        setGrid(temp);
    }
    useEffect(() => {
        socket.current.off('youarelooser')
        socket.current.on('youarelooser', () => {
            alert("you are looser :)")
        });
        socket.current.on('move', ({ boxClicked, sign }: any) => {
            const temp = grid.slice(0);
            temp[boxClicked] = sign;
            const flag = findWinner(temp);
            if (flag !== null) {

                if (flag === sign) {
                    socket.current.emit('youarelooser', ({ socketId: opponentInfo.socketId }));
                    alert("You are winner")
                } else if (flag === "DRAW") {
                    socket.current.emit('youarelooser', ({ socketId: opponentInfo.socketId }));
                    alert("Match is Draw...")
                }
                setGrid(['', '', '', '', '', '', '', '', '',])
                return;
            }
            setGrid(temp);
        })
    }, [grid])
    return (
        <div className='grid grid-cols-3 px-2 sm:px-4 lg:px-10 mt-10 gap-2 h-3/6 '>
            {grid.map((ele: string, idx: number) => <SingleDiv clickHanlder={clickHanlder} number={idx + 1} sign={ele} />)}
        </div>
    )
}

export default TicTokToe