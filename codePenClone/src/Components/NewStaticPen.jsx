import React, { useEffect } from 'react'
import Split from "react-split";
import CodeWriter from './CodeWriter';
import { FaCloud } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { DiJavascript } from "react-icons/di";
import { useState } from "react";
import { useSelector } from 'react-redux'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { setHtml,setCss,setJs,setOutout } from '../Slice.js/workSlice';
import { useDispatch } from 'react-redux';
function NewStaticPen() {

  const work = useSelector(store=>store.work)
  const {html,css,js,output} = useSelector(store=>store.work)
  const dispatch = useDispatch()
  

 
  useEffect(() => {
    updateOutput();
    console.log(html);
    
  }, [html,css,js]);

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
    };
  }, []);

  const updateOutput = async () => {
    const combineOutput = `
    <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
            ${html}
        <script>${js}</script>
        </body> 
    </html>
      `;
      console.log(combineOutput);

      dispatch(setOutout(combineOutput));
  };

  
  

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