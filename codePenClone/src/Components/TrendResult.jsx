import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setHtml,setCss,setJs,setOutout, setOnlyViewCode, setEditWork } from '../Slice.js/workSlice'
import { SlUserFollow } from "react-icons/sl";
import { toast } from 'react-toastify';
import { LOCAL_END_POINT } from '../utils/API';
import axios from "axios"
import { setUser } from '../Slice.js/userSlice';
import { SlUserFollowing } from "react-icons/sl";
import { API_END_POINT } from '../utils/API';

function TrendResult({output,title,allCode,postedById,userName,isFollowing,}) {
  const dispatch = useDispatch()


  const trendingSearchValue = useSelector(store=>store.work.trendingSearchValue)
  const user = useSelector(store=>store.user.user)
  
  const ShowTrendingViewCode = () =>{      
      dispatch(setHtml(JSON.parse(allCode.html)))
      dispatch(setCss(JSON.parse(allCode.css)))
      dispatch(setJs(JSON.parse(allCode.javascript)))
      dispatch(setOutout(JSON.parse(allCode.output)))  
      dispatch(setEditWork(false))
         
  }

  function getToken(name) {
    const token =  localStorage.getItem(name)
    return token
 }

 async function handleFollowRequest(userId){

        if(!user){
        toast.info("Please login to follow")
        return
       }
       let ToFollowId = {
        userId:userId
       }

       const token = getToken('CPToken');
       
      try{
            const response = await axios.post(`${API_END_POINT}/add-follower`,ToFollowId,{
              withCredentials:true,
              headers:{
                'authorization': `Bearer ${token}`
              }
            })

          if(response.status){
                dispatch(setUser(response.data.user))   
                localStorage.setItem("user",JSON.stringify(response.data.user))
                toast.success(`You are following ${userName}`)             
          }            

      } catch(e){
          console.log(e);
          toast.error(`${e}`)

      }
       
  }

 async function handleUnfollowRequest(postedById){
 
        let ToUnFollowId = {
          postedById:postedById
        }

   const token = getToken('CPToken');

        try{
            const response = await axios.post(`${API_END_POINT}/remove-following`,ToUnFollowId,{
              withCredentials:true,
              headers:{
                'Authorization':`Bearer ${token}`
              }
            })
            if(response.data.status){
            dispatch(setUser(response.data.user))   
            localStorage.setItem("user",JSON.stringify(response.data.user))
            toast.success(`You had unfollowed ${userName}`)  
            }
            
        } catch(e){
              console.log(e);
              toast.error(`${e}`)

        } 
  }

  return (

<div className="md:w-80 h-full 2xs:w-48  bg-opacity-30 shadow-lg shadow-neutral-500 p-2 rounded-md cursor-pointer hover:shadow-lg hover:shadow-orange-200">
  {/* // Output Iframe */}
  <div className="h-60 bg-white">
    <iframe
                  title="Results"
                  srcDoc={output}
                  style={{
                    border: "none",
                    width: "100%",
                    height: "100%"
                  }}
    />

  </div>

  <div className="flex items-center justify-between mt-2 px-2">
    <div className="p-1 font-semibold text-white flex flex-col flex-wrap">
      {title.charAt(0).toUpperCase() + "" + title.substr(1,title.length)}
      <div>                                                                                                                 
        <div className='flex items-center justify-start gap-1'>
          <div className='min-w-6 min-h-6 max-w-6 max-h-6 rounded-full overflow-hidden'>
                      <img className='w-full h-full' src='https://img.freepik.com/premium-photo/cute-disney-pixar-3d-style-illustration-boy-concept-art_508977-255.jpg'></img>
          </div>
        <p className="text-md font-extralight font-mono" title='follow'>{userName}</p>
         { !isFollowing && user?._id !== postedById && (<SlUserFollow title='Follow' onClick={()=>handleFollowRequest(postedById)} className='text-sm ml-1 text-blue-600 '/>)} 
          {isFollowing && <SlUserFollowing title='Following' className='text-green-500 ml-1' onClick={()=>handleUnfollowRequest(postedById)}/>}                      
      </div>
    </div>
    </div>
    

    <div className="flex gap-2">
                  <Link to="/pen" state={allCode} onClick={ShowTrendingViewCode}>
                  <button className="bg-white hover:bg-black hover:text-white hover:border-2 rounded-sm font-bold text-xs p-1">View code</button>
                  </Link>
    </div>

  </div>
</div>

  )
}

export default TrendResult