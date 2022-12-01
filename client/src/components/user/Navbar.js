import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { FaRegEnvelope, FaLock, FaSearch, FaHome } from 'react-icons/fa'
import { SiMessenger } from 'react-icons/si'
import { IoMdNotifications } from 'react-icons/io'
import logo from '../../assets/images/logo.png'
import { AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import profile from '../../assets/images/profile.jpg'
import { update } from '../../redux/userRedux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'






export default function Navbar({ setStatus}) {

    const [file, setFile] = useState("")
    const [updateDetails, SetUpdateDetails] = useState("Details")
    const [edit, SetEdit] = useState([])
    const [showMod, SetShowMod] = useState(false)
    // const [file, SetFile] = useState("")
    const [updation, setUpdation] = useState(false)

    const userDetails = useSelector(state => state.user)
    const [open, setOpen] = useState(false)


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




    return (


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
                    <input type="text" className="flex justify-center outline-none bg-transparent" placeholder="search" />
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

                        <div class="absolute right-0 z-20 w-56 py-2  overflow-hidden  rounded-md shadow-xl dark:bg-blue-200 mt-72 bg-sky-100 mr-20 m-10">
                            <a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-start">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">{userDetails.username}</h1>
                                    <p class="text-sm text-gray-900 dark:text-gray-900 ">{userDetails.email}</p>
                                </div>
                            </a>
                            <div onClick={(e) => SetShowMod(!showMod)} class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                <div class="mx-1 flex flex-col justify-start">
                                    <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">Create Group</h1>
                                    {/* <p class="text-sm text-gray-900 dark:text-gray-900 ">{userDetails.email}</p> */}
                                </div>
                            </div>


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
    )
}


