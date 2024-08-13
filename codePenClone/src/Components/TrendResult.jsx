import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setHtml,setCss,setJs,setOutout } from '../Slice.js/workSlice'

function TrendResult({output,title,id,allCode}) {
  const dispatch = useDispatch()

  const ShowTrendingViewCode = () =>{      

      dispatch(setHtml(JSON.parse(allCode.html)))
      dispatch(setCss(JSON.parse(allCode.css)))
      dispatch(setJs(JSON.parse(allCode.javascript)))
      dispatch(setOutout(JSON.parse(allCode.output)))
     
        
  }


  return (

<div className="md:w-80 h-full 2xs:w-48 bg-gray-900 p-2 rounded-md cursor-pointer hover:shadow-lg hover:shadow-orange-200">
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
    <div className="p-1 font-bold text-white flex flex-col flex-wrap">
      {title.charAt(0).toUpperCase() + "" + title.substr(1,title.length)}
      <div>
      <p className="text-xs font-mono">"Paras</p>
    </div>
    </div>
    

    <div className="flex gap-2">
                  <Link to="/pen" state={allCode} onClick={ShowTrendingViewCode}>
                  <button className="bg-white hover:bg-black hover:text-white hover:border-2 rounded-sm font-bold text-xs p-1">View code</button>
                  </Link>
    </div>

  </div>
</div>

  )
}

export default TrendResult