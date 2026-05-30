import React from 'react'

const Button = ({ label, className, disabled = false, ...rest }) => {
    const buttonClass = disabled ? 'cursor-not-allowed opacity-40 pointer-events-none' : 'cursor-pointer';

    return (
        <button
            type='submit'
            className={className + ' ' + buttonClass + ' rounded-xl'}
            { ...rest }
        >
            { label }
        </button>
    )
}

export default Button