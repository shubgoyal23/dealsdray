import React from 'react'

function Loading() {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm flex justify-center items-center'>
      <div className='border-8 rounded-full animate-spin border-t-blue-500 size-20'></div>
    </div>
  )
}

export default Loading
