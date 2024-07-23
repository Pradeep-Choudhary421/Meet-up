import React from 'react'
import helloGif from '../../assets/hello.gif'
const HelloUsers = () => {
    const userName = sessionStorage.getItem("userName")
  return (
    <>
   <div className="text-white bg-black w-full grid grid-cols-1 items-center justify-items-center">
    <div className='hidden md:block'>
    <div className='flex flex-col gap-4'>
    <img src={helloGif} alt="" />
    <div className='flex justify-center'>
    <h1 className='text-2xl'>Hello <span className=' underline text-2xl'>{userName}</span> !</h1>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default HelloUsers
