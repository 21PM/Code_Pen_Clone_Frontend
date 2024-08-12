import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice'; 
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
function Trending() {

    
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
     const decoded = jwtDecode(token);
     const expiryTime = decoded.exp * 1000; // Convert to milliseconds
     const currentTime = Date.now()
 
   if (expiryTime < currentTime) {
     // Token is expired
     localStorage.removeItem('CPToken');
     localStorage.removeItem('user');

     dispatch(setUser(null))

     return; 
   }else{
     const user = localStorage.getItem("user")
     const jsonUSer = JSON.parse(user)
     dispatch(setUser(jsonUSer))
   }
 
   },[])



  return (
    <div className='w-full min-h-full bg-red-600 text-center'>Trending</div>
  )
}

export default Trending