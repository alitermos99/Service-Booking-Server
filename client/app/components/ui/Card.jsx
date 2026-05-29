import React from 'react'

const Card = ({ children }) => {
    return (
        <div className="glass rounded-3xl p-8">
            { children }
        </div>
    )
}

export default Card