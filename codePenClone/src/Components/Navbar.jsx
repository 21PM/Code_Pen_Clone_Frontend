import React, { useEffect, useState } from "react";
import { GrWorkshop } from "react-icons/gr";
import { SlUserFollowing } from "react-icons/sl";
import { FiTrendingUp } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { useFetcher, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../Slice.js/LoginSlice";
import { setEditWork } from "../Slice.js/workSlice";
import { setTrendingSearchState,setTrendingSearchValue } from "../Slice.js/workSlice";
import axios from "axios";
import { LOCAL_END_POINT } from "../utils/API";
import { setToken } from "../Slice.js/FollowingSlice";
import { setUser } from "../Slice.js/userSlice";


function Navbar() {

    const user = useSelector(store=>store.user.user)
    const Token = useSelector(store=>store.following.Token  )
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const [isLogin, SetisLogin] = useState(true);
  const[searchedValue ,setSearchedValue] = useState("")
  const [SideBarOpen, SetSideBarOpen] = useState(false);
  const [showProfile, SetShowProfile] = useState(false);

  function goToLoginPage(){
      dispatch(setLogin(true))
      navigate("/")
  }

  function goToSignupPage(){
    dispatch(setLogin(false))
    navigate("/")
}

function goToPenPage(){
  dispatch(setEditWork(false))
  navigate("/pen")
}

function goToYourWork(){
    navigate("/your-work")
}

function handleTrendingSearch (e){
  dispatch(setTrendingSearchState(true))
  dispatch(setTrendingSearchValue(e.target.value))
}

async function HandleLogout (){
      console.log(Token);
      
  try{
    const response  = await axios.post(`${LOCAL_END_POINT}/logout`,user,{
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
      toast.success(`You are sucessfully logged out ${user.name}`)
    }


  }catch(e){  
    console.log(e);
    
    toast.error(`Something went wrong while logging out ${e}`)
  }

}  



function getToken(name) {
  const token =  localStorage.getItem(name)
  return token
}

  useEffect(()=>{
    const token = getToken('CPToken');
    if(!token){
      navigate("/")
      return
    }
    dispatch(setToken(token))

    return ()=>SetShowProfile(false)

  },[user])
  

  return (
    <>
      {/* //Side bar */}
      {
        <div
          className={`${
            !SideBarOpen ? "w-[1%]" : "2xs:w-[20%] md:w-[10%]"
          } min-h-screen pl-2 z-10 bg-gray-800 absolute`}
        >
          <div className="flex items-center justify-center  w-full  gap-2">
            <svg
              className="mt-4"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.3"
              viewBox="0 0 138 26"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
            </svg>
            <div className="text-white mt-14">
             
              {
                SideBarOpen ?  <RiArrowLeftDoubleLine
                className="text-white rounded-md text-2xl mt-[10] cursor-pointer absolute"
                onClick={() => SetSideBarOpen(!SideBarOpen)}
              /> :  <RiArrowRightDoubleLine
              className="text-white rounded-md text-2xl mt-[10] cursor-pointer absolute"
              onClick={() => SetSideBarOpen(!SideBarOpen)}
            />
              }
              
            </div>

          </div>
          <div className="flex justify-center items-center mt-10">
            {
              SideBarOpen && <button className="xl:px-10 lg:px-8 md:px-4 sm:px-6 2xs:px-2  border-2 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700" onClick={goToPenPage} >Pen</button>
            }
          </div>
        </div>
      }

      {/* // Complete Navbar */}
      <nav className={`h-14 relative  bg-black 2xs:w-12/12 ${!user ? "pt-2" : ""}`}>
        <div>
          <div
            className={`flex items-center ${
              SideBarOpen ? "2xs:ml-16 md:ml-32" : "ml-0"
            } h-full justify-between xs:px-10 2xs:px-2`}
          >
            {/* // YOURWORK FOLLOWING TRENDING  */}
            <section className="text-white flex gap-1">
              <div
                title="Your Work"
                className="px-2 py-2 text-xs bg-gray-700 cursor-pointer rounded-sm"
                onClick={()=>navigate("/your-work") }
              >
                <span className="hidden md:block" onClick={goToYourWork}>Your Work</span>
                <span className="block md:hidden" onClick={goToYourWork}>
                  <GrWorkshop />
                </span>
              </div>
              <div
                title="Following"
                className="px-2 py-2 text-xs bg-gray-700 cursor-pointer rounded-sm"
                onClick={()=>navigate("/following") }
              >
                <span className="hidden md:block">Following</span>
                <span className="block md:hidden">
                  <SlUserFollowing />
                </span>
              </div>
              <div
                title="Trending"
                className="px-2 py-2 text-xs bg-gray-700 cursor-pointer rounded-sm"
                onClick={()=>navigate("/trending") }
              >
                <span className="hidden md:block">Trending</span>
                <span className="block md:hidden">
                  <FiTrendingUp />
                </span>
              </div>
            </section>

            {/* //input type Search  */}
            <section className="text-white px-2 py-2 flex items-center justify-center 2xs:w-2/12 xs:w-3/12   rounded-sm gap-1 bg-gray-700">
              <HiSearch />
              <input
                type="text"
                placeholder="Seach CodePen..."
                className="bg-gray-700 w-full  focus:outline-none border-none"
                onChange={(e)=>handleTrendingSearch(e)}
              ></input>
            </section>

            {/* //Sigup Login and Profile Section */}
            <section className="text-white">
              {/* // Sign Up and Login button if not login */}

              {!user && (
                <div className="flex gap-1">
                  <button className="px-3 py-2 text-xs bg-green-400 rounded-sm text-black hover:bg-green-600 hover:text-white" onClick={goToSignupPage}>
                    Sign Up
                  </button>
                  <button className="px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 rounded-sm" onClick={goToLoginPage}>
                    Log In
                  </button>
                </div>
              )}

              {user && (
                <>
                  {/* // Profile button when user is logged in*/}
                  <div className="flex items-center justify-center gap-1">
                    {/* //Profile Image Div */}
                    <div className="flex items-center justify-center rounded-full w-14 h-14 overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                      ></img>
                    </div>
                    {/* // USerName  Div */}
                    <div
                      className="cursor-pointer"
                      onClick={() => SetShowProfile(!showProfile)}
                    >
                      <span>{user.name}</span>
                    </div>
                    {/* // Down Arrow div */}
                    <div
                      className="cursor-pointer"
                      onClick={() => SetShowProfile(!showProfile)}
                    >
                      <span>
                        <MdKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  {showProfile && (
                    <div className="absolute z-50">
                      <div className="fixed right-0 top-17 h-[35%] min-w-52 border-2 border-black bg-black  rounded-bl-md">
                        <div className="flex flex-col gap-1">
                          <div className=" px-4 py-2 hover:bg-gray-400 cursor-pointer">
                            <span className="text-sm" onClick={()=>navigate("/profile")} >View Profile</span>
                          </div>
                          <div className=" px-4 py-2 hover:bg-gray-800 cursor-pointer">
                            <span className="text-sm">Name : {user.name}</span>
                          </div>
                          <div className=" px-4 py-2 hover:bg-gray-800 cursor-pointer">
                            <span className="text-sm">
                              Email : {user.email}
                            </span>
                          </div>
                          <div className="px-4 py-2  hover:bg-gray-800 cursor-pointer flex items-center gap-2"onClick={HandleLogout}>
                            <GrLogout />
                            <span className="text-sm">Logout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
