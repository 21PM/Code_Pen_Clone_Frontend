import { createSlice } from "@reduxjs/toolkit";


const followingSlice = createSlice({
        name:"following",
        initialState:{
            isFollowing:false,
            followingPageNo:0,
            followingData:[],
            searchedFollowingData:[],
            hasMoreFollowingData:true,
            noDataFound:false,
            followingSearchValue:"",
            Token:"",
            openDialog:false,
            showFollowings:false,
            showFollowers:false,
            showFollowingData:[],
            showFollowersData:[]
        },
        reducers:{
            setIsFollowing:(state,action)=>{
                state.isFollowing = action.payload;
            },
            setFollowingPageNo:(state,action)=>{
                state.followingPageNo += action.payload;
            },
            setFollowingData:(state,action)=>{
                state.followingData.push(...action.payload);
            },
            setSearchedFollowingData:(state,action)=>{
                state.searchedFollowingData = action.payload;
            },
            setHasMoreFollowingData:(state,action)=>{
                state.hasMoreFollowingData = action.payload;
            },
            setfollowingSearchValue:(state,action)=>{
                state.followingSearchValue = action.payload;
            },
            setNoDataFound:(state,action)=>{
                state.noDataFound = action.payload
            },
            setToken:(state,action)=>{
                state.Token = action.payload;
            },
            setOpenDialog:(state,action)=>{
                state.openDialog = action.payload
            },
            setShowFollowings:(state,action)=>{
                state.showFollowings = action.payload
            },
            setShowFollowers:(state,action)=>{
                state.showFollowers = action.payload
            },
            setShowFollowingsData:(state,action)=>{
                state.showFollowingData = action.payload
            },
            setShowFollowersData:(state,action)=>{
                state.showFollowersData = action.payload
            }
            
        
        }
})

export const {setIsFollowing,setFollowingPageNo,setFollowingData,setSearchedFollowingData,setHasMoreFollowingData,setfollowingSearchValue,setInitialFetch,setToken,setNoDataFound,setOpenDialog,setShowFollowings,setShowFollowers,setShowFollowingsData,setShowFollowersData}  = followingSlice.actions;

export const FollowingReducer = followingSlice.reducer