import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/Instance'
import Blob from '/assets/Blob.svg'
import MainAnimation from '../components/Animation/MainAnimation'

const Login = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    email: '',
    password: ''
  });

  const auth = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post('auth/login', info);
      localStorage.setItem('userID', response.data.userID);
      localStorage.setItem('user', response.data.user);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 1000);
      // console.log(response.data);


    } catch (error) {
      alert(error.response.data);
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className='flex items-center justify-center h-[100vh]'>
            
      <div className='bg-white shadow-xl rounded-lg w-[900px] h-[500px] flex'>

        <section className='flex-1 overflow-hidden rounded-xl'>
          <img src="assets/login.png" alt="" className='h-full object-cover' />
        </section>
        
        <section className='flex-1 bg-blue-500 grid place-items-center rounded-r-lg'>
          <div>
            <p className='text-white text-2xl font-semibold'>Log in to you Account</p>
            <p className='text-white text-xs mt-1 mb-5'>Welcome Back!</p>

            <form className='' onSubmit={auth}>

              <div>
                <input type="text" className='text-sm border-2 border-white text-white placeholder:text-white/50 bg-blue-500 px-2 py-2 rounded-md mb-5 focus:outline-none w-full' placeholder='Email' onChange={(e) => setInfo({...info, email:e.target.value})} required/>
              </div>

              <div>
                <input type="text" className='text-sm border-2 border-white text-white placeholder:text-white/50 bg-blue-500 px-2 py-2 rounded-md mb-5 focus:outline-none w-full' placeholder='Password' onChange={(e) => setInfo({...info, password:e.target.value})} required/>
              </div>

              <button type="submit" className={`text-blue-500 border-2 border-blue-500 bg-white hover:bg-blue-500 hover:text-white hover:border-white font-medium rounded-md text-sm px-5 py-2 mr-2 items-center w-full focus:outline-none ${loading ? "flex justify-center" : ""}`}>
                  <svg aria-hidden="true" role="status" className={`${loading ? "inline" : "hidden"} w-4 h-4 mr-3 text-gray-200 animate-spin`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="rgb(59,150,246)"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  Login
              </button>

            </form>

            <p className='text-white text-xs mt-2'>Don't have an account? 
              <Link to={'/register'} className='ml-1 font-semibold'>
                Register
              </Link>
            </p>
          </div>
        </section>
          {/* <h1 className='text-center text-2xl font-bold py-4'>Login</h1> */}

      </div>
    </div>
  )
}

export default Login