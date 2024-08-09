import React from 'react'
import Split from "react-split";
import CodeWriter from './CodeWriter';
import { FaCloud } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { DiJavascript } from "react-icons/di";
import { useState } from "react";


function NewStaticPen() {

  const [html, SetHtml] = useState("");
  const [css, SetCss] = useState("");
  const [js, SetJs] = useState("");
  const [output, SetOutput] = useState("");


  return (
    <>

<nav className="w-full h-12 border-b-2 border-gray-600 bg-black flex items-center justify-between">
              {/* // work Title Section */}
              <section className="w-full h-full flex py-1">
                <div className="w-1/12 h-full">
                  <img
                    className="w-full h-full object-contain"
                    src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
                  ></img>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex gap-1 items-center">
                    <span className="text-white">Untitled</span>
                    <span className="text-white cursor-pointer">
                      <MdOutlineEdit />
                    </span>
                  </div>
                  <span className="text-white text-xs">Paras More</span>
                </div>
              </section>

              <section className="w-full h-full flex gap-8 items-center justify-end px-6 py-1">
                <button className="py-1 px-3 bg-gray-600 flex items-center justify-center gap-1 hover:bg-transparent hover:border-2 text-white rounded-sm">
                  <FaCloud />
                  Save
                </button>
                <button className="py-1 px-3 bg-gray-600 text-white rounded-sm hover:bg-transparent hover:border-2 ">
                  Profile
                </button>
              </section>
            </nav>
  

      <section className="flex">

        {/* // HTML CSS AND JS */}
        <div className="max-w-[50%] flex flex-col justify-between items-center max-h-screen">
          <div className="w-full overflow-scroll no-scrollbar bg-gray-900 text-white"><CodeWriter  lang={'HTML'} logo={<FaHtml5 className='text-white '/>} /></div>
          <div className="w-full overflow-scroll no-scrollbar bg-gray-900 text-white"><CodeWriter  lang={'CSS'} logo={<IoLogoCss3 className='text-white'/>}/></div>
          <div className="w-full overflow-scroll no-scrollbar bg-gray-900 text-white"><CodeWriter  lang={'JS'} logo={<DiJavascript className='text-white'/>}/></div>
        </div>

        <div className='min-w-[50%] max-w-[50%] min-h-screen border-2 border-red-800'>
            Output
        </div>

      </section>
      
    
    </>

  )
}

export default NewStaticPen