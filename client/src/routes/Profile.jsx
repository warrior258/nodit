import React from 'react'
import { FiUserPlus } from 'react-icons/fi'

const Profile = () => {
  return (
    <div className='ml-[300px] pt-[60px]'>
        <div className='p-10 flex items-center gap-5'>
            <img src={`https://api.multiavatar.com/${localStorage.getItem('user')}.png?apikey=eMbwRINBp8a5jC`} alt="" className='w-28 h-28 rounded-full' />

            <div>
                <p className='dark:text-white mt-2 text-sm'><span className='font-medium'>Username:</span>  u/{localStorage.getItem('user')}</p>
                <p className='dark:text-white mt-2 text-sm'><span className='font-medium'>Email:</span>  {localStorage.getItem('email')}</p>
            </div>

            {/* <button className='bg-blue-500/10 rounded-full flex justify-center items-center w-10 h-10'>
                <FiUserPlus className='text-blue-500'/>
            </button> */}

        </div>
    </div>
  )
}

export default Profile