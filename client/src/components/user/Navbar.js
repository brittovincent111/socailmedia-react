import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { FaRegEnvelope, FaLock, FaSearch, FaHome } from 'react-icons/fa'
import { SiMessenger } from 'react-icons/si'
import { IoMdNotifications } from 'react-icons/io'
import logo from '../../assets/images/logo.png'
import { AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import profile from '../../assets/images/profile.jpg'
import { update } from '../../redux/userRedux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'





export default function Navbar() {

    const userDetails = useSelector(state => state.user)
    const [open , setOpen] = useState(false)




    return (


        <div className='flex items-center justify-between bg-sky-900 h-14 sm:h-16  sticky top-0 z-10'>
            {/* left  */}
            <div className='md:pl-6  pl-2 flex justify-between '>
                {/* <img src={logo} className="w-12 h-10"/> */}
                <div className=' md:w-14 md:h-14 bg-slate-50 text-black flex justify-center items-center text-center'>

                    logo

                </div>


            </div>





            {/* center */}
            <div className='flex items-center '>
                <div hidden className='sm:flex items-center bg-gray-100 ml-2 p-2 rounded-2xl w-24  md:w-60'>
                    <FaSearch className='mx-2 text-gray-600' />
                    <input type="text" className="flex justify-center outline-none bg-transparent" placeholder="search" />
                </div>
                <div className='w-max h-max bg-white rounded-full m-1'>

                    <FaSearch className=' text-gray-600 m-4 sm:hidden' />
                </div>



            </div>

            {/* right */}
            <div className='flex items-center  '>
                <div className='flex items-center md:mx-2 mx-1 md:space-x-6 space-x-2 '>
                    <Link to='/' className='flex items-center bg-white p-3 md:ml-2  rounded-full md:hover:bg-gray-100 cursor-pointer'>
                        <FaHome className='md:text-2xl text-xl ' />
                    </Link>
                    <Link to='/message' className='flex items-center bg-white p-3 rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <SiMessenger className='md:text-2xl text-xl ' />
                    </Link>
                    <div className='flex items-center bg-white p-3  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <IoMdNotifications className='md:text-2xl text-xl ' />
                    </div>

                    {/* <Link to={`/profile/${userDetails.username}`} state={{ userID: userDetails._id }} className='flex items-center bg-white  justify-center  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <img className='w-12 h-12 object-fit  rounded-full' src={profile} />
                    </Link> */}
                    <div onClick={(e)=>setOpen(!open)}>
                    <img className='w-12 h-12 object-fit  rounded-full' src={profile} /> 
                    </div>
                    {
                        open &&

                        <div class="absolute right-0 z-20 w-56 py-2  overflow-hidden  rounded-md shadow-xl dark:bg-blue-200 mt-72 bg-sky-100 mr-20 m-10">
                            <a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-start">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">{userDetails.username}</h1>
                                    <p class="text-sm text-gray-900 dark:text-gray-900 ">{userDetails.email}</p>
                                </div>
                            </a>
                            <a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-start">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">Create Group</h1>
                                    {/* <p class="text-sm text-gray-900 dark:text-gray-900 ">{userDetails.email}</p> */}
                                </div>
                            </a>


                            <Link to={`/profile/${userDetails.username}`} state={{ userID: userDetails._id }} ><a href="" class="block px-4 py-3 text-sm text-gray-600 capitalize font-extrabold  transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                view profile
                            </a></Link>

                            {/* <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize  font-extrabold transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLogout}>
                                Sign Out
                            </a> */}

                        </div>}
                </div>

            </div>
        </div>
    )
}


