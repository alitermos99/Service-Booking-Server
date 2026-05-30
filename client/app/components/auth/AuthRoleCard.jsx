import React from 'react'

const AuthRoleCard = ({ title, subtitle, svg, role, selected, onSelect }) => {
    const classes = 'p-4 cursor-pointer border-2! rounded-2xl border-card';

    return (
        <div 
            onClick={() => onSelect(role)}
            className={ selected ? classes + ' border-accent! bg-[rgba(108,99,255,0.1)]!' 
                : classes + ' hover:border-[rgba(108,99,255,0.4)] transition-all' 
            }
        >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-[rgba(56,189,248,0.2)]" >
                { svg }
            </div>

            <div className="text-sm font-semibold text-tx">{ title }</div>
            <div className="text-xs text-muted mt-0.5">{ subtitle }</div>
        </div>
    )
}

export default AuthRoleCard