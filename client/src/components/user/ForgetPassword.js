import React, { useState } from 'react'
import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { submitForgetPassword } from '../../API/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default  function ForgetPassword() {

  const [ storePassword , SetStorepassword] = useState({
   
    password: "",
    confirmpassword: ""
})
const [errorMessage, setErrorMessage] = useState("")
const email = useParams().email
const otp = useParams().otp
const navigate = useNavigate()




const onHandleChange =(e)=>{

  e.preventDefault()

  SetStorepassword({ ...storePassword, [e.target.name]: e.target.value })
  console.log(storePassword)

}

 const  submit = async(e)=>{

  e.preventDefault()
  try{

 if (!storePassword.password) {
    setErrorMessage("Password is required");
} else if (storePassword.password.length < 4) {
    setErrorMessage("Password must be atleast 4 characters");
} else if (storePassword.password.length > 20) {
    setErrorMessage("Password must be less than 20 characters");
} else if (!storePassword.confirmpassword) {
    setErrorMessage("Confirm Password is required");
} else if (storePassword.password != storePassword.confirmpassword) {
    setErrorMessage("Password Incorrect");
} else {


  const notify = () => toast("Password Changed");
  notify()
  const {data}=  await submitForgetPassword(storePassword.password ,otp ,  email)
 

  setTimeout(()=>{
    if(data){
   
      navigate('/login')
    }

  },2000)

 


  }
  
}catch(error){

console.log(error);


  }

 }


 console.log(otp,email)
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
        <div className=' LoginMain h-screen flex flex-col items-center justify-center width-full flex-1 p-20 w-full  bg-blue-100 ' >
          <div className='main bg-white rounded-2xl shadow-2xl flex lg:w-2/5  justify-center max-w-4xl '>
            <div className='w-3/5 p-5 flex flex-col justify-center items-center'>
              <div className='py-10 flex flex-col justify-center items-center'>
                {/* <img src={mainlogo} className='h-24 w-44'/> */}
                <h2 className='text-blue-700 text-3xl mb-2 align-top'>PASSWORD </h2>
                <div className='border w-44  border-blue-700 inline-block mb-6'></div>
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
    
                <form 
                onSubmit={submit}
                >
                  <div className='flex flex-col items-center '>
                    {/* <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl border-2 shadow-sm h-10'>
                      <FaRegEnvelope className='mr-2 mx-2' />
                      <input className=' bg-gray-100 outline-none  flex-1' type="email" placeholder='email' name='email'
                    //    onChange={(e) => { onHandleChange(e) }}
                        />
                    </div> */}
    
                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl    border-2 h-10 '>
                      <FaLock className='mr-2 mx-2' />
                      <input name='password' className=' bg-gray-100 outline-none flex-1' type="password" placeholder='password' 
                      onChange={(e) => { onHandleChange(e) }} 
                      />
                    </div>
                    <div className='bg-gray-100 w-80 p-1 flex items-center mb-4 rounded-2xl    border-2 h-10 '>
                      <FaLock className='mr-2 mx-2' />
                      <input name='confirmpassword' className=' bg-gray-100 outline-none flex-1' type="password" placeholder='confirm password'  
                      onChange={(e) => { onHandleChange(e) }} 
                      />
                    </div>
    
    
                    <button type='submit' className='border-2 bg-blue-600 rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-500 hover:border-blue-400'>submit</button>
    
                  </div>
                </form>
                {/* <p className='p-5'>Or Signin With</p>
                <div className='flex justify-center  '
                 onClick={(e)=>setResendOtpModal(!resendOtpModal)}
                 > */}
    
                  
                </div>
              </div>
    
            </div>
            {/* <div hidden className='hero relative w-2/5  bg-blue-600 rounded-tr-2xl rounded-br-2xl lg:block  '  >
              <div className='w-20 h-20  absolute left-[40%]  bottom-28 rounded-full bg-blue-600 hover:bg-gray-200 flex justify-center items-center'>
                <Link to='/storePassword' className='text-xl text-white hover:text-blue-900 font-semibold '>storePassword</Link>
    
              </div> */}
              {/* <h2 className='text-2xl font-bold mb-2 text-white'>Hello , freinds</h2>
              <div className='border-2 w-10  border-white inline-block mb-2'></div>
              <p className='mb-10  text-white'>Fill Up Personal Information </p>
              <a className='border-2 border-white rounded full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-400'>Login</a> */}
                 
            {/* </div> */}
    
          </div>
    
    
        {/* </div> */}
    
     
        </>
      )
}

