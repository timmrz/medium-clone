import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import AuthorInfo from '../../components/AuthorInfo'
import Header from '../../components/Header'
import PreviewPost from '../../components/PreviewPost'
import RecommendedPost from '../../components/RecommendedPost'
import SideBar from '../../components/SideBar'
import { sanityClient } from '../../sanity'
import { IAuthor, IPost } from '../../types'


interface IAuthorProps {
    author: IAuthor;
    recommended: IPost[]
}

export default function Author( { author, recommended }: IAuthorProps ) {
    return (
        <div>
            <Head>
                <title>{author.name}</title>
            </Head>
            <Header />

            <div className='flex flex-row-reverse'>
                <SideBar>
                    <AuthorInfo author={author} />
                    <RecommendedPost recommended={recommended} />
                </SideBar>


                <div className='pt-14 max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-0'>
                    <div className='lg:hidden max-w-screen-sm px-4'>
                        <AuthorInfo author={author} />

                        <h1 className='font-bold font-mono text-xl sm:text-4xl sm:mb-10 '>
                            Posts by{" "}
                            <span className='text-violet-600 underline'>
                                {author.name}
                            </span>
                        </h1>
                    </div>
                    {author.posts?.map( ( post ) => (
                        <PreviewPost post={post} key={post._id} />
                    ) )}

                </div>

            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {
    const query = `
    *[_type == "author" && slug.current == $slug][0]{
        _id,
      bio,
      name,
      slug,
      image,
      follows,
      "posts": *[_type == "post" && references(^._id)]{
        _id,
            title,
            slug,
            author -> {
            name,
            image,
            bio,
            slug
        },
        categories[0] -> {title, slug},
         
          mainImage,
          description,
          body[0].style == 'normal' => {
            body[0]
            },
          publishedAt,
          
      }
        }
    `

    const queryRecommended = `
    *[_type == "post" ]| order(publishedAt desc)[0...5] {
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

    const author = await sanityClient.fetch( query, {
        slug: params?.slug,
    } )
    const recommended = await sanityClient.fetch( queryRecommended )

    if ( !author ) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            author,
            recommended
        }
    }
}
