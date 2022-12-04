import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart } from 'react-icons/ai'
// import {FaRegComment} from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'

import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'

import feedImage from '../../assets/images/messi.jpg'
import ImageUpload from '../../assets/images/imageupload.png'
import  Axios  from 'axios'
import { Link ,useNavigate } from 'react-router-dom'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'






function SavedPost() {

  const [post , setPosts] = useState([])
  const userDetails = useSelector(state => state.user)



  const navigate = useNavigate()
  const userId = userDetails._id
  
  

  
/* ------------------------------- SAVED POST ------------------------------- */

  useEffect (()=>{
    const fetchPost=async()=>{
      const res=await Axios.get(`http://localhost:4000/savedpost/${userId}`)
      console.log(res.data , "ggggggggggggg");
      
      setPosts(
        res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      })
     )
    }
    fetchPost()
 },[])


  return (
    <>



      


{
   post.length !=0 ? 
   
   post.map((post)=>{

        return(
          
          <Post key={post.userId} post={post}/>
        )
      }) 
      
      : 
        <div className='pl-5'>

          <div className=' h-[300px] w-[600px] rounded-2xl bg-sky-800 mt-20 flex text-2xl justify-center items-center text-white '>No Post To Show
        </div>

     
        
        </div>

               
    }
    
    </>
    ) 
    
}

export default SavedPost