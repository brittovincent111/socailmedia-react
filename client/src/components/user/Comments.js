import React, { useEffect } from 'react'
import axios from 'axios'

function Comments() {
    
    const onhandleViewComents=()=>{
    //     const res=await axios.get(`http://localhost:4000/post/timeline/${userId}`)




    }
    return (
        <div onClick={onhandleViewComents} className='h-1/2 w-full hover:cursor-pointer items-center flex justify-start pt-3 px-1 text-normal font-normal'>
            <p>view more comments</p>
        </div>
    )
}

export default Comments