import React, { useState, useRef, useEffect, useContext } from 'react'

import { HiOutlineUserGroup, HiUserAdd } from 'react-icons/hi'
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { BsEmojiSmile } from 'react-icons/bs'
import { BsFillBookmarkFill } from 'react-icons/bs'
import Axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import ImageUpload from '../../assets/images/uploadimage2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../redux/userRedux'
import { UserUpdation } from '../../UpdationContext/UpdationContext.js'
import userInstance from '../../API/userApi'
import axios from 'axios'
import avatar from '../../assets/images/avatar.jpg'









 export default function MobileView() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const imageRef = useRef(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const userDetails = useSelector(state => state.user)
  


  const [desc, SetDesc] = useState("")
  const [file, SetFile] = useState("")
  const [postMod, setPostMod] = useState(false);
  const [reqMod, setReqMod] = useState(false);
  const [request, setRequest] = useState([]);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [group, SetGroup] = useState([])
  const [postImage, setPostImage] = useState()
  const [showImage, setShowImage] = useState()
  const { feedUpdate, setFeedUpdate } = useContext(UserUpdation)


  console.log(request, "rrrrrrrrrrrrr")

    /* --------------------------- HANDLE UPLOAD IMAGE -------------------------- */

    const handleImage = (e) => {
      setShowImage(URL.createObjectURL(e.target.files[0]))
      SetFile(e.target.files[0])
    }
  
    /* --------------------------- UPLOAD CLOSE MODAL --------------------------- */
  
    const close = () => {
      setPostMod(false)
      setShowImage()
      SetFile()
    }
  
  
  
    /* ---------------------------- IMAGE CLOSE MODAL --------------------------- */
    const imageClose = () => {
  
      setShowImage()
      SetFile()
  
    }
  
  
    /* -------------------------------- ADD POST -------------------------------- */
  
    const onSubmit = async (e) => {
      e.preventDefault()
      const newPost = {
        userId: userDetails._id,
        desc: desc,
      }
      if (file) {
        const data = new FormData();
        const fileName = file.name
        data.append("file", file)
        data.append("name", fileName)
        newPost.img = fileName
        try {
          await axios.
            post('http://localhost:4000/upload', data)
  
          await axios.
            post('http://localhost:4000/post', newPost)
          setFeedUpdate(!feedUpdate)
          setPostMod(!postMod)
        } catch (err) {
          // Navigate('/errorPage')
        }
      }
    }
  
    /* -------------------------- VIEW FRIEND REQUESTS -------------------------- */
  
    useEffect(() => {
  
      const userId = userDetails._id
      const userReq = async (userId) => {
  
        try {
  
          let response = await userInstance.
            get(`/friendRequest/${userId}`)
          setRequest(response.data)
        }catch(error){
         
          if (error?.response?.status === 403) {
            localStorage.removeItem('userToken')
            localStorage.removeItem('user')
            Navigate("/login")
         }else{
           Navigate('/errorPage')
         }
    
          
        }
  
      }
  
      userReq(userId)
    }, [requestUpdate])
  
    /* -------------------------- VIEW GROUP SUGGESTION ------------------------- */
  
  
    useEffect(() => {

        try {
          const suggetGroup = async () => {

          let response = await userInstance.
            get('/group/suggestions')
          SetGroup(response.data)
        }
  
        suggetGroup()
  
        } catch(error){
         
          if (error?.response?.status === 403) {
            localStorage.removeItem('userToken')
            localStorage.removeItem('user')
            Navigate("/login")
         }else{
           Navigate('/errorPage')
         }
    
          
        }
      
  
    }, [])
  
  
    /* ----------------------------- ACCEPT REQUEST ----------------------------- */
  
    const onHandleAcc = async (id, e) => {
  
      e.preventDefault()
      try {
        await userInstance.
          put(`/acceptRequest/${id}`,
            { userID: userDetails._id })
        setRequestUpdate(!requestUpdate)
  
      } catch(error){
         
        if (error?.response?.status === 403) {
          localStorage.removeItem('userToken')
          localStorage.removeItem('user')
          Navigate("/login")
       }else{
         Navigate('/errorPage')
       }
  
        
      }
    }
  
    /* ----------------------------- DECLINE REQUEST ---------------------------- */
  
    const onHandleDec = async (id, e) => {
  
      e.preventDefault()
      try {
        await userInstance.put(`/declineRequest/${id}`,
          { userID: userDetails._id })
        setRequestUpdate(!requestUpdate)
  
      } catch(error){
         
        if (error?.response?.status === 403) {
          localStorage.removeItem('userToken')
          localStorage.removeItem('user')
          Navigate("/login")
       }else{
         Navigate('/errorPage')
       }
  
        
      }
    }





    return (
     <>
        <div className='w-full h-full bg-sky-900 flex justify-around p-2'>
            <Link to='/savedPosts' className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <BsFillBookmarkFill className='text-2xl' />
            </Link>
            <div onClick={(e) => { setReqMod(!reqMod) }} className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center ' >
                <HiUserAdd className='text-2xl' />
            </div>
            <div className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center ' onClick={(e) => { setPostMod(!postMod) }}>
                <AiOutlinePlus  text-2xl />
            </div>
            <Link to='/view/groups' className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <HiOutlineUserGroup className='text-2xl' />
            </Link>
            {/* <div  className='flex items-center bg-white p-2  rounded-full md:hover:bg-gray-100 cursor-pointer w-12 h-12 justify-center '>
                <AiOutlineLogout className='text-2xl'/>
            </div> */}
            
        </div>

        {postMod ? (
        <>

          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent"

          >               
           <AiOutlineClose className='text-white text-2xl fixed right-5 top-5' onClick={(e) => { setPostMod(!postMod) }} />
            <div className='md:w-4/6 lg:w-2/6 bg-white md:m-5 sm:w-5/6 w-full mt-5 rounded-2xl m-2 border-slate-300  shadow-xl border '>

              <div className='flex justify-center pr-5 items-center'>
                <div className='items-center flex justify-center border-b-0 p-5 font-medium text-xl'>Add Post </div>

              </div>
              <form onSubmit={onSubmit}>
                <div className='w-full h-max bg-white py-2  border-t-2 border-black'>
                  <div className='w-full h-1/2  px-1 flex items-center flex-col justify-center py-3'>
                    {/* <div className='text-sm font-medium'>Add Images</div> */}
                    {showImage ? <span >
                      <div onClick={imageClose}>     <AiOutlineClose className='text-black text-2xl' /></div>
                      <img src={showImage} alt="" className='h-[200px] w-[200px] ' />
                    </span> :
                      <div className='h-[290] w-[290] '>
                        <label name='image' htmlFor='fileupload' >
                          <img src={ImageUpload} className="h-52 w-52" />
                        </label>
                      </div>
                    }
                    <input hidden id='fileupload' type='file' name='file' onChange={handleImage} required />
                  </div>
                </div>
                <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                  <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                  <textarea placeholder='Write a caption' name='description' className='h-full w-9/12 bg-white text-area flex items-center p-1' onChange={(e) => { SetDesc(e.target.value) }} required />


                  <button type='submit' className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal '>POST</button>

                </div>
              </form>

            </div>
          </div>

          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}



      {reqMod ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent"
          >
            <div className='items-center p-5  fixed top-5 right-5 mt-10' onClick={(e) => { setReqMod(!reqMod) }}>
              <AiOutlineClose className='text-white text-2xl' />
            </div>
            <div className='md:w-4/6 lg:w-2/6 bg-white md:m-5 sm:w-5/6 w-full mt-5 rounded-2xl m-2 border-slate-300 h-[400px]  shadow-xl border '>

              <div className='flex justify-center h-max'>
                <div className='items-center flex justify-center border-b-0 p-5 font-medium text-xl'>Follow Requests </div>

              </div>

              <div className='w-full h-[300px] bg-white py-2  border-t-2 border-black'>
                <div className='m-6 h-full  '>

                  {
                    request?.length != 0 ?


                      request.map((obj) => {
                        return (
                          <div className='flex  justify-evenly items-center w-full  space-x-2 ' >
                            <div className="flex   items-center w-full space-x-2">
                              {obj.profilePicture ?
                                <img src={PF + obj.profilePicture} className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' />
                                : <img src={avatar} className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' />

                              }


                              <div className='flex justify-center item-center'>{obj.username}</div>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <div className='flex items-center rounded-xl bg-red-600 hover:bg-red-400 py-2 px-4' onClick={(e) => { onHandleDec(obj._id, e) }}>
                                <div className='w-4 h-4 bg-blue rounded-full m-1 flex justify-center items-center  ' >

                                  <HiUserAdd className='text-xl text-white' />
                                </div>

                                <p className='text-sm text-white'>Decline</p>
                              </div>
                              <div className='flex items-center rounded-xl bg-blue-700 hover:bg-blue-500 py-2 px-4 cursor-pointer' onClick={(e) => { onHandleAcc(obj._id, e) }}>
                                <div className='w-4 h-4 bg-blue rounded-full m-1 flex justify-center items-center  ' >

                                  <HiUserAdd className='text-xl text-white' />
                                </div>

                                <p className='text-sm text-white'>Accept</p>
                              </div>
                            </div>
                          </div>
                        )
                      })

                      :
                      <div className='flex flex-col w-full justify-center items-center h-full  '>
                        <HiUserAdd className='text-[60px]' />
                        <div className='text-xl'>No Requests</div>

                      </div>

                  }
                </div>
              </div>


            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
       
     

          </>


    )
}

