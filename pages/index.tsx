import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import FollowTo from '../components/FollowTo'
import Header from '../components/Header'
import MainSection from '../components/MainSeaction'
import PreviewPost from '../components/PreviewPost'

import RecommendedTopics from '../components/RecommendedTopics'
import SideBar from '../components/SideBar'
import { sanityClient, urlFor } from '../sanity'
import { IPost, ICategory, IAuthor } from '../types'

interface IProps {
  posts: [IPost];
  categories: [ICategory]
  authors: [IAuthor]
}



const Home = ( { posts, categories, authors }: IProps ) => {

  return (
    <div>
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <MainSection />

      <div className='flex flex-row-reverse'>


        <SideBar>

          <RecommendedTopics categories={categories} />

          <FollowTo authors={authors} />
        </SideBar>


        <div className='pt-14 max-w-[1192px] mx-auto px-4'>

          {posts.map( post => (
            // <Link legacyBehavior key={post._id} href={`/posts/${ post.slug.current }`}>
            //   {/* <PreviewPost post={post} href={`/posts/${ post.slug.current }`} /> */}
            //   <PreviewPost href={`/posts/${ post.slug.current }`} post={post} />
            // </Link>

            <PreviewPost post={post} key={post._id} />

          ) )}

        </div>

      </div>

    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const queryPosts = `
  *[_type == "post"] {
    _id,
      title,
      slug,
      author -> {
      name,
      image,
      slug
    },
    mainImage,
    description,
    body[0].style == 'normal' => {
      body[0]
      },
    publishedAt,
    categories[0]-> {title, slug}
    }`

  const queryAuthors = `
  *[_type == "author"][0...4]{
    _id,
  bio,
  name,
  slug,
  image
    }
  
    `

  const queryCategories = `
    *[_type == "category"]  {
      _id,
        title,
        slug
      }
    `

  const categories = await sanityClient.fetch( queryCategories )
  const posts = await sanityClient.fetch( queryPosts );
  const authors = await sanityClient.fetch( queryAuthors );

  return {
    props: {
      posts,
      categories,
      authors

    }
  }
}
