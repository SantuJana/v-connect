import React from 'react'
import { Chat } from '../../pages/Chats'
import { IoArrowBack } from "react-icons/io5";
import GirlImage from '../../assets/female/icons8-female-60.svg';

interface MessageHeaderProps {
    selectedChat: Chat;
    handleDeselectChat: () => void;
}

export default function MessageHeader({selectedChat, handleDeselectChat}: MessageHeaderProps) {
  return (
    <div className='flex-shrink-0 h-14 w-full bg-violet-400 flex items-center justify-between px-2 relative'>
        <div className='flex items-center gap-2'>
            <IoArrowBack size={24} className='text-slate-800 cursor-pointer'  onClick={handleDeselectChat}/>
            <img src={GirlImage} alt="" className='h-10 w-10 object-contain rounded-full bg-slate-300' />
        </div>
        <div className='text-lg font-bold text-slate-800 absolute w-full text-center pointer-events-none'>{selectedChat.name}</div>
        <div></div>
    </div>
  )
}
