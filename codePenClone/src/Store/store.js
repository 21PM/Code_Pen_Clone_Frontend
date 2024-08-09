import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "../Slice.js/userSlice"

const store = configureStore({
    reducer:{
        user:userReducer
    }
})


export default store