import React, { useState, useRef, useEffect } from 'react'
import { HiOutlineUserGroup, HiUserAdd } from 'react-icons/hi'
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { BsEmojiSmile } from 'react-icons/bs'
import { BsFillBookmarkFill } from 'react-icons/bs'
import Axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import ImageUpload from '../../assets/images/uploadimage2.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../redux/userRedux'
import avatar from '../../assets/images/avatar.jpg'
import './sidebar.css'


function Sidebar() {
  const navigate = useNavigate()
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
        await Axios.
          post('http://localhost:4000/upload', data)

        await Axios.
          post('http://localhost:4000/post', newPost)
        window.location.reload()

      } catch (err) {
        console.log(err);
      }
    }
  }

  /* -------------------------- VIEW FRIEND REQUESTS -------------------------- */

  useEffect(() => {

    const userId = userDetails._id
    const userReq = async (userId) => {

      try {

        let response = await Axios.
          get(`http://localhost:4000/friendRequest/${userId}`)
        setRequest(response.data)
      } catch (error) {

        console.log(error, "what is error")
      }

    }

    userReq(userId)
  }, [requestUpdate])

  /* -------------------------- VIEW GROUP SUGGESTION ------------------------- */


  useEffect(() => {
    const suggetGroup = async () => {
      try {

        let response = await Axios.
          get('http://localhost:4000/group/suggestions')
        SetGroup(response.data)

      } catch (error) {

        console.log(error)

      }
    }

    suggetGroup()

  }, [])


  /* ----------------------------- ACCEPT REQUEST ----------------------------- */

  const onHandleAcc = async (id, e) => {

    e.preventDefault()
    try {
      await Axios.
        post(`http://localhost:4000/acceptRequest/${id}`,
          { userID: userDetails._id })
      setRequestUpdate(!requestUpdate)

    } catch (error) {

    }
  }

  /* ----------------------------- DECLINE REQUEST ---------------------------- */

  const onHandleDec = async (id, e) => {

    e.preventDefault()
    try {
      await Axios.post(`http://localhost:4000/declineRequest/${id}`,
        { userID: userDetails._id })
      setRequestUpdate(!requestUpdate)

    } catch (error) {


    }
  }


  return (
    <div className='hidden md:block z-10'>
      <div className=' w-full h-full   overflow-hidden rounded-2xl '>
        <div className=' w-full h-full  '>
          <div className=' py-5 gap-y-2 grid p-3 w-full rounded-2xl '>
            <NavLink to='/savedPosts' className='w-full  h-max'>
              <div className='w-[66px] md:w-full bg-inherit shadow-inherit  h-[66px]  flex items-center justify-center lg:justify-start rounded hover:bg-gray-300 hover:cursor-pointer'>

                <div className='w-max h-full flex items-center justify-center rounded-2xl  hover:cursor-pointer '>
                  <div className='w-14 h-14 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '>

                    <BsFillBookmarkFill className='text-xl text-white ' />
                  </div>
                  <p className='hidden  lg:block   font-medium p-2 text-xl block:sm '>Saved

                  </p>


                </div>
              </div>
            </NavLink>

            <div className='w-full  h-max hover:bg-gray-300' onClick={(e) => { setReqMod(!reqMod) }}>
              <div className='w-[66px] md:w-full bg-inherit shadow-inherit  h-[66px]  flex items-center justify-center lg:justify-start rounded  hover:cursor-pointer' >
                <div className='w-max h-16  flex items-center rounded-2xl justify-center hover:cursor-pointer'>

                  <div className='w-14 h-14 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' >

                    <HiUserAdd className='text-2xl text-white' />
                  </div>
                  <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Follow Request

                  </p>


                </div>
              </div>
            </div>
            <NavLink to='/view/groups' className='w-full  h-max'>
              <div className='w-[66px] md:w-full bg-inherit shadow-inherit  h-[66px]  flex items-center justify-center lg:justify-start rounded hover:bg-gray-300 hover:cursor-pointer'>
                <div className='w-max h-16  flex items-center rounded-2xl justify-center hover:cursor-pointer' >


                  <div className='w-14 h-14 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' >

                    <HiOutlineUserGroup className='text-2xl text-white ' />
                  </div>
                  <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Groups

                  </p>

                </div>
              </div>
            </NavLink>
            <Link to='/' className='w-full  h-max ' onClick={(e) => { setPostMod(true) }}>
              <div className='w-[66px] md:w-full bg-inherit shadow-inherit  h-[66px]  flex items-center justify-center lg:justify-start rounded hover:bg-gray-300 hover:cursor-pointer'>
                <div className='w-max h-16  flex items-center rounded-2xl justify-center hover:cursor-pointer' >


                  <div className='w-14 h-14 bg-sky-900  rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '>

                    <AiOutlinePlus className='text-lg text-white z-10' />
                  </div>
                  <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Posts

                  </p>

                </div>
              </div>
            </Link>
          </div>
          <div className='w-full border '></div>
          <div className=' py-5 space-y-3 mt-1 p-3 rounded-2xl'>
            <div className='w-max h-10  flex items-center justify-center'>


              <div className=' flex justify-start font-medium  text-xl'>Groups

              </div>


            </div>
            <div className=' overflow-y-scroll space-y-2 w-full h-32 no-scrollbar'>

              {group.map((obj) => {

                return (

                  <Link to={`/group/${obj._id}`} className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

                    <div className='w-max h-full flex rounded-2xl '>
                      {obj.groupProfile ?
                        <img src={PF + obj.groupProfile} className='rounded-full bg-green-200 w-14 h-14 flex z-10' />
                        :

                        <img src={avatar} className='rounded-full bg-green-200 w-14 h-14 flex z-10' />


                      }

                    </div>
                    <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>{obj.groupName}

                    </p>


                  </Link>
                )

              })}



            </div>






          </div>


        </div>

      </div>
      {postMod ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent"
          >
            <div className='items-center p-5  fixed top-5 right-5 mt-10' onClick={close}>
              <AiOutlineClose className='text-white text-2xl' />
            </div>
            <div className='md:w-4/6 lg:w-2/6 bg-white md:m-5 sm:w-5/6 w-full mt-5 rounded-2xl m-2 border-slate-300  shadow-xl border '>

              <div className='flex justify-center'>
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
                    <input hidden id='fileupload' type='file' name='file' onChange={handleImage} />
                  </div>
                </div>
                <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                  <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                  <textarea placeholder='Write a caption' name='description' className='h-full w-9/12 bg-white text-area flex items-center p-1' onChange={(e) => { SetDesc(e.target.value) }}></textarea>


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
                              <div className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '>

                                <HiUserAdd className='text-2xl text-white' />
                              </div>
                              <div className='flex justify-center item-center'>{obj.username}</div>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <div className='flex items-center rounded-xl bg-blue-700 p-1' onClick={(e) => { onHandleDec(obj._id, e) }}>
                                <div className='w-4 h-4 bg-blue rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' >

                                  <HiUserAdd className='text-xl text-white' />
                                </div>

                                <p className='text-sm text-white'>Decline</p>
                              </div>
                              <div className='flex items-center rounded-xl bg-blue-700 p-1 cursor-pointer' onClick={(e) => { onHandleAcc(obj._id, e) }}>
                                <div className='w-4 h-4 bg-blue rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' >

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

    </div>


  )
}

export default Sidebar