import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "../Slice.js/userSlice"
import { workReducer } from "../Slice.js/workSlice"
const store = configureStore({
    reducer:{
        user:userReducer,
        work:workReducer,
    }
})


export default store