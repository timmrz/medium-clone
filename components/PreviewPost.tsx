import React, { forwardRef, MouseEventHandler, Ref } from 'react'
import { IPost } from '../types'
import { urlFor } from '../sanity'
import Link from 'next/link'
import PortableText from "react-portable-text"

export const getPostDate = ( date: string ) => {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const publishedDate = new Date( date )
    const dateNow = new Date()
    if ( publishedDate.getFullYear() !== dateNow.getFullYear() ) {
        return `${ months[publishedDate.getMonth()] } ${ publishedDate.getDate() }, ${ publishedDate.getFullYear() }`
    }


    return `${ months[publishedDate.getMonth()] } ${ publishedDate.getDate() }`

}


interface IPropsPreview {
    post: IPost;
}

interface IChildrenBody {
    _key: string;
    _type: string;
    marks: [any];
    text: string;
}


export default function PreviewPost( { post }: IPropsPreview ) {

    const getStringFromBody = () => {

        const arr: string[] = []

        post.body.children.forEach( ( item: IChildrenBody ) => {
            arr.push( item.text )
        } )

        return arr
    }

    return (
        <div

            className='flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between sm:max-w-screen-sm px-3 sm:px-0  mx-auto py-6 relative sm:h-60 border-b-[1px] border-gray-400  '>

            {/* <Link className='absolute top-0 bottom-0 left-0 right-0 z-10 opacity-100 cursor-pointer'
                href={`/posts/${ post.slug.current }`} /> */}

            <div className=''>
                <Link
                    href={`/authors/${ post.author.slug.current }`}
                    className='flex items-center justify-start mb-2 z-20 relative
                    hover:text-violet-800 duration-200'>
                    <img className='h-10 w-10 rounded-full object-cover mr-3' src={urlFor( post.author.image ).url()} alt="authorIcon" />
                    <p className='text-base text-gray-800 font-mono font-bold '>{post.author.name}</p>
                </Link>

                <Link href={`/posts/${ post.slug.current }`} className='max-h-32 mb-3 block'>

                    <h2 className='text-xl max-h-14 font-sans font-bold overflow-hidden text-ellipsis line-clamp-2'>
                        {post.title}
                    </h2>

                    <p className='pt-1 overflow-hidden text-ellipsis text-gray-500 text-base max-h-12 line-clamp-2'>
                        {
                            post.description ?
                                post.description :
                                getStringFromBody()
                        }
                    </p>
                </Link>


                <span className='flex items-center'>
                    <span className='mr-3'>
                        {getPostDate( post.publishedAt )}
                    </span>
                    <Link
                        href={`/categories/${ post.categories.slug.current }`}
                        className='z-20 cursor-pointer bg-blue-100 rounded-full px-3 py-1 hover:bg-blue-200'>
                        {post.categories.title}
                    </Link>
                </span>

            </div>

            {post.mainImage &&
                <Link className='sm:basis-48 flex-shrink-0 w-full mb-4 sm:mb-0' href={`/posts/${ post.slug.current }`}>
                    <img className=' h-20sm:h-32 w-full sm:w-48 sm:pl-5 object-cover rounded-lg sm:rounded-none' src={urlFor( post.mainImage ).url()} />
                </Link>
            }
        </div>
    )
}
