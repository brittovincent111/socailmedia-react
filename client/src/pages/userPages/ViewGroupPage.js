


 
import React, { useState } from 'react'
import Navbar from '../../components/user/Navbar'
import Sidebar from '../../components/user/Sidebar'
import Feed from '../../components/user/Feed'
import RightSide from '../../components/user/RightSide'
import MobileView from '../../components/user/MobileView'
import ViewGroups from '../../components/user/group/ViewGroups'

export default function ViewGroupPage() {

  const [status , setStatus] = useState(false)
  return (
    <div>
      <Navbar />
      <div className='flex'>

        <div hidden className=' md:block md:w-[120px] lg:w-3/12 fixed top-20 sm:top:14 p-2 z-50 '>

          <Sidebar  />
        </div>
        <div className='flex w-full justify-center md:justify-end lg:justify-center  '>
          <div className='md:w-3/4 lg:w-6/12  w-full md:mx-2 lg:mx-6  rounded-2xl'>

          <ViewGroups />

          </div>
        </div>
        <div hidden className=' lg:block md:w-1/4 lg:w-3/12   fixed top-20 right-0 p-2 '>

         
        <RightSide />
        </div>

      </div>
      <div className='w-full h-16 fixed bottom-0 md:hidden'>
        {/* <MobileView /> */}
      </div>





    </div>
  )
}

