import React, { useEffect } from 'react'
import './Navbar.css'
import { FaRegEnvelope, FaLock, FaSearch, FaHome } from 'react-icons/fa'
import { SiMessenger } from 'react-icons/si'
import { IoMdNotifications  } from 'react-icons/io'
import logo from '../../assets/images/logo.png'
import { AiOutlineHeart,AiOutlinePlus } from 'react-icons/ai'
import profile from '../../assets/images/profile.jpg'
import {update} from '../../redux/userRedux'
import { useSelector } from 'react-redux'




  
export default function Navbar() { 

    const userDetails = useSelector(state=>state.user)
 

  

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
                    
                <FaSearch className=' text-gray-600 m-4 sm:hidden'  />
                </div>
              
           

            </div>

            {/* right */}
            <div className='flex items-center  '>
                <div className='flex items-center md:mx-2 mx-1 md:space-x-6 space-x-2 '>
                <div className='flex items-center bg-white p-3 md:ml-2  rounded-full md:hover:bg-gray-100 cursor-pointer'>
                        <FaHome className='md:text-2xl text-xl '/>
                    </div>
                    <div className='flex items-center bg-white p-3 rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <SiMessenger className='md:text-2xl text-xl '/>
                    </div>
                    <div className='flex items-center bg-white p-3  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <IoMdNotifications className='md:text-2xl text-xl ' />
                    </div>
                   
                    <div className='flex items-center bg-white  justify-center  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                       <img className='w-12 h-12 object-fit  rounded-full' src={profile} />{userDetails.username}
                    </div>
                </div>

            </div>
        </div>
    )
}


