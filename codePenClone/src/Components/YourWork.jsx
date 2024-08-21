import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { json, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import ResultCard from './ResultCard';
import { setUser } from '../Slice.js/userSlice';
import { LOCAL_END_POINT } from '../utils/API';
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { API_END_POINT } from '../utils/API';


function YourWork() {

  const user = useSelector(store=>store.user.user)
  const [Token,SetToken] = useState("")
  const [searchedValue, setSearchvalue] = useState("")
  const updatePageAfterDelete  = useSelector(store=>store.work.delete)
  const [isSearch,SetIsSearch] = useState(false)
  const[myWork,setMyWork] = useState([])
  const [isLoading,setIsloading] = useState(false)
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
    SetToken(token)
    const user = localStorage.getItem("user")
    const jsonUSer = JSON.parse(user)
    dispatch(setUser(jsonUSer))
  } 
  
  },[updatePageAfterDelete])


  const getWorkApi = async (token)=>{
     
      try{
        setIsloading(true)
      const response = await axios.get(`${API_END_POINT}/my-work`,{
          withCredentials: true, // This is crucial for sending cookies
         headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },  
      })
    setMyWork(response.data.data)
      }catch(e){
        console.log(e);
        toast.error(`${e}`)

      }finally{
        setIsloading(false)

      }
  }


  const handleSearch = async ()=>{

      if(searchedValue === ""){
        toast.info("Please enter title")
        return
      }

    if(isSearch){
      setSearchvalue("");
    }
    SetIsSearch(!isSearch)
    
      try{
        setIsloading(true)
        const res = await axios.get(`${API_END_POINT}/search-my-work?title=${isSearch ? "" : searchedValue}`,{
          withCredentials:true,
          headers:{
            'Authorization':`Bearer ${Token}`
          }
        })
        if(res.data.status){
          setMyWork(res.data.searchedData.yourWork)
        }
      }catch(e){
          console.log(e);
          toast.error(`${e}`)

      }finally{
        setIsloading(false)

      }

  } 

  return (

    <>
    <div className='w-full flex items-center justify-center pt-5 gap-4 bg-gradient-to-r from-black via-gray-700 to-black opacity-90'>

          <div className='w-3/12 px-4 py-2 flex'>
          <input type="text" placeholder='Search your work' value={searchedValue} className='w-full py-2 px-2 min-h-full' onChange={(e)=>setSearchvalue(e.target.value)}/>
         {
          isSearch && <button className='px-2 py-2 text-md border-2 hover:text-white hover:bg-black  bg-white text-black' onClick={handleSearch}><IoCloseSharp/></button>
         } 

          </div>
        
          <button className='px-2 py-2 text-md border-2 hover:text-white hover:bg-black rounded-md bg-white text-black' onClick={handleSearch}>Search</button>

   
    </div>
    <div className='w-full min-h-screen flex items-center justify-center pt-10 bg-gradient-to-r from-black via-gray-700 to-black opacity-90'>
        {
              isLoading && <div className='flex absolute items-center  justify-center mt-[-20%]'>
                <span class="loader"></span>

                </div>
        }
       {
        !isLoading &&  myWork.length === 0 && <p className='text-white text-center mt-[-30%]'>No work found</p>
      }
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
    </>

  )
}

export default YourWork