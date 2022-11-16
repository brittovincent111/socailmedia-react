import React from 'react'
import photo from '../../assets/images/img3.jpg'
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa'
import google from '../../assets/images/google.png'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

    const Navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [signUp, SetSignUp] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })


    const onHandleChange = (e) => {
        e.preventDefault()
        console.log(signUp)

        SetSignUp({ ...signUp, [e.target.name]: e.target.value })


    }

    const OnSignup = (async (e) => {
        e.preventDefault()
        try {
            if (!signUp.username) {
                setErrorMessage("Userame is required");
            } else if (signUp.username.length < 3) {
                setErrorMessage("Name must be atleast 3 characters");
            } else if (!signUp.username.match(/^[A-Za-z][A-Za-z ]*$/)) {
                setErrorMessage("Enter a valid name");
            } else if (!signUp.email) {
                setErrorMessage("Email is required");
            } else if (!signUp.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                setErrorMessage("Enter a valid email");


            } else if (!signUp.password) {
                setErrorMessage("Password is required");
            } else if (signUp.password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (signUp.password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else if (!signUp.confirmpassword) {
                setErrorMessage("Confirm Password is required");
            } else if (signUp.password != signUp.confirmpassword) {
                setErrorMessage("Password Incorrect");
            } else {

                console.log("hhhhhhhhhhhhhhhhhhh")

                await axios.post('http://localhost:4000/signup', {
                    username: signUp.username,

                    email: signUp.email,
                    password: signUp.password

                }).then((response) => {
                    

                    console.log(response)
                    console.log("hjhhgg");
                    // console.log(response.error);
                    Navigate('/login')
                }).catch((data) => {
                    console.log(data.response.data.error, "sdffsd");
                    setErrorMessage(data.response.data.error);
                })


            }
        } catch (error) {
            console.log();
        }



    })
    return (
        <div className=' LoginMain h-screen flex flex-col items-center justify-center width-full flex-1 p-20 w-full bg-blue-100 ' >
                                    {errorMessage && <div className="p-4 mb-4 text-sm text-red-900 bg-red-100 rounded-lg dark:bg-red-400 dark:text-red-800" role="alert">{errorMessage}</div>}

            <div className='main bg-slate-50 rounded-2xl shadow-2xl  lg:w-2/3 flex justify-center max-w-4xl '>
                {/* <div hidden className='w-2/5 p-5 py-36 px-12 bg-blue-700 rounded-tl-2xl rounded-bl-2xl lg:block ' >
                    <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
                    <div className='border-2 w-10  border-white inline-block mb-2'></div>
                    <p className='mb-10  text-white'>Fill Up Personal Information </p>
                    <Link to='/login' className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-700'>LOGIN</Link>

                </div> */}

                <div hidden className='hero w-2/5 p-5 py-36 px-12 bg-blue-600 rounded-tl-2xl rounded-bl-2xl lg:block   '  >
                    <div className='w-20 h-20   ml-24 mt-56 rounded-full bg-blue-600 hover:bg-gray-200 flex justify-center items-center'>
                        <Link to='/login' className='text-xl text-white hover:text-blue-900 font-semibold '>LOGIN</Link>

                    </div>
                    {/* <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
          <div className='border-2 w-10  border-white inline-block mb-2'></div>
          <p className='mb-10  text-white'>Fill Up Personal Information </p>
          <a className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-400'>Login</a> */}




                </div>

                <div className='w-3/5 p-5'>

                    <div className='py-10'>
                        <h2 className='text-blue-700 text-3xl mb-2 align-top'>SIGNUP </h2>
                        <div className='border w-44  border-blue-700 inline-block mb-2'></div>

                        <form onSubmit={OnSignup}>


                            <div className='flex flex-col items-center '>
                                <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border border-black h-10'>
                                    <FaUserAlt className='mr-2 mx-2' />
                                    <input className=' bg-gray-100 outline-none  flex-1' type="name" placeholder='Username' name='username' onChange={(e) => { onHandleChange(e) }} />
                                </div>

                                <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border border-black h-10 '>
                                    <FaEnvelope className='mr-2 mx-2' />
                                    <input className=' bg-gray-100 outline-none flex-1' type="email" placeholder='email' name='email' onChange={(e) => { onHandleChange(e) }} />
                                </div>
                                <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border border-black h-10 '>
                                    <FaLock className='mr-2 mx-2' />
                                    <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='password' onChange={(e) => { onHandleChange(e) }} />
                                </div>
                                <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border border-black h-10 '>
                                    <FaLock className='mr-2 mx-2' />
                                    <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='confirmpassword' onChange={(e) => { onHandleChange(e) }} />
                                </div>


                                <button type='submit' className='border-2 bg-blue-600 rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-700 hover:border-blue-700'>SIGNUP</button>

                            </div>
                        </form>
                        <p className='p-5'>Or Signup With</p>
                        <div className='flex justify-center '>


                            <div className='w-44'>
                                <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                                    <svg
                                        className="mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="25px"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        />
                                    </svg>
                                    Login with Google
                                </button>

                            </div>





                        </div>




                    </div>

                </div>


            </div>




        </div>
    )
}

export default SignUp