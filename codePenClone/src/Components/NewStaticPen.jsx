import React, { useEffect, useState } from 'react'
import CodeWriter from './CodeWriter';
import { FaCloud } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { DiJavascript } from "react-icons/di";
import { useSelector } from 'react-redux'
import { setHtml,setCss,setJs,setOutout, setOnlyViewCode,setTitle } from '../Slice.js/workSlice';
import { useDispatch } from 'react-redux';
import { FaRegSave } from "react-icons/fa";
import { javascript } from '@codemirror/lang-javascript';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { setUser } from '../Slice.js/userSlice';
import axios from "axios"
import { json, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { setEditWork } from '../Slice.js/workSlice';

function NewStaticPen() {

  const location = useLocation()

  const state = location.state; // Fallback to empty object or provide default values

  const work = useSelector(store=>store.work)
  const isEdit = useSelector(store=>store.work.edit)
  const user = useSelector(store=>store.user.user)
  const onlyViewCode = useSelector(store=>store.work.onlyViewCode)
  const doEditWorkId = useSelector(store=>store.work.doEditWorkId)
  const {html,css,js,output,title} = useSelector(store=>store.work)
  const [codeOutput,SetCodeOutput] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [changeTitle,setChangeTitle] = useState(false)
  // const [title,setTitle] = useState("Untitled")
 
  useEffect(() => {
    updateOutput();
    const parsepOut =(state?JSON.parse(state.output):"")
    const CurrentOutput = parsepOut ? parsepOut : work.output
    SetCodeOutput(CurrentOutput)    
  }, [html,css,js,output]);


 useEffect(() => {
  const handleBeforeUnload = (event) => {
    // Display the default browser confirmation dialog
    event.preventDefault();
    event.returnValue = ''; // Required for most modern browsers
    // Returning a string used to be supported for older browsers
    // but modern browsers ignore the custom message and show their default
    return 'Are you sure you want to leave? Your changes might not be asdadssaved.';
  };

  // Add event listener for beforeunload
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup event listener on component unmount
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    // Update EditSave button to false
    };
}, []);


  const updateOutput =  () => {
    const combineOutput = `

  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
        },{}
        ${css}
        /* Add any additional styles here */
    </style>
</head>
<body>
     ${html}
            <script>${js}</script>
</body>
</html>

      `;  
      dispatch(setOutout(combineOutput));
  };

  function getToken(name) {
    const token =  localStorage.getItem(name)
    return token
 }

  async function SaveCodeInDB(){

    if(title === ""){
      toast.error("Please add a title to your code")
      return
    }
    if(html === "" && css === "" && js === ""){
      toast.error("Please write something in your code")
      return
    }

    const token =  getToken("CPToken")
    if(!token){
      toast.error("Please login to save code")
      return;
    }

    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now()

  if (expiryTime < currentTime) {
    // Token is expired
    localStorage.removeItem('CPToken');
    localStorage.removeItem('user');
    dispatch(setUser(null))

    toast.error("Please login again to save code session expired")

    return; 
  }else{
    const user = localStorage.getItem("user")
    const jsonUSer = JSON.parse(user)
    dispatch(setUser(jsonUSer))
  }

    const SaveCompleteCode = {
      html:JSON.stringify(html),
      css:JSON.stringify(css),
      javascript:JSON.stringify(js),
      title:title,
      output:JSON.stringify(output)
    }

    try{

      const res = await axios.post(`http://localhost:10000/add-work`,SaveCompleteCode,{
        withCredentials: true,// This is crucial for sending cookies
        headers:{
            'Authorization': `Bearer ${token}`,
        },
    })
    if(res.data.status){
      toast.success(res.data.message)
      dispatch(setHtml(""))
      dispatch(setCss(""))
      dispatch(setJs(""))
      dispatch(setOutout(""))
      navigate("/your-work")
    }
     console.log("result",res);
    
    }catch(e){
        console.log("err",e);
        toast.error(`${e}`)

    }

  }
  
 async function editAndSaveCode(id){
  dispatch(setOnlyViewCode(false))
  dispatch(setEditWork(false))

      
    const token =  getToken("CPToken")
    if(!token){
      toast.error("Please login to save code") 
      return;
    }

    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now()

  if (expiryTime < currentTime) {
    // Token is expired
    localStorage.removeItem('CPToken');
    localStorage.removeItem('user');
    dispatch(setUser(null))
    toast.error("Please login again to save code session expired")
    return; 
  }else{
    const user = localStorage.getItem("user")
    const jsonUSer = JSON.parse(user)
    dispatch(setUser(jsonUSer))
  }

    const editedCompleteCode = {
      html:JSON.stringify(html),
      css:JSON.stringify(css),
      javascript:JSON.stringify(js),
      title:title,
      output:JSON.stringify(output)
    }

      try{
        const res = await axios.post(`http://localhost:10000/edit-work/${doEditWorkId}`,editedCompleteCode,{
          withCredentials:true,
          headers:{
            'Authorization' : `Bearer ${token}`
          }
        })

        if(res.data.status){
          toast.success("Your work has been updated")
          navigate("/your-work")
          dispatch(setHtml(""))
          dispatch(setCss(""))
          dispatch(setJs(""))
          dispatch(setOutout(""))
          dispatch(setTitle("Untitled"))
        }

      }catch(e){
          console.log("er",e);
         toast.error(`${e}`)
      }
  }

  function goToProfile(){
        navigate("/profile")
  }

  return (
    <>

<nav className="w-full h-12 border-b-2 border-gray-600 bg-black flex items-center justify-between">
              {/* // work Title Section */}
              <section className="w-full h-full flex py-1">
                <div className="w-1/12 h-full">
                  <img
                  onClick={()=>navigate("/your-work")}
                    className="w-full h-full object-contain cursor-pointer"
                    src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
                  ></img>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex gap-1 items-center">
                    {
                      !changeTitle ? <span className="text-white">{title.charAt(0).toUpperCase() + "" + title.substr(1,title.length)}</span> : <input type='text' onChange={(e)=>dispatch(setTitle(e.target.value))} value={title} placeholder='enter project title'></input>
                    }
                    
                    <span className="text-white cursor-pointer">
                      {
                         !changeTitle ? <MdOutlineEdit onClick={()=>setChangeTitle(!changeTitle)}/> : <FaRegSave  onClick={()=>setChangeTitle(!changeTitle)}/>

                      }
                    </span>
                  </div>
                  <span className="text-white text-xs">{user?.name}</span>
                </div>
              </section>

              <section className="w-full h-full flex gap-8 items-center justify-end px-6 py-1">
          
              {
                !onlyViewCode && (
                  isEdit ? ( <button onClick={editAndSaveCode} className="py-1 px-3 bg-gray-600 flex items-center justify-center gap-1 hover:bg-transparent hover:border-2 text-white rounded-sm">
                  <FaCloud />
                   Edit & Save  
                 </button> ) :  (<button onClick={SaveCodeInDB} className="py-1 px-3 bg-gray-600 flex items-center justify-center gap-1 hover:bg-transparent hover:border-2 text-white rounded-sm">
                 <FaCloud />
                  Save  
                </button>)
                )
              }
                {/* {
                   isEdit ?  <button onClick={editAndSaveCode} className="py-1 px-3 bg-gray-600 flex items-center justify-center gap-1 hover:bg-transparent hover:border-2 text-white rounded-sm">
                  <FaCloud />
                   Edit & Save  
                 </button> :  <button onClick={SaveCodeInDB} className="py-1 px-3 bg-gray-600 flex items-center justify-center gap-1 hover:bg-transparent hover:border-2 text-white rounded-sm">
                 <FaCloud />
                  Save  
                </button>
                } */}



                <button className="py-1 px-3 bg-gray-600 text-white rounded-sm hover:bg-transparent hover:border-2 " onClick={goToProfile}>
                  Profile
                </button>
              </section>
            </nav>

      <section className="flex">

        {/* // HTML CSS AND JS */}
        <div className="max-w-[50%] min-w-[45%] flex flex-col justify-between items-center max-h-screen">
          <div className="w-full overflow-scroll no-scrollbar bg-gray-900 text-white"><CodeWriter setter={setHtml} code={work.html}  lang={'HTML'} logo={<FaHtml5 className='text-white '/>} /></div>
          <div className="w-full overflow-scroll no-scrollbar bg-gray-900 text-white"><CodeWriter setter={setCss} code={work.css} lang={'CSS'} logo={<IoLogoCss3 className='text-white'/>}/></div>
          <div className="w-full overflow-scroll no-scrollbar bg-gray-900 text-white"><CodeWriter setter={setJs} code={work.js} lang={'JS'} logo={<DiJavascript className='text-white'/>}/></div>
        </div>

                            
        <iframe
              title="Results"
              srcDoc={work.output}
              className='min-w-[55%] max-w-[55%] min-h-screen border-2 border-red-800'
            />

      </section>
      
    
    </>

  )
}

export default NewStaticPen