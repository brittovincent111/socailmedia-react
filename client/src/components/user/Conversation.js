import React, { useEffect, useState } from 'react'
import { getUser } from '../../API/User';
import avatar from '../../assets/images/avatar.jpg'


function Conversation({ data, currentUser, online }) {

  const [userData, SetUserData] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER


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
            {  
            userData?.profilePicture ? 
                <img class="object-cover w-10 h-10 rounded-full" src={PF + userData?.profilePicture}
                alt="username" />
                : <img class="object-cover w-10 h-10 rounded-full" src={avatar}
                alt="username" />

            }
          
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