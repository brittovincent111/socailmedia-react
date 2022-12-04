import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:4000'})
export const userChats = (chatId)=> API.get(`/chat/${chatId}`)
export const newUserChat=(users)=> API.post('/chat', {users})


