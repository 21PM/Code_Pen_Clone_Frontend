import React, { useEffect } from 'react'
import { FaHtml5 } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function CodeWriter({setter,code,lang,logo}) {

  const dispatch = useDispatch()
  
  useEffect(()=>{

  },[])
  

  return (
  <div className="w-full min-h-96 h-full flex flex-col">
  <div className="sticky top-0 z-10 bg-black">
    <div className="h-6 flex items-center justify-between pr-4">
      <div className="flex items-center gap-1 justify-start px-1 opacity-80 cursor-pointer">
        {logo}
        <span className="text-white w-2/12">{lang}</span>
      </div>
      <div>
        <CiSettings className="text-white cursor-pointer bg-gray-700 rounded-sm" />
      </div>
    </div>
  </div>
  
  <div className="overflow-auto flex-grow">
        <CodeMirror
                  value={code}
                  height="600px"
                  extensions={[javascript({ jsx: true })]}
                  theme={"dark"}
                  onChange={(value, viewUpdate) => {
                    dispatch(setter(value));
                  }}
        />

  </div>
</div>


  )
}

export default CodeWriter