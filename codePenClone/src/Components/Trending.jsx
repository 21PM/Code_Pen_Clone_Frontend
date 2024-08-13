import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { LOCAL_END_POINT } from '../utils/API';
import { setSkipCount } from '../Slice.js/workSlice';
import TrendResult from './TrendResult';
import { setAllTrendingWork } from '../Slice.js/workSlice';

function Trending() {

    
  const skipCount = useSelector(store=>store.work.skipCount)
  const allTrendingWork = useSelector(store=>store.work.allTrendingWork)
  const [isLoading,SetIsloading] = useState(false)
  const dispatch = useDispatch();


  const  getTrendingWork = async ()=>{    

        try{
            const  res = await axios.get(`${LOCAL_END_POINT}/trending-work?skipCount=${skipCount}`,{
              withCredentials:true,
            })
            dispatch(setAllTrendingWork(res.data.TrendingWork))
            console.log(res.data);
            
        }catch(e){
          console.log(e);
        }
   }

   const handleScroll = ()=>{

   try{
      if(window.innerHeight  + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
        dispatch(setSkipCount(1))
      }
    }catch(e){
      console.log(e);
    }

  }

   useEffect(()=>{     
     const user = localStorage.getItem("user")
     const jsonUSer = JSON.parse(user)
     dispatch(setUser(jsonUSer))
     window.addEventListener("scroll",handleScroll)
     return ()=> window.removeEventListener("scroll",handleScroll)
   },[])

   useEffect(()=>{
    getTrendingWork()
   },[skipCount])

  return (
    <div className='w-full min-h-screen grid xl:gap-10 xl:grid-cols-3 xl:grid-rows-3 md:grid-cols-2 md:gap-8 2xs:gap-10 place-items-center px-10 bg-black opacity-90 text-center'>
      {
        allTrendingWork.slice().reverse().map((ele)=>{
              const JsonOutput = JSON.parse(ele.output)
              return(
                <>
                  <TrendResult output={JsonOutput} title={ele.title} id={ele._id} allCode = {ele}/>
                </>
              )
        })
      }
        <div>
        {
          !isLoading && <h1 className='text-white font-bold'>Loading ....</h1>
        }
        </div>

    </div>
  )
}

export default Trending