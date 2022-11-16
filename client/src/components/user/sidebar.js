import React, { useState, useRef } from 'react'

import { HiOutlineUserGroup, HiUserAdd } from 'react-icons/hi'
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'


import { BsFillBookmarkFill } from 'react-icons/bs'
import Axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';



import javascript from '../../assets/images/js.png'
import node from '../../assets/images/nodejs.jpg'
import stat from '../../assets/images/stat.png'
import feedImage from '../../assets/images/messi.jpg'
import ImageUpload from '../../assets/images/uploadimage2.jpg'
import { useNavigate } from 'react-router-dom'


import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../redux/userRedux'







function Sidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const imageRef = useRef(null);

  const userDetails = useSelector(state => state.user)


  const [desc, SetDesc] = useState("")
  const [file, SetFile] = useState("")

  const [postMod, setPostMod] = useState(false);


  // const PF =process.env.REACT_APP_PUBLIC_FOLDER;







  // show modal add post 
  const addPost = () => {
    console.log("hiiiiiiiiiiiii")
    setPostMod(true)
  }
  const close = () => {
    setPostMod(false)


  }

  // image upload 



  // logout 

  const logout = () => {


    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
            <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
            {/* <p className='flex justify-center p-2 text-xl font-semibold'>You want to delete this file?</p> */}
            <div className='flex space-x-2 p-2 '>
              <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
              <button className='bg-red-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                onClick={() => {



                  onClose();
                  // this.handleClickDelete();
                  localStorage.removeItem('userToken')
                  localStorage.removeItem('user')
                  navigate('/login')
                  dispatch(remove())


                }}
              >
                Logout
              </button>

            </div>

          </div>
        );
      }
    });





  }





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
        await Axios.post('http://localhost:4000/upload', data)
        console.log(data, "data");

        window.location.reload()

      } catch (error) {
        console.log(error);
      }
    }
    try {
      await Axios.post('http://localhost:4000/post', newPost)
      console.log(newPost, "klkl");

    } catch (err) {
      console.log(err);
    }
  }




  return (
    <div className=''>
      <div className=' w-full h-full   overflow-hidden rounded-2xl '>
        <div className=' w-full h-full  '>
          <div className=' py-5 space-y-3 p-3 rounded-2xl '>
            <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

              <div className='w-max h-full flex items-center rounded-2xl hover:cursor-pointer '>
                <div className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '>

                  <BsFillBookmarkFill className='text-2xl text-white' />
                </div>
                <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Saved

                </p>


              </div>





            </div>
            <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer' onClick={addPost}>


              <div className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '>

                <AiOutlinePlus className='text-2xl text-white ' />
              </div>
              <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Posts

              </p>

            </div>
            <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

              <div className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 '>

                <HiUserAdd className='text-2xl text-white' />
              </div>
              <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Follow Request

              </p>


            </div>
            <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer' >


              <div className='w-16 h-16 bg-sky-900 rounded-full m-1 flex justify-center items-center hover:bg-blue-600 ' onClick={logout}>

                <AiOutlineLogout className='text-2xl text-white ' />
              </div>
              <p className='hidden  lg:block   font-medium p-2 text-xl block:md '>Logout

              </p>

            </div>





          </div>
          <div className='w-full border'></div>
          <div className=' py-5 space-y-3 mt-4 p-3 rounded-2xl'>
            <div className='w-max h-10  flex items-center justify-center'>


              <div className=' flex justify-start font-medium  text-xl'>Groups

              </div>


            </div>
            <div className=' overflow-y-scroll space-y-2 w-full h-48'>


              <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

                <div className='w-max h-full flex rounded-2xl '>
                  <img src={javascript} className='rounded-full bg-green-200 w-16 h-16 flex' />

                </div>
                <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>JavaScript

                </p>


              </div>
              <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

                <div className='w-max h-full flex rounded-2xl '>
                  <img src={node} className='rounded-full bg-green-200 w-16 h-16 flex' />

                </div>
                <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>NodeJs

                </p>


              </div>
              <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

                <div className='w-max h-full flex rounded-2xl '>
                  <img src={stat} className='rounded-full bg-green-200 w-16 h-16 flex' />

                </div>
                <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Fans

                </p>


              </div>
              <div className='w-max h-16  flex items-center rounded-2xl hover:cursor-pointer'>

                <div className='w-max h-full flex rounded-2xl '>
                  <img className='rounded-full bg-green-200 w-16 h-16 flex' />

                </div>
                <p className='hidden  lg:block   font-medium p-2 text-lg block:md '>Malayalam

                </p>


              </div>

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
                    <label name='image' />
                    <img src={ImageUpload} className="h-52 w-52" />
                    <input type='file' name='file' onChange={(e) => { SetFile(e.target.files[0]) }} />
                  </div>
                </div>
                <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                  <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                  <textarea placeholder='Add Comment' name='description' className='h-full w-9/12 bg-white text-area flex items-center p-1' onChange={(e) => { SetDesc(e.target.value) }}></textarea>


                  <button type='submit' className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal '>POST</button>

                </div>
              </form>

            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>


  )
}

export default Sidebar