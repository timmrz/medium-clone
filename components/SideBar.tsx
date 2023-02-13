import React, { Children } from 'react'

interface ISideBarProps {
    children: React.ReactNode
}

export default function SideBar( { children }: ISideBarProps ) {
    return (
        <div className='hidden lg:block min-h-screen w-96 border-gray-900 border-l'>
            <div className='sticky top-[89px] w-full px-8  pb-8 pt-16 flex flex-col justify-between'>

                {children}



            </div>
        </div>

    )
}
