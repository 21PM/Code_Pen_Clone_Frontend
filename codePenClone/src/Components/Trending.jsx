import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slice.js/userSlice'; 
import { HashRouter, useNavigate } from 'react-router-dom';
import axios from "axios"
import { LOCAL_END_POINT } from '../utils/API';
import { setSkipCount, setTrendingSearchState } from '../Slice.js/workSlice';
import TrendResult from './TrendResult';
import { setAllTrendingWork,setTrendingSearchedData } from '../Slice.js/workSlice';
import SkeletonLoadingCard from './SkeletonLoadingCard';
import { setHasMore } from '../Slice.js/workSlice';
import store from '../Store/store';
import { toast } from 'react-toastify';



function Trending() {

    
  const skipCount = useSelector(store=>store.work.skipCount)
  const user = useSelector(store=>store.user.user)
  const hasMore = useSelector(store=>store.work.hasMore)
  const trendingSearchState = useSelector(store=>store.work.trendingSearchState)
  const trendingSearchValue = useSelector(store=>store.work.trendingSearchValue)
  const trendingSearchedData = useSelector(store=>store.work.trendingSearchedData)
  const allTrendingWork = useSelector(store=>store.work.allTrendingWork)
  const [isLoading,SetIsloading] = useState(true)
  const [isDataFound,setIsDataFound] = useState(true)

  const dispatch = useDispatch();


  const  getTrendingWork = async ()=>{    
        try{
            const  res = await axios.get(`${LOCAL_END_POINT}/trending-work?skipCount=${skipCount}`,{
              withCredentials:true,
            })
            if(res.data.TrendingWork.length === 0){              
              dispatch(setHasMore(false))
              SetIsloading(false)
              return
            };
            dispatch(setAllTrendingWork(res.data.TrendingWork))            
        }catch(e){
          console.log(e);
          toast.error(`${e}`)

        }finally{
          SetIsloading(false)
        }
   }

   const handleScroll = ()=>{
      console.log("outscroll");
      
      if(hasMore){
        try{
          if(window.innerHeight  + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
              SetIsloading(true)
              dispatch(setSkipCount(1))   
          }
        }
        catch(e){
        console.log(e);
        toast.error(`${e}`)

        }
      }else{
        return
      }
  }

  const getTrendingSearchResult = async (query) =>{
        setTrendingSearchState(true)
        setHasMore(false)
        
          try{
            
            const response = await axios.get(`${LOCAL_END_POINT}/search-trending-work?searchedValue=${query}`,{
              withCredentials:true
            })
            if(response.data.result.length === 0){
              setIsDataFound(false)
            }else{
              setIsDataFound(true)

            }
            dispatch(setTrendingSearchedData(response.data.result))
            
          }catch(e){
              console.log(e);
              toast.error(`${e}`)

          }finally{
            setHasMore(true)

          }
  }

  useEffect(()=>{
  
  },[user])

   useEffect(()=>{     
     const user = localStorage.getItem("user")
     const jsonUSer = JSON.parse(user)
     dispatch(setUser(jsonUSer))
     window.addEventListener("scroll",handleScroll)
     return ()=> window.removeEventListener("scroll",handleScroll)
   },[hasMore])


   useEffect(()=>{
      if(hasMore){
        setTimeout(()=>{
          getTrendingWork()
        },500)
      }
   },[skipCount])

   useEffect(()=>{
    if(trendingSearchValue === ""){
      dispatch(setTrendingSearchState(false))
      setIsDataFound(true)

      dispatch(setTrendingSearchedData([]))
      return
    }
    var timer = setTimeout(()=>{
      getTrendingSearchResult(trendingSearchValue);
    },800)
    return () => clearTimeout(timer)
   },[trendingSearchValue])

  return (
    <div className='w-full min-h-screen grid xl:gap-10 xl:grid-cols-3 xl:grid-rows-3 md:grid-cols-2 md:gap-8 2xs:gap-10 place-items-center px-10 bg-gradient-to-r from-black via-gray-700 to-black opacity-90 text-center'>
      

      {/* //Initially when component will mount at that time below map code will be run once user started searching anything this will not reflect instead trendingSearchedData map code will reflect   */}

      {
       !trendingSearchState &&  allTrendingWork.map((ele)=>{
              const JsonOutput = JSON.parse(ele.output)
          const JsonuserName = ele.postedByUserName

              let isFollowing = false;

              if(user?.following?.includes(ele.postedByUser)){
                  isFollowing = true
              }
              
              return(
                <>
                  <TrendResult output={JsonOutput} title={ele.title} id={ele._id} allCode = {ele} postedById={ele.postedByUser} isFollowing={isFollowing} userName={JsonuserName}/>
                </>
              )
        })
      }

        {/* // Only It will show when user will search anything if searchedvalue will be empty string then trendingSearchState will become false and above map will be used  */}
      {
        trendingSearchState && trendingSearchedData.map((ele)=>{
          const JsonOutput = JSON.parse(ele.output)
          const JsonuserName = ele.postedByUserName
          let isFollowing = false;

          if(user?.following?.includes(ele.postedByUser)){
              isFollowing = true
          }
          console.log(ele);
          
          // console.log(postedByUserName);/
        
          return(
            <>
              <TrendResult output={JsonOutput} title={ele.title} id={ele._id} allCode = {ele} postedById={ele.postedByUser} isFollowing={isFollowing} userName={JsonuserName}/>
            </>
          )
      })
      }
      {
          !isDataFound && <div className='min-w-full '>
          <p className='text-white'>Data Not found with search value " {trendingSearchValue} " </p>  

          </div>
      }

        
        {/* // While taking the data from the server if server has more data then it will set the hasMore to true if server will send all the data it has then the data.length will be === 0 at that time we will make it to false so loading will not Run */}
      {
         hasMore && isLoading && ([1,2,3].map((ele,i)=>{
               return(
                <SkeletonLoadingCard key={i}/>
                
               )
          }))
      }
      
        {
              isDataFound && !hasMore && <h1 className='text-white w-full'>No More Data</h1>
        }

    </div>
  )
}

export default Trending