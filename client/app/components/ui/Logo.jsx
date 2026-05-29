import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center text-white">
            📅
            </div>

            <span className="font-bold text-xl">
                Reserv<span style={{ color: "#6c63ff" }}>Ease</span>
            </span>
        </Link>
    )
}

export default Logo