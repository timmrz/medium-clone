import { NextRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormProps {
    _id: string;
    router: NextRouter;
    setSubmittedForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}


const Form = ( { _id, router, setSubmittedForm }: IFormProps ) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async ( data ) => {
        data._id = _id;
        await fetch( '/api/createComment', {
            method: 'POST',
            body: JSON.stringify( data )
        } )
            .then( () => {
                console.log( data );
                setSubmittedForm( true );
                setValue( 'name', '' );
                setValue( 'email', '' );
                setValue( 'comment', '' );
                router.replace( router.asPath );
            } )
            .catch( ( err ) => {
                console.log( err )
                setSubmittedForm( false )
            } )
        console.log( 'comment data', data )
    }


    return (
        <form onSubmit={handleSubmit( onSubmit )} className='flex flex-col items-start max-w-xl '>
            <p className='text-gray-500 text-lg italic '>What are your thoughts?</p>
            <h3 className='font-bold text-3xl mb-5'>Leave a comment below</h3>

            {/* <input type="hidden" value={_id}  {...register( "_id" )} /> */}

            <label className='mb-3 flex flex-col w-full '>
                <span className='text-xl mb-1 text-gray-700'>
                    Name
                </span>
                <input
                    {...register( 'name', { required: true } )}
                    type="text"
                    className='border border-gray-400 shadow py-2 px-4 rounded-lg ring-[#FFC017] outline-none focus:ring-1 w-full' />
                {errors.name && (
                    <p className='text-red-500'>The Name field is not required</p>
                )}
            </label>
            <label className='mb-3 flex flex-col w-full '>
                <span className='text-xl mb-1 text-gray-700'>
                    Email
                </span>
                <input
                    {...register( 'email', { required: true } )}
                    type="email"
                    className='border border-gray-400 shadow py-2 px-4 rounded-lg ring-[#FFC017] outline-none focus:ring-1 w-full' />
                {errors.email && (
                    <p className='text-red-500'>The Email field is not required </p>
                )}
            </label>
            <label className='flex flex-col w-full mb-4'>
                <span className='text-xl mb-1 text-gray-700'>
                    Comment
                </span>
                <textarea
                    {...register( 'comment', { required: true } )}
                    className='border border-gray-400 shadow py-2 px-4 rounded-lg ring-[#FFC017] outline-none focus:ring-1 w-full'
                    rows={8} />
                {errors.comment && (
                    <p className='text-red-500'>The Comment field is not required</p>
                )}
            </label>




            <input
                type="submit"
                value='Add comment'
                className='w-full bg-[#FFC017] py-2 px-4 rounded-3xl text-xl cursor-pointer hover:bg-yellow-500 focus:outline-none' />
        </form>
    )
}

export default Form