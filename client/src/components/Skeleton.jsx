import React from "react";

const Skeleton = () => {
  return (
    <div className='w-[650px] min-h-[150px] rounded-lg shadow-lg mb-10 bg-white dark:bg-zinc-800 animate-pulse p-5'>
        <div className='flex items-center gap-2 mb-4'>
            <div className='w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-500'></div>
            <div>
                <div className='w-32 h-3 mb-2 rounded-lg bg-gray-200 dark:bg-zinc-500'></div>
                <div className='w-32 h-3 rounded-lg bg-gray-200 dark:bg-zinc-500'></div>
            </div>
        </div> 
        <div className='w-full mb-3 mt-2 h-3 rounded-lg bg-gray-200 dark:bg-zinc-500'></div>
        <div className='w-full mb-3 h-3 rounded-lg bg-gray-200 dark:bg-zinc-500'></div>
        <div className='w-full h-3 rounded-lg bg-gray-200 dark:bg-zinc-500'></div>
        <div className='w-full h-[300px] mt-5 rounded bg-gray-200 dark:bg-zinc-500'></div>
    </div>
  );
};

export default Skeleton;