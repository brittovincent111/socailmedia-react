import React from 'react'
import GroupFedd from '../../components/user/group/GroupFeed'
import Navbar from '../../components/user/Navbar'
import Sidebar from '../../components/user/Sidebar'

function GroupPage() {
    return (
        <div>
          <Navbar />
          <div className='flex '>
            <div className='hidden md:block '>
              <Sidebar />
    
            </div>
            <GroupFedd/>
    
           
          </div>
    
    
        </div>
      )
    
}

export default GroupPage