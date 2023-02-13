import React from 'react'
import { IAuthor } from '../types'
import { urlFor } from '../sanity'
import Link from 'next/link'
import PortableText from "react-portable-text"



interface IFollowProps {
    authors: IAuthor[]
}

export default function FollowTo( { authors }: IFollowProps ) {


    return (


        <div>
            <h3 className='text-xl font-bold text-gray-800 mb-7'>Who to follow</h3>
            {
                authors.map( author => (

                    <div key={author._id} className='flex justify-between items-center mb-5 relative'>
                        <Link
                            className='absolute top-0 bottom-0 right-0 left-0 z-10'
                            href={`/authors/${ author.slug.current }`} />
                        <div className='flex items-center cursor-pointer'>
                            <img className='h-10 w-10 object-cover mr-4  rounded-full' src={urlFor( author.image ).url()} />
                            <div className='max-w-[180px]'>
                                <h4 className='text-sm my-0 font-mono font-bold max-h-10'>
                                    {author.name}
                                </h4>
                                {author.bio &&
                                    <PortableText
                                        className='portable-text text-gray-600 max-h-16 overflow-hidden'
                                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                                        content={author.bio}
                                        serializers={
                                            {

                                                h2: ( props: any ) => (
                                                    <h2 className='font-bold text-base  text-ellipsis' {...props} />
                                                ),
                                                h3: ( props: any ) => (
                                                    <h3 className='font-bold text-base text-ellipsis' {...props} />
                                                ),
                                                normal: ( props: any ) => (
                                                    <p className='text-sm  text-ellipsis' {...props} />
                                                ),
                                                link: ( { href, children }: any ) => (
                                                    <a href={href} className='text-blue-600 hover:underline text-sm text-ellipsis'>{children}</a>
                                                ),
                                                li: ( { children }: any ) => (
                                                    <li className=' text-sm ml-4 list-disc text-ellipsis'>{children}</li>
                                                )
                                            }
                                        } />
                                }
                            </div>
                        </div>
                        <button className='cursor-pointer py-2 px-3 text-sm rounded-full border-gray-500 border-[1px] hover:border-gray-900 hover:bg-green-100 duration-200 relative z-20'>Follow</button>
                    </div>


                ) )
            }
        </div>


    )
}
