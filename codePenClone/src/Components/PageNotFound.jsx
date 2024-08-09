import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice'; 
import { jwtDecode } from "jwt-decode";

const PageNotFound = () => {

    const user = useSelector(store=>store.user)
    const dispatch = useDispatch();
    console.log(user);



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
       return; 
     }else{
       const user = localStorage.getItem("user")
       const jsonUSer = JSON.parse(user)
       dispatch(setUser(jsonUSer))
     }
   
     },[])

    

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      {
        user ?  <Link to="/your-work" style={{ textDecoration: 'none', color: 'blue' }}>
        Go back to Home
      </Link> : <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Go back to Home
      </Link> 
      }
    </div>
  );
};

export default PageNotFound;
