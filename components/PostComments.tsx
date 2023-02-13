import React, { useState } from 'react'
import { Comment } from '../types'


interface IPostCommentsProps {
    comments: Comment[]
}

export default function PostComments( { comments }: IPostCommentsProps ) {

    return (
        <div className='mt-7 pt-7 border-gray-900 border-t-[1px] mb-5'>
            <h3 className='font-bold text-3xl mb-5'>Comments</h3>
            {
                comments.length > 0 ?

                    ( comments.map( ( comment: Comment ) => (

                        <div key={comment._id} className='mb-4'>

                            <h4 className='text-violet-700 text-lg font-mono'>
                                {comment.name}
                            </h4>
                            <p className='text-xl'>
                                {comment.comment}
                            </p>
                        </div>
                    ) ) ) :
                    (
                        <p className='text-gray-500 text-lg italic '>There are no comments for this post</p>
                    )


            }
        </div>
    )
}
