import React, { useEffect, useState } from 'react'
import { getUser } from '../../API/User';

function Conversation({ data, currentUser, online }) {

  const [userData, SetUserData] = useState(null)

  /* ------------------------------ GET USER DATA ----------------------------- */

   useEffect(() => {

    const userId = data.members.
    find((id)=>id!== currentUser)
    const getUserData = async (userId) => {

      try {
        const { data } = await getUser(userId)
        SetUserData(data)

      } catch (error) {
        console.log(error)

      }

    }
    getUserData(userId)

  }, [])

  

  
  return (
    <div>
  
      <div>
        <a
          class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
          <img class="object-cover w-10 h-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
          <div class="w-full pb-2">
            <div class="flex flex-col justify-start">
              <span class="flex ml-2 font-semibold text-gray-600  justify-start">{userData?.username}</span>
              <span class=" flex ml-2 text-sm text-gray-600 justify-start">{online? "online" : "offline"}</span>
            </div>
            {/* <span class="block ml-2 text-sm text-gray-600">bye</span> */}
          </div>
        </a>
      </div>

    </div>
  )
}

export default Conversation