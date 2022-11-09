import React, { useContext } from 'react'
import logo from '../../assets/images/round.png'
import user from '../../assets/images/sidebar2.png'
import pg from '../../assets/images/adminlogo3.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { useState } from 'react'
// import { UserContext } from '../../../stores/UserContext'


export default function AdminSideBar() {

  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  // const { setAdminDetails, removeCookie } = useContext(UserContext)
  const [sidebar, setSidebar] = useState('')
  const [value, setValue] = useState(false)







  const handleLogout = () => {
    alert("logout successfully")
    localStorage.removeItem('admin')
    // setAdminDetails(null);
    // removeCookie("jwt");
    navigate('/admin/login');
  }




  const Menus = [
    { name: "Users", link: '/admin/usermanagment', icons: <FaUserAlt className='text-gray-400 h-10 w-6 '  /> },
    { name: "Posts", link: '/admin/postmanagment', icons: <FaUserAlt className='text-gray-400 h-10 w-6' /> }


  ];
  return (

      <div className="flex">
        <div
          className={` ${open ? "w-72" : "w-24"
            } bg-black h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src={logo}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"} h-8 w-8`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={pg}
              className={`cursor-pointer duration-500 h-12 ${open && "rotate-[360deg]"
                }`}
            />
            <h1
              className={`text-white origin-left font-medium text-l duration-200 ${!open && "scale-0"
                }`}
            >
              ADMIN DASHBOARD
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index} id={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-md items-center gap-x-4 `}
              >
                <div className='rounded-3xl bg-white h-10 w-10 flex justify-center'>{Menu.icons}</div>
                <span className={`${!open && "hidden"} origin-left duration-200  flex justify-center text-center `}>


                  <Link to={Menu.link} className="text-white text-xl">{Menu.name}</Link>




                </span>

              </li>

            ))}
          </ul>
          <div className="p-8">
            <button onClick={handleLogout} type="button" class="inline-block px-6 py-2.5 bg-green-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>

          </div>
        </div>

      </div>
      
  
  )
}

