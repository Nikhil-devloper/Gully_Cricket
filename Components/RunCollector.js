import React, { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid';
import Button from './Button.jsx';


function RunCollector({ handleCloseModal, updateCloseModal, preloadDirtyData, updateRowCol,justClose }) {

    const [isDirty, setDirty] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);
    const [errorMessage, setError] = useState(false);
    const [displayData, setDisplayData] = useState([
        { runs: 1, displayData: 1, category: 'plane', isDirty: false, ind: 0 },
        { runs: 2, displayData: 2, category: 'plane', isDirty: false, ind: 1 },
        { runs: 3, displayData: 3, category: 'plane', isDirty: false, ind: 2 },
        { runs: 0, displayData: 0, category: 'plane', isDirty: false, ind: 3 },
        { runs: 4, displayData: 4, category: 'plane', isDirty: false, ind: 4 },
        { runs: 6, displayData: 6, category: 'plane', isDirty: false, ind: 5 },
        { runs: 1, displayData: 'Nb', category: 'special', isDirty: false, ind: 6 },
        { runs: 1, displayData: 'Wd', category: 'special', isDirty: false, ind: 7 },
        { runs: 0, displayData: 'Wk', category: 'special', isDirty: false, ind: 8 },
    ]);


    useEffect(() => {

        if (preloadDirtyData.length != 0) {
            let tempArray = preloadDirtyData.map(ele => ele.ind);
            let tempDisplayData = [...displayData];
            tempArray.forEach((element, ind) => {
                tempDisplayData.splice(element, 1, preloadDirtyData[ind])
            });
            setDirty(true);
            setUpdateMode(true);
            setDisplayData(tempDisplayData)
        }
    }, [preloadDirtyData])


    const runs = displayData.filter(ele => ele.isDirty == true).map(ele => ele.runs).reduce((initial, next) => initial + next, 0);

    const handleClick = (ele, id) => {
        let tempData = [...displayData];

        if (ele.isDirty === true) {
            tempData[id] = { ...tempData[id], isDirty: false };
            if (tempData.filter(ele => ele.isDirty == true).length == 0) {
                setDirty(false)
            }
        }
        else if (ele.category == 'plane') {
            tempData = tempData.map(rec => {
                if (rec.category == 'plane') {
                    return { ...rec, isDirty: false };
                }
                else {
                    return rec;
                }
            })
            tempData[id] = { ...ele, isDirty: true };
            tempData[7] = { ...tempData[7], isDirty: false }
            setDirty(true);
        }
        else if (ele.category != 'plane') {

            if (ele.displayData == 'Wd') {
                tempData[id] = { ...ele, isDirty: true };
                tempData = tempData.map(rec => {
                    if (rec.category == 'plane') {
                        return { ...rec, isDirty: false };
                    }
                    else {
                        return rec;
                    }
                })
                //Deselect No Ball
                tempData[6] = { ...tempData[6], isDirty: false }
            }
            else if (ele.displayData == 'Nb') {
                tempData[id] = { ...ele, isDirty: true };
                tempData[7] = { ...tempData[7], isDirty: false }
            }
            else {
                tempData[id] = { ...ele, isDirty: true };
            }
            setDirty(true);
        }

        setDisplayData(tempData);
        setError(false);
    }

    const submitRuns = () => {

        if (isUpdateMode == true) {

            if (isDirty == true) {
                //All Dirty State.
                let dirtyData = displayData.filter(ele => ele.isDirty == true);
                updateCloseModal(runs, dirtyData);
            }
            else {
                setError('Please Select the option');
            }
        }
        else {
            if (isDirty == true) {
                //All Dirty State.
                let dirtyData = displayData.filter(ele => ele.isDirty == true);
                handleCloseModal(runs, dirtyData);
            }
            else {
                setError('Please Select the option');
            }
        }

    }





    return (
        <div className='text-white'>

            <XIcon onClick={justClose} height={40} width={40} className='absolute top-4 right-4' />
            <div className='mt-10 text-2xl '>
                How many runs ?
            </div>

            <div className='grid grid-cols-3 gap-10 m-auto mt-10 font-bold'>
                {displayData.map((ele, id) => {

                    return <div
                        key={id}
                        className={`text-center
                        ${(ele.category === 'plane') ? 'bg-primary-lightGold' : ''}
                        ${(ele.category === 'special' && ele.displayData == 'Nb') ? 'bg-primary-lightGreen' : ''}
                        ${(ele.category === 'special' && ele.displayData == 'Wd') ? 'bg-primary-lightGreen' : ''}
                        ${(ele.category === 'special' && ele.displayData == 'Wk') ? 'bg-red-600' : ''}
                        ${(ele.category === 'special' && ele.displayData == 'Wk') ? 'bg-red-600' : ''}
                        ${(ele.isDirty === true) ? 'border-4 border-primary-gold' : ''}
                        h-10 text-2xl`}
                        onClick={() => handleClick(ele, id)}
                    >
                        {ele.displayData}  </div>
                })}
            </div>

            {isDirty && <div className='mt-4 text-xl flex justify-center align-center flex-row'>

                Runs added for this ball: {runs}

            </div>
            }

            <div className='mt-10 flex justify-center'>
                <Button
                    label={isUpdateMode == true ? 'Update Runs' : 'Add Runs'}
                    type={'primary'}
                    onClick={submitRuns}
                />
            </div>

            {errorMessage && <div className='ml-2 mt-3 text-primary-gold mt- text-center'>
                {errorMessage}
            </div>
            }




        </div>
    )
}

export default RunCollector