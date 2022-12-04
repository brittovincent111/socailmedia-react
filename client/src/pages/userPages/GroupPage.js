import React from 'react'
import GroupFedd from '../../components/user/group/GroupFeed'
import Navbar from '../../components/user/Navbar'
import Sidebar from '../../components/user/Sidebar'

function GroupPage() {
    return (
        <div>
          <Navbar />
          <div className='flex '>
          <div hidden className=' md:block md:w-[120px] lg:w-3/12 fixed top-20 sm:top:14 p-2 z-50 '>
              <Sidebar />
    
            </div>
            <div className='md:justify-end flex w-screen justify-center'>

            <GroupFedd/>
            </div>
    
           
          </div>
    
    
        </div>
      )
    
}

export default GroupPage