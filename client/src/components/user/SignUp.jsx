import React from 'react'
import photo from '../../assets/images/img3.jpg'
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa'
import google from '../../assets/images/google.png'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reSendOtp, sendOtp, verifyOtpLogin } from '../../API/User'
import OTPInput, { ResendOTP } from "otp-input-react";
import Countdown from 'react-countdown'
import { useEffect } from 'react'
import { FadeLoader } from 'react-spinners'


function SignUp() {

    const Navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [signUp, SetSignUp] = useState({
        userfullname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    const [resend, setResend] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [OTP, setOTP] = useState("");
    const [loader, setLoader] = useState(false)
    const [loading, setloading] = useState(false)


    /* ------------------------------ HANDLE CHANGE ----------------------------- */

    const onHandleChange = (e) => {
        e.preventDefault()
        SetSignUp({ ...signUp, [e.target.name]: e.target.value })


    }



    /* --------------------------------- SIGNUP --------------------------------- */

    const OnSignup = (async (e) => {

        let deatailsOtp = {

            userfullname: signUp.userfullname,
            username: signUp.username,

            email: signUp.email,
            password: signUp.password

        }
        e.preventDefault()
        try {
            if (!signUp.userfullname) {
                setErrorMessage("Name is required");
            } else if (signUp.userfullname.length < 3) {
                setErrorMessage("Name must be atleast 3 characters");
            }
            else if (!signUp.username) {
                setErrorMessage("Userame is required");
            } else if (signUp.username.length < 3) {
                setErrorMessage("Name must be atleast 3 characters");
            } else if (!signUp.username.match(/^(?!.\.\.)(?!.\.$)[^\W][\w.]{0,29}$/)) {
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

                try {
                    setLoader(true)
                    setloading(true)

                    const { data } = await sendOtp(signUp.email, deatailsOtp)
                    setErrorMessage("");

                    console.log(data)
                    if (data.status) {
                        setloading(false)
                        setLoader(false)
                        toast.success(data.message)
                        setTimeout(() => {
                            console.log("Otp send in");

                            setResend(true)
                        }, "30000")
                        setOtpModal(true)

                    } else {
                        console.log('otp not send failure');
                    }


                } catch (error) {
                 

                    if(error.response.status == 401){
                        setLoader(false)
                        setloading(false)
                        setErrorMessage(error.response.data.error);
                        console.log(error)
                    }else{

                        Navigate('/errorPage')
                    }
                  
                }


            }
        } catch (error) {
            console.log();
        }



    })

    /* ------------------------------- RESEND OTP ------------------------------- */
    const resendOtp = async () => {


        try {
            setLoader(true)
            setloading(true)
            setResend(false)
            const { data } = await reSendOtp(signUp.email)
            console.log(data)
            if (data.status) {
                setloading(false)
                setLoader(false)
                toast.success(data.message)
                setTimeout(() => {
                    console.log("Otp send in");
                    setResend(true)

                }, "30000")
                setOtpModal(true)

            } else {
                console.log('otp not send failure');
            }

        } catch (error) {

            Navigate('/errorPage')

        }
    }


    /* ------------------------------- VERIFY OTP ------------------------------- */

    const verifyOtp = async () => {

        try {
            console.log("hiiiiii")
            const { data } = await verifyOtpLogin(OTP, signUp.email)
            if (data.auth) {
                console.log("heeee")

                await axios.
                    post('http://localhost:4000/signup', {

                        userfullname: signUp.userfullname,
                        username: signUp.username,

                        email: signUp.email,
                        password: signUp.password

                    }).then((response) => {

                        Navigate('/login')
                    })

            } 

        } catch (error) {

            if(error.response.status == 403){
                setOtpModal(false)

                setErrorMessage(error.response.data.message);
                console.log(error);
            }else{
    
                Navigate('/errorPage')
            }
         
        }
    }
    return (
        <>
            <div className=' LoginMain h-screen flex flex-col items-center justify-center width-full flex-1 p-10 w-full bg-blue-100 ' >
                {errorMessage && <div className="p-4 my-4 text-sm text-red-900 bg-red-100 rounded-lg dark:bg-red-400 dark:text-red-800" role="alert">{errorMessage}</div>}
                <div className='main bg-slate-50 rounded-2xl shadow-2xl  lg:w-2/3 flex justify-center max-w-4xl  '>
                    {/* <div hidden className='w-2/5 p-5 py-36 px-12 bg-blue-700 rounded-tl-2xl rounded-bl-2xl lg:block ' >
                    <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
                    <div className='border-2 w-10  border-white inline-block mb-2'></div>
                    <p className='mb-10  text-white'>Fill Up Personal Information </p>
                    <Link to='/login' className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-700'>LOGIN</Link>

                </div> */}

                    <div hidden className='hero relative w-2/5   bg-sky-600 rounded-tl-2xl rounded-bl-2xl lg:block   '  >
                        {/* <div className='w-20 h-20   absolute left-[40%] bottom-16 rounded-full bg-sky-900 hover:bg-gray-200 flex justify-center items-center'>
                            <Link to='/login' className='text-xl text-white hover:text-sky-900 font-semibold '>LOGIN</Link>

                        </div> */}
                        {/* <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
          <div className='border-2 w-10  border-white inline-block mb-2'></div>
          <p className='mb-10  text-white'>Fill Up Personal Information </p>
          <a className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-400'>Login</a> */}




                    </div>

                    <div className='w-3/5 p-1'>

                        <div className='py-10'>
                            <h2 className='text-sky-700 text-3xl mb-2 align-top'>SIGNUP </h2>
                            <div className='border w-44  border-sky-700 inline-block mb-2'></div>

                            <form onSubmit={OnSignup}>


                                <div className='flex flex-col items-center '>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 h-10'>
                                        <FaUserAlt className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none  flex-1' type="name" placeholder='FullName' name='userfullname' onChange={(e) => { onHandleChange(e) }} />
                                    </div>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 h-10'>
                                        <FaUserAlt className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none  flex-1' type="name" placeholder='Username' name='username' onChange={(e) => { onHandleChange(e) }} />
                                    </div>

                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2  h-10 '>
                                        <FaEnvelope className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none flex-1' type="email" placeholder='email' name='email' onChange={(e) => { onHandleChange(e) }} />
                                    </div>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 h-10 '>
                                        <FaLock className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='password' onChange={(e) => { onHandleChange(e) }} />
                                    </div>
                                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2  h-10 '>
                                        <FaLock className='mr-2 mx-2' />
                                        <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='confirmpassword' onChange={(e) => { onHandleChange(e) }} />
                                    </div>


                                    <button type='submit' className='border-2 bg-sky-600 rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-sky-700 hover:border-sky-700'>SIGNUP</button>

                                </div>
                            </form>

                            <Link to='/login' className='text-md text-sky-900 font-semibold p-4'>Login ?</Link>

                            




                        </div>

                    </div>


                </div>




            </div>
            {
                otpModal ?
                    // <div>
                    <>
                        <div
                            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent"

                        >
                            {/* <div class="h-screen w-full absolute top-0  bg-blue-500 py-20  px-3"> */}
                            <div class="container mx-auto ">
                                <div class="max-w-sm mx-auto md:max-w-lg">
                                    <div class="w-full ">
                                        <div class="bg-gray-100 flex flex-col justify-center items-center  h-max py-3 rounded text-center">
                                            <h1 class="text-2xl font-bold">OTP Verification</h1>
                                            <div class="flex flex-col mt-4">
                                                <span>Enter the OTP you received at</span>
                                                <span class="font-bold">{signUp.email}</span>
                                            </div>

                                            <OTPInput value={OTP} className="my-2  " onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />

                                            <div class="flex justify-center text-center items-center space-x-3 mt-5">
                                                {resend ?
                                                    <button onClick={(e) => { resendOtp() }} class="px-4 py-2 bg-blue-300 flex items-center text-white hover:bg-blue-300 cursor-pointer" ><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></button>

                                                    : <button class="px-4 py-2 bg-blue-700 flex items-center text-white hover:bg-blue-900 cursor-pointer" onClick={(e) => { verifyOtp() }}><span class="font-bold">Submit</span><i class='bx bx-caret-right ml-1'></i></button>
                                                }
                                                <button class="px-4 py-2 bg-blue-700 flex items-center text-white hover:bg-blue-900 cursor-pointer"><span class="font-bold" onClick={(e) => setOtpModal(false)}>Cancel</span><i class='bx bx-caret-right ml-1'></i></button>
                                            </div>
                                            {resend ? (
                                                null
                                            ) : (
                                                <div className='flex justify-center text-center mt-5'>

                                                    <Countdown date={Date.now() + 30000} />
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                        {/* // </div> */}
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
                    : null
            }

            {
                loader ?
                    <>
                        <div
                            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent"

                        >
                            <FadeLoader color="#36d7b7" loading />


                        </div>

                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
                    :
                    null
            }


        </>
    )
}

export default SignUp