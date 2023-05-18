import React, { useEffect, useState } from 'react'
import axios from '../api/Instance';
import GetUserName from './GetUserName';
import { IoClose } from 'react-icons/io5'
import moment from 'moment';
import { MdDelete } from 'react-icons/md';

const GetComments = ({communityID, postID, openComments, setOpenComments}) => {

    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);

    const getComments = async (communityID, postID) => {

        try {
            const response = await axios.get(`comments/${communityID}/${postID}`);
            if(response.data !== "no comments on this post"){
                setComments(response.data);
            }
            
        } catch (error) {
            console.log(error);
        }

    };

    const createComment = async () => {
        try {
            const response = await axios.post("comments", {
                text: text,
                communityID: communityID,
                userID: localStorage.getItem('userID'),
                postID: postID
            });
            
            console.log(response);
            setText('');
            getComments(communityID, postID);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (commentID) => {
        try {
            const response = await axios.delete(`comments/${commentID}`);            
            getComments(communityID, postID);
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments(communityID, postID);
    }, [])
    

  return (
    <div className={`${!openComments ? 'hidden' : 'block'}`}>
        <div className='bg-white dark:bg-zinc-800 min-h-[200px] rounded-lg shadow-xl p-6 overflow-y- overflow-x-hidden'>
            <div className='mb-5 flex items-center justify-between'>
                <p className='text-lg font-bold dark:text-white'>Comments <span className='text-blue-500 bg-blue-50 px-3 py-0.5 rounded-xl text-xs dark:bg-zinc-700 ml-2'>{comments.length}</span></p>
                {/* <IoClose className='text-xl cursor-pointer' onClick={() => setOpenComments(false)} /> */}
            </div>

            <div className='mb-5'>
                <input type="text" value={text} placeholder='Type Something...' className='border-2 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 focus:outline-none rounded text-sm py-2 px-4 w-[300px]' onChange={(e) => setText(e.target.value)} />
                <button className='text-sm bg-blue-500 py-2 px-4 rounded text-white ml-5' onClick={createComment}>Add Comment</button>
            </div>

            {comments.length > 0 ? comments.map((comment) => (
                <div key={comment._id} className='mb-5 relative'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <GetUserName id={comment.userID} option={"image"} style={'w-6 h-6 rounded-full'}/>
                            <p className='text-sm font-medium dark:text-white'><GetUserName id={comment.userID} option={"name"}/></p>
                        </div>
                        <p className='text-xs text-gray-500'>{moment.utc(comment.createdAt).local().startOf('seconds').fromNow()}</p>
                    </div>
                    <p className='text-sm dark:text-white mt-2 mb-5'>{comment.text}</p>
                    {comment.userID === localStorage.getItem('userID') ? (
                        <MdDelete className='absolute right-0 bottom-1 cursor-pointer text-gray-400 hover:text-black dark:hover:text-zinc-500' onClick={() => deleteComment(comment._id)} />

                    ) : ""}
                    
                </div>
            )) : (
                <p className='dark:text-gray-500'>No comments on this post.</p>
            )}
        </div>
    </div>
  )
}

export default GetComments