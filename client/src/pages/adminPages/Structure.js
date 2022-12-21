import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/admin/AdminSidebar'
import Header from '../../components/admin/Header'

function Structure() {
  return (
    <div>
      <div className='flex'>
        <AdminSideBar />
        <div className='w-full '>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Structure