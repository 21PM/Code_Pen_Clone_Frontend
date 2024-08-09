import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice.js/userSlice";
import { jwtDecode } from "jwt-decode";
import { MdOutlineEdit } from "react-icons/md";
import CodeWriter from "./CodeWriter";
import { FaCloud } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { DiJavascript } from "react-icons/di";

function Pen() {
  // function getToken(name) {
  //     const token =  localStorage.getItem(name)
  //     return token
  //  }

  //  useEffect(()=>{
  //    const token = getToken('CPToken');
  //    if(!token){
  //      navigate("/trending")
  //      return
  //    }
  //    const decoded = jwtDecode(token);
  //    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
  //    const currentTime = Date.now()

  //  if (expiryTime < currentTime) {
  //    // Token is expired
  //    localStorage.removeItem('CPToken');
  //    return;
  //  }else{
  //    const user = localStorage.getItem("user")
  //    const jsonUSer = JSON.parse(user)
  //    dispatch(setUser(jsonUSer))
  //  }

  //  },[])

  return (
//     <>
//       <div className="max-w-full min-h-screen max-h-full">
//         <nav className="w-full h-12 border-b-2 border-gray-600 bg-black flex items-center justify-between">
//           {/* // work Title Section */}
//           <section className="w-full h-full flex py-1">
//             <div className="w-1/12 h-full">
//               <img
//                 className="w-full h-full object-contain"
//                 src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
//               ></img>
//             </div>
//             <div className="flex flex-col items-start justify-center">
//               <div className="flex gap-1 items-center">
//                 <span className="text-white">Untitled</span>
//                 <span className="text-white cursor-pointer">
//                   <MdOutlineEdit />
//                 </span>
//               </div>
//               <span className="text-white text-xs">Paras More</span>
//             </div>
//           </section>

//           <section className="w-full h-full flex gap-8 items-center justify-end px-6 py-1">
//             <button className="py-1 px-3 bg-gray-600 flex items-center justify-center gap-1 hover:bg-transparent hover:border-2 text-white rounded-sm">
//               <FaCloud />
//               Save
//             </button>
//             <button className="py-1 px-3 bg-gray-600 text-white rounded-sm hover:bg-transparent hover:border-2 ">
//               Profile
//             </button>
//           </section>
//         </nav>

//         <div className="max-w-screen h-[calc(100vh-3rem)] overflow-hidden">
//   <div className="h-full relative flex overflow-hidden">


//    <SplitPane split="horizontal" minSize={50} defaultSize={400} maxSize={1520} className="border-2 border-black">
//     <div>
            
//             {/* upper */}
//     <SplitPane split="vertical" minSize={50} defaultSize="33.33%" maxSize={750}>

//     <CodeWriter lang={'HTML'} logo={<FaHtml5 className="text-white"/>}/>

//     <SplitPane split="vertical" minSize={50} defaultSize="50%"  maxSize={750}>
//     <CodeWriter lang={'CSS'} logo={<IoLogoCss3 className="text-white"/>}/>
//     <CodeWriter lang={'JS'} logo={<DiJavascript className="text-white"/>}/>

//     </SplitPane>
//   </SplitPane>

//     </div>
//         {/* lower */}
//     <div> bottom div </div>
//   </SplitPane>  
   
//   </div>
// </div>

//       </div>
//     </>

    <>
        <h1>Pen</h1>
    </>
  );
}

export default Pen;
