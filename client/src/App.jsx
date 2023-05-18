import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import CommunityPage from './routes/CommunityPage'
// import CreateCommunity from './routes/CreateCommunity'
import Explore from './routes/Explore'
import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import LikedPost from './routes/LikedPost'
import Register from './routes/Register'

function App() {

  const navigate = useNavigate();


  useEffect(() => {
    

    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, [])

  return (
    <div>

      
      {localStorage.getItem('token') ? 
        <>
        <Navbar/>
        <SideBar/>
        </> : <></>
      }
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/myprofile' element={<Profile/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/likedposts' element={<LikedPost/>} />
        {/* <Route path='/communities/create' element={<CreateCommunity/>} /> */}
        <Route path='/communities/community/:id' element={<CommunityPage/>} />
      </Routes>


    </div>
  )
}

export default App
