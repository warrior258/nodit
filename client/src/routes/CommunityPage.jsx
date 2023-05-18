import axios from '../api/Instance';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GetUserName from '../components/GetUserName';
import GetAdminName from '../components/GetAdminName';
import GetComments from '../components/GetComments';
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import GetCommName from '../components/GetCommName';
import GetCommunity from '../components/GetCommunity';
import moment from 'moment'
import { MdDelete } from 'react-icons/md';
import CreatePost from '../components/CreatePost';

const CommunityPage = () => {

    // const navigate = useNavigate();

    const { id } = useParams();
    const [community, setCommunity] = useState({});
    const [posts, setPosts] = useState([]);

    const [openComments, setOpenComments] = useState(true);
    const [openCreatePost, setOpenCreatePost] = useState(false);

    const getCommunity = async (id) => {
        try {
            const response = await axios.get(`communities/${id}`);
            setCommunity(response.data);
            console.log("Community", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getPosts = async (id) => {

        try {
            const response = await axios.get(`posts/${id}`);
            if(response.data !== 'no post found'){
                setPosts(response.data);
            }else{
                setPosts([]);
            }
            console.log("Posts", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const leave = async () => {
        try {
            const response = await axios.patch("communities/leave", {
                communityID: id,
                userID: localStorage.getItem('userID')
            });

            console.log(response);
            location.reload();
            // navigate('/');
            
        } catch (error) {
            console.log(error);
        }
    };

    const join = async () => {
        try {
            const response = await axios.patch("communities/join", {
                communityID: id,
                userID: localStorage.getItem('userID')
            });

            console.log(response);
            location.reload();
            
        } catch (error) {
            console.log(error);
        }
    };

    const addLike = async (iid) => {
        try {
            const response = await axios.patch("likes", {
                postID: iid,
                userID: localStorage.getItem('userID')
            });

            console.log(response);
            getPosts(id);
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
            getPosts(id);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (postID) => {
        try {
            const res = await axios.delete(`posts/${postID}`);
            getPosts(id);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // console.log(id);
        getCommunity(id);
        getPosts(id);
    }, [id]);

  return (
    <div className='ml-[300px] pt-[60px]'>
        <CreatePost openCreatePost={openCreatePost} setOpenCreatePost={setOpenCreatePost} getPosts={getPosts}/>
        <div className='w-full h-[200px] bg-gray-400'></div>

        <div className='flex items-center gap-2 -mt-11 ml-24'>
            <img src={`https://robohash.org/${community.name}`} alt="" className='w-16 h-16 rounded-full bg-white border-4 border-blue-500' />
            <p className='font-semibold'>@{community.name}</p>
        </div>


            <section>
                <div className='flex items-center justify-between px-24 my-5'>
                    <div className='dark:text-gray-200'>               
                        <p className='text-xl font-bold mb-2'>About</p>
                        <p>{community.desc}</p>
                        <p>Created At: {community.createdAt?.split('T')[0]}</p>
                        {community.createdBy ? <div className='flex gap-2'>Admin: <GetAdminName adminID={community.createdBy}/></div> : <p>No found</p> }
                        <p>Type: {community.communityType}</p>
                        <p>Total members: {community.joinedUsers?.length}</p>
                    </div>

                    <div className='dark:text-gray-200'>
                        {community.joinedUsers?.includes(localStorage.getItem('userID')) ?
                            <button className='bg-red-500 px-10 rounded py-1 mb-3 text-white text-sm font-medium' onClick={leave} >Leave</button> : <button className='bg-blue-500 px-10 rounded py-1 mb-3 text-sm text-white font-medium' onClick={join} >Join</button>

                        }
                        <p className='text-xl font-bold mb-2'>Joined Users</p>
                        {community.joinedUsers?.length > 0 ? community.joinedUsers?.map((user, idx) => (
                            <div key={idx} className='flex items-center gap-2 mb-2'>
                                <GetUserName id={user} option={"image"} style={'w-8 h-8 rounded-full'} />
                                <GetUserName id={user} option={"name"}/>
                            </div>
                        )) : (
                            <p>0 members</p>
                        )}
                    </div>
                </div>
            </section>

        {community.joinedUsers?.includes(localStorage.getItem('userID')) || community.communityType === "public"  ? (
            <div>
                
                <section className='pb-10 pl-24'>
                    <div className='text-right w-[650px]'>
                        <button className='bg-blue-500 px-4 py-1 rounded text-sm text-white font-medium mb-5' onClick={() => setOpenCreatePost(true)}>Create Post</button>
                    </div>

                    {posts.length > 0 ? posts.map((post) => (

                        <div key={post._id} className='bg-white dark:bg-zinc-800 w-[650px] min-h-[150px] rounded-lg shadow-lg mb-10'>
                            <div className='flex items-center justify-between px-4'>
                                <div className='flex items-center gap-2 py-2'>
                                    <GetUserName id={post.userID} option={"image"} style={'w-10 h-10 rounded-full'}/>
                                    <div className=''>
                                        <p className='text-sm font-medium dark:text-white'><GetUserName id={post.userID} option={"name"}/></p>                            
                                        <p className='text-xs flex items-center gap-1 text-gray-500'><RxCounterClockwiseClock/> {moment.utc(post.createdAt).local().startOf('seconds').fromNow()} on <span className='text-black text-sm font-medium dark:text-white'><GetCommName id={post.communityID}/></span> </p>
                                    </div>
                                </div>
                                {post.userID === localStorage.getItem('userID') ? (

                                    <button className='hover:bg-red-500/10 w-8 h-8 flex items-center justify-center rounded-full group'> <MdDelete className='text-lg text-gray-500 group-hover:text-red-400' onClick={() => deletePost(post._id)}/></button>
                                ) : ""}
                            </div>
                            <div className='px-4 mb-4'>
                                <p className='dark:text-white'>{post.title}</p>
                                <p className='dark:text-white'>{post.desc}</p>
                            </div>

                            <img src={post.imageURL} alt="" className='w-full' />

                            <div className='flex items-center text-xs justify-around py-4'>
                                <p className='flex items-center gap-2 text-gray-500 dark:text-white font-medium bg-gray-100 dark:bg-zinc-700 px-4 py-1 rounded-full'>{post.likes?.includes(localStorage.getItem('userID')) ? <AiFillHeart className='text-red-400 text-lg cursor-pointer' onClick={() => removeLike(post._id)}/> : <AiOutlineHeart className='text-red-400 text-lg cursor-pointer' onClick={() => addLike(post._id)}/>}  <span>{post.likes.length}</span> Like</p>
                                {/* <p className='flex items-center gap-2 text-gray-500 dark:text-white font-medium bg-gray-100 dark:bg-zinc-700 px-4 py-1 rounded-full cursor-pointer' onClick={() => setOpenComments(true)} ><FaRegCommentDots className='text-lg text-gray-500 dark:text-white' /> Comments</p> */}
                                <p className='flex items-center gap-2 text-gray-500 dark:text-white font-medium bg-gray-100 dark:bg-zinc-700 px-4 py-1 rounded-full'><FiShare className='text-lg text-gray-500 dark:text-white'/> Share</p>
                            </div>                    

                            <GetComments communityID={post.communityID} postID={post._id} openComments={openComments} setOpenComments={setOpenComments} />
                        </div>
                    )) : (
                        <p>No post</p>
                    )}

                </section>
            
            </div>
        ) : (

            <p className='pl-24 dark:text-white'>Join the community to view posts!</p>
        )}

        
        

    </div>
  )
}

export default CommunityPage