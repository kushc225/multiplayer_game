import React from 'react'


type SingleDivProps = {
    clickHanlder: any,
    number: number,
    sign: string
}
const SingleDiv: React.FC<SingleDivProps> = ({ clickHanlder, number, sign }) => {
    return (
        <div onClick={() => clickHanlder(number)} className=' border-2 border-white/20 mx-2 text-center  h-7 sm:h-10 md:h-14 lg:h-20 cursor-pointer text-white flex justify-center items-center '>{sign}</div>
    )
}

export default SingleDiv