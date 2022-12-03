 
import React, { useEffect, useState, useReducer } from 'react'
import Axios from 'axios'
import { Link, } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import moment from 'moment'



export default function GroupPostDetail() {

    const [postDetails, SetPostDetails] = useState([])

    const postId = useParams().postId



    useEffect(()=>{


        Axios.get(`http://localhost:4000/admin/group/viewreport/postmanagment/${postId}`, { headers: { "x-access-token": localStorage.getItem("Admintoken") } }).then((response) => {

            console.log(response , "mmmammamsmd")
            SetPostDetails(response.data)
        })
    },[])

    // console.log(postId , "postDetsiddddd")

    console.log(postId , "postiddddddddddd")

    return (

        <div className='bg-gray-200 h-screen' >
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight"> APPROVED APPLICATIONS</h2>
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
                                            REASON
                                        </th>
                                        
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            DATE OF REPORT
                                        </th>
                                        
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            STATUS
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
                                                    <td className="text-center">{obj.userId.username}</td>
                                                    <td className="text-center">{obj.reason}</td>
                                                    {/* <td className="text-center h-16 w-16"><img src={ PF+obj.img}/>{}</td> */}
                                                    <td className="text-center">{obj.date}</td>

                                                    {/* <td className="text-center">{obj.reports.length}</td> */}
                                                    {/* <td className="text-center">{obj.status}</td> */}
                                                    {/* <Link to="/admin/viewreport/postmanagment">view</Link> */}


                                                    
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

