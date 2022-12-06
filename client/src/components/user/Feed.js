import React, { useContext, useEffect, useState } from 'react'
import {MdOutlineFeed} from 'react-icons/md'
import  Axios  from 'axios'
import { Link ,useNavigate } from 'react-router-dom'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import {UserUpdation} from '../../UpdationContext/UpdationContext'






function Feed() {

  const [post , setPosts] = useState([])
  const userDetails = useSelector(state => state.user)
  const [reportChange , SetReportChange] = useState('')
  const{feedUpdate , setFeedUpdate} = useContext(UserUpdation)




  const navigate = useNavigate()
  const userId = userDetails._id
  

  /* ------------------------------ HEADER TOKEN ------------------------------ */
  useEffect(()=>{

    Axios.get('http://localhost:4000/' ,{headers:{"x-access-token":localStorage.getItem("userToken")}}).then((response)=>{
        
    
     
    navigate('/')
    }).catch((error)=>{
      
      navigate('/login')
      
    })

  },[])

  /* ------------------------------ TIMELINE POST ----------------------------- */

  useEffect (()=>{
    const fetchPost=async()=>{
      try{

      
      const res=await Axios.
      get(`http://localhost:4000/post/timeline/${userId}`)
      
      setPosts(
        res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      })
     )
    }catch(error){
         
      console.log(error)
      
    }
    }
    fetchPost()
 },[reportChange , feedUpdate])


  return (
    <>

{
   post?.length !=0 ? 
   
   post?.map((post)=>(

         post?.reports.includes(userDetails._id) ? null :
          <Post key={post.userId} post={post} SetReportChange={SetReportChange}/>
       
   )) 
      
      : 
        <div className='flex flex-col w-full justify-center items-center h-screen bg-gray-200 '>
          <MdOutlineFeed className='text-[150px]'/>
          <div className='text-2xl'>No Posts</div>

        </div>

               
    }
    
    </>
    ) 
    
}

export default Feed