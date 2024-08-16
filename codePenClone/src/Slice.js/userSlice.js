import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:undefined
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload; 
        }
    }
})


export const {setUser} = userSlice.actions
export const userReducer = userSlice.reducer