import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart, AiOutlineFileSync } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots, BsFillBookmarkStarFill } from 'react-icons/bs'
import { format } from 'timeago.js'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../../assets/images/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom'
import userInstance from '../../API/userApi'
import { SocketContext } from '../../UpdationContext/Socket'



function Post({ post, SetReportChange, back }) {

    const [user, setUser] = useState({})
    const [likes, SetLikes] = useState(post.likes.length)
    const [isLike, SetIsLike] = useState(false)
    const [comment, SetComment] = useState("")
    const [viewComment, setviewCommet] = useState(false)
    const [seeComments, SetSeeeComments] = useState([])
    const [blockModal, setBlockModal] = useState(false)
    const [postMod, setPostMod] = useState(false);
    const [reportValue, setReportValue] = useState("");
    const [refresh, SetRefresh] = useState(false)
    const [isSaved, SetIsSaved] = useState(false)



    const Navigate = useNavigate()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const userDetails = useSelector(state => state.user)
    const userId = userDetails._id
    const socket = useContext(SocketContext)




    /* -------------------------------- SET LIKES ------------------------------- */
    useEffect(() => {

        SetIsLike(post.likes.includes(userId))
        SetIsSaved(post?.saved.includes(userId))


    }, [userId, post._id])

    /* ------------------------------- FETCH USERS ------------------------------ */

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userInstance.
                    get(`/postdetails/users?userId=${post.userId}`);
                setUser(res.data);
            }catch(error){
         
                if (error?.response?.status === 403) {
                  localStorage.removeItem('userToken')
                  localStorage.removeItem('user')
                  Navigate("/login")
               }else{
                 Navigate('/errorPage')
               }
          
                
              }

        };
        fetchUser();
    }, [post.userId]);


    /* -------------------------------- LIKE POST ------------------------------- */

    const onHandlerLike = async () => {

        try {
            await userInstance.
                put(`/like/post/${post._id}`,
                    { userId: userId })

            SetLikes(isLike ? likes - 1 : likes + 1)
            SetIsLike(!isLike)

            if (post.userId !== userId) {
                socket.emit('send-notification', {
                    senderId: userId,
                    recieverId: post.userId,
                    desc: 'liked your post'
                })
            }
        } catch(error){
         
            if (error?.response?.status === 403) {
              localStorage.removeItem('userToken')
              localStorage.removeItem('user')
              Navigate("/login")
           }else{
             Navigate('/errorPage')
           }
      
            
          }
    }

    /* ------------------------------ COMMENT POST ------------------------------ */

    const onhandlerCommemt = async () => {

        const data = {

            userId: userDetails._id,
            comment: comment,
            postUserId: post.userId
        }
        try {
            await userInstance.
                put(`/comment/post/${post._id}`,
                    { ...data })
                    if (post.userId !== userId) {
                        socket.emit('send-notification', {
                            senderId: userId,
                            recieverId: post.userId,
                            desc: 'commented your post'
                        })
                    }
            SetComment("")

        }catch(error){
         
            if (error?.response?.status === 403) {
              localStorage.removeItem('userToken')
              localStorage.removeItem('user')
              Navigate("/login")
           }else{
             Navigate('/errorPage')
           }
      
            
          }
    }

    /* ------------------------------ VIEW COMMENTS ----------------------------- */
    const onhandleViewComments = () => {

        try {

            setviewCommet(!viewComment)
            userInstance.
                get(`/viewcomment/post/${post._id}`).
                then((response) => {

                    SetSeeeComments(response.data)

                })
        }catch(error){
         
            if (error?.response?.status === 403) {
              localStorage.removeItem('userToken')
              localStorage.removeItem('user')
              Navigate("/login")
           }else{
             Navigate('/errorPage')
           }
      
            
          }
    }

    /* -------------------------------- SAVE POST ------------------------------- */

    const onhandleSavePost = async () => {

        const data = {
            userId: userDetails._id,
        }
        try {
            await userInstance.
                put(`/savepost/${post._id}`,
                    { ...data }).then((response) => {


                        if (response.data.message == "updated") {
                            const notify = () => toast("Added To Saved");
                            notify()
                            SetIsSaved(!isSaved)
                        } else {
                            const notify = () => toast("Removed From Saved!");
                            notify()
                            SetIsSaved(!isSaved)


                        }
                    })

        } catch(error){
         
            if (error?.response?.status === 403) {
              localStorage.removeItem('userToken')
              localStorage.removeItem('user')
              Navigate("/login")
           }else{
             Navigate('/errorPage')
           }
      
            
          }
    }


    /* ------------------------------- REPORT POST ------------------------------ */
    const handleReport = async (e) => {
        try {
            e.preventDefault()
            console.log(post._id, "report")
            close();

            await userInstance.
                put(`/post/report/${post._id}`,
                    { userId, reportValue }).then((response) => {

                        SetReportChange(new Date())


                    })

        } catch(error){
         
            if (error?.response?.status === 403) {
              localStorage.removeItem('userToken')
              localStorage.removeItem('user')
              Navigate("/login")
           }else{
             Navigate('/errorPage')
           }
      
            
          }


    }

    /* ------------------------------ close modals ------------------------------ */

    const close = () => {
        setPostMod(false)

    }



    /* ------------------------------- delete post ------------------------------ */

    const postDelete = async (id) => {
        try {

            await userInstance.
                put(`/post/delete/${id}`)
            SetReportChange(new Date())

        } catch(error){
         
            if (error?.response?.status === 403) {
              localStorage.removeItem('userToken')
              localStorage.removeItem('user')
              Navigate("/login")
           }else{
             Navigate('/errorPage')
           }
      
            
          }

    }

    console.log(userDetails, isSaved, "USERDETAILS")

    return (

        <>
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
                            <Link to={`/profile/${user.username}`} state={{ userID: user._id }}>
                                {
                                    user?.profilePicture ?
                                        <img src={PF + user?.profilePicture} className='rounded-full w-12 h-12 bg-black  '></img>
                                        : <img src={avatar} className='rounded-full w-12 h-12 bg-black  '></img>

                                }
                            </Link>
                            <div className=' flex flex-col justify-start  ml-2'>
                                <div className='text-sm font-medium flex justify-start'>{user.username}</div>
                                <div className='text-xs flex justify-start '>{format(post.createdAt)}</div>
                            </div>
                        </div>
                        <div className='text-2xl w-44 p-2  flex justify-end relative '><BsThreeDots className='flex justify-end' onClick={(e) => setBlockModal(!blockModal)} />
                            {blockModal ?
                                <div className='absolute top-8 right-1 cursor-pointer z-30 bg-white shadow-sm	 rounded-lg border  flex-col flex justify-end'>
                                    <div className=''>
                                        {userDetails._id == post.userId ?
                                            <div className='text-base p-1 px-4'
                                                //  onClick={handleReport}
                                                onClick={(e) => postDelete(post._id)}>Delete </div> :
                                            <div className='text-base p-1 px-4'
                                                //  onClick={handleReport}
                                                onClick={(e) => setPostMod(!postMod)}>report </div>


                                        }


                                    </div>

                                </div> : null}



                            {/* <!-- component --> */}



                        </div>
                    </div>
                </div>
                <div className='  border-slate-300 border-y  flex justify-center'>
                    <img className="h-[350px] w-[400]" src={PF + post.img} />
                </div>
                <div className='w-full h-16  border-slate-300 '>
                    <div className='w-full  flex justify-between  h-3/5 items-center '>
                        <div className='w-20  flex justify-between items-center space-x-4 p-2'>
                            <div className='text-3xl text-slate-900 hover:cursor-pointer ' onClick={onHandlerLike}>
                                {
                                    isLike ? <AiFillHeart className='text-red-600 ' /> : <AiOutlineHeart className=' hover: transition delay-150 duration-200 ease-in-out hover:text-4xl' />
                                }
                            </div>
                            <div className='text-2xl hover:cursor-pointer' onClick={onhandleViewComments}><FaRegComment className='hover: transition delay-150 duration-200 ease-in-out hover:text-3xl' /> </div>
                            {/* <div className='text-2xl'><FiSend /> </div> */}

                        </div>
                        {
                            isSaved ?

                                <div className='text-2xl p-1 text-sky-900 ' onClick={onhandleSavePost}><BsFillBookmarkStarFill /> </div>
                                :
                                <div className='text-2xl p-1 ' onClick={onhandleSavePost}><BsBookmark /> </div>

                        }


                    </div>

                    <div className='w-full  h-3/5  flex justify-start  text-base font-semibold hover:cursor-pointer pl-4'>
                        {likes}
                    </div>

                </div>
                <div className='w-full h-8 bg-white border-slate-300  '>
                    <div className='w-full h-1/2  px-1 flex items-center '>

                        <p className=' text-base font-medium pl-2 '>{user.username}</p>


                        <p className=' text-base font-normal pl-2'>{post.desc}</p>
                    </div>


                </div>
                <div onClick={onhandleViewComments} className='cursor-pointer'>
                    view all comments
                </div>
                {
                    viewComment ?
                        <div>
                            <div className='overflow-y-scroll max-h-24 no-scrollbar'>


                                {/* <div className='text-lg font-medium '>comments</div> */}
                                {
                                    seeComments.map((obj) => {
                                        return (
                                            <>
                                                <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 pr-2 items-center '>
                                                    {
                                                        obj.userId.profilePicture ?
                                                            <img src={PF + obj.userId?.profilePicture} className='rounded-full w-12 h-12 bg-black  '></img>
                                                            : <img src={avatar} className='rounded-full w-12 h-12 bg-black  '></img>


                                                    }
                                                    <div>
                                                        <div className='flex justify-start'>
                                                            <div className='ml-1 flex justify-start items-center'>
                                                                <div className='h-full  bg-gray flex items-center text-sm font-medium justify-start'> {obj.userId.username}</div>
                                                                <p className='h-full w-8/12 bg-white text-area flex  pl-5' >{obj.comment}</p>

                                                            </div>
                                                        </div>
                                                        <div className=' ml-1 text-xs flex justify-start'>{format(obj.createdAt)}</div>

                                                    </div>
                                                    {/* <div className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal ' onClick={onhandlerCommemt}>Comment</div> */}

                                                </div>
                                            </>
                                        )
                                    })

                                }
                            </div>

                            <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                                <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                                <textarea disable placeholder='Add Comment' className='h-full w-9/12 bg-white text-area flex items-center p-1' value={comment} onChange={(e) => SetComment(e.target.value)}></textarea>


                                <div className=' disabled h-full w-2/12 items-center text-center text-sky-900 font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 flex px-2 justify-center text-base cursor-pointer ' onClick={onhandlerCommemt}>Comment</div>

                            </div>

                        </div> :

                        <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                            <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                            <textarea placeholder='Add Comment' className='h-full w-9/12 bg-white text-area flex items-center p-1' value={comment} onChange={(e) => SetComment(e.target.value)}></textarea>


                            <div className='h-full w-2/12 bg-sky-700 hover:bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center font-normal text-base cursor-pointer ' onClick={onhandlerCommemt}>Comment</div>

                        </div>
                }

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
                                        <input type="radio" className="m-2" name="Content" value="Violation of someone's privacy" onClick={(e) => { setReportValue(e.target.value) }} checked />
                                        <label htmlFor="" className="p-2">Violation of someone's privacy
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Public shaming" onClick={(e) => { setReportValue(e.target.value) }} />
                                        <label htmlFor="" className="p-2">Public shaming
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Goes against my beliefs, values or politics" onClick={(e) => { setReportValue(e.target.value) }} />
                                        <label htmlFor="" className="p-2">Goes against my beliefs, values or politics
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Supporting or promoting a hate group" onClick={(e) => { setReportValue(e.target.value) }} />
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
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

                    </> : null}
        </>
    )


}

export default Post