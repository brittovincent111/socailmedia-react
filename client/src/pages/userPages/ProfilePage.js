import React from 'react'
import Navbar from '../../components/user/Navbar'
import Profile from '../../components/user/Profile'
import Sidebar from '../../components/user/Sidebar'


function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className='flex  '>
      <div hidden className=' md:block md:w-[120px] lg:w-3/12 fixed top-20 sm:top:14 p-2 z-50 '>
          <Sidebar />

        </div>
        <div className='md:justify-end flex w-screen justify-center'>

        <Profile  />
        </div>
      </div>


    </div>
  )
}

export default ProfilePage