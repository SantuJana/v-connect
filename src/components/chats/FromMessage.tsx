import React from 'react'
import { MessageInterface } from './MessageViewContainer'

interface FromMessageProps {
    message: MessageInterface;
}

export default function FromMessage({message}: FromMessageProps) {
  return (
    <div className='w-auto max-w-[80%] md:max-w-[70%] bg-blue-300 px-2 py-1 rounded-lg rounded-br-none text-slate-700 self-end'>
        {message.message}
    </div>
  )
}
