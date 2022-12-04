import axios from 'axios'
import React, { useEffect, useState } from 'react'
import pro1 from '../../assets/images/pro1.jpg'
import pro2 from '../../assets/images/pro2.jpg'
import pro4 from '../../assets/images/pro4.jpg'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'






function RightSide() {

  const [users, SetUsers] = useState([])
  const [user, SetUser] = useState()
  const [updation, SetUpdation] = useState(false)



  const userDetails = useSelector(state => state.user)
  const userId = userDetails._id

  

  /* ---------------------------- SUGGESTED FRIENDS --------------------------- */

  useEffect(() => {
    try{
    
    const suggestFriends = async(userId)=>{
      
       let response = await Axios.get(`http://localhost:4000/suggest/${userId}`)

        SetUsers(response.data)

    }
    suggestFriends(userId)

    }catch(error){

    }

}, [updation])



/* ------------------------------- FOLLOW USER ------------------------------ */
const follow = (async (id, e) => {


  try{

    e.preventDefault()
    await Axios.
    put(`http://localhost:4000/follow/${id}`,
     { userId: userId })
  
      SetUpdation(!updation)
  
  }catch(error){

  }

})






return (
  <div className=' w-full h-full border-slate-300 border overflow-hidden rounded-2xl z-0 '>
    <div className=' w-full h-full  '>
      <div className=' py-5 space-y-3 mt-4 p-3 rounded-2xl'>
        <div className='w-2/3 h-10  flex items-center justify-start'>


          <div className=' flex justify-center font-semibold  text-xl'>Suggusted

          </div>


        </div>
        <div className='  space-y-2 w-full h-48'>



          {
            users.map((obj) => {

              return (
                <div className='w-full h-16  flex items-center justify-between rounded-2xl  hover:cursor-pointer'>
                  <Link to={`/profile/${obj.username}`} state={{userID : obj._id }}className='flex items-center'>


                    <div className='w-max h-full flex rounded-2xl '>
                      <img src={pro2} className='rounded-full  w-14 h-14 flex border  ' />

                    </div>
                    <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>{obj.username}

                    </p>
                  </Link>

                  <p className='items-center px-4 py-2 shadow-md hover:bg-slate-200 bg-slate-100' onClick={(e) => { follow(obj._id, e) }}>FOLLOW</p>
                </div>
              )


            }
            )

          }




          {/* <div className='w-max h-16  flex items-center rounded-2xl  hover:cursor-pointer'>

              <div className='w-max h-full flex rounded-2xl '>
                <img src={pro3} className='rounded-full bg-green-200 w-16 h-16 flex  border ' />

              </div>
              <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Vishal Varghese

              </p>



            </div>
            <div className='w-max h-16  flex items-center rounded-2xl  hover:cursor-pointer'>

              <div className='w-max h-full flex rounded-2xl '>
                <img src={pro1} className='rounded-full bg-green-200 w-16 h-16 flex' />

              </div>
              <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Abhi s

              </p>


            </div> */}


        </div>






      </div>
      <div className='w-full border z-0'></div>
      <div className=' py-5 space-y-3 mt-4 p-3 rounded-2xl'>
        <div className='w-2/3 h-10  flex items-center justify-start'>


          <div className=' flex justify-center font-semibold  text-xl'>Online

          </div>


        </div>
        <div className=' overflow-y-scroll space-y-2 w-full h-48 no-scrollbar'>
          <div className='w-max h-16  flex items-center rounded-2xl  hover:cursor-pointer'>

            <div className='w-max h-full flex rounded-2xl '>
              <img className='rounded-full  w-14 h-14 flex' src={pro4} />

            </div>
            <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Anfal A R

            </p>
            <div className='w-3 h-3 bg-green-700 rounded-full'>

            </div>


          </div>
          <div className='w-max h-16  flex items-center rounded-2xl  hover:cursor-pointer'>

            <div className='w-max h-full flex rounded-2xl '>
              <img className='rounded-full  w-14 h-14 flex' src={pro2} />

            </div>
            <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Arvind S

            </p>
            <div className='w-3 h-3 bg-green-700 rounded-full'>

            </div>


          </div>
          <div className='w-max h-16  flex items-center rounded-2xl  hover:cursor-pointer'>

            <div className='w-max h-full flex rounded-2xl '>
              <img className='rounded-full bg-green-200 w-16 h-16 flex' />

            </div>
            <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Rahul Kumar

            </p>
            <div className='w-3 h-3 bg-green-700 rounded-full'>

            </div>


          </div>
          <div className='w-max h-16  flex items-center rounded-2xl  hover:cursor-pointer'>

            <div className='w-max h-full flex rounded-2xl '>
              <img className='rounded-full bg-green-200 w-16 h-16 flex object-fit' src={pro1} />

            </div>
            <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Britto Vincent

            </p>
            <div className='w-3 h-3 bg-green-700 rounded-full'>

            </div>

          </div>




        </div>






      </div>


    </div>

  </div>

)
}

export default RightSide