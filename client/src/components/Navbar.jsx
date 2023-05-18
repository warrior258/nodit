import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdMoon } from 'react-icons/io'
import { BsFillSunFill } from 'react-icons/bs'
import { BiLogOutCircle } from 'react-icons/bi'

const Navbar = () => {

  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');

  useEffect(() => {

    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    } else{
      document.documentElement.classList.remove("dark");
    }

  },[theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };


  return (
    <div className='bg-white fixed w-full dark:bg-zinc-900 z-10'>
        <nav className='border border-l-0 dark:border-zinc-800 ml-[300px] flex items-center gap-10 justify-between py-4'>
          {/* <ul className='flex ml-[250px] gap-10 text-xs bg-gray-200 dark:bg-zinc-800 dark:text-white px-10 py-2 font-medium rounded-full text-gray-600'>
            <li>Explore</li>
            <li>Community Feed</li>
            <li>Friends</li>
          </ul> */}
          <div></div>

          <div className='flex items-center mr-10 text-sm gap-4'>
            {theme === 'dark' ? <BsFillSunFill className='text-lg cursor-pointer active:rotate-90 ease-in-out active:scale-90 duration-300 dark:text-yellow-400' onClick={handleThemeSwitch}/> : <IoMdMoon className='text-lg cursor-pointer active:rotate-90 active:scale-90 ease-in-out duration-300' onClick={handleThemeSwitch}/>}
            
            <Link to={'/myprofile'} className='dark:text-white font-medium'>u/{localStorage.getItem('user')}</Link>
            <img src={`https://api.multiavatar.com/${localStorage.getItem('user')}.png?apikey=eMbwRINBp8a5jC`} alt="" className='w-8 h-8 rounded-full' />
            <BiLogOutCircle className='text-xl text-gray-400 cursor-pointer' onClick={logout}/>
          </div>
        </nav>
    </div>
  )
}

export default Navbar