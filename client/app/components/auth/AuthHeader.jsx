import React from 'react'
import Logo from '../ui/Logo'

const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-8">
            <Logo />

            <h1 className="text-2xl font-bold">
                { title }
            </h1>

            <p className="text-sm text-[#8888aa] mt-1">
                 { subtitle }
            </p>
        </div>
    )
}

export default AuthHeader