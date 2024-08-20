import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from '../Components/Navbar'
import SignUp from '../Components/SignUp'
import YourWork from '../Components/YourWork'
import Following from '../Components/Following'
import Trending from '../Components/Trending'
import PageNotFound from '../Components/PageNotFound'
import Profile from '../Components/Profile'
import { useSelector } from 'react-redux'
import NewStaticPen from '../Components/NewStaticPen'
import { useLocation } from 'react-router-dom'
function Router() {

    const user = useSelector(store=>store.user.user)
    const location = useLocation(); // Use useLocation to get the current path

  return (
    <>
        {location.pathname !== '/pen' && <Navbar />} {/* Conditionally render Navbar */}

        <Routes>
          <Route path='/'element={!user&& <SignUp/>}/>
          <Route path='/your-work'element={<YourWork/>}/>
          <Route path='/following'element={<Following/>}/>
          <Route path='/trending'element={<Trending/>}/>
          <Route path='/pen'element={<NewStaticPen/>}/>
          <Route path='/profile'element={<Profile/>}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </>
  )
}

export default Router