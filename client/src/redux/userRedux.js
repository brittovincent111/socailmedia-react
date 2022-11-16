import { createSlice } from '@reduxjs/toolkit'

const userDetails = JSON.parse(localStorage.getItem('user'))





if(userDetails){
    var { _id , username , email } = userDetails

}else{

}

export const userSlice = createSlice({
      
    name: "user",
    initialState:{
        _id , 
        username,
         email
         


    }
,
reducers :{
    update:(state,action )=>{
       state.username = action.payload.username
       state.email = action.payload.email

    },
    remove:(state) => {state ={} }
}

})

export const {update,remove} = userSlice.actions
export default userSlice.reducer