import React, { useState } from 'react'
import Navbar from '../../components/user/Navbar'
import Sidebar from '../../components/user/Sidebar'
import Feed from '../../components/user/Feed'
import RightSide from '../../components/user/RightSide'
import MobileView from '../../components/user/MobileView'

function FeedPage() {

  return (
    <div>
      <Navbar />
      <div className='flex'>

        <div hidden className=' md:block md:w-[120px] lg:w-3/12 fixed top-20 sm:top:14 p-2 z-20 '>

          <Sidebar />
        </div>
        <div className='flex h-max w-full justify-center md:justify-end lg:justify-center  '>
          <div className='md:w-3/4 lg:w-6/12 w-full md:mx-2 lg:mx-6  rounded-2xl'>

            <Feed />

          </div>
        </div>
        <div hidden className=' lg:block md:w-1/4 lg:w-3/12   fixed top-20 right-0 p-2 z-10  '>

          <RightSide />
        </div>

      </div>
      <div className='w-full h-16 fixed bottom-0 md:hidden'>
        <MobileView />
      </div>





    </div>
  )
}

export default FeedPage