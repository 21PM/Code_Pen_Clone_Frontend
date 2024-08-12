import { createSlice } from "@reduxjs/toolkit"

const workSlice = createSlice({
    name:"work",
    initialState:{
        html:"",
        css:"",
        js:"",
        output:"",
        title:"Untitled",
        delete:false,
        edit:false,
        onlyViewCode:false,
        doEditWorkId:"",
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
        },
        setTitle:(state,action)=>{
            state.title =  action.payload;
        },
        setDeleteWork:(state,action)=>{
            state.delete =  action.payload;
        },
        setEditWork:(state,action)=>{
            state.edit =  action.payload;
        },
        setOnlyViewCode:(state,action)=>{
            state.onlyViewCode =  action.payload;
        },
        setDoEditWorkId:(state,action)=>{
            state.doEditWorkId =  action.payload;
        }
    }
})

export const {setHtml,setCss,setJs,setOutout,setTitle,setDeleteWork,setEditWork,setOnlyViewCode,setDoEditWorkId} = workSlice.actions;
export const workReducer = workSlice.reducer
