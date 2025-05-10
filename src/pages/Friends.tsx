import React, { useCallback, useState } from 'react'
import Tab from '../components/Tab'
import FriendRequests from '../components/friends/FriendRequests';
import Suggesions from '../components/friends/Suggesions';
import YourFriends from '../components/friends/YourFriends';

const tabItems = [
    {
        id: 0, 
        item: "Friend Requests",
    },
    {
        id: 1, 
        item: "Suggestion",
    },
    {
        id: 2, 
        item: "Your Friend",
    },
]

export default function Friends() {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabChange = useCallback((val: number) => {
        setSelectedTab(val);
    }, [setSelectedTab])

  return (
    <div className='w-full h-full'>
        <Tab tabItems={tabItems} selectedItem={selectedTab} onTabChange={handleTabChange} />
        <div className='mt-4 h-[calc(100%-61px)] overflow-y-auto'>
            {
                selectedTab === 0 ? <FriendRequests />
                : selectedTab === 1 ? <Suggesions />
                : <YourFriends />
            }
        </div>
    </div>
  )
}
