import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import Axios from 'axios'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import 'react-toastify/dist/ReactToastify.css';
import { deleteGroup, groupDetails, groupPosts, joinGroup, leaveGroup, removeGroup, viewMembers } from '../../../API/groupAxios'
import ImageUpload from '../../../assets/images/uploadimage2.jpg'
import GroupPost from './GroupPost'
import { BiEditAlt } from 'react-icons/bi'
import { HiLockClosed } from 'react-icons/hi'
import { HiOutlineUserGroup, HiUserAdd } from 'react-icons/hi'
import groupWall from '../../../assets/images/groupWall.jpg'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import avatar from '../../../assets/images/avatar.jpg'
import userinstance from '../../../API/userApi'






export default function GroupFedd() {


  const [groupDetailss, setGroupDetailss] = useState()
  const [desc, SetDesc] = useState("")
  const [groupDesc, SetGroupDesc] = useState("")
  const [file, SetFile] = useState("")
  const [showImage, setShowImage] = useState()
  const [postMod, setPostMod] = useState(false);
  const [groupPost, setGroupPost] = useState([])
  const [showMod, SetShowMod] = useState(false)
  const [groupSet, SetGroupSet] = useState(true)
  const [updateDetails, SetUpdateDetails] = useState("Details")
  const [edit, SetEdit] = useState([])
  const [updation, setUpdation] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [reqMod, setReqMod] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [members, setMembers] = useState([])
  const [reportChange, SetReportChange] = useState('')
  const userDetails = useSelector(state => state.user)


  const Navigate = useNavigate()
  const groupId = useParams().groupid
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const userID = userDetails._id


  /* ------------------------------ GROUP DETAILS ----------------------------- */

  useEffect(() => {

    const call = async (groupId) => {
      try {
        const { data } = await groupDetails(groupId)

        setGroupDetailss(data)
        console.log(data, "detailssssssssss");
      } catch (error) {

        Navigate('/errorPage')

      }
    }
    call(groupId)


  }, [groupId, groupSet, reqMod, refresh])



  /* ------------------------------- JOON GROUP ------------------------------- */



  const handleJoin = async () => {
    try {

      const { data } = await joinGroup(userID, groupId)
      setRefresh(!refresh)
    } catch (error) {

      Navigate('/errorPage')

    }
  }

  /* ------------------------------- EDIT GROUP ------------------------------- */

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
      edit.groupProfile = fileName
      try {
        await Axios.post('http://localhost:4000/upload', datas)

      } catch (error) {
        console.log(error);
      }
    }
    try {
      await userinstance.post('/group/update', { ...edit, groupId: groupId }).then((response) => {

        setUpdation(!updation)
        SetShowMod(!showMod)
        SetGroupSet(!groupSet)
      })


    } catch (err) {
      Navigate('/errorPage')
    }
  }

  /* ------------------------------- EDIT STATE ------------------------------- */
  const handleChange = (e) => {

    SetEdit({ ...edit, [e.target.name]: e.target.value })

  }


  /* ------------------------------- SUBMIT POST ------------------------------ */
  const onSubmit = async (e) => {

    e.preventDefault()
    const newPost = {
      userId: userDetails._id,
      groupId: groupId,
      desc: desc,
    }
    if (file) {
      const data = new FormData();
      const fileName = file.name
      data.append("file", file)
      data.append("name", fileName)
      newPost.img = fileName
      try {
        await Axios.post('http://localhost:4000/upload', data)

        close()

      } catch (error) {
        Navigate('/errorPage')
      }
    }
    try {
      await userinstance.post('/group/post', newPost)
      setRefresh(!refresh)
    } catch (err) {
      Navigate('/errorPage')
    }

  }

  /* ----------------------------- ADD POST MODAL ----------------------------- */
  const addPost = () => {
    setPostMod(true)
  }

  /* -------------------------- ADD POST MODAL CLOSE -------------------------- */
  const close = () => {
    setPostMod(false)
    setShowImage()
    SetFile()




  }
  /* ------------------------------ IMAGE PREVIEW ----------------------------- */
  useEffect(() => {
  }, [file, showImage])


  /* ------------------------ IMAJJJJGE DELETEFROM PREVIEW ------------------------ */
  const imageClose = () => {

    setShowImage()
    SetFile()

  }


  /* ------------------------------- IMAGE STATE ------------------------------ */
  const handleImage = (e) => {
    setShowImage(URL.createObjectURL(e.target.files[0]))
    SetFile(e.target.files[0])
  }

  /* -------------------------------- POST VIEW ------------------------------- */

  useEffect(() => {

    const postView = async (groupId) => {

      const { data } = await groupPosts(groupId)

      setGroupPost(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    }

    postView(groupId)

  }, [groupId, refresh, reportChange])


  /* ---------------------------- REMOVE FROM GROUP --------------------------- */

  const onHandleRemove = async (userId) => {


    try {
      const { data } = await removeGroup(userId, groupId)
      // setReqMod(!reqMod)
      setRefresh(!refresh)
    } catch (error) {

      Navigate('/errorPage')
    }


  }


  /* ------------------------------ VIEW MEMBERS ------------------------------ */
  useEffect(() => {
    try {

      const callMembers = async (e) => {

        let { data } = await viewMembers(groupId)

        setMembers(data)

      }

      callMembers()

    } catch (error) {

      Navigate('/errorPage')

    }
  }, [refresh])



  /* ------------------------------- LEAVE GROUP ------------------------------ */
  const handleLeave = async () => {
    try {
     
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
              <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
              {/* <p className='flex justify-center p-2 text-xl font-semibold'>You want to delete this file?</p> */}
              <div className='flex space-x-2 p-2 '>
                <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
                <button className='bg-red-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                  onClick={async () => {
                    onClose();
                    let { data } = await leaveGroup(userID, groupId)
                    setRefresh(!refresh)



                  }}
                >
                  Leave
                </button>

              </div>

            </div>
          );
        }
      });
      


    } catch (error) {

      Navigate('/errorPage')
    }

  }

  /* ------------------------------ DELETE GROUP ------------------------------ */
  const handleDelete = async () => {

    try {

      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
              <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
              {/* <p className='flex justify-center p-2 text-xl font-semibold'>You want to delete this file?</p> */}
              <div className='flex space-x-2 p-2 '>
                <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
                <button className='bg-red-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                  onClick={async () => {
                    onClose();
                    const { data } = await deleteGroup(groupId, userID)
                    Navigate('/view/groups')



                  }}
                >
                  Delete
                </button>

              </div>

            </div>
          );
        }
      });

    } catch (error) {

      console.log(error)
    }


  }

  return (

    <>
      <div className='md:w-3/4 w-full flex justify-center p-1 bg-gray-100  overflow-y-auto no-scrollbar'>
        <div className='md:w-11/12 w-full bg-white   h-full'>
          <div className='w-full h-[400px]'>
            <div className='w-full rounded-2xl  bg-white'>
              <div className='w-full  h-[300px] rounded-2xl bg-blue-100 relative'>
                {
                  groupDetailss?.groupProfile ?
                    <img className='h-full w-full rounded-2xl' src={PF + groupDetailss?.groupProfile} /> :
                    <img className='h-full w-full rounded-2xl' src={groupWall} />
                }
                {
                  groupDetailss?.admin == userDetails._id ?
                    <div className='absolute bottom-5 right-5 p-4 rounded-full bg-white text-2xl' onClick={(e) => { SetShowMod(!showMod) }}><BiEditAlt /></div> : null
                }
              </div>
            </div>
            <div className='flex justify-between items-center h-[100px]'>
              <div>
                <div className='flex md:px-10 px-1 text-2xl font-semibold'>{groupDetailss?.groupName}</div>

                <div className='md:flex px-10 hidden  text-normal font-semibold'>{groupDetailss?.about}</div>
              </div>
              {
                groupDetailss?.groupMembers.includes(userDetails._id) || groupDetailss?.admin == userDetails._id ?


                  <div className=' p-5 rounded-full bg-sky-400 text-white text-lg cursor-pointer' onClick={(e) => { setPostMod(!postMod) }}><AiOutlinePlus /></div>
                  : null}
              <div className='flex md:px-10 md:space-x-3 px-2 space-x-1'>
                {
                  groupDetailss?.admin == userDetails._id ?
                    <div className='px-5 p-2 rounded-2xl bg-sky-900 hover:text-sky-900 hover:bg-white shadow-sm text-gray-200 text-base cursor-pointer' onClick={handleDelete}>DELETE</div>
                    :

                    groupDetailss?.groupMembers.includes(userDetails._id) ?
                      <div className='px-5 p-2 rounded-2xl bg-sky-900 text-white cursor-pointer hover:text-sky-900 hover:bg-gray-200 shadow-sm' onClick={handleLeave}>LEAVE</div>
                      : <div>

                        <div className='px-5 p-2 rounded-2xl bg-sky-900 text-white cursor-pointer hover:text-sky-900 hover:bg-gray-200 shadow-sm' onClick={handleJoin}>JOIN</div>
                      </div>


                }
                {/* <div className='px-5 p-2 rounded-2xl bg-sky-900 text-white'>INVITE</div> */}
                {
                  groupDetailss?.admin == userDetails._id ?
                    <div className='py-2 rounded-2xl relative ' onClick={(e) => { setBlockModal(!blockModal) }}><BsThreeDots className='text-2xl' />
                      {blockModal ?
                        <div className='absolute top-10 right-0 cursor-pointer z-30 bg-white shadow-sm	 rounded-lg border  flex-col flex justify-end'>
                          <div className=''>

                            <div className='text-base p-1 px-4'
                              onClick={(e) => { setReqMod(!reqMod) }}
                            >Members</div>
                            <div className='text-base p-1 px-4'
                            //  onClick={handleReport}
                            >report </div>



                            <hr className='w-full' />
                            <div className='text-base p-1 px-4' onClick={(e) => setBlockModal(!blockModal)} >Cancel</div>

                          </div>

                        </div> : null}


                    </div>



                    : null

                }

              </div>


            </div>
          </div>

          <div className=' h-max  w-full bg-slate-200 flex-col flex  items-center  pt-5   '>

            {
              (groupDetailss?.groupMembers.includes(userDetails._id)) || groupDetailss?.admin == userDetails._id ?

                groupPost?.map((post) => {
                  return (
                    <>


                      <GroupPost key={post.userId} post={post} groupId={groupId} SetReportChange={SetReportChange} admin={groupDetailss.admin} />

                    </>


                  )
                })

                : <div className='flex justify-center w-full h-[200px] bg-gray-200 m-5'>
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
      </div >

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

      {showMod ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit your details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    name="groupName"
                    placeholder="Enter the Groupname"
                    onChange={handleChange}
                  />
                  <input className='ml-5'
                    type="file" name='file' id='file' onChange={(e) => {
                      // setImage(URL.createObjectURL(e.target.files[0]))
                      { SetFile(e.target.files[0]) }
                    }

                    } />
                  {/* <span className='text-sm'>Update your profile pic</span> */}
                  <br /> <br />
                  <input
                    type="text"
                    name="about"
                    placeholder="Enter the Description"
                    onChange={handleChange}
                  />
                  {/* <input className='ml-5'
                    type="password"
                    name="password"
                    placeholder="change password"
                    onChange={handleChange}
                  /> */}
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
                <div className='items-center flex justify-center border-b-0 p-5 font-medium text-xl'>Group Members </div>

              </div>

              <div className='w-full h-[300px] bg-white py-2  border-t-2 border-black'>
                <div className='m-6 h-full  '>


                  <div className='grid-cols-1 gap-2 w-full h-full overflow-y-scroll no-scrollbar  ' >
                    {members.map((obj) => {
                      return (
                        <div className='flex w-full items-center h-max justify-evenly'>
                          <div className="flex  items-center  w-full space-x-2">
                            {obj.profilePicture ?
                              <img src={PF + obj.profilePicture} className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '
                              //  onClick={onHandleRequest}
                              /> :
                              <img src={avatar} className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '
                              //  onClick={onHandleRequest}
                              />
                            }

                            <HiUserAdd className='text-2xl text-white' />

                            <div className='flex justify-center item-center'>
                              {obj.username}
                            </div>
                          </div>
                          <div className='flex h-max space-x-2'>
                            <div className='flex items-center rounded-xl bg-red-600 p-2'
                              onClick={(e) => { onHandleRemove(obj._id) }}
                            >
                              <div className='w-4 h-4 bg-blue rounded-full m-1 flex justify-center items-center hover:bg-red-400 ' >

                                <HiUserAdd className='text-xl text-white' />
                              </div>

                              <p className='text-sm text-white'>Remove</p>
                            </div>

                          </div>
                        </div>
                      )
                    })

                    }
                  </div>
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

