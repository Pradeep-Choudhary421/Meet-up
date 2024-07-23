import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
const UserProfile = () => {
    const userName = sessionStorage.getItem("userName");
  const userAvatar = sessionStorage.getItem("avatar");
  const userEmail = sessionStorage.getItem("useremail");
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("useremail");
    navigate("/");
  };
  return (
    <>
    <section className='w-screen h-screen bg-black text-white overflow-hidden '>
        <Link to="/">
        <div className=' absolute text-6xl p-4 w-fit hover:cursor-pointer'><IoArrowBackOutline /></div>
        </Link>
        <div className='grid grid-cols-1 justify-items-center items-center w-full h-full'>
        <div>
            <div><img src={userAvatar} alt="" /></div>
            <div className='flex  justify-center pt-10 pb-4'><h2 className='text-5xl'>{userName}</h2>
            </div>
            <div className='flex  justify-center pb-4 '><h2 className='text-2xl'>{userEmail}</h2>
            </div>
            <div className='flex justify-center'><button onClick={handleLogout} className='flex justify-center py-2 px-4 hover:bg-white duration-700 hover:text-black border-2'>LogOut</button></div>
        </div>
        </div>
    </section>
    </>
  )
}

export default UserProfile
