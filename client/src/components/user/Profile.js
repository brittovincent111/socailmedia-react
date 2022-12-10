import React, { useEffect, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { BsFillGrid1X2Fill, BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { HiLockClosed } from 'react-icons/hi'
import { SlUserFollow, SlUserFollowing, SlUserUnfollow } from 'react-icons/sl'
import { getUser, userReportModel } from '../../API/User'
import avatar from '../../assets/images/avatar.jpg'
import { HiOutlineUserGroup, HiUserAdd } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineFileSync, AiOutlineComment } from 'react-icons/ai'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import { newUserChat } from '../../API/chatRequest'
import { update } from '../../redux/userRedux'
import { MdVisibility } from 'react-icons/md'
import userInstance from '../../API/userApi'
import { SiHomeassistantcommunitystore, SiMessenger } from 'react-icons/si'







function Profile() {

  const Navigate = useNavigate()
  const userDetails = useSelector(state => state.user)
  const userName = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const userID = useLocation().state.userID

  const [data, SetData] = useState()
  const [posts, SetPosts] = useState([])
  const [userDetail, SetUserDetails] = useState()
  const [showMod, SetShowMod] = useState(false)
  const [file, setFile] = useState("")
  const [updateDetails, SetUpdateDetails] = useState("Details")
  const [edit, SetEdit] = useState({ userfullname: userDetails.userfullname, username: userDetails.username, about: userDetails?.about })
  const [updation, setUpdation] = useState(false)
  const [editMod, SetEditMod] = useState(false)
  const [desc, setDesc] = useState({ desc: "", img: "", postId: "" })
  const [postMod, setPostMod] = useState(false);
  const [reportValue, setReportValue] = useState("");
  const [reqMod, setReqMod] = useState(false);
  const dispatch = useDispatch()






  /* ------------------------------ GET USER DATA ----------------------------- */

  useEffect(() => {

    const getUserData = async () => {

      try {
        const { data } = await getUser(userDetails._id)
        SetUserDetails(data)

      } catch (error) {

        console.log(error)

      }

    }
    getUserData()


  }, [updation])


  /* ---------------------------- PROFILE USER DATA --------------------------- */

  useEffect(() => {

    let userPro = async (userID) => {

      await userInstance.
        get(`/userprofile/${userID}`).
        then((response) => {
          SetData(response.data)
          console.log(response.data, "dattattatattata");


        }).then((data) => {
          userInstance.
            get(`/viewProfilePosts/${userID}`).
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
      await userInstance.
        post(`/update/${userDetail._id}`,
          { ...edit }).
        then((response) => {
          dispatch(update({ ...data, ...edit }))
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

  /* ------------------------------ SET EDIT POST ----------------------------- */
  const editPost = (desc, img, id, e) => {
    e.preventDefault()
    setDesc({ desc: desc, img: img, postId: id })
    SetEditMod(!editMod)
  }

  /* ---------------------------- EDIT POST DETAILS --------------------------- */

  const updateDesc = async (e, postId) => {
    e.preventDefault(e)

    try {
      const Desc = { desc: desc.desc, postId: desc.postId }
      let data = await userInstance.
        put('/post/edit',
          Desc)

      SetEditMod(!editMod)
      setDesc({ img: "", desc: "", postId: "" })


    } catch (error) {

      console.log(error)

    }

  }

  /* ----------------------------- FOLLOW REQUEST ----------------------------- */


  const follow = async (e) => {


    try {
      e.preventDefault()
      let response = await userInstance.
        put(`/follow/${userID}`,
          { userId: userDetails._id })

      console.log(response);
      setUpdation(!updation)

    }
    catch (error) {

      console.log(error)
    }


  }

  /* ----------------------------- CANCEL REQUEST ----------------------------- */
  const cancelRequest = async (e) => {

    try {
      e.preventDefault()
      let response = await userInstance.
        put(`/cancelRequest/${userID}`,
          { userID: userDetails._id })

      setUpdation(!updation)

    } catch (error) {

      console.log(error)
    }
  }

  /* ----------------------------- ACCEPT REQUEEST ---------------------------- */

  const acceptRequest = async (e) => {
    try {
      e.preventDefault()
      await userInstance.put(`/acceptRequest/${userID}`,
        { userID: userDetails._id })
      setUpdation(!updation)

    }
    catch (error) {

      console.log(error)
    }
  }

  /* ----------------------------- DECLINE REQUEST ---------------------------- */
  const declineRequest = async (e) => {

    try {
      e.preventDefault()
      await userInstance.
        put(`/declineRequest/${userID}`,
          { userID: userDetails._id })

      setUpdation(!updation)

    } catch (error) {

      console.log(error)
    }


  }

  /* ---------------------------- UNFOLLOW REQUEST ---------------------------- */

  const unFollow = async (e) => {
    try {

      e.preventDefault()
      await userInstance.
        put(`/unfollow/${userID}`,
          { userID: userDetails._id })

      setUpdation(!updation)

    } catch (error) {

      console.log(error)
    }
  }

  /* ------------------------------ SEND MESSAGE ------------------------------ */

  const onHandleMessage = async () => {
    let users = {

      senderId: userDetail._id,
      receivedId: userID
    }
    try {

      const { data } = await newUserChat(users)
      Navigate('/message')
    } catch (error) {

      console.log(error)
    }
  }

  /* ------------------------------- REPORT POST ------------------------------ */
  const handleReport = async (e) => {
    try {
      e.preventDefault()
      close();
      const { data } = await userReportModel(userDetail._id, userID, reportValue)


    } catch (error) {


    }


  }

  /* ------------------------------ close modals ------------------------------ */

  const close = () => {
    setPostMod(false)

  }

  console.log(data, edit, "dattaaaadsasdas")


  return (
    <div className='md:w-3/4 w-full flex justify-center bg-gray-100  overflow-y-auto no-scrollbar'>


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
            <div className='font-semibold  text-xl'>{data?.userfullname}</div>
          </div>
          <div className='  h-32 md:h-full lg:h-full   flex  justify-center items-center'>
            <div className=' flex flex-col md:justify-start justify-center'>
              {(userDetail?._id == data?._id) ?
                <div className='flex items-center justify-center  space-x-2 shadow-md rounded-2xl p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer w-max' onClick={(e) => { SetShowMod(!showMod) }}>
                  <div><FiSettings /> </div>
                  <div className='font-semibold  text-base '>Edit Profile</div>

                </div>
                : (userDetail?.following.includes(data?._id)) ?
                  <div className='flex items-center  p-2 space-x-3 w-max'>
                    <div onClick={unFollow} className='flex items-center space-x-2 shadow-md rounded-2xl p-2 bg-gray-100 cursor-pointer hover:bg-gray-400 w-max'>
                      <div><SlUserUnfollow className='text-lg m-1.5' /></div>
                      <div className='font-semibold  text-base'>unfollow</div>

                    </div>
                    <div onClick={onHandleMessage} className='flex items-center space-x-3 shadow-md rounded-3xl p-2 hover:bg-gray-400 cursor-pointer hover:text-black bg-sky-900 w-max'>
                      <div className='rounded-full bg-white '><SiMessenger className='text-lg m-1.5' /> </div>
                      <div className='font-semibold  text-base hover:text-black text-white'>Message</div>

                    </div>
                  </div>
                  : (userDetail?.requestTo.includes(data?._id)) ?
                    <div onClick={cancelRequest} className=' cursor-pointer flex items-center space-x-3 shadow-md rounded-3xl p-2  bg-sky-900 w-max'>
                      <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                      <div className='font-semibold  text-base text-white'>Cancel</div>
                    </div>
                    : (userDetail?.requestFrom.includes(data?._id)) ?
                      <div className='flex items-center shadow-md p-2 space-x-3 w-max'>
                        <div onClick={acceptRequest} className='cursor-pointer flex items-center space-x-3 rounded-3xl p-2 bg-sky-900 w-max'>
                          <div className='rounded-full bg-white '><SlUserFollowing className='text-lg m-1.5' /> </div>

                          <div className='font-semibold  text-base text-white'>Accept</div>
                        </div>
                        <div onClick={declineRequest} className='cursor-pointer flex items-center space-x-3 shadow-md rounded-3xl p-2 bg-gray-400 w-max'>
                          <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                          <div className='font-semibold  text-base text-white'>Decline</div>

                        </div>
                      </div>

                      :
                      <div className='cursor-pointer flex items-center space-x-3 shadow-md rounded-3xl p-2 bg-sky-900 w-max' onClick={(e) => { follow(e) }}>
                        <div className='rounded-full bg-white '><SlUserFollow className='text-lg m-1.5' /> </div>
                        <div className='font-semibold  text-base text-white'>follow</div>
                      </div>

              }
              <div className='flex items-center  space-x-8 rounded-2xl p-2  w-max'>
                <div className='cursor-pointer flex justify-center items-center space-x-2' onClick={(e) => { setReqMod(!reqMod) }}>
                  <p className='font-bold flex justify-center items-center text-base'>{data?.following?.length}</p>
                  <p className='font-semibold  flex justify-center items-center text-base'>followers</p>
                </div>

                <div className='flex justify-center items-center space-x-2'>
                  <p className='font-bold flex justify-center items-center text-base '>{posts?.length}</p>
                  <p className='font-semibold flex justify-center items-center text-base'>Posts</p>
                </div>
                {userDetail?._id != data?._id ?
                  <div onClick={(e) => setPostMod(!postMod)} className='cursor-pointer flex justify-center items-center space-x-2'>
                    <p className='font-semibold  text-lg flex justify-center items-center rounded-sm  bg-gray-100 hover:bg-gray-200 shadow-md h-6 w-6'><BsThreeDots /></p>

                  </div>
                  : null
                }


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
        <div className='w-full h-max  flex justify-center bg-white mt-5 pt-5 px-5'>
          {

            (userDetail?._id == data?._id) || (userDetail?.following.includes(data?._id)) ?
              <div className='grid grid-cols-3 z-10 w-full md:gap-6 gap-1 justify-evenly'>

                {
                  posts.map((obj) => {

                    return (

                      <div className='group relative  w-full md:h-[290px] shadow-lg sm:h-[260px] h-[200px]  items-center flex justify-center '>

                        <img src={PF + obj.img} className='h-full w-full ' />
                        <div className='absolute grid place-items-center bg-transparent duration-500  group-hover:bg-[#00000096] w-full h-full z-20'>
                          <div className='text-transparent group-hover:text-white flex text-lg   justify-center items-center'>
                            {(userDetail?._id == data?._id) ?

                              <div className='absolute top-2 right-2 text-xl' onClick={(e) => { editPost(obj?.desc, obj.img, obj._id, e) }}><BsThreeDots /></div> : null
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
                <div className="flex item-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Profile</h3>

                </div>
                <div className="relative  flex justify-start items-center">
                  <div className='flex flex-col px-2 justify-start '>
                    <div className='flex flex-col p-2 justify-start ' onClick={(e) => { SetUpdateDetails("Details") }}>Details</div>
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
                          value={edit.username}
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
                          value={edit.userfullname}

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
                          value={edit.about}

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
          <form onSubmit={updateDesc}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto p-2 fixed inset-0 z-50 outline-none focus:outline-none  ">

              <div className='w-[450px] rounded-2xl px-5 bg-gray-100'>
                <div className='h-14  w-full  flex justify-between items-center  rounded-t-2xl'>
                  <div className='w-max h-max p-5 rounded-xl ' onClick={(e) => { setDesc({ desc: "", img: "" }, SetEditMod(!editMod)) }}>Cancel</div>
                  <button type='submit' className='w-max h-max px-4 py-2 rounded-xl bg-sky-900 text-white font-base' >Done</button>
                </div>
                <div className=' h-[300px] bg-gray-200 '>
                  <img src={PF + desc.img} className="h-full w-full rounded-xl" />

                </div>
                <div className=' rounded-b-2xl'>
                  <div className='p-2 font-semibold'>Edit Your Description</div>
                  <div className='w-full pb-2 px-1  '>
                    <textarea className='w-full p-5 border ' value={desc.desc} onChange={(e) => { setDesc({ ...desc, desc: e.target.value }) }} required />
                  </div>
                </div >
              </div>
            </div>
          </form>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {
        postMod ?
          <>

            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* {/content/} */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* {/header/} */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Why are you Reporting this?</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={close}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* {/body/} */}
                  <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Violation of someone's privacy" onClick={(e) => { setReportValue(e.target.value) }} checked />
                    <label htmlFor="" className="p-2">Violation of someone's privacy
                    </label>
                  </div>
                  <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Public shaming" onClick={(e) => { setReportValue(e.target.value) }} />
                    <label htmlFor="" className="p-2">Public shaming
                    </label>
                  </div>
                  <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Goes against my beliefs, values or politics" onClick={(e) => { setReportValue(e.target.value) }} />
                    <label htmlFor="" className="p-2">Goes against my beliefs, values or politics
                    </label>
                  </div>
                  <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Supporting or promoting a hate group" onClick={(e) => { setReportValue(e.target.value) }} />
                    <label htmlFor="" className="p-2">Supporting or promoting a hate group
                    </label>
                  </div>


                  {/* {/footer/} */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={close}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button" onClick={handleReport}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-60 bg-black"></div>

          </> : null}
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
                    data.following?.length != 0 ?


                      data.following.map((obj) => {
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
                              <Link to={`/profile/${obj.username}`} state={{ userID: obj._id }}>
                                <div className='flex items-center rounded-xl bg-blue-700 hover:bg-blue-500 py-2 px-4 cursor-pointer'
                                  onClick={(e) => { setReqMod(!reqMod) }}
                                >
                                  <div className='w-4 h-4 bg-blue rounded-full m-1 flex justify-center items-center  ' >

                                    <MdVisibility className='text-xl text-white' />
                                  </div>

                                  <p className='text-sm text-white'>VIEW</p>
                                </div>
                              </Link>
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

export default Profile