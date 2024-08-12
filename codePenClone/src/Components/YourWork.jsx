import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { json, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import ResultCard from './ResultCard';
import { setUser } from '../Slice.js/userSlice';

function YourWork() {

  const user = useSelector(store=>store.user.user)
  const updatePageAfterDelete  = useSelector(store=>store.work.delete)
  
  const[myWork,setMyWork] = useState([])

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

    // checking whether the token is expired or not

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
    getWorkApi(token)
    const user = localStorage.getItem("user")
    const jsonUSer = JSON.parse(user)
    dispatch(setUser(jsonUSer))
  }

  },[updatePageAfterDelete,myWork])


  const getWorkApi = async (token)=>{
     
    const response = await axios.get(`http://localhost:10000/my-work`,{
      withCredentials: true, // This is crucial for sending cookies
     headers: {
    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
  },  
})
    // console.log("0045",response.data.data);
    setMyWork(response.data.data)
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center pt-10 bg-black opacity-90'>

      <div className='grid  xl:gap-10 xl:grid-cols-3 xl:grid-rows-3 md:grid-cols-2 md:gap-8 2xs:gap-10 place-items-center'> 


        {
          myWork.slice().reverse().map((ele)=>{
            
            const jsonCode = JSON.parse(ele.output)
            // const allCode = JSON.parse(ele)
                        return (<>
                      <ResultCard key={ele.id} output={jsonCode} title={ele.title} allcode={ele} />
            </>
          )})
        }
      
      </div>

    </div>
  )
}

export default YourWork