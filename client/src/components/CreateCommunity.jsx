import axios from '../api/Instance';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const CreateCommunity = ({openCreateComm, setOpenCreateComm, getCommunities}) => {  
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    desc: '',
    communityType: 'public',
    createdBy: localStorage.getItem('userID')
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post('communities', data);
      setLoading(false);
      setOpenCreateComm(false);
      getCommunities();
      // console.log(res.data);
    } catch (error) {
      alert(error.response.data);
    }

    console.log(data);
  };

  return (
    <div className={`${openCreateComm ? "fixed" : "hidden"} bg-black/40 dark:bg-black/70 h-full top-[65px] grid place-items-center z-10`} style={{width: 'calc(100vw - 300px)'}}>
        <div className='relative w-[550px] h-[430px] -mt-12 bg-white dark:bg-zinc-800 rounded-xl'>
            <IoMdClose  className='absolute right-5 top-4 dark:text-white cursor-pointer text-xl' onClick={() => setOpenCreateComm(false)}/>
            <p className='text-2xl font-bold text-center dark:text-white py-4 mt-7'>Create Community</p>
            {/* onSubmit handleSubmit */}
            <form className='flex flex-col items-center gap-5 pt-5' onSubmit={handleSubmit}>
                <div>
                    <input className='border-2 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 px-4 py-2 w-[380px] outline-none rounded-md text-sm' type="text" placeholder='Community Name...' onChange={(e) => setData({...data, name: e.target.value})} required/>
                </div>
                <div>
                    <input className='border-2 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 px-4 py-2 w-[380px] outline-none rounded-md text-sm' type="text" placeholder='Community Description...' onChange={(e) => setData({...data, desc: e.target.value})} required/>
                </div>

                <div>
                  <p className='text-xs font-medium text-gray-500 dark:text-gray-300 mb-2'>Select community type</p>
                  <select onChange={(e) => setData({...data, communityType: e.target.value})} className='border-2 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 px-4 py-2 w-[380px] outline-none rounded-md text-sm'>
                    <option value="public">public</option>
                    <option value="private">private</option>
                  </select>
                </div>
                <div>
                    <button type='submit' className='bg-blue-500 px-6 py-1.5 rounded font-semibold text-white text-sm'>
                        <svg aria-hidden="true" role="status" className={`${loading ? "inline" : "hidden"} w-4 h-4 mr-3 text-white animate-spin`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Create
                    </button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default CreateCommunity