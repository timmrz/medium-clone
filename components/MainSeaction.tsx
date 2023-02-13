import React from 'react'

export default function MainSection() {
    return (
        <div className='bg-[#FFC017] border-b-[1px] border-gray-900 px-4'>
            <div className='max-w-[1192px] mx-auto py-16 sm:py-24 flex items-center justify-between'>

                <div className='max-w-[550px]'>
                    <h1 className='text-5xl sm:text-8xl mb-6  sm:mb-8 tracking-tighter font-serif'>Stay curious.</h1>
                    <h3 className='text-2xl leading-none mb-12 w-[80%] font-serif'>Discover stories, thinking, and expertise from writers on any topic.</h3>
                    <button className='text-xl bg-gray-900 text-gray-50 py-2 px-5 rounded-full w-52'>
                        Start reading
                    </button>
                </div>
                <div className='hidden md:block'>
                    <img src="https://creativecommons.org/wp-content/uploads/2015/05/Medium-logo-dark500-300x300.png" alt="" />
                </div>
            </div>
        </div>
    )
}
