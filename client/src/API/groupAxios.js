import axios from 'axios'
import userInstance from '../API/userApi'


const API = axios.create({baseURL : 'http://localhost:4000'})


export const groupDetails = (id)=> userInstance.get(`/group/${id}`)
export const joinGroup = (userId , groupId)=> userInstance.post(`/group/join/${userId}`,{groupId})

export const groupPosts = (groupId)=> userInstance.get(`/group/post/${groupId}`)
export const editGroupDetails= (groupId)=> userInstance.get(`/group/edit/${groupId}`)
export const viewMembers=(groupId)=> userInstance.get(`/group/members/${groupId}`)
export const removeGroup = (userId , groupId) => userInstance.post(`/group/remove/${userId}`,{groupId})
export const reportPost = (postId , groupId , userId , reportValue)=> userInstance.post(`/group/post/report/${postId}` , { groupId , userId , reportValue})
export const deletePost =(postId)=> userInstance.post(`/group/post/delete/${postId}`)
export const viewGroupDet = (userId)=> userInstance.get(`/group/viewAll/${userId}`)
export const leaveGroup = (userId , groupId) => userInstance.put(`/group/leave/${groupId}` , {userId})
export const deleteGroup = (groupId , userId) => userInstance.post(`/group/delete/${groupId}` , {userId})