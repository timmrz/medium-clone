import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Comment, IPost } from '../../types'
import PortableText from "react-portable-text"
import RecommendedPost from '../../components/RecommendedPost'
import Link from 'next/link'
import SideBar from '../../components/SideBar'
import AuthorInfo from '../../components/AuthorInfo'
import PostComments from '../../components/PostComments'
import { useRouter } from 'next/router'
import Form from '../../components/Form'




interface Props {
    post: IPost;
    recommended: IPost[]
}

export const getFollowers = ( follows: number ): string => {
    if ( follows > 1000 ) {
        return `${ Math.floor( follows / 1000 ) }K`
    }

    return follows.toString()
}

export default function Post( { post, recommended }: Props ) {


    const router = useRouter();
    const [submittedForm, setSubmittedForm] = useState( false )

    return (
        <div>
            <Head>
                <title>{post.title}</title>
            </Head>
            <Header />
            <div className='  flex flex-row-reverse'>


                <SideBar>

                    <AuthorInfo author={post.author} />

                    <RecommendedPost recommended={recommended} />

                </SideBar>





                {/* MAIN */}
                <div className='my-10 flex-1 max-w-2xl mx-auto px-5'>
                    <article className='border-gray-900 border-b-[1px] mb-7'>

                        <div className='flex items-center mb-8 sm:mb-12'>
                            <Link
                                className='mr-4 flex-shrink-0'
                                href={`/authors/${ post.author.slug.current }`}>
                                <img className='w-20 h-20 rounded-full object-cover ' src={urlFor( post.author.image ).url()} alt="" />
                            </Link>
                            <div>
                                <p className='text-xl text-gray-800 '>Post by{" "}
                                    <Link
                                        href={`/authors/${ post.author.slug.current }`}
                                        className='text-violet-600 hover:text-violet-800 duration-200 font-mono'>
                                        {post.author.name}
                                    </Link></p>
                                <p className='text-gray-500 mb-1'>Published at {new Date( post.publishedAt ).toLocaleString()}</p>
                                <Link href={`/categories/${ post.categories.slug.current }`}
                                    // onClick={() => { router.push( `/categories/${ post.categories.slug.current }` ) }}
                                    className='px-4 py-1 bg-blue-100 rounded-full inline-block hover:bg-blue-200 cursor-pointer duration-200
                                '>{post.categories.title}</Link>
                            </div>
                        </div>
                        <div className='mb-8'>
                            <h1 className='text-4xl  sm:text-5xl font-serif sm:mb-4'>
                                {post.title}
                            </h1>
                            <p className='pt-1 text-ellipsis text-gray-500 text-2xl mb-4 italic'>{post.description}</p>
                            <img className='w-full h-auto object-contain' src={urlFor( post.mainImage ).url()} alt="" />

                        </div>
                        <div>
                            <PortableText
                                className='portable-text mb-10'
                                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                                content={post.body}
                                serializers={
                                    {
                                        h1: ( props: any ) => (
                                            <h1 className='font-bold text-3xl my-4' {...props} />
                                        ),
                                        h2: ( props: any ) => (
                                            <h2 className='font-bold text-2xl my-4' {...props} />
                                        ),
                                        h3: ( props: any ) => (
                                            <h3 className='font-bold text-xl my-3' {...props} />
                                        ),
                                        normal: ( props: any ) => (
                                            <p className='text-xl my-2' {...props} />
                                        ),
                                        link: ( { href, children }: any ) => (
                                            <a href={href} className='text-blue-600 hover:underline'>{children}</a>
                                        ),
                                        li: ( { children }: any ) => (
                                            <li className='my-2 ml-4 list-disc text-xl'>{children}</li>
                                        ),
                                        blockquote: ( props: any ) => (
                                            <p className='text-xl italic text-gray-600 my-2 ml-2 pl-4 border-gray-400 border-l-2'{...props} />
                                        ),
                                    }
                                } />
                        </div>
                    </article>
                    {submittedForm ?
                        (
                            <div className='bg-blue-200 p-8 rounded-lg '>
                                <h3 className='font-bold text-3xl mb-5 tracking-wide'>
                                    Thank you for your comment!
                                </h3>
                                <button onClick={() => setSubmittedForm( false )} className='bg-yellow-300 py-3 px-5 rounded-3xl text-xl cursor-pointer hover:bg-yellow-400 focus:outline-none'>
                                    Add the next comment
                                </button>
                            </div>
                        ) :
                        (

                            <Form _id={post._id} router={router} setSubmittedForm={setSubmittedForm} />
                        )}

                    {/* comments */}
                    <PostComments comments={post.comments} />


                </div>
            </div>
        </div >


    )
}

export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

    const queryPost = `*[_type == "post" && slug.current == $slug][0] {
    _id,
      title,
      slug,
      author -> {
      name,
      image,
      bio,
      follows,
      slug
    },
    'comments': *[
        _type == 'comment'&&
        post._ref==^._id],
    mainImage,
    description,
    publishedAt,
    body,
    categories[0]-> {title, slug}
    }`

    const queryRecommended = `
    *[_type == "post" && slug.current != $slug]| order(publishedAt desc)[0...5] {
        _id,
          title,
          slug,
          author -> {
          name,
          image,
          slug
        },
        mainImage,
        }
    `

    const recommended = await sanityClient.fetch( queryRecommended, {
        slug: params?.slug
    } )

    const post = await sanityClient.fetch( queryPost, {
        slug: params?.slug,
    } )

    if ( !post ) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
            recommended
        }
    }
}