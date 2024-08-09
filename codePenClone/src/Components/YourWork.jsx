import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice';
function YourWork() {

  const user = useSelector(store=>store.user.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
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

    getWorkApi(token)

    // checking whether the token is expired or not

    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now()

  if (expiryTime < currentTime) {
    // Token is expired
    localStorage.removeItem('CPToken');
    return; 
  }else{
    const user = localStorage.getItem("user")
    const jsonUSer = JSON.parse(user)
    dispatch(setUser(jsonUSer))
  }

  },[])


  const getWorkApi = async (token)=>{
     
    const response = await axios.get(`http://localhost:10000/my-work`,{
      withCredentials: true, // This is crucial for sending cookies
     headers: {
    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
  },
})
    console.log("0045",response);
  }

  return (
    <div className='w-full min-h-full bg-green-700 text-center'>YourWork</div>
  )
}

export default YourWork