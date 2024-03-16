import { setUserInfo } from '@/redux/userSlices';
import React, { useState, ChangeEvent, useContext } from 'react'
import { useDispatch } from 'react-redux'
import socketContext from '@/context/socketContext'
type InputType = {
    name: string,
    email: string,
    password: string,
}


interface InputEvent extends ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
        name: string;
        value: string;
    };
}



const Login = () => {
    const [input, setInput] = useState<InputType>({ name: 'kush', email: 'kushc225@gmail.com', password: 'password' })
    const { socket, isSocketConnected, socketConnection } = useContext(socketContext) as any;
    const dispatch = useDispatch();
    const inputHandler = (e: InputEvent) => {
        if (e.target) setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = () => {
        const id = Date.now().toString().slice(6);
        socketConnection()
        socket.current.emit('addUser', { id, ...input, socketId: socket.current.id })
        dispatch(setUserInfo({ id, ...input }));

    }
    return (
        <div className='text-center'>
            <div className="mt-10 px-2 ">
                <h1 className="text-white text-2xl  font-bold underline md:text-3xl lg:text-4xl md:flex md:gap-5 md:justify-center">Sign Up😜</h1>
                <div className="mt-5 md:mt-10">
                    <input type="text" name="name" value={input.name} onChange={inputHandler} placeholder="Name *" className="bg-transparent outline-none text-white/70 w-5/6 border-2 border-blue-400/10 px-3 py-2 rounded-xl md:w-4/6 lg:2/6" />
                </div>
                <div className="mt-3 md:mt-10">
                    <input type="text" name="email" value={input.email} placeholder="Email *" onChange={inputHandler} className="bg-transparent outline-none text-white/70 w-5/6 border-2 border-blue-400/10 px-3 py-2 rounded-xl md:w-4/6 lg:2/5" />
                </div>
                <div className="mt-3 md:mt-10">
                    <input type="text" name="password" value={input.password} placeholder="Password *" onChange={inputHandler} className="bg-transparent outline-none text-white/70 w-5/6 border-2 border-blue-400/10 px-3 py-2 rounded-xl md:w-4/6 lg:2/5" />
                </div>

                <div className="mt-4 md:mt-10">
                    <button className="text-white bg-gray-500/45 py-2 px-3 rounded-xl font-bold md:py-4 md:px-8 md:font-3xl" onClick={submitHandler}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login