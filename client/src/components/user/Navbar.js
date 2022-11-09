import React from 'react'
import './Navbar.css'
import { FaRegEnvelope, FaLock, FaSearch ,FaHome } from 'react-icons/fa'

import logo from '../../assets/images/logo.png'

function Navbar() {
    return (
        <div className='flex items-center justify-between bg-blue-800 py-2'>
            {/* left  */}
            <div className='pl-2 flex justify-between'>
                <div className='logo h-12 w-12'></div>

            </div>
            {/* center */}
            <div className='flex items-center '>
                <div className='flex items-center bg-gray-100 ml-2 p-2 rounded-2xl w-24  md:w-60'>
                    <FaSearch className='mx-2 text-gray-600' />
                    <input type="text" className="flex justify-center outline-none bg-transparent" placeholder="search" />
                </div>

            </div>
          
            {/* right */}
            <div className='flex items-center  '>
                <div className='flex items-center md:mx-2 mx-1 md:space-x-6 space-x-2 '>
                    <div className='flex items-center bg-white p-3  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <FaHome/>
                    </div>
                    <div className='flex items-center bg-white p-3 rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <FaHome/>
                    </div>
                    <div className='flex items-center bg-white p-3  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <FaHome/>
                    </div>
                    <div className='flex items-center bg-white p-3 md:ml-2  rounded-full md:hover:bg-gray-100 cursor-pointer'>
                        <FaHome/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar