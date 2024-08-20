import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice'; 
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import ResultCard from './ResultCard';  
import { LOCAL_END_POINT } from '../utils/API';
import { setFollowingData, setfollowingSearchValue, setHasMoreFollowingData,setSearchedFollowingData,setToken,setNoDataFound } from '../Slice.js/FollowingSlice';
import { setFollowingPageNo } from '../Slice.js/FollowingSlice';
import FollowingResultCard from './FollowingResultCard';
import SkeletonLoadingCard from './SkeletonLoadingCard';
import { toast } from 'react-toastify';

import axios from 'axios';
function Following() {

  const user = useSelector(store=>store.user)
  const followingPageNo = useSelector(store=>store.following.followingPageNo)
  const followingData = useSelector(store=>store.following.followingData)
  const searchedFollowingData = useSelector(store=>store.following.searchedFollowingData)
  const noDataFound = useSelector(store=>store.following.noDataFound)
  const Token = useSelector(store=>store.following.Token)
  const followingSearchValue = useSelector(store=>store.following.followingSearchValue)
  const hasMoreFollowingData = useSelector(store=>store.following.hasMoreFollowingData)
  const[isLoading,setIsloading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()


// ************************************


const getFollowingWork = async (tk)=>{        
          try{  
            setIsloading(true)
                const response = await axios.get(`${LOCAL_END_POINT}/get-following-work?skipCount=${followingPageNo}`,{
                  withCredentials:true,
                  headers:{
                    'authorization':`Bearer ${tk}`
                  }
                })        
                if(response.data.FollowingData.length === 0){
                  dispatch(setHasMoreFollowingData(false))
                }
                dispatch(setFollowingData(response.data.FollowingData))
          }catch(e){
              console.log(e);
              toast.error(`${e}`)
              
          }finally{
            setIsloading(false)
          }  
} 

  const handleFollowingScroll = ()=>{
    console.log("Scroll started");
    
          if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
              if(hasMoreFollowingData){
                dispatch(setFollowingPageNo(1))
              }else{

              }
            }
        
  }
  
  const getSearchFollowingData = async (name) =>{

    
        try{
          setIsloading(true)
          const response = await axios.get(`${LOCAL_END_POINT}/get-following-searchwork?name=${name}`,{
            withCredentials:true,
            headers:{
              'Authorization':`Bearer ${Token}`
            }
          })          
          if(response.data.SearchedData.length === 0){
            dispatch(setNoDataFound(true))
          }else{
            dispatch(setNoDataFound(false))
            dispatch(setSearchedFollowingData(response.data.SearchedData))
          }
        }catch(e){
              console.log(e);
              toast.error(`${e}`)

        }finally{
          setIsloading(false)

        }
  }

  function getToken(name) {
        const token =  localStorage.getItem(name) 
        return token
     }

useEffect(()=>{
  const token = getToken('CPToken')
  if(!token){
  navigate("/trending")
  return
  }
  dispatch(setToken(token))

  const decoded = jwtDecode(token);
     const expiryTime = decoded.exp * 1000; // Convert to milliseconds
     const currentTime = Date.now()
 
   if (expiryTime < currentTime) {
     // Token is expired
     localStorage.removeItem('CPToken');
     localStorage.removeItem('user');
     dispatch(setUser(null))
     toast.error("Please login again session expired")
     return; 

   }else{
     const user = localStorage.getItem("user")
     const jsonUSer = JSON.parse(user)
     dispatch(setUser(jsonUSer))
   }

  if(followingData.length === 0){    
    getFollowingWork(token)
  }
  let timer;

  if(followingSearchValue === ""){
        dispatch(setNoDataFound(false))
        dispatch(setSearchedFollowingData([]))
  }else{
    setIsloading(true)
    timer =  setTimeout(()=>{
      getSearchFollowingData(followingSearchValue)
    },400)

  }

    return ()=>clearTimeout(timer)

},[followingSearchValue,noDataFound]) 

useEffect(()=>{
    window.addEventListener("scroll",handleFollowingScroll)
    return ()=> window.removeEventListener("scroll",handleFollowingScroll)
},[hasMoreFollowingData])


useEffect(()=>{    
    if(followingPageNo > 0){
      getFollowingWork(Token)
    }  
},[followingPageNo])


  return (
    <>
    <div className='flex items-center justify-center bg-gradient-to-r from-black via-gray-700 to-black opacity opacity-90 pt-6 gap-4'>
        <input type='text' placeholder='Search by Name' className='outline-none px-4 py-2 w-2/12 rounded-md' onChange={(e)=>dispatch(setfollowingSearchValue(e.target.value))}></input>
    </div>      
    <div className='w-full min-h-screen pt-8 pb-16 grid xl:gap-10 xl:grid-cols-3 xl:grid-rows-3 md:grid-cols-2 md:gap-8 2xs:gap-10 place-items-center px-10 bg-gradient-to-r from-black via-gray-700 to-black opacity-90 text-center'>
          
          {
           !followingSearchValue && followingData?.map((ele,i)=>{

              const JsonOutput = JSON.parse(ele.output)              
              
                return (
                  <>
                    < FollowingResultCard title={ele.title} userName={ele.postedByUserName} allcode={ele} output={JsonOutput}/>

                  </>
                )
            })
          }
          
          {
              isLoading && [1,2,3].map((e,i)=>{
                return(
                  <SkeletonLoadingCard key={i}/>
                )
              })
          }

            {
             !noDataFound ? searchedFollowingData.map((ele,i)=>{
              const JsonOutput = JSON.parse(ele.output)              
            
              return (
                <>
                  < FollowingResultCard title={ele.title} userName={ele.postedByUserName} allcode={ele} output={JsonOutput}/>
                </>
              )
            }) : (noDataFound && <> <h1 className='text-white'>No data found by the name " {followingSearchValue} "</h1> </> )
            }

          
    </div>
    </>
  )
}

export default Following