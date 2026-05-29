import React from 'react'

const Main = ({ children, className }) => {
    return (
        <div className={ className + ' relative min-h-dvh overflow-hidden flex items-center justify-center p-4 hero-grid' }>
            { children }
        </div>
    )
}

export default Main