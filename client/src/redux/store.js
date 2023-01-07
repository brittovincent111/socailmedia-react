import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userRedux'
import anotheruserReducer from './StoreAnother'



export default configureStore({

    reducer : {
        user :userReducer,
        anotheruser : anotheruserReducer

    }
})