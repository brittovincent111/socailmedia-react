import axios from 'axios'
import userInstance from '../API/userApi'


const API = axios.create({baseURL : 'http://localhost:4000'})

export const getUser = (userId)=> userInstance.get(`/${userId}`)
export const findSearch =(val)=> userInstance.get(`/find/user/${val}`)
export const notifiactionFind=(userId) => userInstance.get(`/notification/${userId}`)
export const notifiactionRead=(userId)  => userInstance.put(`/notification/viewed/${userId}`)
export const userReportModel=(userId , userID ,  reportValue ) => userInstance.post(`/report/${userId}` , {userID , reportValue })
export const sendOtp=(email , data)=> userInstance.post(`/login/otp/${email}` , data )
export const reSendOtp=(email )=> userInstance.post(`/resend/otp/${email}`)
export const verifyOtpLogin=(otp,email) =>  userInstance.post(`/verify/otp` , {otp,email})
export const forgetPassword = (email)=> userInstance.post(`/forgetPassword/${email}`)
export const submitForgetPassword = (password ,otp , email) => userInstance.put(`/forgetPassword/submit`, {email , otp , password} )