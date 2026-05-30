import React from 'react'
import FormField from '../ui/FormField'
import PasswordField from '../ui/PasswordField'

const RegisterForm = () => {
    return (
        <>
            <form className='space-y-4'>
                <div className='grid grid-cols-2 gap-3'>
                    <FormField
                        label={'First Name'}
                        type="text"
                        name="firstName"
                        // value={form.email}
                        placeholder="John"
                        // onChange={handleChange}
                    />

                    <FormField
                        label={'Last Name'}
                        type="text"
                        name="lastName"
                        // value={form.email}
                        placeholder="Doe"
                        // onChange={handleChange}
                    />
                </div>

                <PasswordField 
                    showStrength
                    placeholder="Min. 6 characters"
                />
            </form>
        </>
    )
}

export default RegisterForm