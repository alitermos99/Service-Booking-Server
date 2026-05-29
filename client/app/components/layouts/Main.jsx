import React from 'react'

const Main = ({ children }) => {
    return (
        <div className="min-h-screen hero-grid flex items-center justify-center p-4 relative">
            { children }
        </div>
    )
}

export default Main