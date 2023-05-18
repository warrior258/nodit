import axios from '../api/Instance';
import React, { useState, useEffect } from 'react'
import Skeleton from '../components/Skeleton'
import GetComments from '../components/GetComments';
import { FiShare } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import GetUserName from '../components/GetUserName';
import moment from 'moment'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { MdDelete } from 'react-icons/md';
import GetCommName from '../components/GetCommName';

const LikedPost = () => {

    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`posts/user/${localStorage.getItem('userID')}`);
            if(response.data !== 'no post found'){
                setPosts(response.data);

                setTimeout(() => {

                    setLoading(false);
                },500)
            }else{
                setPosts([]);
                setTimeout(() => {

                    setLoading(false);
                },500)
            }
            // console.log("Liked Posts", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const removeLike = async (iid) => {
        // console.log(id);
        try {
            const response = await axios.patch("likes/unlike", {
                postID: iid,
                userID: localStorage.getItem('userID')
            });

            console.log(response);
            getPosts();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

  return (
    <div className='ml-[300px] pt-[60px]'>
        <section className='pb-10 pl-24 mt-10'>

            {loading ? (
                <>
                    <Skeleton/>
                    <Skeleton/>
                </>

            ) : (

                posts.length === 0 ? (

                    <p className='dark:text-zinc-400'>No post found</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className='bg-white dark:bg-zinc-800 w-[650px] min-h-[150px] rounded-lg shadow-lg mb-10'>
                            <div className='flex items-center justify-between px-4'>
                                <div className='flex items-center gap-2 py-2'>
                                    <GetUserName id={post.userID} option={"image"} style={'w-10 h-10 rounded-full'}/>
                                    <div className=''>
                                        <p className='text-sm font-medium dark:text-white'><GetUserName id={post.userID} option={"name"}/></p>                            
                                        <p className='text-xs flex items-center gap-1 text-gray-500'><RxCounterClockwiseClock/> {moment.utc(post.createdAt).local().startOf('seconds').fromNow()} on <span className='text-black text-sm font-medium dark:text-white'><GetCommName id={post.communityID}/></span> </p>
                                    </div>
                                </div>
                            </div>
                            <div className='px-4 mb-4'>
                                <p className='dark:text-white'>{post.title}</p>
                                <p className='dark:text-white'>{post.desc}</p>
                            </div>

                            <img src={post.imageURL} alt="" className='w-full' />

                            <div className='flex items-center text-xs justify-around py-4'>
                                <p className='flex items-center gap-2 text-gray-500 dark:text-white font-medium bg-gray-100 dark:bg-zinc-700 px-4 py-1 rounded-full'>{post.likes?.includes(localStorage.getItem('userID')) ? <AiFillHeart className='text-red-400 text-lg cursor-pointer' onClick={() => removeLike(post._id)}/> : <AiOutlineHeart className='text-red-400 text-lg cursor-pointer' onClick={() => addLike(post._id)}/>}  <span>{post.likes.length}</span> Like</p>
                                
                            </div>
                        </div>
                    ))
                )
            )}

        </section>
    </div>
  )
}

export default LikedPost