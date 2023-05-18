import React, { useEffect, useState } from 'react'
import axios from '../api/Instance';
import Skeleton from '../components/Skeleton'
import GetCommName from '../components/GetCommName';
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { RxLightningBolt } from 'react-icons/rx'
import { FaRegCommentDots } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import GetCommunity from '../components/GetCommunity';
import GetUserName from '../components/GetUserName'
import moment from 'moment'



const Explore = () => {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {

        setLoading(true);

        try {
            const response = await axios.get("posts");
            setPosts(response.data);
            setTimeout(() => {

                setLoading(false);
            },500)
            // getCommunityName(response.data[0].communityID);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    

    
    useEffect(() => {
        getPosts();
    }, [])
  return (
    <div className='ml-[300px] pt-[90px]'>
        <section className='pb-10 pl-24'>
            <p className='text-xl font-bold mb-5 dark:text-white'>Explore</p>
            {loading ? (
                <>
                    <Skeleton/>
                    <Skeleton/>
                </>
                
            ) : (

                posts.length === 0 ? (

                    <p className='dark:text-zinc-400'>No post</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className='bg-white dark:bg-zinc-800 w-[650px] min-h-[150px] rounded-lg shadow-lg mb-10 overflow-hidden'>
                   

                            <div className='flex items-center gap-2 py-2 pl-4'>
                                <GetUserName id={post.userID} option={"image"} style={'w-10 h-10 rounded-full'}/>
                                <div className=''>
                                    <p className='text-sm font-medium dark:text-white'><GetUserName id={post.userID} option={"name"}/></p>                                                      
                                    <p className='text-xs flex items-center gap-1 text-gray-500'><RxCounterClockwiseClock/> {moment.utc(post.createdAt).local().startOf('seconds').fromNow()} on <span className='text-black text-sm font-medium dark:text-white'><GetCommName id={post.communityID}/></span> </p>
                                </div>

                            </div>

                            

                            <div className='px-4 mb-4'>
                                <p className='dark:text-white'>{post.title}</p>
                                <p className='dark:text-white'>{post.desc}</p>
                            </div>

                            <img src={post.imageURL} alt="" className='w-full' />
                        </div>
                    ))
                )
            )}

            </section>
    </div>
  )
}

export default Explore