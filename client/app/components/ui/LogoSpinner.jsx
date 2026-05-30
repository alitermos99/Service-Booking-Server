import React from 'react'

const LogoSpinner = () => {
    return (
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-card" />

            <div className="absolute inset-0 animate-spin">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center text-xl">
                📅
            </div>
        </div>
    );
}

export default LogoSpinner