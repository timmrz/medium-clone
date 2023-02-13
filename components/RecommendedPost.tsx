import React from 'react'
import { IAuthor, IPost, MainImage } from '../types'
import { urlFor } from '../sanity'
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IRecommendedProps {
    recommended: IPost[];
}



export default function RecommendedPost( { recommended }: IRecommendedProps ) {

    return (

        <div className=''>

            <h3 className='font-bold mb-5 text-xl '>More from Medium</h3>
            <div className='mb-8'>
                {
                    recommended.map( post => (
                        <div
                            key={post._id}

                            className='flex items-center justify-between max-w-screen-sm cursor-pointer  mb-3 relative'>
                            <Link
                                className='absolute top-0 bottom-0 left-0 right-0 z-10'
                                href={`/posts/${ post.slug.current }`} />

                            <div>
                                <Link
                                    href={`/authors/${ post.author.slug.current }`}
                                    className='flex items-center justify-start z-20 relative hover:text-violet-800 duration-200'>
                                    <img className='h-5 w-5 rounded-full object-cover mr-3' src={urlFor( post.author.image ).url()} alt="authorIcon" />
                                    <p className='text-sm font-mono font-bold '>{post.author.name}</p>
                                </Link>
                                <h2 className='text-base font-sans font-bold'>{post.title}</h2>
                            </div>

                            {post.mainImage &&
                                <img className='h-14 w-14 ml-3' src={urlFor( post.mainImage ).url()} />}

                        </div>
                    ) )
                }
            </div>
        </div>


    )
}
