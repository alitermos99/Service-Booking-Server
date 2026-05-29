import React from 'react'

const Button = ({ label, className , ...rest }) => {
    return (
        <>
        <button
            type='submit'
            className={className + ' cursor-pointer'}
            { ...rest }
        >
            { label }
        </button></>
    )
}

export default Button