import React from 'react'
import FormField from './FormField'
import { useState } from 'react';

const PasswordField = ({ label = "Password", ...rest }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <FormField
                label={ label }
                type={show ? "text" : "password"}
                {...rest}
            />

            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-9 text-[#8888aa]"
            >
                {show ? "🙈" : "👁"}
            </button>
        </div>
    )
}

export default PasswordField