import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from '../Components/Navbar'
import SignUp from '../Components/SignUp'
import YourWork from '../Components/YourWork'
import Following from '../Components/Following'
import Trending from '../Components/Trending'


function Router() {
    const [isLogin,SetisLogin] = useState(false)

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/'element={!isLogin && <SignUp/>}/>
          <Route path='/your-work'element={isLogin && <YourWork/>}/>
          <Route path='/following'element={isLogin && <Following/>}/>
          <Route path='/trending'element={<Trending/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router