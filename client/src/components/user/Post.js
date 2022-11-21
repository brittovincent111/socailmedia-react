import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart } from 'react-icons/ai'
// import {FaRegComment} from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'

import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import { format } from 'timeago.js'

import feedImage from '../../assets/images/messi.jpg'
import ImageUpload from '../../assets/images/imageupload.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



function Post({ post }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER




    const [user, setUser] = useState({})



    const [likes, SetLikes] = useState(post.likes.length)
    const [isLike, SetIsLike] = useState(false)
    const [comment, SetComment] = useState("")
    const [viewComment, setviewCommet] = useState(false)
    const [seeComments, SetSeeeComments] = useState([])



    const userDetails = useSelector(state => state.user)

    const userId = userDetails._id

    console.log(comment, "commmmmmmmmenttttt")

    useEffect(()=>{

           SetIsLike(post.likes.includes(userId))

    },[userId , post._id])

     
    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`http://localhost:4000/postdetails/users?userId=${post.userId}`);
            console.log(res, "rrrrrrtyghbh");

            setUser(res.data);
        };
        fetchUser();
    }, [post.userId ]);


    const onHandlerLike = async () => {
        console.log(post._id, " postid")
        console.log(userId)

        let res = await axios.put(`http://localhost:4000/like/post/${post._id}`, { userId: userId })

        SetLikes(isLike ? likes - 1 : likes + 1)
        SetIsLike(!isLike)


    }

    const onhandlerCommemt = async () => {

        const data = {

            userId: userDetails._id,
            comment: comment
        }

        let res = await axios.put(`http://localhost:4000/comment/post/${post._id}`, { ...data })
    }

    console.log(post, "userrrrrrrrrrrrreeeeeeeee")

    const onhandleViewComments = () => {

        console.log(post._id, "postidddddddddddddddddddddddddd")
        setviewCommet(!viewComment)

        // if(viewComment){

        axios.get(`http://localhost:4000/viewcomment/post/${post._id}`).then((response) => {

            console.log("hiiiiiiiiiiiiiiiiii")

            console.log(response.data, "dataaaaaaaaaa")
            SetSeeeComments(response.data)

        }).catch((error) => {

            console.log(error)

            console.log(error)
        })
        // }




    }



    return (


        <div className=' h-max  w-full bg-slate-200 justify-center flex pt-5   '>

            <div className='md:w-5/6  bg-white md:m-5 sm:w-5/6 w-full mt-5 rounded-2xl m-2 border-slate-300 border h-max shadow-xl'>
                <div className='w-full h-16  flex justify-between items-center pl-2 rounded-t-2xl '>
                    <div className='w-full h-14  flex justify-between items-center rounded-t-2xl ' >
                        <div className='h-full w-36 flex justify-start items-center'>
                            <div className='rounded-full w-12 h-12 bg-black  '></div>
                            <div className='names flex flex-col justify-start  ml-2'>
                                <div className='text-sm font-medium'>{user.username}</div>
                                <div className='text-xs'>{format(post.createdAt)}</div>
                            </div>
                        </div>
                        <div className='text-2xl p-2 '><BsThreeDots /> </div>
                    </div>
                </div>
                <div className='  border-slate-300 border-y  flex justify-center'>
                    <img className="h-[400px] w-[400]" src={PF + post.img} />
                </div>
                <div className='w-full h-16  border-slate-300 '>
                    <div className='w-full  flex justify-between  h-3/5 items-center '>
                        <div className='w-28  flex justify-between items-center space-x-4 p-2'>
                            <div className='text-3xl text-slate-900 hover:cursor-pointer ' onClick={onHandlerLike}>
                                {
                                    isLike ? <AiFillHeart className='text-red-600' /> : <AiOutlineHeart />
                                }
                            </div>
                            <div className='text-2xl' onClick={onhandleViewComments}><FaRegComment /> </div>
                            <div className='text-2xl'><FiSend /> </div>

                        </div>
                        <div className='text-2xl p-1 '><BsBookmark /> </div>


                    </div>

                    <div className='w-full  h-3/5  flex justify-start  text-base font-semibold hover:cursor-pointer pl-4'>
                        {likes}
                    </div>

                </div>
                <div className='w-full h-14 bg-white border-slate-300  '>
                    <div className='w-full h-1/2  px-1 flex items-center py-3'>

                        <p className=' text-lg font-medium pl-2 '>{user.username}</p>
                        <p className=' text-base font-normal pl-2'>{post.desc}</p>
                    </div>


                </div>
                {
                    viewComment ?
                        <div>
                            <div>comments</div>
                            {
                                seeComments.map((obj) => {
                                    return (
                                        <div className='w-full h-14 bg-white rounded-b-2xl flex p-1 pr-2 items-center border'>

                                            <div className='h-full w-2/12 bg-gray flex items-center text-lg font-medium pl-2'> {obj.userId.username}</div>
                                            <p className='h-full w-9/12 bg-white text-area flex items-center pl-2' >{obj.comment}</p>


                                            {/* <div className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal ' onClick={onhandlerCommemt}>Comment</div> */}

                                        </div>
                                    )
                                })

                            }

                        </div> :

                        <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                            <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                            <textarea placeholder='Add Comment' className='h-full w-9/12 bg-white text-area flex items-center p-1' onChange={(e) => SetComment(e.target.value)}></textarea>


                            <div className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal ' onClick={onhandlerCommemt}>Comment</div>

                        </div>
                }

            </div>
        </div>
    )


}

export default Post