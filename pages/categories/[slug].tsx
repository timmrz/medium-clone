import React, { ForwardedRef, Ref } from 'react'
import { sanityClient, urlFor } from '../../sanity'
import { GetServerSideProps, GetStaticProps } from 'next'
import { IAuthor, ICategory, IPost } from '../../types'
import Head from 'next/head'
import Header from '../../components/Header'
import Link from 'next/link'
import PreviewPost from '../../components/PreviewPost'
import SideBar from '../../components/SideBar'
import FollowTo from '../../components/FollowTo'
import RecommendedTopics from '../../components/RecommendedTopics'


interface IProps {
    category: ICategory;
    authors: IAuthor[];
    categories: ICategory[]
}

interface IPropsPreview {
    post: IPost;
}


// const Preview = React.forwardRef( ( { post }: IPropsPreview, ref: Ref<HTMLDivElement> ) => (
//     <PreviewPost ref={ref} post={post} />
// ) )

export default function Category( { category, authors, categories }: IProps ) {



    return (
        <div >
            <Head>
                <title>{category.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />


            <div className='flex flex-row-reverse'>
                <SideBar>
                    <RecommendedTopics categories={categories} />
                    <FollowTo authors={authors} />
                </SideBar>
                <div className='pt-14 max-w-[1192px] mx-auto px-4'>

                    <h1 className='font-bold font-mono text-2xl sm:text-4xl mb-2 sm:mb-10 bg-blue-100 inline-block px-6 py-3 rounded-full underline'>{category.title}</h1>

                    {category.posts?.map( post => (
                        <PreviewPost post={post} key={post._id} />
                    ) )}

                </div>

            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ( { params } ) => {
    const query = `
   
*[_type == "category" && slug.current == $slug][0] {
    title,
    _id,
    slug,
    "posts": *[_type == "post" && references(^._id)]{
    _id,
        title,
        slug,
        author -> {
        name,
        image,
        bio,
        slug,
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

    const queryCategories = `
*[_type == "category"]  {
  _id,
    title,
    slug
  }
`


    const queryAuthors = `
*[_type == "author"][0...4]{
  _id,
bio,
name,
slug,
image
  }

  `



    const categories = await sanityClient.fetch( queryCategories )
    const authors = await sanityClient.fetch( queryAuthors );
    const category = await sanityClient.fetch( query, {
        slug: params?.slug,
    } )

    if ( !category ) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            category,
            categories,
            authors
        }
    }
}
