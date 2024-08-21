import React from 'react'
import { SlUserFollowing } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditWork } from '../Slice.js/workSlice';
import { setHtml,setCss,setJs,setOutout } from '../Slice.js/workSlice';

function FollowingResultCard({title,userName,allcode,output}) {
  
  const dispatch  = useDispatch()

  function handleViewCode(){
    dispatch(setHtml(JSON.parse(allcode.html)))
    dispatch(setCss(JSON.parse(allcode.css)))
    dispatch(setJs(JSON.parse(allcode.javascript)))
    dispatch(setOutout(JSON.parse(allcode.output)))
    dispatch(setEditWork(false))

  }

  return (
    <div className="md:w-80 h-full 2xs:w-48 bg-black bg-opacity-30 shadow-lg shadow-neutral-500 p-2 rounded-md cursor-pointer hover:shadow-lg hover:shadow-orange-200">
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
      {title?.charAt(0).toUpperCase() + "" + title.substr(1,title.length)}
      
      <div>                                                                                                                 
        <div className='flex items-center justify-start gap-1'>
          <div className='min-w-6 min-h-6 max-w-6 max-h-6 rounded-full overflow-hidden'>
                      <img className='w-full h-full' src='https://img.freepik.com/premium-photo/cute-disney-pixar-3d-style-illustration-boy-concept-art_508977-255.jpg'></img>
          </div>
        <p className="text-md font-extralight font-mono" title='follow'>{userName}</p>
          <SlUserFollowing title='Following' className='text-green-500 ml-1'/>                     
      </div>
    </div>
    </div>
    

    <div className="flex gap-2">
                  <Link to="/pen">
                  <button className="bg-white hover:bg-black hover:text-white hover:border-2 rounded-sm font-bold text-xs p-1" onClick={handleViewCode}>View code</button>
                  </Link>
    </div>

  </div>
</div>
  )
}

export default FollowingResultCard