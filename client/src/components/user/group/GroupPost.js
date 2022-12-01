import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import { format } from 'timeago.js'
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart, AiOutlineFileSync } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'







function GroupPost({ post, groupId }) {




  //   const [likes, SetLikes] = useState(post.likes.length)
  //   const [isLike, SetIsLike] = useState(false)
  //   const [comment, SetComment] = useState("")
  //   const [viewComment, setviewCommet] = useState(false)
  //   const [seeComments, SetSeeeComments] = useState([])

  //   const [showImage, setShowImage] = useState()

  //   const [postMod, setPostMod] = useState(false);
  //   const [groupPost, setGroupPost] = useState([])

  const [likes, SetLikes] = useState(post.likes.length)
  const [isLike, SetIsLike] = useState(false)
  const [comment, SetComment] = useState("")
  const [viewComment, setviewCommet] = useState(false)
  const [seeComments, SetSeeeComments] = useState([])





  const userDetails = useSelector(state => state.user)

  //   const groupId = useParams().groupid

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const userID = userDetails._id



  console.log(post, "LLLLLLLLL")

  const onHandlerLike = async () => {
    console.log(post._id, " postid")
    // console.log(userId)

    let res = await axios.put(`http://localhost:4000/group/like/post/${post._id}`, { userId: userID })

    SetLikes(isLike ? likes - 1 : likes + 1)
    SetIsLike(!isLike)


  }

  useEffect(() => {

    SetIsLike(post.likes.includes(userID))

  }, [userID, post._id])


  const onhandlerCommemt = async () => {

    const data = {

      groupId: groupId,
      userId: userDetails._id,
      comment: comment
    }

    let res = await axios.put(`http://localhost:4000/group/comment/post/${post._id}`, { ...data })

    SetComment("")
  }

  // console.log(post, "userrrrrrrrrrrrreeeeeeeee")

  const onhandleViewComments = () => {

    console.log(post._id, "postidddddddddddddddddddddddddd")
    setviewCommet(!viewComment)

    // if(viewComment){

    axios.get(`http://localhost:4000/group/viewcomment/post/${post._id}`).then((response) => {

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
    <div className='md:w-7/12 bg-white md:m-5 sm:w-5/6 w-full mt-5 rounded-2xl m-2 border-slate-300 border h-max shadow-xl'>
      <div className='w-full h-16  flex justify-between items-center pl-2 rounded-t-2xl '>
        <div className='w-full h-14  flex justify-between items-center rounded-t-2xl ' >
          <div className='h-full w-36 flex justify-start items-center'>
            <div className='rounded-full w-12 h-12 bg-black  '></div>
            <div className=' flex flex-col justify-start  ml-2'>
              <div className='text-sm font-medium flex justify-start'>{post.userId.username}</div>
              <div className='text-xs flex justify-start relative'>{format(post.createdAt)}</div>
            </div>
          </div>
          <div className='text-2xl w-44 p-2  flex justify-end relative '><BsThreeDots className='flex justify-end'
          //  onClick={(e) => setBlockModal(!blockModal)}
          />
            {/* {blockModal ?
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

                                </div> : null} */}



            {/* <!-- component --> */}



          </div>
        </div>
      </div>
      <div className='  border-slate-300 border-y  flex justify-center'>
        <img className="h-[400px] w-[400]"
          src={PF + post.img}
        />
      </div>
      <div className='w-full h-16  border-slate-300 '>
        <div className='w-full  flex justify-between  h-3/5 items-center '>
          <div className='w-28  flex justify-between items-center space-x-4 p-2'>
            <div className='text-3xl text-slate-900 hover:cursor-pointer '
              onClick={onHandlerLike}
            >
              {
                isLike ? <AiFillHeart className='text-red-600' /> : <AiOutlineHeart />
              }
            </div>
            <div className='text-2xl'
              onClick={onhandleViewComments}
            ><FaRegComment /> </div>
            <div className='text-2xl'><FiSend /> </div>

          </div>
          <div className='text-2xl p-1 '
          //  onClick={onhandleSavePost}
          ><BsBookmark /> </div>


        </div>

        <div className='w-full  h-3/5  flex justify-start  text-base font-semibold hover:cursor-pointer pl-4'>
          {likes}
        </div>

      </div>
      <div className='w-full h-14 bg-white border-slate-300  '>
        <div className='w-full h-1/2  px-1 flex items-center '>

          <p className=' text-lg font-medium pl-2 '>
            {/* {obj.userId.username} */}
            {post.userId.username}
          </p>


          <p className=' text-base font-normal pl-2'>
            {/* {obj.desc} */}
            {post.desc}
          </p>
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
                      <div className='text-xs flex justify-start'>{format(obj.createdAt)}</div>
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
      


      {/* <div className='w-full h-14 bg-white rounded-b-2xl flex p-2 items-center border'>

                  <div className='h-full w-1/12 bg-gray text-2xl flex items-center'> <BsEmojiSmile /></div>
                  <textarea placeholder='Add Comment' className='h-full w-9/12 bg-white text-area flex items-center p-1'
                   value={comment} onChange={(e) => SetComment(e.target.value)}
                  >

                  </textarea>


                  <div className='h-full w-2/12 bg-sky-900 items-center text-center text-white rounded-lg  flex mx-1 justify-center text-lg font-normal cursor-pointer '
                   onClick={onhandlerCommemt}
                  >Comment</div>

                </div> */}


    </div>

  )
}

export default GroupPost