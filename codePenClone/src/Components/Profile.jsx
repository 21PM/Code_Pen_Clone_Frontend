import React, { useEffect, useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowFollowers, setShowFollowersData, setShowFollowings, setShowFollowingsData, setToken } from '../Slice.js/FollowingSlice';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice';
import { setLogin } from '../Slice.js/LoginSlice';
import { toast } from 'react-toastify';
import axios from "axios"
import { setOpenDialog } from '../Slice.js/FollowingSlice';
import { LOCAL_END_POINT } from '../utils/API';
import { API_END_POINT } from '../utils/API';

const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(store=>store.user.user)
    const Token = useSelector(store=>store.following.Token)
    const showFollowingData = useSelector(store=>store.following.showFollowingData)
    const showFollowersData = useSelector(store=>store.following.showFollowersData)
    const [isLoading,setIsloading] = useState(false)

    
    function getToken(name) {
        const token =  localStorage.getItem(name) 
        return token
     }
 
     useEffect(()=>{
        const token = getToken('CPToken');
        if(!token){
          navigate("/trending")
          return
        }
    
        // checking whether the token is expired or not
    
        const decoded = jwtDecode(token);
        const expiryTime = decoded.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now()
    
      if (expiryTime < currentTime) {
        // Token is expired
        localStorage.removeItem('CPToken');
        localStorage.removeItem('user');
        dispatch(setUser(null))
        toast.error("Session expired please refresh and login again")
    
        return; 
      }else{
       
        dispatch(setToken(token))
        const user = localStorage.getItem("user")
        const jsonUSer = JSON.parse(user)
        dispatch(setUser(jsonUSer))
      }       

      },[])

    async function handleFollowing (){

    try{
      setIsloading(true)
      const response = await axios.get(`${API_END_POINT}/show-followings`,{
        withCredentials:true,
        headers:{
          'Authorization':`Bearer ${Token}`
        }
      })
      if(response.data.status){
      dispatch(setOpenDialog(true))
      dispatch(setShowFollowings(true))
      dispatch(setShowFollowers(false))
      dispatch(setShowFollowingsData(response.data.followingData))
    }      
    }catch(e){
        console.log(e);
        
    }finally{
      setIsloading(false)
    }
    }  

    async function handleFollowers (){

  try{
    setIsloading(true)
    const response = await axios.get(`${API_END_POINT}/show-followers`,{
      withCredentials:true,
      headers:{
        'Authorization':`Bearer ${Token}`
      }
    })
    if(response.data.status){
    dispatch(setOpenDialog(true))
    dispatch(setShowFollowers(true))
    dispatch(setShowFollowings(false))

    dispatch(setShowFollowersData(response.data.followersData))
  }      
  }catch(e){
      console.log(e);
      
  }finally{
    setIsloading(false)
  }
    }  

    async function HandleLogout (){
      
  try{
    const response  = await axios.post(`${API_END_POINT}/logout`,user,{
      withCredentials:true,
      headers:{
        'Authorization':`Bearer ${Token}`
      }
    })

    if(response.data.status){
      localStorage.removeItem("CPToken")  
      localStorage.removeItem("user")
      navigate("/")
      dispatch(setUser(null))
      dispatch(setLogin(true))
      toast.success(`You are sucessfully logged out ${user?.name}`)
    }


  }catch(e){  
    console.log(e);
  
    toast.error(`Something went wrong while loggingout ${e}`)
  }

}  

    
  return (

<div className="min-h-screen w-full bg-gray-800 text-white flex flex-col items-center py-6 px-4">
{/* Profile Header */}
<div className="w-full max-w-4xl mx-auto 2xs:flex 2xs:flex-col 2xs:gap-6 md:flex md:flex-row md:justify-between md:items-center mb-6">
  <div className="md:flex gap-6 items-center justify-center">
    <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-600 mb-4">
      <img
        src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h1 className="text-3xl font-bold">{user?.name}</h1>
      <p className="text-gray-400">{user?.email}</p>
    </div>
 
  </div>

  {/* Logout Button */}
  <button
    onClick={HandleLogout}
    className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md"
  >
    <GrLogout className="mr-2 text-lg" />
    Logout
  </button>
</div>

{/* Followers and Following Sections */}
<div className="w-full max-w-4xl mx-auto md:flex md:flex-row md:items-center gap-10 flex flex-col items-center">
  <div className="bg-gray-700 w-6/12 p-4 rounded-lg  flex items-center justify-center gap-6 cursor-pointer" onClick={handleFollowers}>
    <h1 className="text-xl font-semibold mb-2" 
   
    >Followers</h1>
     <h1 className="text-xl font-semibold mb-2">{user?.followers?.length}</h1>
  </div>
  <div className="bg-gray-700 p-4 w-6/12 rounded-lg flex items-center justify-center gap-6 cursor-pointer"onClick={handleFollowing}>
    <h1 className="text-
    xl font-semibold mb-2"     
    >Following</h1>
     <h1 className="text-xl font-semibold mb-2">{user?.following?.length}</h1>
  </div>
 
</div>
  {
        isLoading && <>
        <div></div>
        <span class="loader"></span>
        <div></div>
      </>
  }
</div>

  );
}

export default Profile;
