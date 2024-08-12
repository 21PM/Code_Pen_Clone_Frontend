import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "../Slice.js/userSlice"
import { workReducer } from "../Slice.js/workSlice"
import { loginReducer } from "../Slice.js/LoginSlice"
const store = configureStore({
    reducer:{
        user:userReducer,
        work:workReducer,
        login:loginReducer
    }
})


export default store