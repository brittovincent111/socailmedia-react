import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {



    const Navigate = useNavigate()

    useEffect(()=>{

      try{
       
        let dashboard =async()=>{
          await axios.get("http://localhost:4000/admin/dashboard",
          {headers:{"x-access-token":localStorage.getItem("Admintoken")}}).then((response)=>{

            Navigate('/admin/login')
          })

        }
        
        dashboard()
      

      }catch(error){


      }
     })

 
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard