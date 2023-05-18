import React, { useEffect, useState } from 'react'
import { BiHomeAlt } from "react-icons/bi";
import { CgUserlane } from 'react-icons/cg';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import axios from '../api/Instance';

const SideBar = () => {


    const [loading, setLoading] = useState(false);

    const [communities, setCommunities] = useState([]);

    const getCommunities = async () => {
        setLoading(true);

        try {
            const response = await axios.get("communities/joinedCommunities", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(response.data !== "no joined communities found for this user"){

                setCommunities(response.data);
            }

            setTimeout(() => {

                setLoading(false);
            },500)
            // console.log("comm", response.data);
        } catch (error) {
           console.log(error); 
        }
    };

    useEffect(() => {
        getCommunities();
    }, [])

  return (
    <div className='border w-[300px] h-[100vh] px-8 fixed top-0 bg-white dark:bg-zinc-900 dark:border-zinc-800 z-10'>
        <h1 className='text-2xl tracking-wide text-blue-500 font-bold mt-10 flex items-center gap-2'><CgUserlane/> Nodit</h1>

        {/* <div className='mt-6 border-2 border-gray-300 dark:border-zinc-800 flex items-center gap-2 px-4 py-2 rounded-md'>
            <BiSearch className='text-gray-400'/>
            <input type="text" className='focus:outline-none text-sm dark:bg-zinc-900 dark:text-white' placeholder='Explore Nodit...' />
        </div> */}

        <div className='py-4 font-medium text-gray-400'>
            <Link to={'/'} className='py-3 pl-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded flex items-center gap-2 group cursor-pointer'>                
                <BiHomeAlt className='text-lg group-hover:text-blue-500' /> <span className='text-sm group-hover:text-blue-500'>Home</span>
            </Link>

            <Link to={'/explore'} className='py-3 pl-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded flex items-center gap-2 group cursor-pointer'>
                <HiOutlineUserGroup className='text-lg group-hover:text-blue-500' /> <span className='text-sm group-hover:text-blue-500'>Communities</span>
            </Link>

            <Link to={'/likedposts'} className='py-3 pl-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded flex items-center gap-2 group cursor-pointer'>
                <AiOutlineHeart className='text-xl group-hover:text-blue-500' /> <span className='text-sm group-hover:text-blue-500'>Liked Posts</span>
            </Link>            
        </div>

        <div className='mb-2 text-sm font-medium flex items-center justify-between'>
            <p className='dark:text-gray-400'>Joined Communities</p>
            <p className='text-blue-500 bg-blue-50 px-3 py-0.5 rounded-xl text-xs dark:bg-zinc-800'>{communities.length}</p>
        </div>
        <div className='text-sm font-medium'>

            

            {loading ? (
                <>
                <div className='flex items-center gap-2 my-2'>
                    <div className='w-10 h-10 bg-gray-200 dark:bg-zinc-500 rounded-full animate-pulse'></div>
                    <div className='animate-pulse'>
                        <div className='w-[80px] h-3 rounded bg-gray-200 dark:bg-zinc-500 mb-2'></div>
                        <div className='w-[80px] h-3 rounded bg-gray-200 dark:bg-zinc-500'></div>
                    </div>
                </div>
                <div className='flex items-center gap-2 my-2'>
                    <div className='w-10 h-10 bg-gray-200 dark:bg-zinc-500 rounded-full animate-pulse'></div>
                    <div className='animate-pulse'>
                        <div className='w-[80px] h-3 rounded bg-gray-200 dark:bg-zinc-500 mb-2'></div>
                        <div className='w-[80px] h-3 rounded bg-gray-200 dark:bg-zinc-500'></div>
                    </div>
                </div>
                <div className='flex items-center gap-2 my-2'>
                    <div className='w-10 h-10 bg-gray-200 dark:bg-zinc-500 rounded-full animate-pulse'></div>
                    <div className='animate-pulse'>
                        <div className='w-[80px] h-3 rounded bg-gray-200 dark:bg-zinc-500 mb-2'></div>
                        <div className='w-[80px] h-3 rounded bg-gray-200 dark:bg-zinc-500'></div>
                    </div>
                </div>
                
                </>
            ) : (
                communities.length > 0 ? communities.map((community) => (
                    <a href={`/communities/community/${community._id}`} key={community._id} className='py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 rounded flex items-center gap-2'>
                        <img src={`https://robohash.org/${community.name}`} alt="" className='w-8 h-8 rounded-full' />
                        <div>
                            <p className='text-sm text-black dark:text-gray-300'>@{community.name}</p>
                            <p className='text-xs font-normal dark:text-gray-500'>{community.joinedUsers.length} members</p>
                        </div> 
                    </a>
    
                )) : (
                    <p className='text-xs text-gray-500'>No community joined</p>
                )
            )}

            
        </div>

        {/* <p className='mt-4 mb-2 text-sm font-medium dark:text-gray-400'>Recommended Communities</p>
        <div className='text-sm font-medium'>
            <div className='py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 rounded flex items-center gap-2'>
                <img src="https://robohash.org/dogs" alt="" className='w-8 h-8 rounded-full' />
                <div>
                    <p className='text-sm text-black dark:text-gray-300'>@dogs</p>
                    <p className='text-xs font-normal dark:text-gray-500'>29 members</p>
                </div> 
            </div>

            <div className='py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 rounded flex items-center gap-2'>
                <img src="https://robohash.org/cats" alt="" className='w-8 h-8 rounded-full' />
                <div>
                    <p className='text-sm text-black dark:text-gray-300'>@cats</p>
                    <p className='text-xs font-normal dark:text-gray-500'>14 members</p>
                </div> 
            </div>
        </div> */}

    </div>
  )
}

export default SideBar