import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:4000'})


export const groupDetails = (id)=> API.get(`/group/${id}`)
export const joinGroup = (userId , groupId)=> API.post(`/group/join/${userId}`,{groupId})

export const groupPosts = (groupId)=> API.get(`/group/post/${groupId}`)
export const editGroupDetails= (groupId)=> API.get(`/group/edit/${groupId}`)
export const viewMembers=(groupId)=> API.get(`/group/members/${groupId}`)
export const removeGroup = (userId , groupId) => API.post(`/group/remove/${userId}`,{groupId})
export const reportPost = (postId , groupId , userId , reportValue)=> API.post(`/group/post/report/${postId}` , { groupId , userId , reportValue})
export const deletePost =(postId)=> API.post(`/group/post/delete/${postId}`)
export const viewGroupDet = (userId)=> API.get(`/group/viewAll/${userId}`)
export const leaveGroup = (userId , groupId) => API.put(`/group/leave/${groupId}` , {userId})
export const deleteGroup = (groupId , userId) => API.post(`/group/delete/${groupId}` , {userId})