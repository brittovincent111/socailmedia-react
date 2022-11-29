import React, { useEffect, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { HiLockClosed } from 'react-icons/hi'
import { SlUserFollow, SlUserFollowing, SlUserUnfollow } from 'react-icons/sl'
import { getUser } from '../../API/User'
// import Axios from 'axios'




function Profile() {

  const [data, SetData] = useState()
  const [posts, SetPosts] = useState([])
  const [userDetail, SetUserDetails] = useState()
  const [showMod, SetShowMod] = useState(false)
  const [file, setFile] = useState("")
  const [updateDetails, SetUpdateDetails] = useState("Details")
  const [edit, SetEdit] = useState([])
  // const [file, SetFile] = useState("")
  const [updation ,setUpdation] = useState(false)



  const userDetails = useSelector(state => state.user)

  const userName = useParams().username

  const PF = process.env.REACT_APP_PUBLIC_FOLDER




  // console.log(userDetail, "LLLLLLLLL")

  const userID = useLocation().state.userID
  // console.log(userID , "USERIDDDDDDDDDD")



  useEffect(() => {

    const getUserData = async () => {

      try {
        const { data } = await getUser(userDetails._id)
        SetUserDetails(data)
        console.log(data, "datafcfcgxdgxdxaaaaaaaaa")

      } catch (error) {

        // console.log(error)

      }

    }
    getUserData()


  }, [updation])

  useEffect(() => {

    axios.get(`http://localhost:4000/userprofile/${userID}`).then((response) => {

      SetData(response.data)




    }).then((data) => {
      
      console.log("erroerwerwefsdf");

      axios.get(`http://localhost:4000/viewProfilePosts/${userID}`).then((response) => {
        console.log(response.data, "potsss")
        SetPosts(response.data)
      }).catch((error) => {

        console.log(error , "WHAT IS ERROE")
      })


    }).catch((error) => {

      console.log(error ,"EROORERERE")

    })


  }, [userID, userName ,updation])

  // console.log(userDetails, "dataaaaaaaaaaaaaaaa")

  const handleEdit = async(e) => {

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
        await axios.post('http://localhost:4000/upload', datas)
        console.log(datas, "data");

        // window.location.reload()

      } catch (error) {
        console.log(error);
      }
    }
    try {
      console.log("suiiiiiiiii")
      await axios.post('http://localhost:4000/update',{ ...edit , userId : userDetail._id}).then((response)=>{

        setUpdation(!updation)
        SetShowMod(!showMod) 
      })
      
  

    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {

    SetEdit({ ...edit, [e.target.name]: e.target.value })




  }
  // console.log(edit , "edit");

  return (
    <div className='w-full h-screen  flex justify-center bg-gray-100'>

      <div className='md:w-11/12 w-full bg-white   h-full'>
        {/* profile details  */}


        <div className=' h-max w-full  grid md:grid-cols-2 lg:grid-cols-3'>
          <div className=' h-full  flex-col flex justify-center items-center md:p-10'>
            <div ><img className='w-44 h-44 bg-red-500 rounded-full mb-10 mt-5' src={ PF+ data?.profilePicture}/></div>
            <div className='font-semibold  text-xl'>{data?.username}</div>
          </div>
          <div className='  h-32 md:h-full lg:h-full   flex  justify-center items-center'>
            <div className=' flex flex-col md:justify-start justify-center'>
              {(userDetail?._id == data?._id) ?
                <div className='flex items-center space-x-2 rounded-2xl p-2 bg-gray-100 w-max' onClick={(e) => { SetShowMod(!showMod) }}>
                  <div><FiSettings /> </div>
                  <div className='font-semibold  text-base'>Edit Profile</div>

                </div>
                : (userDetail?.following.includes(data?._id)) ?
                  <div className='flex items-center space-x-2 rounded-2xl p-2 bg-gray-100 w-max'>
                    <div><FiSettings /> </div>
                    <div className='font-semibold  text-base'>unfollow</div>

                  </div> : (userDetail?.requestTo.includes(data?._id)) ?
                    <div className='flex items-center space-x-3 rounded-3xl p-2 bg-sky-900 w-max'>
                      <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                      <div className='font-semibold  text-base text-white'>Cancel</div>
                    </div>
                    : (userDetail?.requestFrom.includes(data?._id)) ?
                      <div className='flex items-center  p-2 space-x-3 w-max'>
                        <div className='flex items-center space-x-3 rounded-3xl p-2 bg-sky-900 w-max'>
                          <div className='rounded-full bg-white '><SlUserFollowing className='text-lg m-1.5' /> </div>

                          <div className='font-semibold  text-base text-white'>Accept</div>
                        </div>
                        <div className='flex items-center space-x-3 rounded-3xl p-2 bg-gray-400 w-max'>
                          <div className='rounded-full bg-white '><SlUserUnfollow className='text-lg m-1.5' /> </div>
                          <div className='font-semibold  text-base text-white'>Decline</div>

                        </div>
                      </div>

                      :
                      <div className='flex items-center space-x-3 rounded-3xl p-2 bg-sky-900 w-max'>
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
        <div className="h-16 items-center border border-white bg-sky-900 m-2">
          <div className='flex items-center h-full justify-center space-x-3' >
            <div><BsFillGrid1X2Fill className='font-semibold  text-xl text-white' /></div>
            <div className='font-semibold  text-xl text-white'>POST</div>
          </div>


        </div>
        {/* posts */}
        <div className='w-full h-max  flex justify-center'>
          {

            (userDetail?._id == data?._id) || (userDetail?.following.includes(data?._id)) ?
              <div className='grid grid-cols-3 w-full    justify-evenly'>
             
                  {
                    posts.map((obj) => {

                      return (


                        <img src={PF + obj.img} className=' w-full md:h-[290px]  h-[180px] p-2  ' />

                      )
                    })
                  }
              


              </div>


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
                    <div className='flex flex-col p-2 justify-start items-center' onClick={(e) => { SetUpdateDetails("password") }}>Password</div>


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
    </div>

  )
}

export default Profile