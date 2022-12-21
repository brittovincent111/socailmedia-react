import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { FaRegEnvelope, FaLock, FaSearch, FaHome } from 'react-icons/fa'
import { SiHomeassistantcommunitystore, SiMessenger } from 'react-icons/si'
import { IoMdNotifications } from 'react-icons/io'
import profile from '../../assets/images/profile.jpg'
import avatar from '../../assets/images/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../redux/userRedux'
import { findSearch, notifiactionFind, notifiactionRead } from '../../API/User'
import vm from '../../assets/images/wemeet.png'
import { io } from 'socket.io-client'
import { useRef } from 'react'
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { SocketContext } from '../../UpdationContext/Socket'








export default function Navbar() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [file, setFile] = useState("")
    const [updateDetails, SetUpdateDetails] = useState("Details")
    const [edit, SetEdit] = useState({
        groupName: "",
        about: ""
    })
    const [showMod, SetShowMod] = useState(false)
    const [updation, setUpdation] = useState(false)
    const [searchUser, setSearchUser] = useState([])
    const [notificationData, setNotificationData] = useState([])
    const [openNot, setOpenNot] = useState(false)
    const [counts, SetCounts] = useState('')
    const [liked, SetLiked] = useState()

    const userDetails = useSelector(state => state.user)
    const userId = userDetails._id
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const socket = useContext(SocketContext)

    useEffect(() => {
        if (userDetails) {
            socket.emit("new-user-add", userDetails._id)
        }
        // setNotifications(JSON.parse(localStorage.getItem('count')));
    }, []);

    /* ------------------------------ CREATE GROUP ------------------------------ */

    const handleEdit = async (e) => {

        e.preventDefault()
        const newEdit = {
            ...edit
        }

        try {
            // if (file) {
            //     const datas = new FormData();
            //     const fileName = file.name
            //     datas.append("file", file)
            //     datas.append("name", fileName)
            //     edit.groupProfile = fileName

            //         await axios.post('http://localhost:4000/upload', datas)


            // }
            // // console.log("suiiiiiiiii")

            await axios.
                post('http://localhost:4000/group/create',
                    { ...edit, admin: userDetails._id })


            setUpdation(!updation)
            SetShowMod(!showMod)




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
    /* ------------------------------ HANDLE CHANGE ----------------------------- */
    const handleChange = (e) => {

        SetEdit({ ...edit, [e.target.name]: e.target.value })
    }

    /* --------------------------------- LOGOUT --------------------------------- */

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
                                    Navigate('/login')
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

    /* ------------------------------ SEARCH USERS ------------------------------ */

    const handleSearch = async (e) => {

        const val = e.target.value

        if (val == "") {
            setSearchUser([])
        }

        try {
            const { data } = await findSearch(val)
            setSearchUser(data)
        } catch (error) {

            // Navigate('/errorPage')


        }
    }

    useEffect(() => {
        if (userDetails) {
            socket.emit("new-user-add", userDetails._id)
        }
        // setNotifications(JSON.parse(localStorage.getItem('count')));
    }, []);


    useEffect(() => {
        try {
            console.log('effect called');
            socket.on("getNotification", data => {
                console.log('effect called  sdfgdfg');

                SetLiked(new Date())
            })
        } catch (error) {

            Navigate('/errorPage')


        }

    }, [socket])


    /* ------------------------------- NOTIFCATION ------------------------------ */


    useEffect(() => {
        console.log("hiiiii");
        const notificationHandler = async () => {
            try {
                const { data } = await notifiactionFind(userId)
                console.log(data.data, "dataaaaa");

                setNotificationData(data.data)
                SetCounts(data.countLength)

            } catch (error) {
                Navigate('/errorPage')
            }
        }

        notificationHandler()

    }, [counts, socket, liked])

    /* --------------------------- VIEWED NOTIFICATION -------------------------- */

    const notificationHandle = async (e) => {
        setOpenNot(!openNot)
        try {

            const { data } = await notifiactionRead(userId)
            SetCounts("0")

        } catch (error) {

            Navigate('/errorPage')


        }
    }



    console.log(liked, "likedddd")

    return (

        <>
            <div className='flex items-center justify-between bg-sky-900 h-14 sm:h-16  sticky top-0 z-40'>
                {/* left  */}
                <div className='md:pl-6  pl-2 flex justify-between '>
                    {/* <img src={logo} className="w-12 h-10"/> */}
                    <img src={vm} className='w-16 md:w-16 h-14 p-1 md:h-12 rounded-full  text-black flex justify-center items-center text-center'>



                    </img>


                </div>





                {/* center */}
                <div className='flex items-center '>
                    <div hidden className='sm:flex items-center bg-gray-100 ml-2 p-2 rounded-2xl w-24  md:w-60'>
                        <FaSearch className='mx-2 text-gray-600' />
                        <input type="text" onChange={handleSearch} className="flex justify-center outline-none bg-transparent" placeholder="search" />
                    </div>
                    <div className='w-max h-max bg-white rounded-full m-1'>

                        <FaSearch className=' text-gray-600 m-4 sm:hidden' />
                    </div>



                </div>

                {/* right */}
                <div className='flex items-center  '>
                    <div className='flex items-center md:mx-2 mx-1 md:space-x-6 space-x-2 '>
                        <Link to='/' className='flex items-center bg-white p-3 md:ml-2  rounded-full md:hover:bg-gray-100 cursor-pointer'>
                            <FaHome className='md:text-2xl text-xl ' />
                        </Link>
                        <Link to='/message' className='flex items-center bg-white p-3 rounded-full md:hover:bg-gray-100 cursor-pointer '>
                            <SiMessenger className='md:text-2xl text-xl ' />
                        </Link>
                        <div className=''>
                            <div onClick={(e) => { notificationHandle(e) }} className='relative flex items-center bg-white p-3  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                                <IoMdNotifications className='md:text-2xl text-xl ' />
                                {
                                    counts != 0 ?
                                        <span className='absolute top-1.5 right-2 h-4 w-4 flex items-center justify-center rounded-full p-1 bg-red-600 text-white text-sm font-semibold'>{counts}</span>
                                        : null
                                }
                            </div>
                        </div>


                        <div onClick={(e) => setOpen(!open)}>
                            {userDetails?.profilePicture ?
                                <img className='w-12 h-12 object-fit  rounded-full' src={PF + userDetails?.profilePicture} /> :
                                <img className='w-12 h-12 object-fit  rounded-full' src={avatar} />

                            }
                        </div>
                        {
                            open &&

                            <div class="absolute right-0 z-20 w-56 py-2  overflow-hidden  rounded-md shadow-xl dark:bg-blue-200 mt-64 bg-sky-100  ">
                                <Link to={`/profile/${userDetails.username}`} state={{ userID: userDetails._id }} >
                                    <a class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                        {userDetails?.profilePicture ?
                                            <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={PF + userDetails?.profilePicture} />
                                            : <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={avatar} />

                                        }
                                        <div class="mx-1 flex flex-col justify-center w-full">
                                            <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900 flex justify-start">{userDetails.userfullname}</h1>
                                            <p class="text-sm text-gray-900 dark:text-gray-900 flex justify-start ">{userDetails.username}</p>
                                        </div>
                                    </a>
                                </Link>
                                <div onClick={(e) => SetShowMod(!showMod)} class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                    <div class="mx-1 flex flex-col justify-start">
                                        <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">Create Group</h1>
                                        {/* <p class="text-sm text-gray-900 dark:text-gray-900 ">{userDetails.email}</p> */}
                                    </div>
                                </div>
                                <a onClick={logout} class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                                    <AiOutlineLogout class="text-sm flex-shrink-0  mx-1 rounded-full w-10 h-10" />
                                    <div class="mx-1 flex flex-col justify-center w-full">
                                        <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900 flex justify-start">LogOut</h1>
                                        {/* <p class="text-sm text-gray-900 dark:text-gray-900 flex justify-start ">{userDetails.username}</p> */}
                                    </div>
                                </a>
                            </div>}

                        {
                            openNot &&

                            <div class="absolute right-20 max-h-48 z-20 w-72 py-2  overflow-y-scroll no-scrollbar  rounded-md shadow-xl dark:bg-blue-200 top-16 bg-sky-100  ">
                                {notificationData.map((obj) => {

                                    return (
                                        <div>
                                            <div class="flex items-center py-2 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                                {obj.user.profilePicture ?
                                                    <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={PF + obj.user.profilePicture} />
                                                    : <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={avatar} />

                                                }
                                                <div class="m-2   ">
                                                    <div className='flex items-center justify-between'>
                                                        <h1 class="text-md font-semibold text-gray-700 dark:text-gray-900 ">{obj.user.username}</h1>

                                                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-900 pl-2">{obj.desc}</p>
                                                    </div>

                                                   <div className='flex justify-start'>

                                                    <p class="text-sm flex justify-start font-semibold text-gray-700 dark:text-gray-900 ">{format(obj.time)}</p>
                                                   </div>


                                                </div>

                                            </div>
                                        </div>

                                    )
                                })
                                }
                            </div>
                        }
                    </div>

                </div>
                {showMod ? (
                    <>
                        <form onSubmit={handleEdit}>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">

                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">Create Group</h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => SetShowMod(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        <div className="relative p-6 flex-col">
                                            <input
                                                type="text"
                                                name="groupName"
                                                placeholder="Enter the Group Name"
                                                onChange={handleChange}
                                                required />
                                            {/* <input className='ml-5'
                                        type="file" name='file' id='file' onChange={(e) => {
                                            // setImage(URL.createObjectURL(e.target.files[0]))
                                            { setFile(e.target.files[0]) }
                                        }

                                        } /> */}
                                            {/* <span className='text-sm'>Update your profile pic</span> */}
                                            <br /> <br />
                                            <input
                                                type="text"
                                                name="about"
                                                placeholder="Enter the About"
                                                onChange={handleChange}
                                                required />
                                            {/* <input className='ml-5'
                                        type="password"
                                        name="password"
                                        placeholder="change password"
                                        onChange={handleChange}
                                    /> */}
                                        </div>

                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => SetShowMod(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"

                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>

            <div>
                <div className='fixed md:top-18 top-16 z-30 bg-white left-1/3 md:w-1/5 w-2/5 rounded-2xl shadow-lg  h-max'>
                    {
                        searchUser.map((obj) => {

                            return (
                                <Link to={`/profile/${obj.username}`} state={{ userID: obj._id }}>
                                    <div className='w-full h-14 flex p-2 justify-between items-center'>
                                        {obj.profilePicture ?
                                            <img className="h-10 rounded-full shadow-md w-10" src={PF + obj.profilePicture} />
                                            : <img className="h-10 rounded-full shadow-md w-10" src={avatar} />

                                        }


                                        <div className='font-normal'>

                                            {obj.userfullname}
                                        </div>

                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>


        </>
    )
}


