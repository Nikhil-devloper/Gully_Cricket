import React from 'react'

function SmallBox({ Icon, text,onClick }) {
    return (
        <div className='text-white relative mt-5' onClick={onClick}>
            <div className='rounded-full w-12 h-12 bg-secondary-main absolute m-auto left-0 right-0 border-2 border-primary-gold z-10 p-2'>
                <Icon />
            </div>

            <div className='rounded-b-lg w-24 h-14 bg-secondary-main relative top-5 text-sm	'>
                <div className='absolute bottom-1 m-auto inset-x-1/4'> {text} </div>
            </div>

            {/* <div> {text} </div>
            <Icon /> */}
        </div>
    )
}

export default SmallBox