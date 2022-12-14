import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { viewGroupDet } from '../../../API/groupAxios'
import groupWall from '../../../assets/images/groupWall.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineFeed } from 'react-icons/md'





function ViewGroups() {



    const [details, setDetails] = useState([])
    const userDetails = useSelector(state => state.user)

    const Navigate = useNavigate()

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    /* ------------------------------- VIEW GROUPS ------------------------------ */

    useEffect(() => {
        const view = async () => {
            try {

                const viewGroups = await viewGroupDet(userDetails._id)

                setDetails(viewGroups.data)
            } catch (error) {

                Navigate('/errorPage')
            }
        }
        view()
    }, [])

    return (
        <>
          {  
             details.length != 0  ? 
            <div className=' h-screen  w-full bg-slate-200 justify-center p-5   '>
                <div className='grid xl:grid-cols-3 grid-cols-2 gap-5  '>
                    {details?.map((det) => {
                        return (
                            <div className='w-[190px] h-[250px] bg-white rounded-xl border shadow-md flex flex-col items-center ' >
                                {det.groupProfile ?
                                    <img src={PF + det?.groupProfile} className='w-32 h-32 bg-white rounded-full my-1'></img>
                                    : <img src={groupWall} className='w-32 h-32 bg-white rounded-full my-1'></img>

                                }
                                <div className='text-xl py-1 font-medium '>{det?.groupName}</div>
                                {det?.admin == userDetails._id ?
                                    <div className='text-sm py-1'>Admin</div> :
                                    <div className='text-sm py-1'>Member</div>

                                }
                                <Link to={`/group/${det._id}`}>
                                <div className='px-4 py-1 text-lg bg-sky-900 rounded-3xl text-white border shadow-md'>View</div>
                                </Link>
                            </div>
                        )

                    })}




                </div>
            </div>:
            <div className='flex flex-col w-full justify-center items-center h-screen bg-gray-200 '>
            <MdOutlineFeed className='text-[150px]' />
            <div className='text-2xl'>No Groups</div>

          </div>
          }
        </>
    )
}

export default ViewGroups