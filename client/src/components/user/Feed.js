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






function Feed() {

  const [post , setPosts] = useState([])
  const userDetails = useSelector(state => state.user)


  const navigate = useNavigate()

  const userId = userDetails._id

  


  useEffect(()=>{

    console.log("call reached")
    Axios.get('http://localhost:4000/' ,{headers:{"x-access-token":localStorage.getItem("userToken")}}).then((response)=>{
        
    
     
    navigate('/')
    }).catch((error)=>{
      
      navigate('/login')
      console.log(error)
      
    })

  },[])

  useEffect (()=>{
    const fetchPost=async()=>{
      const res=await Axios.get(`http://localhost:4000/post/timeline/${userId}`)
      console.log(res.data , "ggggggggggggg");
      setPosts(
        res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      })
     )
    }
    fetchPost()
 },[])

 console.log(post , "postsssssss")

  return (
    <>



      


{
      post.map((post)=>{

        return(
          
          <Post key={post.userId} post={post}/>
        )
      })
    }

    
    </>
  )
}

export default Feed