import React, { useEffect, useState, useReducer } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom'


import moment from 'moment'

function UserManagment() {


    const [userDetails, SetUserDetails] = useState([])
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [status, SetStatus] = useState(true)

    useEffect(() => {

        Axios.get('http://localhost:4000/admin/usermanagment', { headers: { "x-access-token": localStorage.getItem("Admintoken") } }).then((response) => {

            console.log(response)
            SetUserDetails(response.data)
        })

        return () => { SetStatus(false) }
    }, [status])

    // useEffect (()=>{

    // })

    
   
    const BlockUser = (id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
                  <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
                  {/* <p className='flex justify-center p-2 text-xl font-semibold'>You want to delete this file?</p> */}
                  <div className='flex space-x-2 p-2 '>
                  <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
                  <button className='bg-red-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                    onClick={() => {
                        // this.handleClickDelete();
                      onClose();
                      Axios.put("http://localhost:4000/admin/block/" + id).then((result => {
                        console.log(result.status);
                        // forceUpdate()
                        SetStatus(!status)
                        // setShowModal(false)
                    })).catch(error => console.log(error))
                      
                    }}
                  >
                    Yes, Block
                  </button>

                  </div>
                
                </div>
              );
            }
          });
       

    }

    const UnBlockUser = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
                  <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
                  {/* <p className='flex justify-center p-2 text-xl font-semibold'>You want to delete this file?</p> */}
                  <div className='flex space-x-2 p-2 '>
                  <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
                  <button className='bg-green-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                    onClick={() => {
                        // this.handleClickDelete();
                      onClose();
                      Axios.put("http://localhost:4000/admin/unblock/" + id).then((result => {
                        console.log(result.status);
                        // forceUpdate()
                        SetStatus(!status)
                        // setShowModal(false)
                    })).catch(error => console.log(error))
                      
                    }}
                  >
                    Yes, Unblock
                  </button>

                  </div>
                
                </div>
              );
            }
          });

        
    }





    return (

        <div className='bg-gray-200 h-screen' >
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">USER MANAGMENT</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal bg-white">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            SL NO:
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            USERNAME
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            EMAIL
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            DATE OF JOIN
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            NO OF REPORTS
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            STATUS
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            VIEW
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userDetails.map((obj, index) => {

                                            obj.date = moment(obj.date).format('DD-MM-YYYY')

                                            return (

                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">{obj.username}</td>
                                                    <td className="text-center">{obj.email}</td>
                                                    <td className="text-center">{obj.date}</td>
                                                    <td className="text-center">{obj.reports.length}</td>
                                                    <td className="text-center">{obj.status}</td>
                                                    <Link to={`/admin/usermanagment/${obj._id}`}>
                                                    <td className="text-center">view</td>
                                                    </Link>
                                                    


                                                    <td className="text-center p-4 ">
                                                        {
                                                            obj.status == "Active" ?
                                                                <button type="button" class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md" onClick={(e) => { BlockUser(obj._id) }}>Block</button> :
                                                                <button type="button" class="  inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md " onClick={(e) => { UnBlockUser(obj._id) }}>UnBlock</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagment