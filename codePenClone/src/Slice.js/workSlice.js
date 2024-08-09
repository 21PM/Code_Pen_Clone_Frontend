import { createSlice } from "@reduxjs/toolkit"


const workSlice = createSlice({
    name:"work",
    initialState:{
        html:"",
        css:"",
        js:"",
        output:""
    },
    reducers:{
        setHtml:(state,action)=>{
            state.html =  action.payload;
        },
        setCss:(state,action)=>{
            state.css =  action.payload;
        },
        setJs:(state,action)=>{
            state.js =  action.payload;
        },
        setOutout:(state,action)=>{
            state.output =  action.payload;
        }
    }
})


export const {setHtml,setCss,setJs,setOutout} = workSlice.actions;
export const workReducer = workSlice.reducer
