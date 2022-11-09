import React from 'react'
import Navbar from '../../components/user/Navbar'
import Sidebar from '../../components/user/Sidebar'
// import Feed from '../../components/user/Feed'
// import Sidebar from '../../components/user/Sidebar'
import Feed from '../../components/user/Feed'
import RightSide from '../../components/user/RightSide'

function FeedPage() {
  return (
    <div>
       <Navbar/>
       <div>
       <div className='flex h-screen w-full justify-between  '>
        <div hidden className=' md:block md:w-1/4 lg:w-3/12 md:m-2 lg:m-6'>

        <Sidebar />
        </div>
        <div className='md:w-3/4 lg:w-6/12 w-full md:m-2 lg:m-6'>

        <Feed/>
        </div>
        <div hidden className=' lg:block md:w-1/4 lg:w-3/12 md:m-2 lg:m-6'>

        <RightSide />
        </div>

       </div>

       </div>
      
      

    </div>
  )
}

export default FeedPage