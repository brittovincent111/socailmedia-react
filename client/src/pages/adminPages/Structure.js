import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/admin/AdminSidebar'
import Header from '../../components/admin/Header'

function Structure() {
  return (
    <div>
      <div className='flex'>
        <AdminSideBar />
        <div className='w-full pb-10'>
          <Header />
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Structure