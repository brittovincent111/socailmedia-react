import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {

    const Navigate = useNavigate()
    useEffect(()=>{

      axios.get("http://localhost:4000/admin/dashboard",{headers:{"x-access-token":localStorage.getItem("Admintoken")}}).then((response) => {
        console.log(response , "hiiiiiiiiiiiiiii")
       
     }).catch((error)=>{
      console.log(error)

      Navigate('/admin/login')

     })

    })
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard