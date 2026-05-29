import React, { useState } from 'react'
import FormField from '../ui/FormField'
import Link from 'next/link'
import PasswordField from '../ui/PasswordField'
import Spacer from '../ui/Spacer'
import Button from '../ui/Button'

const LoginForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleChange = (event) => {
        const{ name, value, type, checked } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FORM DATA:", form);
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <FormField
                    label={'Email address'}
                    type="email"
                    name="email"
                    value={form.email}
                    className="input-field"
                    placeholder="you@example.com"
                    onChange={handleChange}
                />

                <Spacer />

                <PasswordField
                    className="input-field"
                    name="password"
                    value={form.password}
                    placeholder="••••••••"
                    onChange={handleChange}
                />

                <div className="flex items-center gap-2">
                    <FormField
                        name="remember"
                        type="checkbox"
                        checked={form.checked}
                        className="accent-[#6c63ff]"
                        onChange={handleChange}
                    />

                    <span className="text-sm text-[#8888aa]">
                        Remember me for 30 days
                    </span>
                </div>

                <Button 
                    label={'Sign in'}
                    className={'block text-center btn-primary text-white font-semibold py-3 rounded-xl mt-2 w-100'}
                    type="submit"
                />
            </form>

            <p className="text-center text-sm text-[#8888aa] mt-6">
                Don&apos;t have an account?{" "}

                <Link href="/register" className="text-[#6c63ff]">
                    Create one →
                </Link>
            </p>
        </>
        
    )
}

export default LoginForm