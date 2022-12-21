import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart } from 'react-icons/ai'
// import {FaRegComment} from 'react-icons/fa'
import { MdOutlineFeed } from 'react-icons/md'

import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'

import feedImage from '../../assets/images/messi.jpg'
import ImageUpload from '../../assets/images/imageupload.png'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import userInterface from '../../API/userApi'







function SavedPost() {

  const [post, setPosts] = useState([])
  const userDetails = useSelector(state => state.user)



  const Navigate = useNavigate()
  const userId = userDetails._id




  /* ------------------------------- SAVED POST ------------------------------- */

  useEffect(() => {
    try{

      const fetchPost = async () => {
        const res = await userInterface.get(`/savedpost/${userId}`)
        console.log(res.data, "ggggggggggggg");
  
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
          })
        )
      }
      fetchPost()

    }catch(error){
      Navigate('/errorPage')

    }
  
  }, [])


  return (
    <>






      {
        post.length != 0 ?

          post.map((post) => {

            return (

              <Post key={post.userId} post={post} />
            )
          })

          :
          <div className='flex flex-col w-full justify-center items-center h-screen bg-gray-200 '>
            <MdOutlineFeed className='text-[150px]' />
            <div className='text-2xl'>No Saved</div>

          </div>


      }

    </>
  )

}

export default SavedPost