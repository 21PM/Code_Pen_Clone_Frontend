import React, { useEffect, useState } from 'react';
import { API_END_POINT } from '../utils/API';
import axios from 'axios'
import { toast } from 'react-toastify';
import { setUser } from '../Slice.js/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SignUp = () => {

  const user = useSelector(store=>store.user.user)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const[email,setEmail] = useState("")
  const[name,setName] = useState("")
  const[password,setPassword] = useState("")
  const [isLoading,SetIsloading] = useState(false)
  const[isalreadyhaveaccount,setIsalreadyhaveaccount] = useState(false)
  const [isalert,SetIsalert] = useState(false)
  const [alertmsg,Setalertmsg] = useState("")
  const [getEmailvalidationStatus,setEmailvalidationStatus] = useState(true)




  async function HandleSignUp (e){
        if(!name ||!email || !password){
          toast.error("Please fill all the details")
          return 
        }
        const userObj = {
          name,
          email,
          password
        }      
                
        try{
          SetIsloading(true)
          const res = await axios.post(`http://localhost:10000/signup`,userObj,)          
          if(res.status === 200){
                toast.success("Your account has been created")
                setIsalreadyhaveaccount(!isalreadyhaveaccount)
          }

                
        }catch(e){
          console.log(e.response.data.message);
            toast.error(e.response.data.message)
            
        }finally{
          SetIsloading(false)
          setName("")
          setEmail("")
          setPassword("")

        }
        
  }


  // LOGIN FUNCTION 
  const HandleLogin = async()=>{

    
    if(!email || !password){
        toast.error("Please provide login id and password")
        return
    }
      const obj = {
        email:email.toLowerCase(),
        password  
      }
    try{
      SetIsloading(true)
        const res = await axios.post(`http://localhost:10000/login`,obj,{
          withCredentials: true // This is crucial for sending cookies
      })
  
      if(res.data.status){
        dispatch(setUser(res.data.user))
        localStorage.setItem("CPToken",res.data.token.toString())
        localStorage.setItem("user",JSON.stringify(res.data.user))

          toast.success("You are logged in sucessfully")
          navigate("/your-work")
      }
        
    }catch(e){
        console.log(e);
    }finally{
      SetIsloading(false)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-4xl  sm:flex  items-center justify-between">
        <div className="w-1/2 flex flex-col justify-center items-center space-y-4 sm:pr-10 sm:w-full 2xs:w-full">
          <img src="https://blog.codepen.io/wp-content/uploads/2022/01/codepen-wordmark-display-inside-white@10x.png" alt="Codepen Logo" className="w-32 mb-6" />
          <h2 className="text-3xl font-bold mb-6">Log In</h2>
          <button className="flex items-center justify-center w-full bg-gray-700 py-2 rounded-lg mb-4 hover:bg-transparent hover:border hover:border-gray-100 transition-all duration-300" >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6 mr-2" />
            Log In with Google
          </button>
          <button className="flex items-center justify-center w-full bg-gray-700 py-2 rounded-lg mb-4 hover:bg-transparent hover:border hover:border-gray-100 transition-all duration-300">
            <img src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png" alt="GitHub" className="w-6 h-6 mr-2" />
            Log In with GitHub
          </button>
          <button className="flex items-center justify-center w-full bg-gray-700 py-2 rounded-lg hover:bg-transparent hover:border hover:border-gray-100 transition-all duration-300">
            <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" className="w-6 h-6 mr-2" />
            Log In with Facebook
          </button>
          <a href="#" className="text-gray-400 text-sm underline mt-4">How social log in works</a>
        </div>
        <div className="w-1/2 sm:border-l border-gray-600 flex flex-col justify-center items-center sm:pl-10 sm:w-full 2xs:w-full ">
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-2 mb-6 ">
              <div className="h-px bg-gray-600 w-full"></div>
              <span className="text-gray-400">OR</span>
              <div className="h-px bg-gray-600 w-full"></div>
            </div>
              {
                !isalreadyhaveaccount &&  <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Please enter your name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 mb-4"
              />
              }
          
            <input
              type="email"
              value={email}

              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="username" // Corrected attribute
              placeholder="Username or Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 mb-4"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              autoComplete="new-password" // Corrected attribute
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 mb-4"
            />
            {
              isalert && <><p className="text-red-600 semibold text-center">{alertmsg}</p></>
            }

            {
              !isalreadyhaveaccount ?<><button className="w-full bg-green-500 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition-all mb-4" onClick={HandleSignUp}>
                {isLoading ? "Loading..." :" Sign up"}
            </button></>:<> <button className="w-full bg-green-500 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition-all mb-4" onClick={HandleLogin}>
           {isLoading ? "Loading..." :"Login up"}
            </button></>
            }
            
            <a href="#" className="text-gray-400 text-sm underline block text-center mb-4">Forgot Password?</a>
           
            {
              isalreadyhaveaccount ?  <> <a href="#" className="text-gray-400 text-sm underline block text-center" onClick={()=>setIsalreadyhaveaccount(false)}>Need an account? Sign up now!</a></> : <> <a href="#" className="text-gray-400 text-sm underline block text-center" onClick={()=>setIsalreadyhaveaccount(true)}>Already have an accoint ? Login here!</a></> 
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};


export default SignUp