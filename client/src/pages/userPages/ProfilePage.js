import React from 'react'
import Navbar from '../../components/user/Navbar'
import Profile from '../../components/user/Profile'
import Sidebar from '../../components/user/Sidebar'


function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className='flex '>
        <div className='hidden md:block '>
          <Sidebar />

        </div>

        <Profile />
      </div>


    </div>
  )
}

export default ProfilePage