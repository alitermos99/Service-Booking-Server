import React from 'react'
import FormField from './FormField'
import { useState } from 'react';
import Button from './Button';

const PasswordField = ({ label = "Password", ...rest }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <FormField
                label={ label }
                type={show ? "text" : "password"}
                { ...rest }
            />

            <Button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-9 text-[#8888aa]"
                label={show ? "🙈" : "👁"}
            />
        </div>
    )
}

export default PasswordField