import React from 'react'
import { MdOutlineSupervisorAccount } from "react-icons/md";

export default function NoResult({message}: {message: string}) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
            <MdOutlineSupervisorAccount size={100} className='text-blue-600' />
            <p>{message}</p>
        </div>
    </div>
  )
}
