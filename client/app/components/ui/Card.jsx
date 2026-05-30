import React from 'react'

const Card = ({ children, className = '' }) => {
    return (
        <div className={ className + ' glass rounded-3xl p-8' }>
            { children }
        </div>
    )
}

export default Card