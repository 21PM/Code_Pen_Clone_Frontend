import React, { useState } from 'react';

const SignUp = () => {

  const[email,setEmail] = useState("")
  const[name,setName] = useState("")
  const[password,setPassword] = useState("")
  const[isalreadyhaveaccount,setIsalreadyhaveaccount] = useState(false)
  const [isalert,SetIsalert] = useState(false)
  const [alertmsg,Setalertmsg] = useState("")
  const [getEmailvalidationStatus,setEmailvalidationStatus] = useState(true)


  


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
            <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              placeholder="Please enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 mb-4"
            />
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Username or Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 mb-4"
            />
            {
              isalert && <><p className="text-red-600 semibold text-center">{alertmsg}</p></>
            }

            {
              !isalreadyhaveaccount ?<><button className="w-full bg-green-500 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition-all mb-4">
              Sign up
            </button></>:<> <button className="w-full bg-green-500 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition-all mb-4" >
              Login up
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