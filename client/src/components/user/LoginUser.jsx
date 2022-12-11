import React from 'react'
import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import google from '../../assets/images/google.png'
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import image from '../../assets/images/img1.jpg'
import { update } from '../../redux/userRedux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import './LoginPage.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import mainlogo from '../../assets/images/wemeet2.png'
import { forgetPassword } from '../../API/User'


function LoginUser() {

  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [Login, SetLogin] = useState({
    email: "",
    password: ""
  })
  const [resendOtpModal, setResendOtpModal] = useState(false)
  const [resend, setResend] = useState(false)
  const [emailforget, setEmailForget] = useState("")

  /* ------------------------------ HANDLE CHANGE ----------------------------- */
  const onHandleChange = ((e) => {

    e.preventDefault()

    SetLogin({ ...Login, [e.target.name]: e.target.value })
    console.log(Login)

  })


  /* -------------------------------- ON LOGIN -------------------------------- */
  const OnLogin = (async (e) => {
    e.preventDefault()
    try {

      if (!Login.email) {
        setErrorMessage("Email is required");
      } else if (!Login.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
        setErrorMessage("Enter a valid email");
      } else if (!Login.password) {
        setErrorMessage("Password is required");
      } else if (Login.password.length < 4) {
        setErrorMessage("Password must be atleast 4 characters");
      } else if (Login.password.length > 20) {
        setErrorMessage("Password must be less than 20 characters");

      } else {

        await axios.post('http://localhost:4000/Login', {
          username: Login.username,

          email: Login.email,
          password: Login.password

        }).then((response) => {

          localStorage.
            setItem('userToken', response.data.userToken)
          localStorage.
            setItem('user', JSON.stringify(response.data.user))
          dispatch(update(response.data.user))

          Navigate('/')

        }).catch((data) => {

          setErrorMessage(data.response.data.error);

        })


      }
    } catch (error) {
      console.log("HHHHHHHH");
    }



  })


  /* -------------------------------- SEND MAIL ------------------------------- */


  const sendMail = async (e) => {

    e.preventDefault()
    const notify = () => toast("Email Sended");
    notify()
    const { data } = await forgetPassword(emailforget)

    setResendOtpModal(!resendOtpModal)


  }

  console.log(emailforget, "forget");
  return (
    <>
      <div className=' LoginMain h-screen flex flex-col items-center justify-center width-full flex-1 p-20 w-full  bg-blue-100 ' >

        <div className='main bg-white rounded-2xl shadow-2xl flex lg:w-2/3  justify-center max-w-4xl '>
          <div className='w-3/5 p-5 flex flex-col justify-center items-center'>
            <div className='py-10 flex flex-col justify-center items-center'>
              <img src={mainlogo} className='h-24 w-44 mb-2'/>
              <h2 className='text-sky-600 font-semibold text-3xl mb-2 align-top'>LOGIN </h2>
              <div className='border w-44  border-sky-600 inline-block mb-6'></div>
              {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}

              <form onSubmit={OnLogin}>
                <div className='flex flex-col items-center '>
                  <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 shadow-sm h-10'>
                    <FaRegEnvelope className='mr-2 mx-2' />
                    <input className=' bg-gray-100 outline-none  flex-1' type="email" placeholder='email' name='email' onChange={(e) => { onHandleChange(e) }} />
                  </div>

                  <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl    border-2 h-10 '>
                    <FaLock className='mr-2 mx-2' />
                    <input className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' name='password' onChange={(e) => { onHandleChange(e) }} />
                  </div>


                  <button type='submit' className='border-2 bg-sky-600 rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-sky-600 hover:border-sky-400'>LOGIN</button>

                </div>
              </form>
              <p className='p-5'>Or Signin With</p>
              <div className='flex justify-center  ' onClick={(e) => setResendOtpModal(!resendOtpModal)}>

                forgot password
              </div>
            </div>

          </div>
          <div hidden className='hero relative w-2/5  bg-sky-900 rounded-tr-2xl rounded-br-2xl lg:block  '  >
            <div className='w-20 h-20  absolute left-[40%]  bottom-32 rounded-full bg-blue-600 hover:bg-gray-200 flex justify-center items-center'>
              <Link to='/signup' className='text-xl text-white hover:text-sky-900 font-semibold '>SIGNUP</Link>

            </div>
            {/* <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
          <div className='border-2 w-10  border-white inline-block mb-2'></div>
          <p className='mb-10  text-white'>Fill Up Personal Information </p>
          <a className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-400'>Login</a> */}

          </div>

        </div>


      </div>

      {
        resendOtpModal ?
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
                      <h1 class="text-2xl font-bold">Forget Password </h1>
                      <div class="flex flex-col mt-4 mb-4 ">
                        <span>Click link recieved at email</span>
                        {/* <span class="font-bold">{signUp.email}</span> */}
                      </div>
                      {/* <label className=''  name='email' type='email'></label> */}
                      <input className='bg-white p-1 rounded-xl w-64' onChange={(e) => setEmailForget(e.target.value)} name='emailforget' type='email' placeholder='email' />
                      <div class="flex justify-center text-center items-center space-x-3 mt-5">

                        <button onClick={sendMail} class="px-4 py-2 bg-blue-900 flex items-center text-white hover:bg-blue-300 cursor-pointer" ><span class="font-bold">Send</span><i class='bx bx-caret-right ml-1'></i></button>

                        <button class="px-4 py-2 bg-blue-700 flex items-center text-white hover:bg-blue-900 cursor-pointer"><span class="font-bold" onClick={(e) => setResendOtpModal(!resendOtpModal)}>Cancel</span><i class='bx bx-caret-right ml-1'></i></button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* // </div> */}
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
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          </>
          : null
      }
    </>
  )
}

export default LoginUser