import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart, AiOutlineFileSync } from 'react-icons/ai'
// import {FaRegComment} from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'

import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import { format } from 'timeago.js'
import axios, { Axios } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import e from 'cors'


function Post({ post  , SetReportChange}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER





    const [user, setUser] = useState({})



    const [likes, SetLikes] = useState(post.likes.length)
    const [isLike, SetIsLike] = useState(false)
    const [comment, SetComment] = useState("")
    const [viewComment, setviewCommet] = useState(false)
    const [seeComments, SetSeeeComments] = useState([])
    const [blockModal, setBlockModal] = useState(false)
    const [postMod, setPostMod] = useState(false);
    const [reportValue, setReportValue] = useState("");
    const [refresh , SetRefresh] = useState(false)





    const userDetails = useSelector(state => state.user)

    const userId = userDetails._id

    // console.log(comment, "commmmmmmmmenttttt")



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

        SetComment("")
    }

    // console.log(post, "userrrrrrrrrrrrreeeeeeeee")

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

            if (response.data.message == "already added") {



                const notify = () => toast("Already Added !");
                notify()
            } else {
                const notify = () => toast("Added To Saved!");
                notify()

            }



        })



    }

    const handleReport = (e) => {
        e.preventDefault()
        console.log(post._id, "report")
        close();
        SetReportChange(new Date() )

        axios.put(`http://localhost:4000/post/report/${post._id}`, { userId,reportValue }).then((response) => {

            console.log(response.data)

            if (response.data.message == "already added") {



                const notify = () => toast("Already Added !");
                notify()
            } else {
                const notify = () => toast("Added To Saved!");
                notify()

            }

        })




    }

    /* ------------------------------ close modals ------------------------------ */

    const close = () => {
        setPostMod(false)

    }

    /* ------------------------------- delete post ------------------------------ */

    const postDelete = (id)=>{

        axios.put(`http://localhost:4000/post/delete/${id}`).then((response)=>{

        console.log(response)
        console.log("deletedeeeeeeeeeeee")
        SetReportChange(new Date() )

        }).catch((error)=>{


            console.log(error)
        })


    }

    

    return (

 <>
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
                                <div className='text-xs flex justify-start relative'>{format(post.createdAt)}</div>
                            </div>
                        </div>
                        <div className='text-2xl w-44 p-2  flex justify-end relative '><BsThreeDots className='flex justify-end' onClick={(e) => setBlockModal(!blockModal)} />
                            {blockModal ?
                                <div className='absolute top-8 right-1 cursor-pointer z-30 bg-white shadow-sm	 rounded-lg border  flex-col flex justify-end'>
                                    <div className=''>
                                        { userDetails._id == post.userId ?
                                        <div className='text-base p-1 px-4'
                                            //  onClick={handleReport}
                                            onClick={(e)=>postDelete(post._id)}>Delete </div> :
                                            <div className='text-base p-1 px-4'
                                            //  onClick={handleReport}
                                            onClick={(e) => setPostMod(!postMod)}>report </div>


                                        }
                                        <hr className='w-full' />
                                        <div className='text-base p-1 px-4'  onClick={(e) => setBlockModal(!blockModal)} >Cancel</div>

                                    </div>

                                </div> : null}



                            {/* <!-- component --> */}



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
            


            {/* { ? (
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
                            <form onSubmit={handleReport}>
                                <div className='m-5'>
                                    <div class="flex items-center mb-4">
                                        <input onClick={(e)=>{setReportValue(e.target.value)}} id="default-radio-1" type="radio" value="violence" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">violence </label>
                                    </div>
                                    <div class="flex items-center mb-4">
                                        <input onClick={(e)=>{setReportValue(e.target.value)}} checked id="default-radio-2" type="radio" value="harassment" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">harassment </label>
                                    </div>
                                    <div class="flex items-center mb-4">
                                        <input onClick={(e)=>{setReportValue(e.target.value)}} checked id="default-radio-4" type="radio" value="terrorism" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">terrorism </label>
                                    </div>
                                    <div class="flex items-center mb-4">
                                        <input onClick={(e)=>{setReportValue(e.target.value)}} checked id="default-radio-5" type="radio" value="hate speech" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-5" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">hate speech</label>
                                    </div>
                                    <div class="flex items-center mb-4">
                                        <input onClick={(e)=>{setReportValue(e.target.value)}} checked id="default-radio-6" type="radio" value="other" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-6" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">other</label>
                                    </div>

                                </div>
                                <div className='flex justify-center p-2'>

                                    <button type='submit' className='px-5 py-2 bg-sky-900 text-white h-max w-max flex justify-center'>
                                        submit
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                    <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null} */}


        </div>
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
                    <input type="radio" className="m-2" name="Content" value="Violation of someone's privacy" onClick={(e)=>{setReportValue(e.target.value)}} checked/>
                    <label htmlFor="" className="p-2">Violation of someone's privacy
                    </label>
                    </div>
                    <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Public shaming" onClick={(e)=>{setReportValue(e.target.value)}}  />
                    <label htmlFor="" className="p-2">Public shaming
                    </label>
                    </div>
                    <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Goes against my beliefs, values or politics" onClick={(e)=>{setReportValue(e.target.value)}} />
                    <label htmlFor="" className="p-2">Goes against my beliefs, values or politics
                    </label>
                    </div>
                    <div className="flex">
                    <input type="radio" className="m-2" name="Content" value="Supporting or promoting a hate group" onClick={(e)=>{setReportValue(e.target.value)}} />
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
          
            </>:null}
            </>
    )


}

export default Post