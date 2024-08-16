import { createSlice } from "@reduxjs/toolkit";


const followingSlice = createSlice({
        name:"Following",
        initialState:{
            isFollowing:false,
        },
        reducers:{
            setIsFollowing:(state,action)=>{
                state.isFollowing = action.payload;
            }
        }
})


export const {setIsFollowing}  = followingSlice.actions;

export const FollowingReducer = followingSlice.reducer