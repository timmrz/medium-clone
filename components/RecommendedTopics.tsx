import Link from 'next/link'
import React from 'react'
import { ICategory } from '../types'


interface ITopicsProps {
  categories: ICategory[]
}

export default function RecommendedTopics( { categories }: ITopicsProps ) {

  return (
    <div className='mb-12'>
      <h3 className='text-3xl text-gray-800 mb-7'>Recommended topics</h3>
      <ul className='flex flex-wrap'>
        {categories.map( ( category ) => (


          <li
            key={category._id}
            className='m-2 py-2 px-4 rounded-full bg-blue-100 text-lg cursor-pointer hover:bg-blue-200'
          >
            <Link className='w-full h-full cursor-pointer' href={`/categories/${ category.slug.current }`}>
              {category.title}
            </Link>
          </li>

        ) )}
      </ul>
    </div>
  )
}
