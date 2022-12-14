import { createSlice } from '@reduxjs/toolkit'

const userDetails = JSON.parse(localStorage.getItem('user'))





if(userDetails){
    var { _id , username , email , userfullname , following ,requestTo ,savedPost , requestFrom ,profilePicture} = userDetails

}else{

}

export const userSlice = createSlice({
      
    name: "user",
    initialState:{
        _id , 
        username,
         email,
         userfullname,
         following,
         requestTo,
         requestFrom,
         profilePicture,
         savedPost
         
    }
,
reducers :{
    update:(state,action )=>{
        state._id = action.payload._id
       state.username = action.payload.username
       state.userfullname = action.payload.userfullname
       state.savedPost = action.payload.savedPost
       state.email = action.payload.email
       state.profilePicture = action.payload.profilePicture
       state.following = action.payload.following
       state.requestFrom = action.payload.requestFrom
       state.requestTo = action.payload.requestTo

    },
    remove:(state) => {state ={} }
}

})

export const {update,remove} = userSlice.actions
export default userSlice.reducer