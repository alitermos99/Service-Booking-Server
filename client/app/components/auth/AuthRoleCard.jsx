import React from 'react'
import Card from '../ui/Card'

const AuthRoleCard = ({ title, subtitle, svg }) => {
    return (
        <Card className='p-4 cursor-pointer hover:border-[rgba(108,99,255,0.4)] transition-all border-2! rounded-2xl'>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-[rgba(56,189,248,0.2)]" >
                { svg }
            </div>

            <div className="text-sm font-semibold text-tx">{ title }</div>
            <div className="text-xs text-muted mt-0.5">{ subtitle }</div>
        </Card>
    )
}

export default AuthRoleCard