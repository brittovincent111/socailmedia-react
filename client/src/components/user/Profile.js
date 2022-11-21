import React, { useEffect, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import axios from 'axios'




function Profile() {

  const [posts, SetPosts] = useState([])

  const userDetails = useSelector(state => state.user)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {

    axios.get(`http://localhost:4000/userprofile/${userDetails._id}`).then((response) => {

      SetPosts(response.data)


    }).catch((error) => {

      console.log(error)

    })


  }, [])

  return (
    <div className='w-full h-screen  flex justify-center bg-gray-100'>

      <div className='md:w-11/12 w-full bg-white   h-full'>
        {/* profile details  */}


        <div className=' h-max w-full  grid md:grid-cols-2 lg:grid-cols-3'>
          <div className=' h-full  flex-col flex justify-center items-center md:p-10'>
            <div className='w-44 h-44 bg-red-500 rounded-full mb-10 mt-5'></div>
            <div className='font-semibold  text-xl'>{userDetails.username}</div>
          </div>
          <div className='  h-32 md:h-full lg:h-full   flex  justify-center items-center'>
            <div className=' flex flex-col md:justify-start justify-center'>
              <div className='flex items-center space-x-2 rounded-2xl p-2 bg-gray-100 w-max'>
                <div><FiSettings /> </div>
                <div className='font-semibold  text-base'>Edit Profile</div>

              </div>
              <div className='flex items-center  space-x-3 rounded-2xl p-2  w-max'>
                <div className='flex justify-center items-center '>
                  <p className='font-semibold  text-xl'>45</p>
                  <p className='font-semibold  text-base'>followers</p>
                </div>
                <div className='flex justify-center items-center'>
                  <p className='font-semibold  text-xl'>45</p>
                  <p className='font-semibold  text-base'>followers</p>
                </div>


              </div>


              <div className='flex justify-start font-semibold p-2 text-base'>Love Coding </div>
            </div>

          </div>
          <div className='hidden lg:block'></div>


        </div>

        {/* center  */}
        <div className="h-16 items-center border border-black m-2">
          <div className='flex items-center h-full justify-center space-x-3' >
            <div><BsFillGrid1X2Fill className='font-semibold  text-xl' /></div>
            <div className='font-semibold  text-xl'>posts</div>
          </div>


        </div>
        {/* posts */}
        <div className='w-full h-max  flex justify-center'>
          <div className='grid grid-cols-3 w-full    justify-evenly'>
            {
              posts.map((obj) => {

                return (


                  <img src={PF + obj.img} className=' w-full md:h-[290px]  h-[180px] p-2  ' />

                )
              })
            }


          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile