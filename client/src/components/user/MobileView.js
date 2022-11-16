import React from 'react'
import { FaRegEnvelope, FaLock, FaSearch, FaHome } from 'react-icons/fa'
import { SiMessenger } from 'react-icons/si'
import { IoMdNotifications } from 'react-icons/io'
import {HiOutlineUserGroup ,HiUserAdd} from 'react-icons/hi'
import {BsFillBookmarkFill} from 'react-icons/bs'
import { AiOutlineHeart,AiOutlinePlus } from 'react-icons/ai'


function MobileView() {
    return (

        <div className='w-full h-full bg-sky-900 flex justify-around p-2'>
            <div className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <BsFillBookmarkFill className='text-2xl' />
            </div>
            <div className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <HiUserAdd className='text-2xl' />
            </div>
            <div className='flex items-center bg-white p-2  rounded-l md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <AiOutlinePlus text-2xl />
            </div>
            <div className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <FaHome className='text-2xl' />
            </div>
            <div className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <HiOutlineUserGroup className='text-2xl'/>
            </div>
            
        </div>


    )
}

export default MobileView