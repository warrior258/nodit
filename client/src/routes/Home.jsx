import React, { useEffect, useState } from 'react'
import axios from '../api/Instance'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { MdDelete } from 'react-icons/md'
import { BiUserPlus } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

import { RxLightningBolt } from 'react-icons/rx'
import { FaRegCommentDots } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import GetCommName from '../components/GetCommName';
import GetCommunity from '../components/GetCommunity';
import GetUserName from '../components/GetUserName'
import moment from 'moment'
import Skeleton from '../components/Skeleton'
import CreateCommunity from '../components/CreateCommunity'

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [commLoading, setCommLoading] = useState(false);
    const [openCreateComm, setOpenCreateComm] = useState(false);

    const [posts, setPosts] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [text, setText] = useState("\n\nMaking money online is a great way to supplement your income or even replace it entirely. Here is a step-by-step guide to help you get started:\n\n1. Decide what type of online business you want to pursue. There are many options, such as freelancing, blogging, affiliate marketing, and selling products or services. Consider your skills and interests to determine which type of business is best for you.\n\n2. Research the market. Once you’ve decided on a business model, research the market to determine if there is a demand for what you’re offering.\n\n3. Create a website. You’ll need a website to promote and sell your products or services. You can use a website builder or hire a web designer to create a professional-looking website.\n\n4. Promote your business. Once your website is up and running, you’ll need to promote it. You can use social media, search engine optimization, and other online marketing strategies to reach potential customers.\n\n5. Monitor your progress. Track your progress to see what’s working and what’s not. Make adjustments as needed to maximize your profits.\n\n6. Stay organized. Keep track of your finances, customers, and other important information to ensure your business runs smoothly.\n\nMaking money online is possible with the right strategy and dedication. Follow these steps to get started and you’ll be on your way to success.");
    // console.log(text);

    const getPosts = async () => {

        setLoading(true);

        try {
            const response = await axios.get("posts/userPosts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(response.data !== "no joined communities found for this user"){
                setTimeout(() => {

                    setLoading(false);
                    setPosts(response.data);
                },500)
            }else{
                setTimeout(() => {

                    setLoading(false);
                },500)
            }

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (postID) => {
        try {
            const res = await axios.delete(`posts/${postID}`);
            getPosts();
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAiText = async (text) => {

        try {
            const response = await axios.get(`generateText?text=${text}`);
            console.log(response.data.choices[0].text);
        } catch (error) {
            console.log(error);
        }
    };

    
    // useEffect(() => {
    //     getPosts();
    // }, []);
    

    const getCommunities = async () => {
        setCommLoading(true);
        try {
            const response = await axios.get(`communities/my/${localStorage.getItem('userID')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(response.data !== "no joined communities found for this user"){

                setCommunities(response.data);
            }

            setTimeout(() => {
                setCommLoading(false);
            },500)
            console.log("comm", response.data);
        } catch (error) {
           console.log(error); 
        }
    };

    useEffect(() => {
        getPosts();
        getCommunities();
    }, [])

    const deleteCommunity = async (commID) => {
        try {
            const res = await axios.delete(`communities/${commID}`);
            getCommunities();
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    // useEffect(() => {
    //     if(text.length > 10){
    //         getAiText(text.slice(text.length - 50, text.length))
    //     }
    // }, [text]);


  return (
    <div className='ml-[300px] flex pt-[90px]'>
        <CreateCommunity openCreateComm={openCreateComm} setOpenCreateComm={setOpenCreateComm} getCommunities={getCommunities}/>
        
        <section className='pb-10 pl-24'>
            
            {loading ? (
                <>
                <Skeleton/>
                <Skeleton/>
                </>
            ): (
                
                    posts.length === 0 ? (

                        <p className='dark:text-zinc-400'>Join some communities to see posts!</p>
                        
                    ) : (
                        
                        posts.map((post) => (
                            <div key={post._id} className='bg-white dark:bg-zinc-800 w-[650px] min-h-[150px] rounded-lg shadow-lg mb-10 overflow-hidden'>
                                <div className='flex items-center justify-between px-4'>
                                    <div className='flex items-center gap-2 py-2'>
                                        <GetUserName id={post.userID} option={"image"} style={'w-10 h-10 rounded-full'}/>
                                        <div className=''>
                                            <div className='text-sm font-medium dark:text-white flex items-center gap-1'><GetUserName id={post.userID} option={"name"}/>
                                                {/* <div className='hover:bg-blue-500/10 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer group'>
                                                    <BiUserPlus className='group-hover:text-blue-500 text-gray-500'/>
                                                </div> */}
                                            </div>                            
                                            <p className='text-xs flex items-center gap-1 text-gray-500'><RxCounterClockwiseClock/> {moment.utc(post.createdAt).local().startOf('seconds').fromNow()} on <span className='text-black text-sm font-medium dark:text-white'><GetCommName id={post.communityID}/></span> </p>
                                        </div>
                                    </div>
                                    {post.userID === localStorage.getItem('userID') ? (
                                        <button className='hover:bg-red-500/10 w-8 h-8 flex items-center justify-center rounded-full group'><MdDelete className='group-hover:text-red-500 text-gray-500' onClick={() => deletePost(post._id)}/></button>
                                    ) : ""}
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

        <section className='fixed right-10 bg-white dark:bg-zinc-800 w-[280px] min-h-[80px] p-4 rounded-lg shadow-lg'>

            <div className='mb-2 text-sm font-medium flex items-center justify-between'>
                <p className='dark:text-gray-300 flex items-center gap-3'>My Communities <AiOutlinePlus className='cursor-pointer' onClick={() => setOpenCreateComm(true)}/></p>
                <p className='text-blue-500 bg-blue-50 px-3 py-0.5 rounded-xl text-xs dark:bg-zinc-700'>{communities.length}</p>
            </div>
            <div className='text-sm font-medium'>

                {commLoading ? (
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
                        <div key={community._id} className='flex justify-between items-center'>
                            <a href={`/communities/community/${community._id}`} key={community._id} className='py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 rounded flex items-center gap-2 flex-1'>
                                <img src={`https://robohash.org/${community.name}`} alt="" className='w-8 h-8 rounded-full' />
                                <div>
                                    <p className='text-sm text-black dark:text-gray-300'>@{community.name}</p>
                                    <p className='text-xs font-normal dark:text-gray-500'>{community.joinedUsers.length} members</p>
                                </div> 
                            </a>
                            <button className='hover:bg-red-500/10 w-8 h-8 flex items-center justify-center rounded-full group' onClick={() => deleteCommunity(community._id)}><MdDelete className='group-hover:text-red-500 text-gray-500'/></button>
                        </div>
    
                    )) : (
                        <p className='text-xs text-gray-500'>No community created</p>
                    )
                )}

                
            </div>

            
        </section>
        
    </div>
  )
}

export default Home