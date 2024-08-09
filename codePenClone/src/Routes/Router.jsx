import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from '../Components/Navbar'
import SignUp from '../Components/SignUp'
import YourWork from '../Components/YourWork'
import Following from '../Components/Following'
import Trending from '../Components/Trending'
import PageNotFound from '../Components/PageNotFound'
import { useSelector } from 'react-redux'
import Pen from '../Components/Pen'
function Router() {

    const user = useSelector(store=>store.user.user)
    
  return (
    <>
      <BrowserRouter>
        {window.location.pathname !== '/pen' && <Navbar />} {/* Conditionally render Navbar */}

        <Routes>
          <Route path='/'element={!user&& <SignUp/>}/>
          <Route path='/your-work'element={<YourWork/>}/>
          <Route path='/following'element={<Following/>}/>
          <Route path='/trending'element={<Trending/>}/>
          <Route path='/pen'element={<Pen/>}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router