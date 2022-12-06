import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:4000'})

export const getUser = (userId)=> API.get(`/${userId}`)
export const findSearch =(val)=> API.get(`/find/user/${val}`)
export const notifiactionFind=(userId) => API.get(`/notification/${userId}`)
export const notifiactionRead=(userId)  => API.put(`/notification/viewed/${userId}`)
