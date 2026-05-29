import React from 'react'
import Input from './Input'

const FormField = ({ right, label, ...rest }) => {
    return (
        <>
            <div className="flex items-center justify-between m-0">
                <label className="text-sm mb-1">{ label }</label>
                { right }
            </div>
            <Input { ...rest } />
        </>
    )
}

export default FormField