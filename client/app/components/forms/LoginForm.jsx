import React from 'react'
import FormField from '../ui/FormField'
import Link from 'next/link'
import PasswordField from '../ui/PasswordField'
import Spacer from '../ui/Spacer'

const LoginForm = () => {
    return (
        <form className="space-y-4">
            <FormField
                label={'Email address'}
                type="email"
                className="input-field"
                placeholder="you@example.com"
            />

            <Spacer />

            <PasswordField
                className="input-field"
                name="password"
                placeholder="••••••••"
            />

            <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#6c63ff]" />
                <span className="text-sm text-[#8888aa]">
                    Remember me for 30 days
                </span>
            </div>

            <Link
              href="/admin/dashboard"
              className="block text-center btn-primary text-white font-semibold py-3 rounded-xl mt-2"
            >
                Sign in
            </Link>
        </form>
    )
}

export default LoginForm