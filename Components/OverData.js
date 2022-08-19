import React from 'react'
import { translate } from 'tailwindcss/defaultTheme';


function OverData({ over, handleModal, updateModal, col: ballOver, calCOver, isDisableOver, isLastOverComplete }) {
    return (

        <div className='grid grid-cols-3 gap-2 m-auto w-full ' key={ballOver}>
            {over.map((ball, ind) => {
                let isDisable = false;
                if (!isLastOverComplete) {
                    isDisable = true;
                }

                if (ind != 0) {
                    if (!(over[ind - 1].isDirty == true)) {
                        isDisable = true;
                    }
                }

                return (
                    <>
                        <div
                            key={ind}
                            className={`text-center text-2xl font-bold rounded-full h-16 w-16 parent
                            ${ball.WicketDown == 1 && ball.NbORWb == 1 ? 'border-4 border-green-600' : ''}
                                ${ball.WicketDown == 1 ? 'bg-red-600' : ''}
                                ${(ball.WicketDown != 1 && ball.NbORWb == 1) ? 'bg-primary-lightGreen' : ''}
                                ${(isDisable) ? 'opacity-50 pointer-events-none' : ''}
                                `}
                            onClick={() => { ball.isDirty == true ? updateModal(ind) : handleModal(ind) }}
                        >
                            <span className='childEle h-10 w-10'>
                                {
                                    ball.isDirty == false ? <img src="/image/ball.svg" className="" alt="Flowbite Logo" /> :
                                        ball.WicketDown == 1 ? ball.runs : ball.runs
                                }
                            </span>
                        </div>
                    </>
                )

            })}

        </div>

    )
}

export default OverData