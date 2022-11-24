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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    useEffect(() => {

        SetIsLike(post.likes.includes(userId))

    }, [userId, post._id])


    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`http://localhost:4000/postdetails/users?userId=${post.userId}`);
            console.log(res, "rrrrrrtyghbh");

            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);


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

        SetComment("")
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

    const onhandleSavePost = async () => {

        const data = {

            userId: userDetails._id,

        }

        await axios.put(`http://localhost:4000/savepost/${post._id}`, { ...data }).then((response) => {

        console.log(response.data)

        if(response.data.message == "already added"){


            
            const notify = () => toast("Already Added !");
            notify()
        }else{
            const notify = () => toast("Added To Saved!");
            notify()

        }



        })



    }



    return (


        <div className=' h-max  w-full bg-slate-200 justify-center flex pt-5   '>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className='md:w-5/6  bg-white md:m-5 sm:w-5/6 w-full mt-5 rounded-2xl m-2 border-slate-300 border h-max shadow-xl'>
                <div className='w-full h-16  flex justify-between items-center pl-2 rounded-t-2xl '>
                    <div className='w-full h-14  flex justify-between items-center rounded-t-2xl ' >
                        <div className='h-full w-36 flex justify-start items-center'>
                            <div className='rounded-full w-12 h-12 bg-black  '></div>
                            <div className=' flex flex-col justify-start  ml-2'>
                                <div className='text-sm font-medium flex justify-start'>{user.username}</div>
                                <div className='text-xs flex justify-start'>{format(post.createdAt)}</div>
                            </div>
                        </div>
                        <div className='text-2xl p-2 '><BsThreeDots /> 

                        {/* <!-- component --> */}
<div class="flex justify-center">
    <div class="relative inline-block mb-20">
        {/* <!-- Dropdown toggle button --> */}
        <button class="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
            <span class="mx-1">Jane Doe</span>
            <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
            </svg>
        </button>

        {/* <!-- Dropdown menu --> */}
        <div class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
            <a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                <div class="mx-1">
                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200">Jane Doe</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">janedoe@exampl.com</p>
                </div>
            </a>

            <hr class="border-gray-200 dark:border-gray-700 " />
            
            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                view profile
            </a>
            
            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Settings
            </a>

            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Keyboard shortcuts
            </a>

            <hr class="border-gray-200 dark:border-gray-700 " />
            
            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Company profile
            </a>

            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Team
            </a>

            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Invite colleagues
            </a>

            <hr class="border-gray-200 dark:border-gray-700 " />
            
            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Help
            </a>
            <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Sign Out
            </a>
        </div>
    </div>
</div>
                        
                        
                        </div>
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
                        <div className='text-2xl p-1 ' onClick={onhandleSavePost}><BsBookmark /> </div>


                    </div>

                    <div className='w-full  h-3/5  flex justify-start  text-base font-semibold hover:cursor-pointer pl-4'>
                        {likes}
                    </div>

                </div>
                <div className='w-full h-14 bg-white border-slate-300  '>
                    <div className='w-full h-1/2  px-1 flex items-center '>

                        <p className=' text-lg font-medium pl-2 '>{user.username}</p>


                        <p className=' text-base font-normal pl-2'>{post.desc}</p>
                    </div>


                </div>
                {
                    viewComment ?
                        <div>
                            <div className='text-lg font-medium '>comments</div>
                            {
                                seeComments.map((obj) => {
                                    return (
                                        <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 pr-2 items-center '>

                                            <div className='rounded-full w-12 h-12 bg-black  '></div>
                                            <div className='ml-3 flex flex-col justify-start'>
                                                <div className='h-full w-2/12 bg-gray flex items-center text-sm font-medium pl-2 justify-start'> {obj.userId.username}</div>
                                                <div className='text-xs flex justify-start'>{format(post.createdAt)}</div>
                                            </div>
                                            <p className='h-full w-8/12 bg-white text-area flex items-center pl-5' >{obj.comment}</p>


                                            {/* <div className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal ' onClick={onhandlerCommemt}>Comment</div> */}

                                        </div>
                                    )
                                })

                            }

                        </div> :

                        <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                            <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                            <textarea placeholder='Add Comment' className='h-full w-9/12 bg-white text-area flex items-center p-1' value={comment} onChange={(e) => SetComment(e.target.value)}></textarea>


                            <div className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal cursor-pointer ' onClick={onhandlerCommemt}>Comment</div>

                        </div>
                }

            </div>
        </div>
    )


}

export default Post