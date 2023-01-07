import React, { useEffect, useState, useReducer } from 'react'
import Axios from 'axios'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link,  useNavigate } from 'react-router-dom'


import moment from 'moment'

 export default function GroupPostReport() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [postDetails, SetPostDetails] = useState([])
    const [status, SetStatus] = useState(true)

    /* ------------------------- view group post report ------------------------- */

    useEffect(() => {

        Axios.get('http://localhost:4000/admin/group/report/postmanagment', { headers: { "x-access-token": localStorage.getItem("Admintoken") } }).then((response) => {

            console.log(response)
            SetPostDetails(response.data)
        })

        return () => { SetStatus(false) }
    }, [status])

  /* ------------------------------- block post ------------------------------- */
    const postBlock = (id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
                  <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
                  <div className='flex space-x-2 p-2 '>
                  <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
                  <button className='bg-red-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                    onClick={() => {
                        // this.handleClickDelete();
                      onClose();
                      Axios.put("http://localhost:4000/admin/group/post/block/" + id).then((result => {
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

    /* ------------------------------ unblock post ------------------------------ */

    const postUnBlock = (id) => {
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
                      Axios.put("http://localhost:4000/admin/group/post/unblock/" + id).then((result => {
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
                        <h2 class="text-2xl font-semibold leading-tight">GROUP POST REPORT </h2>
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
                                            DESCRIPTION
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                         IMAGE
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                         GROUP
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            DATE OF POST
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            No OF REPORTS
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
                                        postDetails.map((obj, index) => {

                                            obj.date = moment(obj.createdAt).format('DD-MM-YYYY')

                                            return (
                                               

                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">{obj.userId.userfullname}</td>
                                                    <td className="text-center">{obj.desc}</td>
                                                    
                                                    <td className="text-center h-16 w-16"><img src={ PF+obj.img}/>{}</td>
                                                    <td className="text-center">{obj.groupId.groupName}</td>
                                                    <td className="text-center">{obj.date}</td>

                                                    <td className="text-center">{obj.reports.length}</td>
                                                    <td className="text-center">{obj.status}</td>
                                                    <td className="text-center"><Link to={`/admin/group/viewreport/postmanagment/${obj._id}`} >view</Link></td>


                                                    <td className="text-center p-4 ">
                                                        {
                                                            obj.status == "Active" ?
                                                                <button type="button" class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md" onClick={(e) => { postBlock(obj._id) }}>Block</button> :
                                                                <button type="button" class="  inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md " onClick={(e) => {postUnBlock(obj._id) }}>UnBlock</button>
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



