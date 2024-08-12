import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice.js/userSlice";
import { jwtDecode } from "jwt-decode";
import {toast} from "react-toastify"
import { setDeleteWork, setOnlyViewCode,setDoEditWorkId, setHtml, setCss, setJs,setOutout,setTitle } from "../Slice.js/workSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { setEditWork } from "../Slice.js/workSlice";

function ResultCard({output,title,allcode}) {

    const user = useSelector(store=>store.user.user)
    const[istoken,setToken] = useState()
    const dispatch = useDispatch()
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
      setToken(token) 

      const user = localStorage.getItem("user")
      const jsonUSer = JSON.parse(user)
      dispatch(setUser(jsonUSer))
    }

    },[])
  
     
   async function handleDeletework(id){


    const isConfirm =   window.confirm("Are you sure you want to delete this work ?")
    if(!isConfirm){
      return  
    }

      try{
        const response = await axios.post(`http://localhost:10000/delete-work/${id}`,id,{
          withCredentials: true,
          headers:{
            'Authorization': `Bearer ${istoken}`
          },
        })
  
        if(response.data.status){
            toast.success("Your Post has been deleted")
            dispatch(setDeleteWork(true))
            navigate("/your-work")
        };
      }catch(e){
        console.log(e)
      }finally{
        setTimeout(()=>{
          dispatch(setDeleteWork(false))
        },1000)
      }
      
   }

  function handleViewAndEditWork() {
    console.log(allcode);
    
      dispatch(setEditWork(true)) 
      dispatch(setDoEditWorkId(allcode._id))
      dispatch(setHtml(JSON.parse(allcode.html)))
      dispatch(setCss(JSON.parse(allcode.css)))
      dispatch(setJs(JSON.parse(allcode.javascript)))
      dispatch(setOutout(JSON.parse(allcode.output)))
      dispatch(setTitle(allcode.title))
   }
  
  return (
    <>
      <div className="md:w-80 h-full 2xs:w-48 bg-gray-900 p-2 rounded-md cursor-pointer hover:shadow-lg hover:shadow-orange-200">
        {/* // Output Iframe */}
    
        <div className="h-64 bg-white">
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
          <div className="p-1 font-bold text-white flex flex-col flex-wrap">
            {title.charAt(0).toUpperCase() + "" + title.substr(1,title.length)}
            <div>
            <p className="text-xs font-mono">{user.name}</p>
          </div>
          </div>
          

          <div className="flex gap-2">
                        <Link to="/pen" state={allcode} onClick={handleViewAndEditWork}>
                        <button className="bg-white hover:bg-black hover:text-white hover:border-2 rounded-sm font-bold text-xs p-1">View code</button>
                        </Link>

                        <Link to="/pen" state={allcode} onClick={handleViewAndEditWork}>
                         <button>
                          <MdOutlineModeEdit className="text-white hover:text-gray-700" title="edit"/>
                        </button>
                        </Link>

                        <button onClick={()=>handleDeletework(allcode._id)}>
                          <RiDeleteBin6Line className="text-white hover:text-gray-700" title="delete"/>
                        </button>
                        
          </div>

        </div>
      </div>
    </>

   


    // </>
  );
}

export default ResultCard;
