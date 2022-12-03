import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { FaRegEnvelope, FaLock, FaSearch, FaHome } from 'react-icons/fa'
import { SiMessenger } from 'react-icons/si'
import { IoMdNotifications } from 'react-icons/io'
import logo from '../../assets/images/logo.png'
import { AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import profile from '../../assets/images/profile.jpg'
import { update } from '../../redux/userRedux'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../redux/userRedux'
import { findSearch } from '../../API/User'







export default function Navbar({ setStatus}) {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [file, setFile] = useState("")
    const [updateDetails, SetUpdateDetails] = useState("Details")
    const [edit, SetEdit] = useState([])
    const [showMod, SetShowMod] = useState(false)
    // const [file, SetFile] = useState("")
    const [updation, setUpdation] = useState(false)
    const [searchUser , setSearchUser] = useState([])

    const userDetails = useSelector(state => state.user)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleEdit = async (e) => {

        e.preventDefault()
        const newEdit = {
            ...edit
        }
        if (file) {
            const datas = new FormData();
            const fileName = file.name
            datas.append("file", file)
            datas.append("name", fileName)
            edit.groupProfile = fileName
            try {
                await axios.post('http://localhost:4000/upload', datas)
                console.log(datas, "data");

                // window.location.reload()

            } catch (error) {
                console.log(error);
            }
        }
        try {
            console.log("suiiiiiiiii")
            await axios.post('http://localhost:4000/group/create', { ...edit, admin: userDetails._id }).then((response) => {

                setUpdation(!updation)
                SetShowMod(!showMod)
                setStatus(new Date())
            })


               
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {

        SetEdit({ ...edit, [e.target.name]: e.target.value })




    }

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
                      navigate('/login')
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

    const handleSearch = async (e)=>{

        const val = e.target.value

        if( val == ""){
            setSearchUser([])
        }

        try {
            console.log(val , "valllllllllllllll")
            const {data} = await findSearch(val)
            setSearchUser(data)
            console.log(data , "searched user")
        }catch(error){


        }
    }


    console.log(searchUser , "userdataaaaaaaaaaa")

    return (

<>
        <div className='flex items-center justify-between bg-sky-900 h-14 sm:h-16  sticky top-0 z-10'>
            {/* left  */}
            <div className='md:pl-6  pl-2 flex justify-between '>
                {/* <img src={logo} className="w-12 h-10"/> */}
                <div className=' md:w-14 md:h-14 bg-slate-50 text-black flex justify-center items-center text-center'>

                    logo

                </div>


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
                    <div className='flex items-center bg-white p-3  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <IoMdNotifications className='md:text-2xl text-xl ' />
                    </div>

                    {/* <Link to={`/profile/${userDetails.username}`} state={{ userID: userDetails._id }} className='flex items-center bg-white  justify-center  rounded-full md:hover:bg-gray-100 cursor-pointer '>
                        <img className='w-12 h-12 object-fit  rounded-full' src={profile} />
                    </Link> */}
                    <div onClick={(e) => setOpen(!open)}>
                        <img className='w-12 h-12 object-fit  rounded-full' src={profile} />
                    </div>
                    {
                        open &&

                        <div class="absolute right-0 z-20 w-56 py-2  overflow-hidden  rounded-md shadow-xl dark:bg-blue-200 mt-72 bg-sky-100  ">
                            <a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={PF + userDetails?.profilePicture} alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-center w-full">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900 flex justify-start">{userDetails.userfullname}</h1>
                                    <p class="text-sm text-gray-900 dark:text-gray-900 flex justify-start ">{userDetails.username}</p>
                                </div>
                            </a>
                            <div onClick={(e) => SetShowMod(!showMod)} class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-start">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">Create Group</h1>
                                    {/* <p class="text-sm text-gray-900 dark:text-gray-900 ">{userDetails.email}</p> */}
                                </div>
                            </div>
                            <a onClick={logout}class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={PF + userDetails?.profilePicture} alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-center w-full">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900 flex justify-start">LogOut</h1>
                                    {/* <p class="text-sm text-gray-900 dark:text-gray-900 flex justify-start ">{userDetails.username}</p> */}
                                </div>
                            </a>

                            <Link to={`/profile/${userDetails.username}`} state={{ userID: userDetails._id }} ><a href="" class="block px-4 py-3 text-sm text-gray-600 capitalize font-extrabold  transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                view profile
                            </a></Link>

                            {/* <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize  font-extrabold transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLogout}>
                                Sign Out
                            </a> */}

                        </div>}
                </div>

            </div>
            {showMod ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">

                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Edit your details</h3>
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
                                    />
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
                                    />
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
                                        type="button"
                                        onClick={handleEdit}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
         
         <div>
            <div className='fixed md:top-18 top-16 z-30 bg-white left-1/3 md:w-1/5 w-2/5 rounded-2xl shadow-lg  h-max'>
                {
                searchUser.map((obj)=>{

                    return(
                        <Link to={`/profile/${obj.username}`} state={{ userID: obj._id }}>
                        <div className='w-full h-14 flex p-2 justify-between items-center'>
                           <img className = "h-10 rounded-full shadow-md w-10"src={PF +obj.profilePicture}/>
                            
                           
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


