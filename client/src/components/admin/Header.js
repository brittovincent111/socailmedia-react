import React from 'react'
import pro1 from '../../assets/images/pro1.jpg'
import { IoMdNotifications  } from 'react-icons/io'



function Header() {
    return (
        <div className='w-full bg-slate-200 '>
            <div className='w-full flex justify-end '> 
                <div className='flex justify-end bg-black p-2  w-11/12 rounded-l-2xl'>


                    <div className='flex justify-end pr-10 items-center space-x-5 '>
                    <div className='w-12 h-12  rounded-full bg-white  flex justify-center items-center' >
                            <IoMdNotifications className='text-2xl'/>

                            </div> 
                        <img className='w-12 h-12  rounded-full' src={pro1}/> 
                       

                    </div>




                </div>

            </div>

        </div>
    )
}

export default Header