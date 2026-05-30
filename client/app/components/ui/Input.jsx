import React from 'react'

const Input = (props) => {
    return (
        <input
            className='input-field'
            { ...props }
        />
    )
}

export default Input