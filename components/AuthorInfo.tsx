import React from 'react'
import { IAuthor } from '../types'
import Link from 'next/link'
import PortableText from "react-portable-text"
import { urlFor } from '../sanity'
import { getFollowers } from '../pages/posts/[slug]'

interface IAuthorInfo {
    author: IAuthor
}

export default function AuthorInfo( { author }: IAuthorInfo ) {
    return (
        <div className='mb-10'>
            <Link
                href={`/authors/${ author.slug.current }`}
                className='text-2xl text-gray-800 hover:text-violet-800 duration-200 font-mono'>
                <img className='w-24 h-24 rounded-full object-cover mb-4' src={urlFor( author.image ).url()} alt="" />

                {author.name}
            </Link>
            <p className='text-gray-400 text-lg mb-2'>{getFollowers( author.follows )} followers</p>
            {author.bio &&
                <PortableText
                    className='portable-text text-gray-600'
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                    content={author.bio}
                    serializers={
                        {

                            h2: ( props: any ) => (
                                <h2 className='font-bold text-2xl my-4' {...props} />
                            ),
                            h3: ( props: any ) => (
                                <h3 className='font-bold text-xl my-3' {...props} />
                            ),
                            normal: ( props: any ) => (
                                <p className='text-l my-2' {...props} />
                            ),
                            link: ( { href, children }: any ) => (
                                <a href={href} className='text-blue-600 hover:underline'>{children}</a>
                            ),
                            li: ( { children }: any ) => (
                                <li className='ml-4 list-disc'>{children}</li>
                            )
                        }
                    } />
            }
        </div>
    )
}
