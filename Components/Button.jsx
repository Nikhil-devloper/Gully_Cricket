import React from 'react'

function Button({ label, type, onClick, addedClass = '' }) {

    let classes = {
        rounedStart: 'bg-primary-gold text-white font-bold py-2 px-4 rounded-full w-32',
        primary: 'bg-primary-gold text-white font-bold py-2 px-4 rounded w-36',
        secondery: 'bg-primary-lightBlack text-primary-gold font-bold py-2 px-4 rounded w-36',
        seconderyRound: 'bg-primary-lightBlack text-primary-gold font-bold py-2 px-4 rounded w-24',

    };

    return (
        <button onClick={onClick} className={classes[type] ? classes[type] + ` ${addedClass}` : ''}>{label}</button>
    )
}

export default Button