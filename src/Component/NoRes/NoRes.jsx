import React from 'react'

function TextResponse({txt}) {
  return (
    <div className='h-full w-full flex justify-center items-center'>
                   <h1 className='text-white font-extrabold'>{txt}</h1>
                   
     </div>
  )
}

export default TextResponse