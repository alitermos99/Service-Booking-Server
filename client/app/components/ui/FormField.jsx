import React from 'react'
import Input from './Input'

const FormField = ({ right, label, type = 'text', required = false, ...rest }) => {
    const divClass = !right ? 'm-0' : 'flex items-center justify-between m-0';

    return (
        <div>
            <div className={divClass}>
                { required && type !== 'checkbox' && <span className='text-rose-400'>* </span> }
                <label className="text-sm mb-1">{ label }</label>
                { right }
            </div>
            
            <Input type={type} required={required} { ...rest } />
        </div>
    )
}

export default FormField