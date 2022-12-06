import React, { useEffect, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { HiLockClosed } from 'react-icons/hi'
import { SlUserFollow, SlUserFollowing, SlUserUnfollow } from 'react-icons/sl'
import { getUser } from '../../API/User'
import avatar from '../../assets/images/avatar.jpg'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart, AiOutlineFileSync, AiOutlineComment } from 'react-icons/ai'
// import {FaRegComment} from 'react-icons/fa'
import { FaComment, FaRegComment } from 'react-icons/fa'

import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import e from 'cors'
import { newUserChat } from '../../API/chatRequest'

// import Axios from 'axios'




function Profile() {

  const [data, SetData] = useState()
  const [posts, SetPosts] = useState([])
  const [userDetail, SetUserDetails] = useState()
  const [showMod, SetShowMod] = useState(false)
  const [file, setFile] = useState("")
  const [updateDetails, SetUpdateDetails] = useState("Details")
  const [edit, SetEdit] = useState([])
  const [updation, setUpdation] = useState(false)
  const [editMod, SetEditMod] = useState(false)
  const [ desc , setDesc] = useState({ desc :"" , img : "" , postId:""})


  const Navigate = useNavigate()
  const userDetails = useSelector(state => state.user)
  const userName = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const userID = useLocation().state.userID


  /* ------------------------------ GET USER DATA ----------------------------- */

  useEffect(() => {

    const getUserData = async () => {

      try {
        const { data } = await getUser(userDetails._id)
        SetUserDetails(data)

      } catch (error) {

        // console.log(error)

      }

    }
    getUserData()


  }, [updation])


  /* ---------------------------- PROFILE USER DATA --------------------------- */

  useEffect(() => {
    
    let userPro= async(userID)=>{

       await axios.
       get(`http://localhost:4000/userprofile/${userID}`).
       then((response) => {
        SetData(response.data)

      }).then((data) => {
        axios.
        get(`http://localhost:4000/viewProfilePosts/${userID}`).
        then((response) => {
          SetPosts(response.data)

        }).catch((error) => {
  
          console.log(error)
        })
      }).catch((error) => {
  
        console.log(error)
      })

    }
    userPro(userID)
   
  }, [userID, userName, updation])


/* ------------------------------ EDIT PROFILE ------------------------------ */

  const handleEdit = async (e) => {

    e.preventDefault()
    const newEdit = {
      ...edit
    }
    if (file) {
      const datas = new FormData();
      const fileName = file.name
      datas.append("file", file)
      datas.append("name", fileName)
      edit.profilePicture = fileName
      try {
        await axios.
        post('http://localhost:4000/upload', datas)
        console.log(datas, "data");

      } catch (error) {
        console.log(error);
      }
    }
    try {
      console.log("suiiiiiiiii")
      await axios.
      post(`http://localhost:4000/update/${userDetail._id}`, 
      { ...edit }).
      then((response) => {

        setUpdation(!updation)
        SetShowMod(!showMod)
      })



    } catch (err) {
      console.log(err);
    }
  }
  
  /* ------------------------------ HANDLE CHANGE ----------------------------- */

  const handleChange = (e) => {

    SetEdit({ ...edit, [e.target.name]: e.target.value })

  }

  /* --------------------------- SET EDIT POST STATE -------------------------- */

  const editPost=(desc,img,id ,e )=>{
    e.preventDefault()
    setDesc({desc : desc , img : img , postId :id})
    SetEditMod(!editMod) 
  }

  const updateDesc =async(e,postId)=>{
    e.preventDefault(e)

    try{
      const Desc = { desc : desc.desc , postId : desc.postId }
     let data = await axios.
     put('http://localhost:4000/post/edit',
       Desc  )

     SetEditMod(!editMod)
     setDesc({img:"",desc:"",postId :""})    
            

    }catch(error){

      console.log(error)

    }

  }

  /* ----------------------------- FOLLOW REQUEST ----------------------------- */

  
const follow = async (e) => {
   

  try{
    e.preventDefault()
    let response  = await axios.
    put(`http://localhost:4000/follow/${userID}`,
     { userId: userDetails._id })
  
      console.log(response);
      setUpdation(!updation)

  }
  catch(error){

    console.log(error)
  }


}

/* ----------------------------- CANCEL REQUEST ----------------------------- */
const cancelRequest = async (e) => {
  
  try{
    e.preventDefault()
  let response = await axios.
  put(`http://localhost:4000/cancelRequest/${userID}`,
  { userID: userDetails._id })

    setUpdation(!updation)

  }catch(error){

    console.log(error)
  }
}

/* ----------------------------- ACCEPT REQUEEST ---------------------------- */

const acceptRequest = async (e) => {
  try{
    e.preventDefault()
    await axios.put(`http://localhost:4000/acceptRequest/${userID}`,
     { userID: userDetails._id })
      setUpdation(!updation)

  }
   catch(error){

    console.log(error)
  }
}

/* ----------------------------- DECLINE REQUEST ---------------------------- */
const declineRequest = async (e) => {
  
  try{
    e.preventDefault()
    await axios.
    put(`http://localhost:4000/declineRequest/${userID}`, 
    { userID: userDetails._id })
  
      setUpdation(!updation)

  }catch(error){

    console.log(error)
  }


}

/* ---------------------------- UNFOLLOW REQUEST ---------------------------- */

const unFollow = async (e) => {
  try{
    
  e.preventDefault()
  await axios.
  put(`http://localhost:4000/unfollow/${userID}`, 
  { userID: userDetails._id })

    setUpdation(!updation)

  }catch(error){

    console.log(error)
  }
}

 /* ------------------------------ SEND MESSAGE ------------------------------ */

 const onHandleMessage =async()=>{
  let users = {

    senderId : userDetail._id,
    receivedId : userID
  }
  try{

    const {data} = await newUserChat(users)
    Navigate('/message')
  }catch(error){

    console.log(error)
  }
}


  return (
    <div className='w-3/4 flex justify-center bg-gray-100  overflow-y-auto no-scrollbar'>
      

      <div className='md:w-11/12 w-full bg-white   h-full'>
        {/* profile details  */}


        <div className=' h-max w-full  grid md:grid-cols-2 lg:grid-cols-3'>
          <div className=' h-full  flex-col flex justify-center items-center md:p-10'>
            <div >
              {
                data?.profilePicture ?
                  <img className='w-44 h-44 shadow-xl bg-red-500 rounded-full mb-10 mt-5' src={PF + data?.profilePicture} />
                  :
                  <img className='w-44 h-44 shadow-2xl bg-red-500 rounded-full mb-10 mt-5' src={avatar} />
              }
            </div>
            <div className='font-semibold  text-xl'>{data?.username}</div>
          </div>
          <div className='  h-32 md:h-full lg:h-full   flex  justify-center items-center'>
            <div className=' flex flex-col md:justify-start justify-center'>
              {(userDetail?._id == data?._id) ?
                <div className='flex items-center   space-x-2 shadow-md rounded-2xl p-2 bg-gray-100 w-max' onClick={(e) => { SetShowMod(!showMod) }}>
                  <div><FiSettings /> </div>
                  <div className='font-semibold  text-base '>Edit Profile</div>

                </div>
                : (userDetail?.following.includes(data?._id)) ?
                <div className='flex items-center  p-2 space-x-3 w-max'>
                <div  onClick={unFollow} className='flex items-center space-x-2 shadow-md rounded-2xl p-2 bg-gray-100  hover:bg-gray-400 w-max'>
                    <div><FiSettings /> </div>
                    <div className='font-semibold  text-base'>unfollow</div>

                  </div>
                <div  onClick={onHandleMessage} className='flex items-center space-x-3 shadow-md rounded-3xl p-2 hover:bg-gray-400 hover:text-black bg-sky-900 w-max'>
                  <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                  <div className='font-semibold  text-base hover:text-black text-white'>Message</div>

                </div>
              </div>
                   : (userDetail?.requestTo.includes(data?._id)) ?
                    <div onClick={cancelRequest} className='flex items-center space-x-3 shadow-md rounded-3xl p-2  bg-sky-900 w-max'>
                      <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                      <div className='font-semibold  text-base text-white'>Cancel</div>
                    </div>
                    : (userDetail?.requestFrom.includes(data?._id)) ?
                      <div className='flex items-center shadow-md p-2 space-x-3 w-max'>
                        <div onClick={acceptRequest} className='flex items-center space-x-3 rounded-3xl p-2 bg-sky-900 w-max'>
                          <div className='rounded-full bg-white '><SlUserFollowing className='text-lg m-1.5' /> </div>

                          <div className='font-semibold  text-base text-white'>Accept</div>
                        </div>
                        <div onClick={declineRequest} className='flex items-center space-x-3 shadow-md rounded-3xl p-2 bg-gray-400 w-max'>
                          <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                          <div className='font-semibold  text-base text-white'>Decline</div>

                        </div>
                      </div>

                      :
                      <div className='flex items-center space-x-3 shadow-md rounded-3xl p-2 bg-sky-900 w-max' onClick={(e) => { follow(e) }}>
                        <div className='rounded-full bg-white '><SlUserFollow className='text-lg m-1.5' /> </div>
                        <div className='font-semibold  text-base text-white'>follow</div>
                      </div>

              }
              <div className='flex items-center  space-x-3 rounded-2xl p-2  w-max'>
                <div className='flex justify-center items-center space-x-2'>
                  <p className='font-semibold  text-xl'>{data?.following?.length}</p>
                  <p className='font-semibold  text-base'>followers</p>
                </div>
                <div className='flex justify-center items-center space-x-2'>
                  <p className='font-semibold  text-xl '>45</p>
                  <p className='font-semibold  text-base'>Posts</p>
                </div>


              </div>


              <div className='flex justify-start font-semibold p-2 text-base'>{data?.about}</div>
            </div>

          </div>
          <div className='hidden lg:block'></div>


        </div>

        {/* center  */}
        <div className="h-16 shadow-lg items-center border border-white bg-sky-900 m-2">
          <div className='flex items-center h-full justify-center space-x-3' >
            <div><BsFillGrid1X2Fill className='font-semibold  text-xl text-white' /></div>
            <div className='font-semibold  text-xl text-white'>POST</div>
          </div>


        </div>
        {/* posts */}
        <div className='w-full h-max  flex justify-center bg-white pt-5 px-5'>
          {

            (userDetail?._id == data?._id) || (userDetail?.following.includes(data?._id)) ?
              <div className='grid grid-cols-3 z-10 w-full gap-6 justify-evenly'>

                {
                  posts.map((obj) => {

                    return (

                      <div className='group relative md:px-5 w-full md:h-[290px] shadow-lg sm:h-[260px] h-[200px]  items-center flex justify-center '>

                        <img src={PF + obj.img} className='h-full w-full ' />
                        <div className='absolute grid place-items-center bg-transparent duration-500  group-hover:bg-[#00000096] w-full h-full z-20'>
                          <div className='text-transparent group-hover:text-white flex text-lg   justify-center items-center'>
                            {(userDetail?._id == data?._id) ?

                              <div className='absolute top-2 right-2 text-xl' onClick={(e)=>{editPost(obj?.desc,obj.img, obj._id,e)} }><BsThreeDots /></div> : null
                            }
                            <div>
                              <div className='text-3xl flex justify-center items-center'><AiFillHeart /></div>
                              <div className='text-normal  justify-center items-center' >{obj.likes.length}</div>
                            </div>
                            {/* <div>

                             <div className='text-2xl flex justify-center items-center'><FaComment/></div>
                             <div className='Pt-2 text-normal  justify-center items-center'></div>
                              </div> */}
                          </div>
                        </div>
                      </div>

                    )
                  })
                }



              </div>


              : <div className='flex justify-center shadow-md w-full h-[200px] bg-gray-200 m-5'>
                <div className='flex items-center'>
                  <div className='rounded-full bg-white'>

                    <HiLockClosed className='m-5 text-2xl' />
                  </div>
                  <p className='m-5 text-lg'>This Account Is Locked</p>

                </div>


              </div>
          }
        </div>

      </div>
    
      {showMod ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit your details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(!showMod)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative  flex justify-start items-center">
                  <div className='flex flex-col px-2 justify-start items-center'>
                    <div className='flex flex-col p-2 justify-start items-center' onClick={(e) => { SetUpdateDetails("Details") }}>Details</div>
                    <hr />
                    <div className='flex flex-col p-2 justify-start items-center' onClick={(e) => { SetUpdateDetails("photo") }}>Profile Photo</div>
                    <hr />
                    {/* <div className='flex flex-col p-2 justify-start items-center' onClick={(e) => { SetUpdateDetails("password") }}>Password</div> */}


                  </div>
                  {updateDetails == "Details" ?
                    <div className='flex flex-col justify-between items-center px-2'>
                      <div className='flex justify-start items-center'>
                        <label name='username'
                          className='p-2'
                        >username</label>
                        <input
                          className='p-2 m-2 border'
                          type="text"

                          name="username"
                          placeholder="Enter the username"
                          onChange={handleChange}
                        />


                      </div>


                      <div className='flex justify-start items-center p-2'>
                        <label name='username' className='p-2'>full name</label>
                        <input
                          className=' m-2 p-2 border'
                          type="text"
                          name="userfullname"
                          placeholder="fullName"
                          onChange={handleChange}

                        />
                      </div>
                      <div className='flex justify-start items-center'>
                        <label name='about' className='p-2'>About</label>
                        <input
                          className=' p-2 m-2 border'
                          type="about"
                          name="about"
                          placeholder="About "
                          onChange={handleChange}
                        />
                      </div>
                    </div> :

                    updateDetails == "photo" ?

                      <input className=' p-2'
                        type="file" name='file' id='file' onChange={(e) => {
                          // setImage(URL.createObjectURL(e.target.files[0]))
                          { setFile(e.target.files[0]) }
                        }

                        } /> : null





                  }
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetShowMod(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {editMod ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto p-2 fixed inset-0 z-50 outline-none focus:outline-none  ">

            <div className='w-[450px] rounded-2xl px-5 bg-gray-100'>
              <div className='h-14  w-full  flex justify-between items-center  rounded-t-2xl'>
                <div className='w-max h-max p-5 rounded-xl ' onClick={(e)=>{setDesc({desc:"" , img:""} , SetEditMod(!editMod))}}>Cancel</div>
                <div className='w-max h-max px-4 py-2 rounded-xl bg-sky-900 text-white font-base' onClick={updateDesc}>Done</div>
              </div>
              <div className=' h-[300px] bg-gray-200 '>
                <img src={PF + desc.img} className="h-full w-full rounded-xl"/>

              </div>
              <div className=' rounded-b-2xl'>
                <div className='p-2 font-semibold'>Edit Your Description</div>
                <div className='w-full pb-2 px-1  '>
                  <textarea className='w-full p-5 border ' value={desc.desc} onChange={(e)=>{setDesc({...desc ,desc : e.target.value})}}/>
                </div>
              </div >
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>

  )
}

export default Profile