import React from 'react'
import Message from '../../components/user/Message'
import Navbar from '../../components/user/Navbar'
import Profile from '../../components/user/Profile'
import Sidebar from '../../components/user/Sidebar'


function MessagePage() {
  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        {/* <div hidden className=' md:block md:w-[120px] lg:w-3/12  fixed top-20 sm:top:14 p-2 z-50'> */}

          <Sidebar />
       
        

            <Message/>
       


     
      
      </div>


    </div>
  )
}

export default MessagePage