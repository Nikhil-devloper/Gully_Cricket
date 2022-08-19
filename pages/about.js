import React from 'react';
import Button from '../Components/Button';
import { useRouter } from 'next/router'

function about() {

    const router = useRouter()

    return (

        <div className="p-10 align-center bg-primary-myblack text-primary-gold text-2xl h-screen flex justify-center items-center flex-col">
            <h1 className='align-top relative bottom-10'>About App: </h1>
            <h2 className='mt-2 text-center'>Made With Next JS and Tailwind CSS ❤️</h2>

            <h2 className='mt-4 text-center '>This is PWA you can install and use offline</h2>

            <div className='mt-8 flex justify-center items-center'>
                <Button
                    label={'Home'}
                    type={'rounedStart'}
                    onClick={() => { router.push("/") }}
                />
            </div>




        </div>
    )

}

export default about